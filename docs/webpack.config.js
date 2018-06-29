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

        entry: [
            // 一般开发时使用的浏览器都比较新，因此大多都不需要引入 core-js
            env.production ? 'babel-polyfill' : 'regenerator-runtime/runtime',
            './docs/src/index.tsx',
        ],

        output: {
            path: path.resolve(__dirname, '..', '_site'),
            filename: 'index.js',
        },

        resolve: {
            extensions: ['.json', '.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
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
                    test: /\.scss$/,
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

        devtool: 'eval-source-map',
    }

    return config
}
