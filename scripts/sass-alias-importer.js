const fs = require('fs-extra')
const path = require('path')
const appRoot = require('app-root-path')

/**
 * @example
 *   const sassAliasImporter = require('@biossun/sass-alias-importer')
 *
 *   const libSassOptions = {
 *       importer: sassAliasImporter({
 *           '@lib/': './src/lib',
 *           '@components:': './src/components',
 *       })
 *   }
 */
module.exports = function sassAliasImporterGenerator(aliases) {
    return function sassAliasImporter(url, prev) {
        let file = undefined

        for (let alias in aliases) {
            const mappingPath = aliases[alias]

            if (url.indexOf(alias) === 0) {
                file = path.join(
                    appRoot.toString(),
                    ...mappingPath.split('/'),
                    ...url.substring(alias.length).split('/')
                )

                break
            }
        }

        if (!file) {
            file = path.join(path.dirname(prev), ...url.split('/'))
        }

        if (/\.s[ac]ss$/.test(file) === false) {
            const dir = path.dirname(file)
            const base = path.basename(file)

            const scssFile = path.join(dir, '_' + base + '.scss')
            const sassFile = path.join(dir, '_' + base + '.sass')

            if (fs.pathExistsSync(scssFile)) {
                file = scssFile
            } else if (fs.pathExistsSync(sassFile)) {
                file = sassFile
            } else {
                throw new Error(
                    `[sass-alias-importer] Can't handle import url "${url}" in file "${prev}"`
                )
            }
        }

        return { file }
    }
}
