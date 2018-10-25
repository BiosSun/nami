import colorString from 'color-string'
import colorConvert from 'color-convert'
import clamp from './clamp'
import log from './log'

/**
 * 用于存储单个颜色值的不可变对象。
 * 并提供修改颜色值（将创建新的对象实例）及格式化等相关功能。
 */
export default class Color {
    // 内部以 HSV 格式的值为基准值，因为 nami 中的颜色组件基本都是修改色相、饱和度及明度，因此用 HSV 格式会方便很多
    private hsv: ColorValue

    // 该色值是否有效
    // 当色值无效时，format, h, s, v 及 a 等其它属性的值都是 undefined，此类的实例方法无法调用。
    valid: boolean

    // 原始格式
    model: ColorModel

    constructor(color: string | Color) {
        // clone
        if (color instanceof Color) {
            this.hsv = { ...color.hsv }
            this.valid = color.valid
            this.model = color.model

            return this
        }

        // parse
        const [value, model, isValid] = parser.get(color)

        if (!isValid) {
            this.valid = false
        } else {
            this.model = model
            this.hsv = parser.convert(value, model, 'hsv')
        }
    }

    // 色相值，[0, 360]，浮点数将被四舍五入到最接近的整数，区间外的值将被回退到最近的边界值；
    setHue(h: number) {
        return this.setHsvValue(0, clamp(Math.round(h), 0, 360))
    }

    getHue() {
        return this.hsv[0]
    }

    // 饱和度，[0, 100]；
    setSaturation(s: number) {
        return this.setHsvValue(1, clamp(Math.round(s), 0, 100))
    }

    getSaturation() {
        return this.hsv[1]
    }

    // 明度，[0, 100]；
    setValue(v: number) {
        return this.setHsvValue(2, clamp(Math.round(v), 0, 100))
    }

    getValue() {
        return this.hsv[2]
    }

    // 不透明度，[0, 1]，保留小数点后两位；
    setAlpha(a: number) {
        return this.setHsvValue(3, clamp(Math.round(a * 100) / 100, 0, 1))
    }

    getAlpha() {
        return this.hsv[3]
    }

    /**
     * 按指定的格式对色值进行格式化
     */
    toString(model: ColorModel): string {
        return parser.to(this.hsv, 'hsv', model)
    }

    /**
     * 修改内部 HSV 值中的某个单值
     */
    private setHsvValue(index: number, newValue: number): Color {
        if (!this.valid) {
            log.warning('Cannot set property of invalid color.')
            return this
        } else if (this.hsv[index] === newValue) {
            return this
        } else {
            const newColor = new Color(this)
            newColor.hsv[index] = newValue

            return newColor
        }
    }
}

type ColorModel = 'hex' | 'rgb' | 'hsl' | 'hsv'

type InnerColorModel = 'rgb' | 'hsl' | 'hsv'

type ColorValue = [number, number, number, number]

const parser = {
    /**
     * 解析一个颜色字符串
     * @param str - 颜色字符串
     * @return 一份元组数据，第一个值表示颜色是否有效，第二个值表示颜色模式，第三个值为颜色解析数值
     */
    get(str: string): [ColorValue, ColorModel, boolean] {
        let isValid: boolean = false
        let model: ColorModel = undefined
        let value: ColorValue = undefined

        let info = colorString.get(str) || this._getHsv(str)

        if (info && info.model !== 'hwb') {
            isValid = true
            model = info.model
            value = info.value

            if (model === 'rgb' && str[0] === '#') {
                model = 'hex'
            }
        }

        return [value, model, isValid]
    },

    /**
     * 将某个格式的颜色值转换为另一种格式的值
     */
    convert(value: ColorValue, from: ColorModel, to: ColorModel): ColorValue {
        const innerFrom = toInnerColorModel(from)
        const innerTo = toInnerColorModel(to)

        if (innerFrom === innerTo) {
            return [...value] as ColorValue
        } else {
            const colorValue = value.slice(0, -1)
            const alphaValue = value[value.length - 1]

            const convertedColorValue = (colorConvert as any)[innerFrom][innerTo](colorValue as [
                number,
                number,
                number
            ])
            const convertedValue = convertedColorValue.concat(alphaValue)

            return convertedValue
        }
    },

    /**
     * 序列化颜色信息
     * @param info - 待序列化的颜色信息
     * @param to - 目标格式
     */
    to(value: ColorValue, from: ColorModel, to: ColorModel): string {
        const convertedValue = this.convert(value, from, to)
        return to === 'hsv' ? this._toHsv(value) : (colorString.to as any)[to](convertedValue)
    },

    /**
     * 解析 HSV 格式的颜色字符串
     */
    _getHsv(str: string) {
        if (!str) {
            return null
        }

        const hsv = /^hsva?\(\s*([+-]?(?:\d*\.)?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/
        const match = str.match(hsv)

        if (match) {
            const alpha = parseFloat(match[4])
            const h = (parseInt(match[1], 10) + 360) % 360
            const s = clamp(parseInt(match[2], 10), 0, 100)
            const v = clamp(parseInt(match[3], 10), 0, 100)
            const a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1)

            return {
                model: 'hsv',
                value: [h, s, v, a],
            }
        }

        return null
    },

    /**
     * 格式化 HSV 格式的颜色字符串
     */
    _toHsv(value: ColorValue): string {
        return value.length < 4 || value[3] === 1
            ? `hsv(${value[0]}, ${value[1]}%, ${value[2]}%)`
            : `hsva(${value[0]}, ${value[1]}%, ${value[2]}%, ${value[3]})`
    },
}

function toInnerColorModel(model: ColorModel): InnerColorModel {
    if (model === 'hex') {
        model = 'rgb'
    }

    return model
}
