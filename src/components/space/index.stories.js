/* eslint-disable react/jsx-key */
import React from 'react'
import clsx from 'clsx'

import { Space, HLinear, VLinear } from '@biossun/nami'
import { DemoStage } from '@biossun/nami/storybook-utils'
import styles from './index.stories.module.scss'

export default {
    title: 'Space',
    component: Space,
}

function Item({ name, className, children, ...otherProps }) {
    return (
        <div className={clsx(className, styles.item, styles[`item${name}`])} {...otherProps}>
            Item {name} {children}
        </div>
    )
}

function Demo({ Linear }) {
    return (
        <DemoStage.Area className={styles.container}>
            <DemoStage.Area name="提供三种尺寸：">
                <DemoStage.Area name="small" border>
                    <Linear>
                        <Item name="1" />
                        <Item name="2" />
                        <Space size="small" />
                        <Item name="3" />
                    </Linear>
                </DemoStage.Area>
                <DemoStage.Area name="default" border>
                    <Linear>
                        <Item name="1" />
                        <Item name="2" />
                        <Space />
                        <Item name="3" />
                    </Linear>
                </DemoStage.Area>
                <DemoStage.Area name="large" border>
                    <Linear>
                        <Item name="1" />
                        <Item name="2" />
                        <Space size="large" />
                        <Item name="3" />
                    </Linear>
                </DemoStage.Area>
            </DemoStage.Area>

            <DemoStage.Area name="当 Linear 有声明间距时，Space 上也会有间距设置：">
                <DemoStage.Area name="small" border>
                    <Linear spacing="small">
                        <Item name="1" />
                        <Item name="2" />
                        <Space size="small" />
                        <Item name="3" />
                    </Linear>
                </DemoStage.Area>
                <DemoStage.Area name="default" border>
                    <Linear spacing>
                        <Item name="1" />
                        <Item name="2" />
                        <Space />
                        <Item name="3" />
                    </Linear>
                </DemoStage.Area>
                <DemoStage.Area name="large" border>
                    <Linear spacing="large">
                        <Item name="1" />
                        <Item name="2" />
                        <Space size="large" />
                        <Item name="3" />
                    </Linear>
                </DemoStage.Area>
            </DemoStage.Area>

            <DemoStage.Area name="若在 Space 上设置 $flex，它将变为弹性空隔符：">
                <DemoStage.Area name="small" border>
                    <Linear spacing="small">
                        <Item name="1" />
                        <Item name="2" />
                        <Space size="small" $flex />
                        <Item name="3" />
                    </Linear>
                </DemoStage.Area>
                <DemoStage.Area name="default" border>
                    <Linear spacing>
                        <Item name="1" />
                        <Item name="2" />
                        <Space $flex />
                        <Item name="3" />
                    </Linear>
                </DemoStage.Area>
                <DemoStage.Area name="large" border>
                    <Linear spacing="large">
                        <Item name="1" />
                        <Item name="2" />
                        <Space size="large" $flex />
                        <Item name="3" />
                    </Linear>
                </DemoStage.Area>
            </DemoStage.Area>

            <DemoStage.Area title="如果所有子元素都设置了 $flex，那么 space 的长度应当和其它子元素的长度相同：">
                <DemoStage.Area name="small" border>
                    <Linear spacing="small">
                        <Item $flex name="1" />
                        <Item $flex name="2" />
                        <Space size="small" $flex />
                        <Item $flex name="3" />
                    </Linear>
                </DemoStage.Area>
                <DemoStage.Area name="default" border>
                    <Linear spacing>
                        <Item $flex name="1" />
                        <Item $flex name="2" />
                        <Space $flex />
                        <Item $flex name="3" />
                    </Linear>
                </DemoStage.Area>
                <DemoStage.Area name="large" border>
                    <Linear spacing="large">
                        <Item $flex name="1" />
                        <Item $flex name="2" />
                        <Space size="large" $flex />
                        <Item $flex name="3" />
                    </Linear>
                </DemoStage.Area>
            </DemoStage.Area>

            <DemoStage.Area title="也可以在 Space 上设置 $col 属性，用途和其它栅格布局系统的 offset 相同：">
                <DemoStage.Area name="small" border>
                    <Linear spacing="small">
                        <Item $col={6} name="1" />
                        <Item $col={6} name="2" />
                        <Space size="small" $col={6} />
                        <Item $col={6} name="3" />
                    </Linear>
                </DemoStage.Area>

                <DemoStage.Area name="default" border>
                    <Linear spacing>
                        <Item $col={6} name="1" />
                        <Item $col={6} name="2" />
                        <Space $col={6} />
                        <Item $col={6} name="3" />
                    </Linear>
                </DemoStage.Area>

                <DemoStage.Area name="large" border>
                    <Linear spacing="large">
                        <Item $col={6} name="1" />
                        <Item $col={6} name="2" />
                        <Space size="large" $col={6} />
                        <Item $col={6} name="3" />
                    </Linear>
                </DemoStage.Area>
            </DemoStage.Area>

            <DemoStage.Area title="当容器空间不足时，设置了 $flex 的空隔符将收缩至 0（但容器在其上追加的间距仍然存在）：">
                <DemoStage.Area name="small" border>
                    <Linear spacing="small">
                        <Item $col={8} name="1" />
                        <Item $col={8} name="2" />
                        <Space size="small" $flex />
                        <Item $col={8} name="3" />
                    </Linear>
                </DemoStage.Area>

                <DemoStage.Area name="default" border>
                    <Linear spacing>
                        <Item $col={8} name="1" />
                        <Item $col={8} name="2" />
                        <Space $flex />
                        <Item $col={8} name="3" />
                    </Linear>
                </DemoStage.Area>

                <DemoStage.Area name="large" border>
                    <Linear spacing="large">
                        <Item $col={8} name="1" />
                        <Item $col={8} name="2" />
                        <Space size="large" $flex />
                        <Item $col={8} name="3" />
                    </Linear>
                </DemoStage.Area>
            </DemoStage.Area>

            <DemoStage.Area title="如果是在栅格中使用，应当为栅格元素设置 $flex：">
                <DemoStage.Area name="small" border>
                    <Linear spacing="small">
                        <Item $flex $col={8} name="1" />
                        <Item $flex $col={8} name="2" />
                        <Space size="small" $flex />
                        <Item $flex $col={8} name="3" />
                    </Linear>
                </DemoStage.Area>

                <DemoStage.Area name="default" border>
                    <Linear spacing>
                        <Item $flex $col={8} name="1" />
                        <Item $flex $col={8} name="2" />
                        <Space $flex />
                        <Item $flex $col={8} name="3" />
                    </Linear>
                </DemoStage.Area>

                <DemoStage.Area name="large" border>
                    <Linear spacing="large">
                        <Item $flex $col={8} name="1" />
                        <Item $flex $col={8} name="2" />
                        <Space size="large" $flex />
                        <Item $flex $col={8} name="3" />
                    </Linear>
                </DemoStage.Area>
            </DemoStage.Area>
        </DemoStage.Area>
    )
}

export const horizontal = () => <Demo Linear={HLinear} />
export const vertical = () => <Demo Linear={VLinear} />
