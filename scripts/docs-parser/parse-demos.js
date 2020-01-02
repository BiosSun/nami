const path = require('path')
const fs = require('fs-extra')
const outdent = require('outdent')
const babel = require('@babel/core')
const weblog = require('webpack-log')
const colors = require('ansi-colors')
const utils = require('./utils')

const log = weblog({ name: 'doc-parser/parse-demos' })

const _r_demo = /\{@demo ["'](.*?)["']\}/gm
const _r_demoOnce = /\{@demo ["'](.*?)["']\}/

/**
 * 解析文本片段，从中提取并处理示例代码。
 * @param {string} docText - 文档文本
 * @param {string} docName - 文档名称
 * @param {string} docFile - 文档文件绝对路径
 * @return {object}
 *
 *     - text {string} 处理后的文档内容
 *     - demos {object<id: string, demo: object>} 解析出来的 demo 信息
 */
module.exports = function parseDemos(docText, docName, docPath) {
    let demos = undefined

    if (docText) {
        docText = docText.replace(_r_demo, sn => {
            const match = _r_demoOnce.exec(sn)

            const demoPath = demoFilePath(docPath, match[1])
            const demoText = readDemoFile(demoPath)

            if (!demoText) {
                return ''
            }

            const demo = parseDemo(demoText, demoPath, docName, docPath)

            if (!demo) {
                return ''
            }

            if (!demos) {
                demos = {}
            }

            demos[demo.hash] = demo

            return demo.text
        })
    }

    return { text: docText, demos }
}

/**
 * 解析示例代码
 * @param {string} demoText - 示例文件内容
 * @param {string} demoPath - 示例文件绝对路径
 * @param {object} docName - 所属文档名称
 * @param {string} docPath - 所属文档文件绝对路径
 * @return {[id: string, demo: object]}
 *
 *     示例代码信息：
 *
 *     - name {string} 示例文件名称；
 *     - hash {string} 示例文件内容 hash；
 *     - path {string} 示例文件绝对路径；
 *     - text {string} 需要替换文档中 `@demo` 标记的文本；
 *     - code {string} 经过补全处理后的完整有效的示例代码模块；
 *
 * 若示例代码为空，或不符合要求，则返回 undefined；
 */
function parseDemo(demoText, demoPath) {
    const hash = utils.sha1(demoText)

    const demo = {
        name: path.basename(demoPath, path.extname(demoPath)),
        hash: hash,
        path: demoPath,

        code: demoCodeCompleter(demoText),
        text: outdent`
            \`\`\` demo.${hash}
            ${demoText}
            \`\`\`
        `,
    }

    return demo
}

/**
 * 将示例代码转换为完整有效的代码模块，该代码模块将导出一个函数组件
 * @param {string} demoCode - 示例代码
 * @return {string} 一段完整有效的代码模块文本
 */
function demoCodeCompleter(code) {
    const result = babel.transform(code, {
        babelrc: false,
        parserOpts: {
            sourceType: 'module',
            plugins: ['jsx', 'classProperties'],
        },
        plugins: [path.join(__dirname, 'babel-plugin-demo-code.js')],
    })

    return result.code
}

/**
 * 获取示例文件的绝对路径
 * @param {string} docPath - 引入此 Demo 的文档文件的绝对路径
 * @param {string} demoPath - demo 文件路径，相对于 docPath 的相对路径
 */
function demoFilePath(docPath, demoPath) {
    return path.resolve(path.dirname(docPath), demoPath)
}

/**
 * 读取示例代码
 * @param {string} demoPath - demo 文件的绝对路径
 * @return {string} 代码文件内容
 */
function readDemoFile(demoPath) {
    let str = ''

    try {
        str = fs.readFileSync(demoPath, 'utf8')

        if (str === null) {
            str = ''
            log.warn(colors.yellow(`Demo file "${demoPath}" not found.`))
        }
    } catch (e) {
        log.warn(colors.yellow(`Demo file "${demoPath}" not found.`))
    }

    return str.trim() || undefined
}
