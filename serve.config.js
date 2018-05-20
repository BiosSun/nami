const webpack = require('webpack')
const serve = require('webpack-serve')
const history = require('connect-history-api-fallback')
const convert = require('koa-connect')

module.exports = {
    config: require('./docs/webpack.config')({ production: false }),
    content: './_site',
    add(app, middleware, options) {
        app.use(convert(history({})))
    },
}
