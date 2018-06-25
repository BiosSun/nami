export function warning(...str: string[]) {
    if (typeof console !== 'undefined') {
        console.error(...str)
    }
}
