const path = require('path')
const appRoot = require('app-root-path').toString()
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const sassAliasImporter = require('../scripts/sass-alias-importer')

const ENV_DEFAULT = {
    production: false,
    analyzer: false,
}

module.exports = (env = ENV_DEFAULT) => {
    const PUBLIC_URL = env.production ? '/nami/' : '/'

    const config = {
        mode: env.production ? 'production' : 'development',
        target: 'web',

        entry: {
            index: [
                // 一般开发时使用的浏览器都比较新，因此大多都不需要引入 core-js
                env.production ? 'babel-polyfill' : 'regenerator-runtime/runtime',
                './site/index.tsx',
            ],
        },

        output: {
            path: path.join(appRoot, '_site'),
            filename: '[name].js',
        },

        resolve: {
            extensions: ['.json', '.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
            alias: {
                // nami
                '@utils': path.join(appRoot, 'src', 'utils'),
                '@components': path.join(appRoot, 'src', 'components'),

                // site
                nami: path.join(appRoot, 'src'),
                '@site/components': path.join(appRoot, 'site', 'components'),
                '@site/views': path.join(appRoot, 'site', 'views'),
                '@site/utils': path.join(appRoot, 'site', 'utils'),
                '@site/docs': path.join(appRoot, 'site', '_docs'),
                '@site/demos': path.join(appRoot, 'site', '_demos'),
            },
        },

        optimization: {
            splitChunks: {
                chunks: 'all',
                maxInitialRequests: 5,
                cacheGroups: {
                    nami: {
                        name: 'nami',
                        test: /[\\/]src[\\/]/,
                    },
                    vendors: {
                        name: 'vendors',
                        test: /[\\/]node_modules[\\/]/,
                    },
                    polyfill: {
                        name: 'polyfill',
                        test: /[\\/](babel-polyfill|core-js)[\\/]/,
                        priority: 1,
                    },
                    react: {
                        name: 'react',
                        test: /[\\/]react(-dom)?[\\/]/,
                        priority: 1,
                    },
                },
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
                'process.env.PUBLIC_URL': JSON.stringify(PUBLIC_URL),
            }),

            new MiniCssExtractPlugin({
                filename: '[name].css',
            }),

            new HtmlWebpackPlugin({
                template: 'site/index.html',
                PUBLIC_URL: PUBLIC_URL,
            }),

            new CopyWebpackPlugin(['site/404.html']),
        ],
    }

    if (!env.production) {
        config.devtool = 'eval-source-map'
    }

    if (env.analyzer) {
        config.plugins.unshift(new BundleAnalyzerPlugin())
    }

    return config
}
