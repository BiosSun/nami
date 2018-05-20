const _ = require('lodash')
const fs = require('fs-extra')
const log = require('fancy-log')
const path = require('path')
const shell = require('shelljs')
const colors = require('ansi-colors')
const appRoot = require('app-root-path')
const outdent = require('outdent')
const loadTSConfig = require('./load-tsconfig')

/**
 * 使用 typedoc 解析源代码并返回生成的文档数据
 *
 * @param {string} entry 入口源文件路径（绝对路径）
 *
 * @return {object}
 *
 *     文档数据：
 *
 *     - original {object} - typedoc 所生成的原始数据；
 *     - components {array<object>} 所有组件信息；
 *     - index {array<object>} 组件索引信息；
 */
module.exports = function(entry) {
    const result = {}

    const outputDir = path.join(appRoot.toString(), 'node_modules', '.tmp')
    const output = path.join(outputDir, '_typedoc.json')

    fs.ensureDirSync(outputDir)

    const typedoc = require('typedoc')

    const typedocOptions = Object.assign({}, loadTSConfig(), {
        module: 'commonjs',
        target: 'es5',
        exclude: '**/node_modules/**/*.*',
        experimentalDecorators: true,
    })

    const typedocApp = new typedoc.Application(typedocOptions)
    const src = typedocApp.expandInputFiles([entry])
    const project = typedocApp.convert(src)

    if (project) {
        typedocApp.generateJson(project, output)
    }

    result.original = fs.readJsonSync(output, 'utf8')
    result.components = extractComponents(result.original)
    result.index = extractComponentsIndex(result.components)

    return result
}

/**
 * 解析 typedoc 生成的 json 数据，从中提取出所有的组件信息
 *
 * @param {object} original - typedoc 所生成的 json 数据
 *
 * @return {array<object>}
 *
 *     所有组件的信息：
 *
 *     - name {string} 组件名称；
 *     - displayName {string} 组件的显示名称；
 *     - groupName {string} 组件所属分组名称；
 *     - parentComponentName {string} 组件所属父组件；
 *     - sourceFile {string} 该组件所对应的源代码文件的路径（相对于项目根目录的 glob 路径）；
 *
 *     - text {string} 组件描述（markdown）；
 *     - props {array<object>} 组件参数；
 *         - name {string} 属性名称；
 *         - text {string} 属性描述；
 *         - default {string} 属性的默认值；
 *         - type {object} 属性类型；
 *             - type {string} 该类型所属类别；
 *             - name {string} 类型名称；
 *         - flags {object} 组件标记；
 *             - isPrivate {boolean} 该属性是否是私有的；
 *             - isOptional {boolean} 该属性是否是可选的；
 *
 *     - subComponents {array<object>} 该组件下的子组件；
 */
function extractComponents(original) {
    const components = _.chain(original)
        .get('children')
        .sortBy('id')
        .map(module => {
            const _module = _.chain(module)

            const component = getComponentDefinition(_module)

            if (!component) {
                return undefined
            }

            const _compt = _.chain(component)
            const _props = _.chain(getComponentPropDefinition(_module, component.name) || {})

            const name = component.name
            const displayName = findTag(_compt, 'displayname')
            const groupName = findTag(_compt, 'group')
            const parentComponentName = findTag(_compt, 'parent')

            return {
                name,
                displayName,
                groupName,
                parentComponentName,

                sourceFile: path
                    .relative(appRoot.toString(), module.originalName)
                    .split(path.sep)
                    .join('/'),

                text: getDescription(_compt),

                props: _props
                    .get('children')
                    .sortBy(['id'])
                    .map(prop => ({
                        name: prop.name,
                        text: getDescription(_.chain(prop)),
                        default: findTag(_.chain(prop), 'default'),
                        type: prop.type,
                        flags: prop.flags,
                    }))
                    .value(),

                examples: getExamples(_compt),
            }
        })
        .compact()
        .value()

    // 提取所有子组件，并将其放到其所属父组件的 subComponents 属性中
    _.remove(components, component => component.parentComponentName).forEach(sub => {
        const parent = _.find(components, ['name', sub.parentComponentName])
        const subs = (parent.subComponents = parent.subComponents || [])

        subs.push(sub)
    })

    return components
}

