/* eslint-disable react/jsx-key */
import React, { useState } from 'react'

import {
    ColorPicker,
    ColorHueSlider,
    ColorAlphaSlider,
    ColorScreen,
    ColorPickerInnerDebug,
    HLinear,
    ColorSaturationAndValueSlider,
} from '@biossun/nami'
import { DemoStage } from '@biossun/nami/storybook-utils'
import { VLinear } from '../linear'

export default {
    title: 'Color',
    component: ColorPicker,
}

export const common = () => {
    const [color, setColor] = useState<string>('hsl(200, 50%, 50%)')

    return (
        <DemoStage.Area border>
            <VLinear spacing>
                <HLinear spacing="large">
                    <VLinear $col={6}>
                        <span>受控状态</span>
                        <ColorPicker value={color} onChange={setColor}>
                            <ColorPickerInnerDebug />
                        </ColorPicker>
                    </VLinear>
                    <VLinear $col={6}>
                        <span>受控状态</span>
                        <ColorPicker value={color} onChange={setColor}>
                            <ColorPickerInnerDebug />
                        </ColorPicker>
                    </VLinear>
                    <VLinear $col={6}>
                        <span>非受控状态，绑定 onChange</span>
                        <ColorPicker defaultValue={color} onChange={setColor}>
                            <ColorPickerInnerDebug />
                        </ColorPicker>
                    </VLinear>
                    <VLinear $col={6}>
                        <span>非受控状态</span>
                        <ColorPicker $flex defaultValue={color}>
                            <ColorPickerInnerDebug />
                        </ColorPicker>
                    </VLinear>
                </HLinear>
                <span>{color}</span>
            </VLinear>
        </DemoStage.Area>
    )
}

export const colorScreen = () => [
    <DemoStage.Area name="颜色展示模块有大、中、小三种">
        <VLinear spacing>
            {Array(11)
                .fill(0)
                .map((_, index) => (
                    <HLinear align="center" spacing>
                        <ColorScreen
                            value={`hsla(5, 69%, 54%, ${(10 - index) / 10})`}
                            size="large"
                        />
                        <ColorScreen value={`hsla(209, 73%, 58%, ${(10 - index) / 10})`} />
                        <ColorScreen
                            value={`hsla(120, 47%, 46%, ${(10 - index) / 10})`}
                            size="small"
                        />
                    </HLinear>
                ))}
        </VLinear>
    </DemoStage.Area>,
]

function HueSliderStory({ defaultValue, ...otherProps }: { defaultValue: string }) {
    const [value, setValue] = useState(defaultValue)

    return (
        <HLinear align="center" spacing {...otherProps}>
            <ColorHueSlider value={value} onChange={setValue} $flex />
            <span style={{ width: 280 }}>{value}</span>
        </HLinear>
    )
}

function AlphaSliderStory({ defaultValue, ...otherProps }: { defaultValue: string }) {
    const [value, setValue] = useState(defaultValue)

    return (
        <HLinear align="center" spacing {...otherProps}>
            <ColorAlphaSlider value={value} onChange={setValue} $flex />
            <span style={{ width: 280 }}>{value}</span>
        </HLinear>
    )
}

export const hueAndAlphaSlider = () => (
    <HLinear spacing>
        <DemoStage.Area $flex name="用于选择色相">
            <VLinear spacing="small">
                {Array(21)
                    .fill(0)
                    .map((_, index) => (
                        <HueSliderStory defaultValue={`hsl(${index * 18}, 100%, 50%)`} />
                    ))}
            </VLinear>
        </DemoStage.Area>
        <DemoStage.Area $flex name="用于选择透明度">
            <VLinear spacing="small">
                {Array(21)
                    .fill(0)
                    .map((_, index) => (
                        <AlphaSliderStory
                            defaultValue={`hsla(${index * 18}, 100%, 50%, ${(index * 5) / 100})`}
                        />
                    ))}
            </VLinear>
        </DemoStage.Area>
    </HLinear>
)

function SaturationAndValueSliderStory({ defaultColor, ...otherProps }: { defaultColor: string }) {
    const [color, setColor] = useState(defaultColor)

    return (
        <VLinear spacing {...otherProps}>
            <HLinear spacing="large">
                <VLinear $col={6}>
                    <span>受控状态</span>
                    <ColorSaturationAndValueSlider value={color} onChange={setColor} />
                </VLinear>
                <VLinear $col={6}>
                    <span>受控状态</span>
                    <ColorSaturationAndValueSlider value={color} onChange={setColor} />
                </VLinear>
                <VLinear $col={6}>
                    <span>非受控状态，绑定 onChange</span>
                    <ColorSaturationAndValueSlider defaultValue={color} onChange={setColor} />
                </VLinear>
                <VLinear $col={6}>
                    <span>非受控状态</span>
                    <ColorSaturationAndValueSlider defaultValue={color} />
                </VLinear>
            </HLinear>
            <span>{color}</span>
        </VLinear>
    )
}

export const SaturationAndValueSlider = () => (
    <DemoStage.Area name="用于选择透明度">
        <SaturationAndValueSliderStory defaultColor="hsv(200, 50%, 50%)" />
    </DemoStage.Area>
)
