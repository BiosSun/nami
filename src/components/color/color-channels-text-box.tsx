import React, {
    HTMLAttributes,
    FunctionComponent,
    ChangeEvent,
    FocusEvent,
    useEffect,
    useState,
    useMemo,
} from 'react'
import clsx from 'clsx'
import Color, { ColorInfo, formatToModel, ColorValue, ColorModel } from '@biossun/color'

import { LinearItemProps, VLinear, HLinear } from '../linear'
import { useColor } from './color-picker-base'
import { useToggle } from '../../hooks'
import { Divider } from '../divider'
import Icon from '../icon'

type Props = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> &
    LinearItemProps & {
        // 颜色值
        value?: string

        // 默认颜色值
        defaultValue?: string

        // 颜色值改变后的回调
        onChange?: (value: string) => void
    }

const MODEL_CHANNELS = {
    rgb: ['R', 'G', 'B'],
    hsl: ['H', 'S', 'L'],
    hsv: ['H', 'S', 'V'],
}

export const ColorChannelsTextBox: FunctionComponent<Props> = ({
    value,
    defaultValue,
    onChange,
    className,
    ...otherProps
}) => {
    const model = useColor(value, defaultValue, onChange)
    const [colorModel, setColorModel] = useState(formatToModel[model.format])
    const [channels, setChannels] = useState<string[]>([])
    const [focused, focus, blur] = useToggle(false)

    useEffect(() => {
        if (!focused) {
            setChannelsWith(Color.round(model.value))
        }
    }, [model.value, colorModel])

    function handleChange(event: ChangeEvent<HTMLInputElement>, index: number) {
        const value = getNewChannel(index, event.target.value)

        setChannels(value)

        const color = getChangedColorBy(value)
        if (color) {
            model.onChange(color)
        }
    }

    function handleBlur(event: FocusEvent<HTMLInputElement>, index: number) {
        blur()

        const color = getChangedColorBy(getNewChannel(index, event.target.value))

        if (color !== null) {
            setChannelsWith(color)
        } else {
            setChannelsWith(model.value)
        }
    }

    function handleColorModelChange(colorModel: ColorModel) {
        if (!MODEL_CHANNELS[colorModel]) {
            return
        }

        setColorModel(colorModel)
    }

    function getNewChannel(index: number, value: string): string[] {
        const newChannel = [...channels]
        newChannel[index] = value
        return newChannel
    }

    function setChannelsWith(color: ColorInfo) {
        setChannels(Color.round(Color.convert(color, colorModel)).value.map(val => String(val)))
    }

    function getChangedColorBy(value: string[]): ColorInfo {
        const nums = new Array(value.length)

        for (let i = 0; i < value.length; i++) {
            const num = parseInt(value[i], 10)

            if (isNaN(num)) {
                return null
            }

            nums[i] = num
        }

        return { ...model.value, model: colorModel, format: colorModel, value: nums as ColorValue }
    }

    return (
        <VLinear
            className={clsx('nami-color__text-box', 'nami-color__channel-text-box', className)}
            {...otherProps}
        >
            <HLinear spacing="small">
                {MODEL_CHANNELS[colorModel].map((name, index) => (
                    <input
                        key={name}
                        $flex
                        className="nami-color__text-box__input"
                        value={channels[index] ?? ''}
                        onFocus={focus}
                        onBlur={event => handleBlur(event, index)}
                        onChange={event => handleChange(event, index)}
                    />
                ))}
            </HLinear>
            <ColorLabelsGroup
                value={colorModel}
                options={MODEL_CHANNELS}
                onChange={handleColorModelChange}
            />
        </VLinear>
    )
}

const ColorLabelsGroup: FunctionComponent<{
    value: ColorModel
    options: { [key in ColorModel]: string[] }
    onChange: (value: ColorModel) => void
}> = function({ value, options, onChange }) {
    const selectedLabels = options[value]

    return (
        <div className="nami-color__labels-group">
            <div className="nami-color__labels-group__header" tabIndex={-1}>
                <span className="nami-color__labels-group__indicator">
                    <Icon name="down" />
                </span>
                <HLinear className="nami-color__labels-group__labels" spacing="small">
                    {selectedLabels.map(name => (
                        <span key={name} $flex className="nami-color__text-box__label">
                            {name}
                        </span>
                    ))}
                </HLinear>
            </div>
            <div className="nami-color__labels-group__options">
                {Object.keys(options).map(key => (
                    <div
                        key={key}
                        className={clsx('nami-color__labels-group__labels', {
                            'nami-color__labels-group__labels--selected': key === value,
                        })}
                        onPointerDown={() => onChange(key as ColorModel)}
                    >
                        {options[key as ColorModel].join('')}
                    </div>
                ))}
            </div>
        </div>
    )
}
