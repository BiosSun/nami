/* eslint-disable react/jsx-key */
import React from 'react'

import { Color } from '@biossun/nami'
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
