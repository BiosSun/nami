import React, { HTMLAttributes, FunctionComponent, RefObject, useRef } from 'react'
import clsx from 'clsx'
import { useSlider } from '../../hooks'
import { LinearItemProps } from '../linear'
import { useColor } from './color-picker-base'
import Color from '@biossun/color'

type Props = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> &
    LinearItemProps & {
        // 颜色值
        value?: string

        // 默认颜色值
        defaultValue?: string

        // 颜色值改变后的回调
        onChange?: (value: string) => void
    }

export const ColorHueSlider: FunctionComponent<Props> = ({
    value,
    defaultValue,
    onChange,
    className,
    style,
    ...otherProps
}) => {
    const model = useColor(value, defaultValue, onChange)
    const knobBarRef = useRef<HTMLDivElement>(null)

    const slider = useSlider({
        onStart() {
            return knobBarRef.current.getBoundingClientRect()
        },

        onChange({ px }) {
            let { value, onChange } = model
            value = Color.set(value, 'hue', px * 360)
            onChange(value)
        },
    })

    const h = Color.round.hue(Color.get(model.value, 'hue'))

    style = {
        ...style,
        '--value': String(h),
        '--percent': `${(h / 360) * 100}%`,
    }

    return (
        <div
            className={clsx(
                'nami-color__slider',
                'nami-color__hue-slider',
                { 'nami-color__slider--sliding': slider.sliding },
                className
            )}
            style={style}
            {...otherProps}
            ref={slider.ref as RefObject<HTMLDivElement>}
        >
            <div className="nami-color__slider__knob-bar" ref={knobBarRef}>
                <div role="slider" className="nami-color__slider__knob" />
            </div>
        </div>
    )
}
