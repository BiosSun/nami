import React, { HTMLAttributes, FunctionComponent } from 'react'
import clsx from 'clsx'

import { HLinear, VLinear, LinearItemProps } from '../linear'

import { ColorPickerBase } from './color-picker-base'
import { ColorSaturationAndValueSlider } from './color-saturation-and-value-slider'
import { ColorAlphaSlider } from './color-alpha-slider'
import { ColorHueSlider } from './color-hue-slider'
import { ColorScreen } from './color-screen'
import { ColorHexTextBox } from './color-hex-text-box'
import { ColorAlphaTextBox } from './color-alpha-text-box'
import { ColorChannelsTextBox } from './color-channels-text-box'
import { Space } from '../space'

type Props = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> &
    LinearItemProps & {
        // 颜色值
        value?: string

        // 默认颜色值
        defaultValue?: string

        // 颜色值改变后的回调
        onChange?: (value: string) => void
    }

export const ColorPicker: FunctionComponent<Props> = ({
    value,
    defaultValue,
    onChange,
    className,
    ...otherProps
}) => {
    return (
        <ColorPickerBase value={value} defaultValue={defaultValue} onChange={onChange}>
            <VLinear className={clsx('nami-color-picker', className)} {...otherProps}>
                <ColorSaturationAndValueSlider />
                <Space />
                <HLinear>
                    <ColorScreen />
                    <Space size="small" />
                    <VLinear $flex>
                        <ColorHueSlider />
                        <Space size="small" />
                        <ColorAlphaSlider />
                    </VLinear>
                </HLinear>
                <Space />
                <HLinear spacing="small">
                    <ColorHexTextBox $col={8} $flex />
                    <ColorChannelsTextBox $col={12} $flex />
                    <ColorAlphaTextBox $col={4} $flex />
                </HLinear>
            </VLinear>
        </ColorPickerBase>
    )
}
