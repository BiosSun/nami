/* eslint-disable react/jsx-key */
import React from 'react'

import { Color, ColorScreen, HLinear, VLinear } from '@biossun/nami'
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
