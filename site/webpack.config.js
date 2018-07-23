const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const sassAliasImporter = require('../scripts/sass-alias-importer')

module.exports = (env, argv) => {
    const config = {
        mode: env.production ? 'production' : 'development',
        target: 'web',

        entry: [
            // 一般开发时使用的浏览器都比较新，因此大多都不需要引入 core-js
            env.production ? 'babel-polyfill' : 'regenerator-runtime/runtime',
            './site/index.tsx',
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
                '@site/components': path.resolve(__dirname, 'components'),
                '@site/views': path.resolve(__dirname, 'views'),
                '@site/utils': path.resolve(__dirname, 'utils'),
                '@site/docs': path.resolve(__dirname, '_docs'),
                '@site/demos': path.resolve(__dirname, '_demos'),
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
                                    '@site//': './site',
                                    '@node//': './node_modules',
                                }),
                            },
                        },
                    ],
                },
            ],
        },

        plugins: [
            new webpack.DefinePlugin({
                'process.env.PUBLIC_URL': env.production ? '"/nami"' : '"/"',
            }),

            new MiniCssExtractPlugin({
                filename: 'index.css',
            }),

            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'index.html'),
            }),

            new CopyWebpackPlugin(['site/404.html']),
        ],

        devtool: 'eval-source-map',
    }

    if (env.analyzer) {
        config.plugins.unshift(new BundleAnalyzerPlugin())
    }

    return config
}
