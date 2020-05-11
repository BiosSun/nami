import React, { createContext, FunctionComponent, useContext, useState } from 'react'
import Color, { ColorInfo, ColorFormat, formatToModel } from '@biossun/color'
import { useUpdateEffect, useRefState } from '../../hooks'

// 对外的参数类型
type Value = string
type OnChange = (value: Value) => void

interface InnerColorState {
    value: ColorInfo
    normalizedValue: ColorInfo
    format: ColorFormat
}

// 对内的数据类型
interface ContextValue extends InnerColorState {
    onChange: (value: ColorInfo) => void
}

// 内部使用 React Context 通信
const ColorPickerContext = createContext<ContextValue>(null)

// 默认颜色值
const DEFAULT_COLOR = 'hsl(0, 100%, 50%)'

function parseInnerColor(value: string, currentColor?: InnerColorState) {
    let colorInfo = Color.parse(value)

    if (__DEV__) {
        if (value && colorInfo === null) {
            console.error(
                `Color ${value} is invalid, will be to use defalut color ${DEFAULT_COLOR}.`
            )
        }
    }

    if (colorInfo === null) {
        colorInfo = Color.parse(DEFAULT_COLOR)
    }

    const format = colorInfo.format

    if (Color.isEqual(colorInfo, currentColor?.value)) {
        if (format === currentColor.format) {
            return currentColor
        } else {
            return {
                value: currentColor.value,
                normalizedValue: currentColor.normalizedValue,
                format: format,
            }
        }
    }

    colorInfo = Color.convert(colorInfo, 'hsv')

    const normalizedColorInfo = Color.normalize(colorInfo)

    const nh = Color.get(normalizedColorInfo, 'hue')
    const ns = Color.get(normalizedColorInfo, 'saturationv')
    const nv = Color.get(normalizedColorInfo, 'value')
    const cnh = Color.get(currentColor?.normalizedValue ?? null, 'hue')
    const cs = Color.get(currentColor?.value, 'saturationv')
    const ch = Color.get(currentColor?.value, 'hue')

    if (nh === 0 && cnh > 180) {
        colorInfo = Color.set(colorInfo, 'hue', 360)
    }

    if (nh === cnh) {
        colorInfo = Color.set(colorInfo, 'hue', ch)
    }

    if (nh === 0 && ns === 0 && ch > 0) {
        colorInfo = Color.set(colorInfo, 'hue', ch)
    }

    if (nv === 0 && cs) {
        colorInfo = Color.set(colorInfo, 'saturationv', cs)
    }

    return {
        value: colorInfo,
        normalizedValue: normalizedColorInfo,
        format,
    }
}

type ColorPickerBaseProps = {
    value?: Value
    defaultValue?: Value
    onChange?: OnChange
}

export const ColorPickerBase: FunctionComponent<ColorPickerBaseProps> = ({
    value,
    defaultValue,
    onChange,
    children,
}) => {
    const model = useColor(value, defaultValue, onChange)
    return <ColorPickerContext.Provider value={model}>{children}</ColorPickerContext.Provider>
}

export function useColor(value: Value, defaultValue?: Value, onChange?: OnChange): ContextValue {
    let context = useContext(ColorPickerContext)

    // NOTE 在组件的整个生命周期中，要么是作为 ColorPickerBase 的子元素，要么独立存在，不会在这两种状态之间切换，
    //      因此作为子元素时，这里可以直接返回，下面的 hooks 不会被调用到。
    if (context) {
        return context
    }

    const [controlled] = useState(value !== undefined)

    const [innerColorRef, setInnerColor] = useRefState<InnerColorState>(() =>
        parseInnerColor(controlled ? value : defaultValue, null)
    )

    useUpdateEffect(() => {
        setInnerColor(parseInnerColor(value, innerColorRef.current))
    }, [controlled ? value : undefined])

    function handleChange(value: ColorInfo): void {
        if (__DEV__) {
            if (value.state !== 'raw') {
                console.error(
                    "in useColor's onChange, the `value` argument best be a raw color info."
                )
            }
        }

        if (value.model !== 'hsv') {
            value = Color.convert(value, 'hsv')
        }

        const color = {
            value,
            normalizedValue: Color.normalize(value),
            format: innerColorRef.current.format,
        }

        setInnerColor(color)

        const result = Color.format(
            Color.normalize(Color.convert(color.value, formatToModel[color.format], color.format))
        )

        onChange?.(result)
    }

    return {
        value: innerColorRef.current.value,
        normalizedValue: innerColorRef.current.normalizedValue,
        format: innerColorRef.current.format,
        onChange: handleChange,
    }
}
