const _ = require('lodash')
const fs = require('fs-extra')
const path = require('path')
const appRoot = require('app-root-path')
const typedoc = require('typedoc')
const ts = require('typescript')

const IGNORED = [
    'out',
    'version',
    'help',
    'watch',
    'declaration',
    'declarationDir',
    'mapRoot',
    'sourceMap',
    'inlineSources',
    'removeComments',
    'noImplicitAny',
    'noUnusedLocals',
    'noUnusedParameters',
]
const caches = []

module.exports = function(file = path.join(appRoot.toString(), 'tsconfig.json')) {
    file = _.trim(file)

    if (!file) {
        throw `argument 'file' Is not a valid path string.`
    }

    if (caches[file]) {
        return caches[file]
    }

    if (!fs.pathExistsSync(file)) {
        throw `file ${file} is invalid.`
    }

    const { config } = ts.readConfigFile(file, ts.sys.readFile)

    if (config === undefined) {
        throw `file ${file} does not contain valid JSON.`
    }

    if (!_.isPlainObject(config)) {
        throw `file ${file} does not contain a JSON object.`
    }

    const {
        options: options,
        raw: { typedocOptions },
    } = ts.parseJsonConfigFileContent(
        config,
        ts.sys,
        path.resolve(path.dirname(file)),
        {},
        path.resolve(file)
    )

    for (const key of IGNORED) {
        delete options[key]
    }

    const result = _.defaults({}, typedocOptions, options)

    caches[file] = result
    return result
}
