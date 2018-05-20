const _ = require('lodash')
const path = require('path')
const appRoot = require('app-root-path')
const fs = require('fs-extra')
const outdent = require('outdent')
const babel = require('babel-core')
const crypto = require('crypto')
const weblog = require('webpack-log')
const colors = require('ansi-colors')

const log = weblog({ name: 'doc-datas-generator/demo-code-parser' })

module.exports = function demoParser(data) {
    const components = data.components

    _.forEach(components, component => {
        component.text = parse(component.text, component)

        if (component.examples) {
            component.examples.forEach(example => {
                example.text = parse(example.text, component)
            })
        }
    })
}

const _r_demoCode = /\{\@demo ["'](.*?)["']\}/gm
const _r_demoCodeOnce = /\{\@demo ["'](.*?)["']\}/

/**
 * 解析文本片段，从中提取并处理示例代码。
 * 提取的示例代码将被放到 component.codes 对象中，key 为示例代码的 id，value 为示例代码信息。
 */
function parse(text, component) {
    if (!text) {
        return text
    }

    text = text.replace(_r_demoCode, sn => {
        const match = _r_demoCodeOnce.exec(sn)

        const demoCodeFile = match[1]
        const demoCodeStr = readDemoCode(component.sourceFile, demoCodeFile)

        if (!demoCodeStr) {
            return ''
        }

        const demoCode = parseDemoCode(demoCodeStr, component)

        if (!demoCode) {
            return ''
        }

        demoCode.name = path.basename(demoCodeFile, path.extname(demoCodeFile))

        const demoCodes = (component.codes = component.codes || {})
        demoCodes[demoCode.id] = demoCode

        return demoCode.text
    })

    return text
}

/**
 * 解析示例代码
 * @param {string} code - 示例代码
 * @param {object} component - 该示例代码所属的组件的信息数据
 * @return {object}
 *
 *     示例代码信息：
 *
 *     - id {string} 为该示例代码分配的 ID；
 *     - text {string} 需要替换示例代码的一段 markdown 文本；
 *     - code {string} 原始的示例代码；
 *     - completeCode {string} 经过补全处理后的完整有效的示例代码模块；
 *
 * 若示例代码为空，或不符合要求，则返回 undefined；
 */
function parseDemoCode(code, component) {
    if (!code) {
        return undefined
    }

    const id = component.name + '-' + sha1(code)
    const completeCode = demoCodeCompleter(code)

    const text = outdent`
        \`\`\` demo-${id}
        ${code}
        \`\`\`
    `

    return { id, text, code, completeCode }
}

/**
 * 对给定的字符串进行 sha1 编码
 */
function sha1(str) {
    const hash = crypto.createHash('sha1')
    hash.update(str)
    return hash.digest('hex')
}

/**
 * 将示例代码转换为完整有效的代码模块，该代码模块将导出一个函数组件
 * @param {string} demoCode - 示例代码
 * @return {string} 一段完整有效的代码模块文本
 */
function demoCodeCompleter(demoCode) {
    const result = babel.transform(demoCode, {
        babelrc: false,
        parserOpts: {
            sourceType: 'module',
            plugins: ['jsx'],
        },
        plugins: [path.join(__dirname, 'babel-plugin-demo-code.js')],
    })

    return result.code
}

/**
 * 读取示例代码
 * @param {string} componentFile - 所读取的示例代码所在组件的文件路径（相对于项目根目录的 glob 路径）
 * @param {string} demoFile - 示例代码文件相对于组件文件的 glob 路径
 * @return {string} 代码文件内容
 */
function readDemoCode(componentFile, demoCodeFile) {
    const demoCodeFileAbsolute = path.resolve(
        appRoot.toString(),
        path.dirname(componentFile.split('/').join(path.sep)),
        demoCodeFile.split('/').join(path.sep)
    )

    let demoCode = ''

    try {
        demoCode = fs.readFileSync(demoCodeFileAbsolute, 'utf8')

        if (demoCode === null) {
            log.warn(colors.yellow(`Demo file "${demoCodeFile}" not found。`))
        }
    } catch (e) {
        log.warn(colors.yellow(`Demo file "${demoCodeFile}" not found。`))
    }

    return demoCode.trim()
}
