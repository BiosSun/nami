/* eslint-disable react/jsx-key */
import React from 'react'

import { Divider, HLinear, VLinear } from '@biossun/nami'
import { DemoStage } from '@biossun/nami/storybook-utils'
import styles from './index.stories.module.scss'

export default {
    title: 'Divider',
    component: Divider,
}

export const common = () => [
    <DemoStage.Area
        name="默认地，受 Linear 的 align 配置影响，Divider 的长度与交叉轴的长度相等："
        border
    >
        <HLinear className={styles.linear} padding spacing>
            <span>1</span>
            <span>2</span>
            <Divider />
            <span>3</span>
        </HLinear>
    </DemoStage.Area>,

    <DemoStage.Area
        name="当 align 切换为 start/center/end 时，Divider 的长度受限于其内部的最小长度限制："
        border
    >
        <HLinear className={styles.linear} padding spacing align="center">
            <span>1</span>
            <span>2</span>
            <Divider />
            <span>3</span>
        </HLinear>
    </DemoStage.Area>,

    <DemoStage.Area
        name="在垂直布局中，Divider 的最小长度切换为 100%，所以无论 Linear 的 align 设置为任何值，其长度都不会改变："
        border
    >
        <VLinear className={styles.linear} padding spacing align="center">
            <span>1</span>
            <span>2</span>
            <Divider />
            <span>3</span>
        </VLinear>
    </DemoStage.Area>,

    <DemoStage.Area
        name="如果 Linear 上没有设置 padding 和 spacing，分隔符会紧贴着容器及前后子元素："
        border
    >
        <HLinear className={styles.linear}>
            <span>1</span>
            <span>2</span>
            <Divider />
            <span>3</span>
        </HLinear>
    </DemoStage.Area>,

    <DemoStage.Area border>
        <VLinear className={styles.linear}>
            <span>1</span>
            <span>2</span>
            <Divider />
            <span>3</span>
        </VLinear>
    </DemoStage.Area>,
]
