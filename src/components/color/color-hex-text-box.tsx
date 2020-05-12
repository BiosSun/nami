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

export const ColorHexTextBox: FunctionComponent<Props> = ({
    value,
    defaultValue,
    onChange,
    className,
    ...otherProps
}) => {
    const model = useColor(value, defaultValue, onChange)
    const [hex, setHex] = useState('')
    const [focused, focus, blur] = useToggle(false)

    useEffect(() => {
        if (!focused) {
            setHexWith(model.value)
        }
    }, [model.value])

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { value } = event.target
        setHex(value)

        const color = getChangedColorBy(value)
        if (color) {
            model.onChange(color)
        }
    }

    function handleBlur(event: FocusEvent<HTMLInputElement>) {
        blur()

        const color = getChangedColorBy(event.target.value)

        if (color !== null) {
            setHexWith(color)
        } else {
            setHexWith(model.value)
        }
    }

    function setHexWith(color: ColorInfo) {
        const stripAlpahValue = Color.set(color, 'alpha', undefined)
        const rgbValue = Color.convert(stripAlpahValue, 'rgb', 'hex')
        const normalizedRGBValue = Color.normalize(rgbValue)
        const hex = Color.format(normalizedRGBValue).toUpperCase()

        setHex(hex)
    }

    function getChangedColorBy(value: string): ColorInfo {
        value = value.trim()

        if (value[0] !== '#') {
            value = '#' + value
        }

        if (value.length !== 4 && value.length !== 7) {
            return null
        }

        return Color.set(Color.parse(value), 'alpha', model.value.alpha)
    }

    return (
        <VLinear
            className={clsx('nami-color__text-box', 'nami-color__hex-text-box', className)}
            {...otherProps}
        >
            <input
                className="nami-color__text-box__input"
                value={hex}
                onFocus={focus}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            <span className="nami-color__text-box__label">Hex</span>
        </VLinear>
    )
}
