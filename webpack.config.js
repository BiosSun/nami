const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const nodeExternals = require('webpack-node-externals')
const sassAliasImporter = require('../scripts/sass-alias-importer')

module.exports = (env, argv) => {
    const config = {
        mode: env.production ? 'production' : 'none',

        entry: './src/index.ts',

        output: {
            path: path.resolve(__dirname, 'lib'),
            filename: 'index.js',
            library: 'nami',
            libraryTarget: 'commonjs2',
        },

        resolve: {
            extensions: ['.json', '.js', '.jsx', '.ts', '.tsx', '.css', '.sass', '.scss'],
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
                                compilerOptions: {
                                    declaration: true,
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.s[ac]ss$/,
                    include: path.join(__dirname, 'src'),
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
                                    '@nami//': './src/components',
                                    '@docs//': './docs/src',
                                }),
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
        ],
    }

    if (!env.production) {
        config.plugins.push(
            new webpack.NamedModulesPlugin(),
            new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('development') })
        )
    }

    return config
}
