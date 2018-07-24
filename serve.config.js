const history = require('connect-history-api-fallback')
const convert = require('koa-connect')

module.exports = {
    add(app) {
        app.use(convert(history({})))
    },
}
