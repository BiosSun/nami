import React, { HTMLAttributes, FunctionComponent } from 'react'
import clsx from 'clsx'
import { useSlide } from '../../hooks'

declare module 'react' {
    interface CSSProperties {
        '--nami-color__hue-slider--value': number
        '--nami-color__hue-slider--percent': string
        '--nami-color__hue-slider--knob-shadow': string | number
    }
}

export type ColorHueSliderProps = HTMLAttributes<HTMLDivElement> & {
    // 色调值 [0, 360]
    value: number

    // 值改变后的回调
    onChange: (value: number) => void
}

export type ColorHueSliderType = FunctionComponent<ColorHueSliderProps>

export const ColorHueSlider: ColorHueSliderType = ({
    value,
    onChange,
    className,
    style,
    ...otherProps
}) => {
    function handleChange(percent: number) {
        onChange(Math.round(360 * percent))
    }

    const slide = useSlide({
        getOffsetInfo,
        onChange: handleChange,
        onFinish: handleChange,
    })

    style = {
        ...style,
        '--nami-color__hue-slider--value': value,
        '--nami-color__hue-slider--percent': `${(value / 360) * 100}%`,
        '--nami-color__hue-slider--knob-shadow':
            40 - (Math.min(Math.abs(value - 60), 30) / 30) * 40 + '%',
    }

    return (
        <div className={clsx('nami-color__hue-slider', className)} style={style} {...otherProps}>
            <div className="nami-color__hue-slider__knob-bar">
                <div className="nami-color__hue-slider__knob" {...slide.handles} />
            </div>
        </div>
    )
}

function getOffsetInfo(event: MouseEvent | TouchEvent) {
    const knobEl = event.target as HTMLDivElement
    const containerEl = knobEl.parentElement

    return {
        maxOffset: containerEl.clientWidth,
        offset: knobEl.offsetLeft,
    }
}
