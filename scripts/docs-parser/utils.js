const path = require('path')
const appRoot = require('app-root-path')
const crypto = require('crypto')

module.exports = {
    /**
     * 获取一个绝对路径相对于 appRoot 的相对路径
     */
    relativePath: function(file) {
        return '.' + path.sep + path.relative(appRoot.toString(), file)
    },

    /**
     * 将一个目录的相对路径（固定使用 / 作为分隔符）转换为绝对路径
     */
    absoluteDir: function(dir) {
        return path.join(appRoot.toString(), dir.split('/').join(path.sep))
    },

    /**
     * 计算所给定的字符串的 sha1 编码
     */
    sha1: function(str) {
        const hash = crypto.createHash('sha1')
        hash.update(str)
        return hash.digest('hex').slice(0, 8)
    },
}
