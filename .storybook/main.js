const path = require('path')
const webpack = require('webpack')

module.exports = {
    stories: [
        '../stories/**/*.stories.js',
        '../stories/**/*.stories.ts',
        '../stories/**/*.stories.tsx',
        '../src/**/*.stories.js',
        '../src/**/*.stories.ts',
        '../src/**/*.stories.tsx',
    ],
    addons: ['@storybook/addon-actions', '@storybook/addon-links'],
    webpackFinal: async config => {
        // 定义 storybook 工具组件的别名
        // ---------------------------
        config.resolve.alias['@biossun/nami/storybook-utils'] = path.join(__dirname, 'utils.tsx')

        // 定义 @biossun/nami 的别名
        // ---------------------------
        config.resolve.alias['@biossun/nami'] = path.join(__dirname, '..', 'src')

        // __DEV__
        // ---------------------------
        config.plugins.push(
            new webpack.DefinePlugin({
                __DEV__: true,
            })
        )

        // 支持 typescript
        // ---------------------------
        config.resolve.extensions.push('.ts', '.tsx')
        config.module.rules.push({
            test: /\.tsx?$/,
            use: [
                'babel-loader',
                {
                    loader: 'ts-loader',
                    options: {
                        onlyCompileBundledFiles: true,
                        configFile: path.resolve(__dirname, '..', 'tsconfig.json'),
                        compilerOptions: {
                            sourceMap: true,
                        },
                    },
                },
            ],
        })

        // 支持 CSS Module
        // ---------------------------
        config.module.rules.find(
            rule => rule.test.toString() === '/\\.css$/'
        ).exclude = /\.module\.css$/

        config.module.rules.push({
            test: /\.module\.css$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            localIdentName: 'demo_[local]__[hash:base64:7]',
                        },
                    },
                },
            ],
        })

        // 支持 scss
        // ---------------------------
        config.module.rules.push({
            test: /\.scss$/,
            exclude: /\.module\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        sassOptions: {
                            outputStyle: 'expanded',
                        },
                    },
                },
            ],
        })

        config.module.rules.push({
            test: /\.module\.scss$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            localIdentName: 'demo_[local]__[hash:base64:7]',
                        },
                    },
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
        })

        return config
    },
}
