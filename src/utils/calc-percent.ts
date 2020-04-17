/**
 * 计算百分比
 * @param val - 数值
 * @param total - 总数
 * @return 百分比值，[0, 100]
 */
export function calcPercent(val: number, total: number) {
    const percent = val / (total || 1)
    return Math.min(Math.max(0, percent), 1)
}
