const _ = require('lodash')
const fs = require('fs-extra')
const path = require('path')
const glob = require('glob')
const yaml = require('js-yaml')
const matter = require('gray-matter')
const weblog = require('webpack-log')
const colors = require('ansi-colors')
const chokidar = require('chokidar')
const parseDemos = require('./parse-demos')
const utils = require('./utils')
const log = weblog({ name: 'doc-parser' })

const config = require('./load-config')()

function parse(config) {
    const data = {}

    const fragmentWatchers = {}
    const demoWatchers = {}

    _.forEach(config.documents, parseFragment)

    write()

    function parseFragment(pattern, name) {
        const files = glob.sync(pattern)

        if (pattern.endsWith('.yaml')) {
            data[name] = parser.yaml(files[0])
        } else {
            data[name] = parser.docs(files)
            watchDemos(data[name], name)
        }

        watchFragment(pattern, name)
    }

    function watchFragment(pattern, name) {
        if (!config.watch || fragmentWatchers[name]) {
            return
        }

        const watcher = chokidar.watch(pattern, {
            ignoreInitial: true,
        })
        ;['add', 'change', 'unlink'].forEach(eventName => {
            watcher.on(eventName, () => {
                parseFragment(pattern, name)
                write(name)
            })
        })

        fragmentWatchers[name] = watcher
    }

    function watchDemos(docs, fragmentName) {
        if (!config.watch) {
            return
        }

        if (Array.isArray(docs)) {
            docs.forEach(doc => {
                _.forEach(doc.demos, demo => {
                    watchDemo(demo, doc, fragmentName)
                })
            })
        } else {
            _.forEach(docs, docs => watchDemos(docs, fragmentName))
        }
    }

    function watchDemo(demo, doc, fragmentName) {
        const watcherId = `${fragmentName}.${doc.name}.${demo.name}`

        if (!config.watch || demoWatchers[watcherId]) {
            return
        }

        const watcher = chokidar.watch(demo.path)
        ;['change', 'unlink'].forEach(eventName => {
            watcher.on(eventName, () => {
                const newDoc = parser.doc(doc.path)

                updateDoc(data[fragmentName], newDoc)
                write(fragmentName)

                if (eventName === 'unlink') {
                    watcher.close()
                    demoWatchers[watcherId] = undefined
                }
            })
        })

        demoWatchers[watcherId] = watcher
    }

    function updateDoc(fragment, doc) {
        if (Array.isArray(fragment)) {
            const index = _.findIndex(fragment, ['name', doc.name])

            if (index !== -1) {
                fragment[index] = doc
            }
        } else {
            _.forEach(fragment, docs => updateDoc(docs, doc))
        }
    }

    function write(fragmentName) {
        if (fragmentName) {
            writer.fragment(data[fragmentName], fragmentName, config)
        } else {
            _.forEach(data, (fragment, fragmentName) => {
                writer.fragment(fragment, fragmentName, config)
            })
        }

        writer.index(data, config)
    }
}

const writer = {
    $indexCache: undefined,
    $docsCache: {},
    $demosCache: {},

    fragment(fragment, fragmentName, config) {
        // yaml file content reading to index file.
        if (fragment.$isConfig) {
            return
        } else {
            writer.docs(fragment, fragmentName, config)
        }
    },

    docs(docs, fragmentName, config) {
        if (Array.isArray(docs)) {
            docs.forEach(doc => writer.doc(doc, fragmentName, config))
        } else {
            _.forEach(docs, docs => writer.docs(docs, fragmentName, config))
        }
    },

    doc(doc, fragmentName, config) {
        const cacheKey = `${fragmentName}.${doc.name}`

        if (_.isEqual(writer.$docsCache[cacheKey], doc)) {
            return
        }

        writer.$docsCache[cacheKey] = _.cloneDeep(doc)

        doc = _.cloneDeep(doc)

        _.forEach(doc.demos, (demo, key) => {
            writer.demo(demo, doc.name, fragmentName, config)

            doc.demos[key] = _.pick(demo, ['name'])
        })

        fs.outputJsonSync(
            path.join(config.outputs.documents, `${fragmentName}/${doc.name}.json`),
            doc,
            { spaces: 4 }
        )
    },

    demo(demo, docName, fragmentName, config) {
        const cacheKey = `${fragmentName}.${docName}.${demo.name}`

        if (writer.$demosCache[cacheKey] === demo.hash) {
            return
        }

        writer.$demosCache[cacheKey] = demo.hash

        fs.outputFileSync(
            path.join(config.outputs.demos, `${fragmentName}/${docName}/${demo.name}.jsx`),
            demo.code,
            'utf8'
        )
    },

    index(data, config) {
        // create index data
        const index = {}

        _.forEach(data, (fragment, fragmentName) => {
            if (fragment.$isConfig) {
                index[fragmentName] = indexYaml(fragment)
            } else {
                index[fragmentName] = indexDocs(fragment)
            }
        })

        if (_.isEqual(writer.$indexCache, index)) {
            return
        }

        // write index file
        writer.$indexCache = index
        fs.outputJsonSync(path.join(config.outputs.documents, 'index.json'), index, { spaces: 4 })

        function indexYaml(config) {
            return _.cloneDeep(config)
        }

        function indexDocs(docs) {
            let index

            if (Array.isArray(docs)) {
                index = docs.map(doc => _.pick(doc, ['name', 'displayName']))
            } else {
                index = {}

                _.forEach(docs, (docs, groupName) => {
                    index[groupName] = indexDocs(docs)
                })
            }

            return index
        }
    },
}

const parser = {
    yaml(filePath) {
        const content = fs.readFileSync(filePath, 'utf8')
        return _.assign(yaml.safeLoad(content), {
            $isConfig: true,
        })
    },

    docs(files) {
        let docs = _.compact(files.map(file => parser.doc(file)))

        if (_.find(docs, 'group')) {
            docs = _.groupBy(docs, 'group')
        }

        return docs
    },

    doc(docPath) {
        const str = fs.readFileSync(docPath, 'utf8')

        // generate doc data
        const { content, data } = matter(str)

        if (!data.name) {
            log.error(
                colors.red(
                    `document file [.${utils.relativePath(
                        docPath
                    )}] need add a \`name\` prop in front-matter.`
                )
            )
            return undefined
        }

        if (!data.displayName) {
            log.error(
                colors.red(
                    `document file [${utils.relativePath(
                        docPath
                    )}] need add a \`displayName\` prop in front-matter.`
                )
            )
            return undefined
        }

        const doc = _.assign(data, {
            text: content,
            path: docPath,
        })

        _.assign(doc, parseDemos(doc.text, doc.name, docPath))

        return doc
    },
}

if (config) {
    parse(config)
}
