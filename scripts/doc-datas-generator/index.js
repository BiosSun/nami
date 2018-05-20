const _ = require('lodash')
const parser = require('./parser')
const demoCodeParser = require('./demo-code-parser')
const writer = require('./writer')

/**
 * 解析并生成文档所需数据
 *
 * @param {string} entry 入口源文件路径（绝对路径）
 * @param {string} output 数据写入目录路径（绝对路径）
 * @param {string} codesOutput 示例代码文件的写入目录路径（绝对路径）
 */
module.exports = function(entry, output, codesOutput) {
    const data = parser(entry)

    demoCodeParser(data)
    writer(data, output, codesOutput)
}
