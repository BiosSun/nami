const _ = require('lodash')
const fs = require('fs-extra')
const del = require('del')
const path = require('path')
const weblog = require('webpack-log')
const colors = require('ansi-colors')
const appRoot = require('app-root-path')
const utils = require('./utils')

const log = weblog({ name: 'doc-parser/load-config' })
const configFile = path.join(appRoot.toString(), '.docsparserrc')

module.exports = function loadConfig() {
    const config = fs.readJsonSync(configFile, { throws: false })

    if (validConfig(config) === false) {
        return null
    } else {
        config.outputs.documents = utils.absoluteDir(config.outputs.documents)
        config.outputs.demos = utils.absoluteDir(config.outputs.demos)

        del.sync([config.outputs.documents, config.outputs.demos])

        return config
    }
}

function validConfig(config, configFile) {
    let isValid = false

    if (!config) {
        log.error(colors.red(`configuration file not found.`), `<${configFile}>`)
    } else if (!config.documents || _.isEmpty(config.documents)) {
        log.error(colors.red(`missing \`documents\` configuration item.`))
    } else if (!config.outputs) {
        log.error(colors.red(`missing \`outputs\` configuration item.`))
    } else if (!config.outputs.documents) {
        log.error(colors.red(`missing \`outputs.documents\` configuration item.`))
    } else if (!config.outputs.demos) {
        log.error(colors.red(`missing \`outputs.demos\` configuration item.`))
    } else {
        isValid = true
    }

    return isValid
}
