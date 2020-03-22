const path = require('path')
const appRoot = require('app-root-path').toString()
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const nodeExternals = require('webpack-node-externals')

const ENV_DEFAULT = {
    analyzer: false,
}

module.exports = (env = ENV_DEFAULT) => {
    const config = {
        // 因为希望把压缩代码放在 gulp 中来做，因此虽然是发布构建，但不能设置为 `production`
        mode: 'none',

        // entry 在 gulp 中指定

        output: {
            path: path.join(appRoot, 'lib'),
            filename: 'index.js',
            libraryTarget: 'commonjs2',
        },

        resolve: {
            extensions: ['.json', '.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
        },

        externals: [nodeExternals()],

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    include: path.join(__dirname, 'src'),
                    use: [
                        {
                            loader: 'babel-loader',
                        },
                        {
                            loader: 'ts-loader',
                            options: {
                                onlyCompileBundledFiles: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.scss$/,
                    include: path.join(__dirname, 'src'),
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sassOptions: {
                                    outputStyle: 'expanded',
                                },
                            },
                        },
                    ],
                },
            ],
        },

        plugins: [
            new MiniCssExtractPlugin({
                filename: 'index.css',
            }),

            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production'),
                __DEV__: false,
            }),
            new webpack.optimize.ModuleConcatenationPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
        ],
    }

    if (env.analyzer) {
        config.plugins.unshift(new BundleAnalyzerPlugin())
    }

    return config
}
