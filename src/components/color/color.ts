type ColorStringValue = string

type ColorRGBValue = {
    r: number
    g: number
    b: number
}

type ColorRGBAValue = {
    r: number
    g: number
    b: number
    a: number
}

type ColorHSVValue = {
    h: number
    s: number
    v: number
}

type ColorHSVAValue = {
    h: number
    s: number
    v: number
    a: number
}

type ColorHSLValue = {
    h: number
    s: number
    l: number
}

type ColorHSLAValue = {
    h: number
    s: number
    l: number
    a: number
}

type ColorValue =
    | ColorStringValue
    | ColorRGBValue
    | ColorRGBAValue
    | ColorHSVValue
    | ColorHSVAValue
    | ColorHSLValue
    | ColorHSLAValue

export class Color {
    constructor(value: ColorStringValue) {}

    get hsv(): [number, number, number, number] {
        return []
    }
}
