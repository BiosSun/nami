import React, {
    HTMLAttributes,
    FunctionComponent,
    ChangeEvent,
    FocusEvent,
    useEffect,
    useState,
} from 'react'
import clsx from 'clsx'
import Color, { ColorInfo } from '@biossun/color'

import { LinearItemProps, VLinear } from '../linear'
import { useColor } from './color-picker-base'
import { useToggle } from '../../hooks'

type Props = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> &
    LinearItemProps & {
        // 颜色值
        value?: string

        // 默认颜色值
        defaultValue?: string

        // 颜色值改变后的回调
        onChange?: (value: string) => void
    }

export const ColorAlphaTextBox: FunctionComponent<Props> = ({
    value,
    defaultValue,
    onChange,
    className,
    ...otherProps
}) => {
    const model = useColor(value, defaultValue, onChange)
    const [alpha, setAlpha] = useState('')
    const [focused, focus, blur] = useToggle(false)

    useEffect(() => {
        if (!focused) {
            setAlphaWith(model.value)
        }
    }, [model.value])

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { value } = event.target
        setAlpha(value)

        const color = getChangedColorBy(value)
        if (color) {
            model.onChange(color)
        }
    }

    function handleBlur(event: FocusEvent<HTMLInputElement>) {
        blur()

        const color = getChangedColorBy(event.target.value)

        if (color !== null) {
            setAlphaWith(color)
        } else {
            setAlphaWith(model.value)
        }
    }

    function setAlphaWith(color: ColorInfo) {
        let num = Color.get(color, 'alpha') ?? 1
        setAlpha(String(Math.round(Color.normalize.alpha(num) * 100)))
    }

    function getChangedColorBy(value: string): ColorInfo {
        const num = parseInt(value, 10)

        if (isNaN(num)) {
            return null
        }

        return Color.set(model.value, 'alpha', num / 100)
    }

    return (
        <VLinear
            className={clsx('nami-color__text-box', 'nami-color__alpha-text-box', className)}
            {...otherProps}
        >
            <input
                className="nami-color__text-box__input"
                value={alpha}
                onFocus={focus}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            <span className="nami-color__text-box__label">Alpha</span>
        </VLinear>
    )
}
