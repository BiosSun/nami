const fs = require('fs-extra')
const path = require('path')
const appRoot = require('app-root-path')
const docDatasGenerator = require('./doc-datas-generator')

function getAbsolutePath(globPath) {
    return path.resolve(appRoot.toString(), globPath.split('/').join(path.sep))
}

const args = [].concat(process.argv)

const codesOutput = getAbsolutePath(args.pop())
const output = getAbsolutePath(args.pop())
const entry = getAbsolutePath(args.pop())

console.log('args: ' + JSON.stringify({ entry, output, codesOutput }, null, 4))

if (!fs.pathExistsSync(entry)) {
    throw new Error(`The 'entry' is does not exists.`)
}

fs.ensureDirSync(output)
fs.ensureDirSync(codesOutput)

docDatasGenerator(entry, output, codesOutput)
