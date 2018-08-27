/**
 * 打印一条警告信息
 */
function warning(...str: string[]): void {
    if (typeof console !== 'undefined') {
        console.error(...str)
    }
}

export default { warning }
