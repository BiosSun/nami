const history = require('connect-history-api-fallback')
const convert = require('koa-connect')

module.exports = {
    config: require('./site/webpack.config')(),
    add(app) {
        app.use(convert(history({})))
    },
}
