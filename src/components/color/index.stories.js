/* eslint-disable react/jsx-key */
import React, { useState } from 'react'
import clsx from 'clsx'

import { Color, ColorScreen, ColorHueSlider, HLinear, VLinear } from '@biossun/nami'
import { DemoStage } from '@biossun/nami/storybook-utils'
import styles from './index.stories.module.scss'

export default {
    title: 'Color',
    component: Color,
}

export const common = () => [
    <DemoStage.Area border>
        <div className={styles.container}>
            <Color />
        </div>
    </DemoStage.Area>,
]

export const colorScreen = () => [
    <DemoStage.Area name="颜色展示模块有大、中、小三种">
        <VLinear spacing>
            {Array(11)
                .fill(0)
                .map((_, index) => (
                    <HLinear align="center" spacing>
                        <ColorScreen
                            color={`hsla(5, 69%, 54%, ${(10 - index) / 10})`}
                            size="large"
                        />
                        <ColorScreen color={`hsla(209, 73%, 58%, ${(10 - index) / 10})`} />
                        <ColorScreen
                            color={`hsla(120, 47%, 46%, ${(10 - index) / 10})`}
                            size="small"
                        />
                    </HLinear>
                ))}
        </VLinear>
    </DemoStage.Area>,
]

function HueSliderStory({ defaultValue, ...otherProps }) {
    const [value, setValue] = useState(defaultValue)

    return (
        <HLinear align="center" spacing {...otherProps}>
            <ColorHueSlider value={value} onChange={setValue} $flex />
            <ColorHueSlider value={value} onChange={setValue} $flex />
            <ColorHueSlider value={value} onChange={setValue} $flex />
            <ColorHueSlider value={value} onChange={setValue} $flex />
            <span style={{ width: 80 }}>{value}</span>
        </HLinear>
    )
}

export const hueSlider = () => (
    <DemoStage.Area name="用于选择色相，注意：在 U(60, 30) 的领域区间内，knob 会额外添加黑色描边，越靠近领域中心，描边越明显">
        <VLinear spacing="small">
            {Array(25)
                .fill(0)
                .map((_, index) => (
                    <HueSliderStory defaultValue={index * 15} />
                ))}
        </VLinear>
    </DemoStage.Area>
)
