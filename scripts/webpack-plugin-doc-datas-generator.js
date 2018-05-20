const _ = require('lodash')
const fs = require('fs-extra')
const path = require('path')
const appRoot = require('app-root-path')
const docDatasGenerator = require('./doc-datas-generator')
const weblog = require('webpack-log')
const colors = require('ansi-colors')

const PLUGIN_NAME = 'DocDatasGeneratorWebpackPlugin'
const log = weblog({ name: PLUGIN_NAME })

/**
 * 该模块提供一个 webpack 插件以调用 doc-datas-generator 模块
 * @param {object} options - 配置对象
 * @param {string} options.entry - 入口文件
 * @param {string} options.output - JSON 数据文件输出目录
 * @param {string} options.codesOutput - 示例代码文件输出目录
 */
module.exports = class DocDatasGeneratorWebpackPlugin {
    constructor({ entry, output, codesOutput }) {
        entry = assignOption(entry, `You must specify the 'entry' option.`)
        output = assignOption(output, `You must specify the 'output' option.`)
        codesOutput = assignOption(codesOutput, `You must specify the 'codesOutput' otpion.`)

        entry = getAbsolutePath(entry)
        output = getAbsolutePath(output)
        codesOutput = getAbsolutePath(codesOutput)

        if (!fs.pathExistsSync(entry)) {
            pushError(`The 'entry' is does not exists.`)
        }

        fs.ensureDirSync(output)
        fs.ensureDirSync(codesOutput)

        this.entry = entry
        this.entryDir = path.dirname(entry)
        this.output = output
        this.codesOutput = codesOutput

        this.startTime = Date.now()
        this.prevTimestamps = new Map()
    }

    apply(compiler) {
        compiler.hooks.thisCompilation.tap(PLUGIN_NAME, compilation => {
            if (this.prevTimestamps === compilation.fileTimestamps) {
                debugger
            }

            const changedFiles = []
            let changedEntryFile = false

            compilation.fileTimestamps.forEach((timestamp, file) => {
                if ((this.prevTimestamps.get(file) || this.startTime) < (timestamp || Infinity)) {
                    changedFiles.push(file)
                }
            })

            const isChangedEntryFile = changedFiles.reduce(
                (is, file) => (isInDir(file, this.entryDir) ? true : is),
                false
            )

            // debugger

            if (isChangedEntryFile || changedFiles.length === 0) {
                try {
                    log.info(colors.green('run doc datas generator ...'))
                    const start = new Date()
                    docDatasGenerator(this.entry, this.output, this.codesOutput)
                    const end = new Date()
                    log.info(
                        colors.green(`doc datas generator finish, using ${(end - start) / 1000}s.`)
                    )
                } catch (e) {
                    log.error(e)
                }
            }

            this.prevTimestamps = compilation.fileTimestamps
        })
    }
}

function assignOption(option, message) {
    if (_.isString(option) && (option = _.trim(option))) {
        return option
    } else {
        pushError(message)
    }
}

function getAbsolutePath(globPath) {
    return path.resolve(appRoot.toString(), globPath.split('/').join(path.sep))
}

function pushError(message) {
    throw new Error(message)
}

function isInDir(file, dir) {
    return file.indexOf(dir + path.sep) === 0
}