/**
 * 生成组件索引数据
 *
 * @param {array<object>} components - 解析出来的所有组件信息；
 *
 * @return {object}
 *
 *     组件索引数据：
 *
 *     [groupName: string]: ComponentIndexInfo
 *
 *
 *     ComponentIndexInfo:
 *
 *     - name {string} 组件名称；
 *     - displayName {string} 组件的显示名称；
 *     - groupName {string} 组件所属分组名称；
 *     - parentComponentName {string} 组件所属父组件；
 *     - subComponents {array<ComponentIndexInfo>} 子组件的索引信息；
 */
function extractComponentsIndex(components) {
    const generateComponentIndex = component => ({
        name: component.name,
        displayName: component.displayName,
        groupName: component.groupName,
        parentComponentName: component.parentComponentName,
        subComponents: component.subComponents
            ? component.subComponents.map(generateComponentIndex)
            : undefined,
    })

    return _.chain(components)
        .map(generateComponentIndex)
        .groupBy('groupName')
        .value()
}

/**
 * 从一个模块定义中找到其所有组件定义
 * NOTE: 一个模块文件中只能定义一个组件
 */
function getComponentDefinition(_module) {
    return _module
        .get('children')
        .find(target => hasTag(_.chain(target), 'component'))
        .value()
}

/**
 * 从一个模块定义中找到某个组件所对应的 Props 定义
 * NOTE: 组件对应的 Props 应当与组件一起定义在同一个模块文件中
 */
function getComponentPropDefinition(_module, componentName) {
    const targetName = componentName + 'Props'

    return _module
        .get('children')
        .find(target => target.name === targetName)
        .value()
}

/**
 * 检查一个 typedoc 解析出来的原始对象数据中是否包含指定的 tag
 * @param {LodashChain<object>} _target 原始对象数据，经过 lodash.chain 封装；
 * @param {string} tagName tag 的名称；
 * @return {boolean} 原始对象数据中是否包含所指定的 tag；
 */
function hasTag(_target, tagName) {
    let tag = _target
        .get('comment.tags')
        .find(info => info.tag === tagName)
        .value()

    return !!tag
}

/**
 * 从一个 typedoc 解析出来的原始对象数据中查找某个 tag 的值
 * @param {LodashChain<object>} _target 原始对象数据，经过 lodash.chain 封装；
 * @param {string} tagName 需查找的 tag 的名称；
 * @param {boolean} [isTrim=true] 是否自动清除每个值的首尾空白字符；
 * @return {string} tag 的值。
 */
function findTag(_target, tagName, isTrim = true) {
    let finder = _target
        .get('comment.tags')
        .find(info => info.tag === tagName)
        .get('text')

    if (isTrim) {
        finder = finder.trim()
    }

    return finder.value()
}

/**
 * 从一个 typedoc 解析出来的原始对象数据中查找某个 tag 的多个值
 * @param {LodashChain<object>} _target 原始对象数据，经过 lodash.chain 封装；
 * @param {string} tagName 需查找的 tag 的名称；
 * @param {boolean} [isTrim=true] 是否自动清除每个值的首尾空白字符；
 * @return {string[]} tag 的多个值。
 */
function findTags(_target, tagName, isTrim = true) {
    const tags = _target
        .get('comment.tags')
        .filter(info => info.tag === tagName)
        .map(info => (isTrim ? _.trim(info.text) : info.text))
        .value()

    return tags.length ? tags : undefined
}

function trimMText(str) {
    return outdent.string(_.isString(str) ? str : '').trim()
}

/**
 * 从一个typedoc 解析出来的原始对象数据中获取模块描述。
 * @param {LodashChain<object>} 原始对象数据，经过 lodash.chain 封装；
 * @return {string}
 */
function getDescription(_target) {
    const shortText = trimMText(_target.get('comment.shortText').value())
    const text = trimMText(_target.get('comment.text').value())
    const descriptionTag = trimMText(findTag(_target, 'description', false))

    return _([shortText, text, descriptionTag])
        .join('\n\n')
        .trim()
}

/**
 * 从一个typedoc 解析出来的原始对象数据中获取模块示例。
 * @param {LodashChain<object>} 原始对象数据，经过 lodash.chain 封装；
 * @return {array<object>}
 *
 *   对象示例内容，每个 object 中包含如下两个属性：
 *
 *   - title {string} 示例标题
 *   - text {string} 示例内容
 */
function getExamples(_target) {
    const examples = findTags(_target, 'example', false)

    if (examples) {
        return examples.map(example => {
            const lines = example.split('\n')

            let title = lines.shift().trim()
            let text = trimMText(lines.join('\n'))

            if (title[0] === '-') {
                title = title.substring(1).trim()
            }

            return { title, text }
        })
    } else {
        return undefined
    }
}
