const path = require('path')

module.exports = {
    stories: ['../stories/**/*.stories.js'],
    addons: ['@storybook/addon-actions', '@storybook/addon-links'],
    webpackFinal: async config => {
        // 定义 @biossun/nami 的别名
        // ---------------------------
        config.resolve.alias['@biossun/nami'] = path.join(__dirname, '..', 'src')

        // 支持 typescript
        // ---------------------------
        config.resolve.extensions.push('.ts', '.tsx')
        config.module.rules.push({
            test: /\.tsx?$/,
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
        })

        // 支持 scss
        // ---------------------------
        config.module.rules.push({
            test: /\.scss$/,
            use: [
                {
                    loader: 'style-loader',
                },
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
        })

        return config
    },
}
