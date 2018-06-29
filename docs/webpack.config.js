const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const sassAliasImporter = require('../scripts/sass-alias-importer')
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin')
const DocDatasGeneratorWebpackPlugin = require('../scripts/webpack-plugin-doc-datas-generator')

module.exports = (env, argv) => {
    const config = {
        mode: env.production ? 'production' : 'development',
        target: 'web',

        entry: ['babel-polyfill', './docs/src/index.tsx'],

        output: {
            path: path.resolve(__dirname, '..', '_site'),
            filename: 'index.js',
        },

        resolve: {
            extensions: ['.json', '.js', '.jsx', '.ts', '.tsx', '.css', '.sass', '.scss'],
            alias: {
                // nami
                '@utils': path.resolve(__dirname, '..', 'src', 'utils'),
                '@components': path.resolve(__dirname, '..', 'src', 'components'),

                // docs
                nami: path.resolve(__dirname, '..', 'src'),
                '@docs/components': path.resolve(__dirname, 'src', 'components'),
                '@docs/views': path.resolve(__dirname, 'src', 'views'),
                '@docs/utils': path.resolve(__dirname, 'src', 'utils'),
                '@docs/datas': path.resolve(__dirname, 'datas'),
                '@docs/demos': path.resolve(__dirname, 'demos'),
            },
        },

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                        },
                        {
                            loader: 'ts-loader',
                            options: {
                                compilerOptions: {
                                    sourceMap: true,
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                        },
                    ],
                },
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: [
                        env.production ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                    ],
                },
                {
                    test: /\.s[ac]ss$/,
                    exclude: /node_modules/,
                    use: [
                        env.production ? MiniCssExtractPlugin.loader : 'style-loader',
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                outputStyle: 'expanded',
                                importer: sassAliasImporter({
                                    '@nami//': './src',
                                    '@docs//': './docs/src',
                                    '@node//': './node_modules',
                                }),
                            },
                        },
                    ],
                },
            ],
        },

        plugins: [
            new ExtraWatchWebpackPlugin({
                files: 'src/**/demos/**/*.jsx',
            }),

            new DocDatasGeneratorWebpackPlugin({
                entry: 'src/index.ts',
                output: 'docs/datas',
                codesOutput: 'docs/demos',
            }),

            new MiniCssExtractPlugin({
                filename: 'index.css',
            }),

            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'index.html'),
            }),
        ],

        devServer: {
            contentBase: './lib',
        },

        devtool: 'eval-source-map',
    }

    if (!env.production) {
        config.plugins.push(
            new webpack.NamedModulesPlugin(),
            new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('development') })
        )
    }

    return config
}
