const webpack = require('webpack')
const serve = require('webpack-serve')
const history = require('connect-history-api-fallback')
const convert = require('koa-connect')

module.exports = {
    config: require('./site/webpack.config')({ production: false }),
    add(app, middleware, options) {
        app.use(convert(history({})))
    },
}
