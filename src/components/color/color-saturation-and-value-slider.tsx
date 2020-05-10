import React, { HTMLAttributes, FunctionComponent, useRef, RefObject } from 'react'
import clsx from 'clsx'
import { useSlider } from '../../hooks'
import { LinearItemProps } from '../linear'
import Color from '@biossun/color'
import { useColor } from './color-picker-base'

type Props = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> &
    LinearItemProps & {
        // 颜色值
        value?: string

        // 默认颜色值
        defaultValue?: string

        // 新的颜色值
        onChange?: (value: string) => void
    }

export const ColorSaturationAndValueSlider: FunctionComponent<Props> = ({
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

        onChange({ px, py }) {
            let { value, onChange } = model

            value = Color.set(value, 'saturationv', px * 100)
            value = Color.set(value, 'value', (1 - py) * 100)

            onChange(value)
        },
    })

    const h = Color.round.hue(Color.get(model.value, 'hue'))
    const s = Color.round.saturationv(Color.get(model.value, 'saturationv'))
    const v = Color.round.value(Color.get(model.value, 'value'))

    style = {
        ...style,
        backgroundColor: `hsl(${h}, 100%, 50%)`,
    }

    const hsl = Color.format(Color.set(model.value, 'alpha', 1), 'hsl')

    return (
        <div
            className={clsx(
                'nami-color__slider',
                'nami-color__slider--panel',
                'nami-color__saturation-and-value-slider',
                { 'nami-color__slider--sliding': slider.sliding },
                className
            )}
            style={style}
            {...otherProps}
            ref={slider.ref as RefObject<HTMLDivElement>}
        >
            <div className="nami-color__slider__knob-bar" ref={knobBarRef}>
                <div
                    role="slider"
                    className="nami-color__slider__knob"
                    style={{
                        left: `${s}%`,
                        top: `${100 - v}%`,
                        backgroundColor: hsl,
                    }}
                />
            </div>
        </div>
    )
}
