const _ = require('lodash')
const fs = require('fs-extra')
const path = require('path')

const caches = {}

/**
 * 将文档数据写入指定的目录中
 *
 * @param {object} data 文档数据
 * @param {string} output 数据写入目录路径（绝对路径）
 */
module.exports = function writer(data, outputDir, codesOutputDir) {
    originalWriter(data.original, outputDir) // TODO 不创建原始数据文件应该能提高执行效率，因为原始数据文件会很大
    componentsWriter(data.components, outputDir)
    codesWriter(data.components, codesOutputDir)
    componentsIndexWriter(data.index, outputDir)
}

function originalWriter(original, outputDir) {
    const output = path.join(outputDir, '_typedoc.json')
    outputJson(output, original)
}

function componentsWriter(components, outputDir) {
    components.forEach(component => {
        const output = path.join(outputDir, 'components', component.name + '.json')
        outputJson(output, component)
    })
}

function componentsIndexWriter(index, outputDir) {
    const output = path.join(outputDir, 'components', 'index.json')
    outputJson(output, index)
}

function codesWriter(components, outputDir) {
    components.forEach(component => {
        _.forEach(component.codes, code => {
            const output = path.join(outputDir, code.id + '.jsx')
            outputFile(output, code.completeCode)
        })
    })
}

function outputJson(path, val) {
    if (_.isEqual(val, caches[path])) {
        return
    }

    caches[path] = _.cloneDeep(val)

    fs.outputJsonSync(path, val, { spaces: 4 })
}

function outputFile(path, str) {
    if (caches[path] === str) {
        return
    }

    caches[path] = str

    fs.outputFileSync(path, str, 'utf8')
}
