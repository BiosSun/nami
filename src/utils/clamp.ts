export default function clamp(n: number, min: number, max: number) {
    return Math.min(Math.max(min, n), max)
}
