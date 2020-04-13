/* eslint-disable react/jsx-key */
import React, { useContext } from 'react'
import clsx from 'clsx'
import styles from './index.stories.module.scss'

import { Linear, HLinear, VLinear, HrLinear, VrLinear, LinearContext } from '@biossun/nami'
import { DemoStage } from '@biossun/nami/storybook-utils'

export default {
    title: 'Linear',
    component: Linear,
}

function Item({ name, component: Component = 'div', height, className, children, ...otherProps }) {
    return (
        <Component
            className={clsx(
                className,
                styles.item,
                styles[`item${name}`],
                height && styles[`item${name}Height`]
            )}
            {...otherProps}
        >
            Item {name} {children}
        </Component>
    )
}

export const direction = () => [
    <DemoStage.Area name="horizontal" border>
        <Linear>
            <Item name="1" />
            <Item name="2" />
            <Item name="3" />
            <Item name="4" />
        </Linear>
    </DemoStage.Area>,

    <DemoStage.Area name="horizontal-reverse" border>
        <Linear direction="horizontal-reverse">
            <Item name="1" />
            <Item name="2" />
            <Item name="3" />
            <Item name="4" />
        </Linear>
    </DemoStage.Area>,

    <DemoStage.Area name="vertical" border>
        <Linear direction="vertical">
            <Item name="1" />
            <Item name="2" />
            <Item name="3" />
            <Item name="4" />
        </Linear>
    </DemoStage.Area>,

    <DemoStage.Area name="vertical-reverse" border>
        <Linear direction="vertical-reverse">
            <Item name="1" />
            <Item name="2" />
            <Item name="3" />
            <Item name="4" />
        </Linear>
    </DemoStage.Area>,
]

export const Justify = () => [
    <DemoStage.Area title="horizontal">
        <DemoStage.Area name="start" border>
            <Linear justify="start">
                <Item name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="end" border>
            <Linear justify="end">
                <Item name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="center" border>
            <Linear justify="center">
                <Item name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="between" border>
            <Linear justify="between">
                <Item name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="around" border>
            <Linear justify="around">
                <Item name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>
    </DemoStage.Area>,

    <DemoStage.Area title="vertical">
        <DemoStage.Area name="start" border>
            <Linear className={styles.linearHeight} direction="vertical" justify="start">
                <Item name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="end" border>
            <Linear className={styles.linearHeight} direction="vertical" justify="end">
                <Item name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="center" border>
            <Linear className={styles.linearHeight} direction="vertical" justify="center">
                <Item name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="between" border>
            <Linear className={styles.linearHeight} direction="vertical" justify="between">
                <Item name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="around" border>
            <Linear className={styles.linearHeight} direction="vertical" justify="around">
                <Item name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>
    </DemoStage.Area>,
]

export const Align = () => [
    <DemoStage.Area title="horizontal">
        <DemoStage.Area name="stretch" border>
            <Linear align="stretch">
                <Item name="1" height />
                <Item name="2" height />
                <Item name="3" height />
                <Item name="4" height />
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="start" border>
            <Linear align="start">
                <Item name="1" height />
                <Item name="2" height />
                <Item name="3" height />
                <Item name="4" height />
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="end" border>
            <Linear align="end">
                <Item name="1" height />
                <Item name="2" height />
                <Item name="3" height />
                <Item name="4" height />
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="center" border>
            <Linear align="center">
                <Item name="1" height />
                <Item name="2" height />
                <Item name="3" height />
                <Item name="4" height />
            </Linear>
        </DemoStage.Area>
    </DemoStage.Area>,

    <DemoStage.Area title="vertical">
        <DemoStage.Area name="stretch" border>
            <Linear direction="vertical" align="stretch">
                <Item name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="start" border>
            <Linear direction="vertical" align="start">
                <Item name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="end" border>
            <Linear direction="vertical" align="end">
                <Item name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="center" border>
            <Linear direction="vertical" align="center">
                <Item name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>
    </DemoStage.Area>,
]

export const padding = () => [
    <DemoStage.Area title="horizontal">
        <DemoStage.Area name="small" border>
            <Linear padding="small">
                <Item name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>
        <DemoStage.Area name="true" border>
            <Linear padding>
                <Item name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>
        <DemoStage.Area name="large" border>
            <Linear padding="large">
                <Item name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>
    </DemoStage.Area>,

    <DemoStage.Area title="vertical">
        <DemoStage.Area name="small" border>
            <Linear direction="vertical" padding="small">
                <Item name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>
        <DemoStage.Area name="true" border>
            <Linear direction="vertical" padding>
                <Item name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>
        <DemoStage.Area name="large" border>
            <Linear direction="vertical" padding="large">
                <Item name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>
    </DemoStage.Area>,
]

export const spacing = () => [
    <DemoStage.Area title="horizontal">
        <DemoStage.Area name="small" border>
            <Linear spacing="small">
                <Item name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="true" border>
            <Linear spacing>
                <Item name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="large" border>
            <Linear spacing="large">
                <Item name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>
    </DemoStage.Area>,

    <DemoStage.Area title="horizontal-reverse">
        <DemoStage.Area name="small" border>
            <Linear direction="horizontal-reverse" spacing="small">
                <Item name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="true" border>
            <Linear direction="horizontal-reverse" spacing>
                <Item name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="large" border>
            <Linear direction="horizontal-reverse" spacing="large">
                <Item name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>
    </DemoStage.Area>,

    <DemoStage.Area title="vertical">
        <DemoStage.Area name="small" border>
            <Linear direction="vertical" spacing="small">
                <Item name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="true" border>
            <Linear direction="vertical" spacing>
                <Item name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="large" border>
            <Linear direction="vertical" spacing="large">
                <Item name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>
    </DemoStage.Area>,

    <DemoStage.Area title="vertical-reverse">
        <DemoStage.Area name="small" border>
            <Linear direction="vertical-reverse" spacing="small">
                <Item name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="true" border>
            <Linear direction="vertical-reverse" spacing>
                <Item name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="large" border>
            <Linear direction="vertical-reverse" spacing="large">
                <Item name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>
    </DemoStage.Area>,
]

export const paddingAndSpacing = () => [
    <DemoStage.Area title="horizontal">
        <DemoStage.Area name="small" border>
            <Linear spacing="small" padding="small">
                <Item name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="default" border>
            <Linear spacing padding>
                <Item name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="large" border>
            <Linear spacing="large" padding="large">
                <Item name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>
    </DemoStage.Area>,

    <DemoStage.Area title="vertical">
        <DemoStage.Area name="small" border>
            <Linear direction="vertical" spacing="small" padding="small">
                <Item name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="default" border>
            <Linear direction="vertical" spacing padding>
                <Item name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="large" border>
            <Linear direction="vertical" spacing="large" padding="large">
                <Item name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>
    </DemoStage.Area>,
]

export const CustomComponent = () => (
    <Linear component="ul">
        <Item component="li" name="1" />
        <Item component="li" name="2" />
        <Item component="li" name="3" />
        <Item component="li" name="4" />
    </Linear>
)

export const ItemFlex = () => [
    <DemoStage.Area title="horizontal">
        <DemoStage.Area name="one" border>
            <Linear>
                <Item $flex name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>
        <DemoStage.Area border>
            <Linear>
                <Item name="1" />
                <Item $flex name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>
        <DemoStage.Area border>
            <Linear>
                <Item name="1" />
                <Item name="2" />
                <Item $flex name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>
        <DemoStage.Area border>
            <Linear>
                <Item name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item $flex name="4" />
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="two" border>
            <Linear>
                <Item $flex name="1" />
                <Item $flex name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>
        <DemoStage.Area border>
            <Linear>
                <Item name="1" />
                <Item $flex name="2" />
                <Item $flex name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>
        <DemoStage.Area border>
            <Linear>
                <Item name="1" />
                <Item name="2" />
                <Item $flex name="3" />
                <Item $flex name="4" />
            </Linear>
        </DemoStage.Area>
        <DemoStage.Area border>
            <Linear>
                <Item $flex name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item $flex name="4" />
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="three" border>
            <Linear>
                <Item $flex name="1" />
                <Item $flex name="2" />
                <Item $flex name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>
        <DemoStage.Area border>
            <Linear>
                <Item name="1" />
                <Item $flex name="2" />
                <Item $flex name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>
        <DemoStage.Area border>
            <Linear>
                <Item $flex name="1" />
                <Item name="2" />
                <Item $flex name="3" />
                <Item $flex name="4" />
            </Linear>
        </DemoStage.Area>
        <DemoStage.Area border>
            <Linear>
                <Item $flex name="1" />
                <Item $flex name="2" />
                <Item name="3" />
                <Item $flex name="4" />
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="four" border>
            <Linear>
                <Item $flex name="1" />
                <Item $flex name="2" />
                <Item $flex name="3" />
                <Item $flex name="4" />
            </Linear>
        </DemoStage.Area>
    </DemoStage.Area>,

    <DemoStage.Area title="vertical">
        <DemoStage.Area name="one" border>
            <Linear className={styles.linearHeight} direction="vertical">
                <Item $flex name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>
        <DemoStage.Area border>
            <Linear className={styles.linearHeight} direction="vertical">
                <Item name="1" />
                <Item $flex name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>
        <DemoStage.Area border>
            <Linear className={styles.linearHeight} direction="vertical">
                <Item name="1" />
                <Item name="2" />
                <Item $flex name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>
        <DemoStage.Area border>
            <Linear className={styles.linearHeight} direction="vertical">
                <Item name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item $flex name="4" />
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="two" border>
            <Linear className={styles.linearHeight} direction="vertical">
                <Item $flex name="1" />
                <Item $flex name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>
        <DemoStage.Area border>
            <Linear className={styles.linearHeight} direction="vertical">
                <Item name="1" />
                <Item $flex name="2" />
                <Item $flex name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>
        <DemoStage.Area border>
            <Linear className={styles.linearHeight} direction="vertical">
                <Item name="1" />
                <Item name="2" />
                <Item $flex name="3" />
                <Item $flex name="4" />
            </Linear>
        </DemoStage.Area>
        <DemoStage.Area border>
            <Linear className={styles.linearHeight} direction="vertical">
                <Item $flex name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item $flex name="4" />
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="three" border>
            <Linear className={styles.linearHeight} direction="vertical">
                <Item $flex name="1" />
                <Item $flex name="2" />
                <Item $flex name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>
        <DemoStage.Area border>
            <Linear className={styles.linearHeight} direction="vertical">
                <Item name="1" />
                <Item $flex name="2" />
                <Item $flex name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>
        <DemoStage.Area border>
            <Linear className={styles.linearHeight} direction="vertical">
                <Item $flex name="1" />
                <Item name="2" />
                <Item $flex name="3" />
                <Item $flex name="4" />
            </Linear>
        </DemoStage.Area>
        <DemoStage.Area border>
            <Linear className={styles.linearHeight} direction="vertical">
                <Item $flex name="1" />
                <Item $flex name="2" />
                <Item name="3" />
                <Item $flex name="4" />
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="four" border>
            <Linear className={styles.linearHeight} direction="vertical">
                <Item $flex name="1" />
                <Item $flex name="2" />
                <Item $flex name="3" />
                <Item $flex name="4" />
            </Linear>
        </DemoStage.Area>
    </DemoStage.Area>,
]

export const ItemCol = () => [
    <DemoStage.Area title="horizontal">
        {[1, 2, 3, 4, 6, 12].map(col => (
            <DemoStage.Area key={col}>
                <Linear>
                    {new Array(24 / col).fill(0).map((_, index) => (
                        <Item key={index} $col={col} />
                    ))}
                </Linear>
            </DemoStage.Area>
        ))}

        {new Array(11).fill(0).map((_, index) => (
            <DemoStage.Area key={index}>
                <Linear>
                    <Item $col={11 - index} />
                    <Item $col={24 - (11 - index)} />
                </Linear>
            </DemoStage.Area>
        ))}

        <DemoStage.Area>
            <Linear>
                <Item $col={24} />
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="spacing">
            <Linear spacing="small">
                {[1, 2, 3, 6, 12].map(col => (
                    <Item key={col} $col={col} />
                ))}
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="padding">
            <Linear padding="small">
                {[1, 2, 3, 6, 12].map(col => (
                    <Item key={col} $col={col} />
                ))}
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="padding and spacing">
            <Linear padding="small" spacing="small">
                {[1, 2, 3, 6, 12].map(col => (
                    <Item key={col} $col={col} />
                ))}
            </Linear>
        </DemoStage.Area>
    </DemoStage.Area>,

    <DemoStage.Area title="vertical">
        {[1, 2, 3, 4, 6, 12].map(col => (
            <DemoStage.Area key={col}>
                <Linear className={styles.linearHeightLarge} direction="vertical">
                    {new Array(24 / col).fill(0).map((_, index) => (
                        <Item key={index} $col={col} />
                    ))}
                </Linear>
            </DemoStage.Area>
        ))}

        {new Array(11).fill(0).map((_, index) => (
            <DemoStage.Area key={index}>
                <Linear className={styles.linearHeightLarge} direction="vertical">
                    <Item $col={11 - index} />
                    <Item $col={24 - (11 - index)} />
                </Linear>
            </DemoStage.Area>
        ))}

        <DemoStage.Area>
            <Linear className={styles.linearHeightLarge} direction="vertical">
                <Item $col={24} />
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="spacing">
            <Linear className={styles.linearHeightLarge} direction="vertical" spacing="small">
                {[1, 2, 3, 6, 12].map(col => (
                    <Item key={col} $col={col} />
                ))}
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="padding">
            <Linear className={styles.linearHeightLarge} direction="vertical" padding="small">
                {[1, 2, 3, 6, 12].map(col => (
                    <Item key={col} $col={col} />
                ))}
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="padding and spacing">
            <Linear
                className={styles.linearHeightLarge}
                direction="vertical"
                padding="small"
                spacing="small"
            >
                {[1, 2, 3, 6, 12].map(col => (
                    <Item key={col} $col={col} />
                ))}
            </Linear>
        </DemoStage.Area>
    </DemoStage.Area>,
]

export const ItemFlexAndCol = () => [
    <DemoStage.Area title="horizontal">
        <DemoStage.Area
            name="在 $flex 和 $col 同时使用时，若容器空间足够，则 $flex 不会对栅格产生任何影响："
            border
        >
            <Linear spacing padding>
                <Item $flex $col={12} />
            </Linear>
        </DemoStage.Area>
        <DemoStage.Area border>
            <Linear spacing padding>
                <Item $flex $col={12} />
                <Item $flex $col={12} />
            </Linear>
        </DemoStage.Area>
        <DemoStage.Area border>
            <Linear spacing padding>
                <Item $flex $col={12} />
                <Item name="1" />
            </Linear>
        </DemoStage.Area>
        <DemoStage.Area border>
            <Linear spacing padding>
                <Item $flex $col={12} />
                <Item $flex name="1" />
            </Linear>
        </DemoStage.Area>
        <DemoStage.Area name="影响出现在空间不足时，声明了 $flex 的栅格子元素会自动收缩：" border>
            <Linear spacing padding>
                <Item name="1" />
                <Item $flex $col={12} />
                <Item name="1" />
                <Item $flex $col={12} />
                <Item name="1" />
            </Linear>
        </DemoStage.Area>
    </DemoStage.Area>,

    <DemoStage.Area title="vertical">
        <DemoStage.Area
            name="在 $flex 和 $col 同时使用时，若容器空间足够，则 $flex 不会对栅格产生任何影响："
            border
        >
            <Linear className={styles.linearHeight} direction="vertical" spacing padding>
                <Item $flex $col={12} />
            </Linear>
        </DemoStage.Area>
        <DemoStage.Area border>
            <Linear className={styles.linearHeight} direction="vertical" spacing padding>
                <Item $flex $col={12} />
                <Item $flex $col={12} />
            </Linear>
        </DemoStage.Area>
        <DemoStage.Area border>
            <Linear className={styles.linearHeight} direction="vertical" spacing padding>
                <Item $flex $col={12} />
                <Item name="1" />
            </Linear>
        </DemoStage.Area>
        <DemoStage.Area border>
            <Linear className={styles.linearHeight} direction="vertical" spacing padding>
                <Item $flex $col={12} />
                <Item $flex name="1" />
            </Linear>
        </DemoStage.Area>
        <DemoStage.Area name="影响出现在空间不足时，声明了 $flex 的栅格子元素会自动收缩：" border>
            <Linear className={styles.linearHeight} direction="vertical" spacing padding>
                <Item name="1" />
                <Item $flex $col={12} />
                <Item name="1" />
                <Item $flex $col={12} />
                <Item name="1" />
            </Linear>
        </DemoStage.Area>
    </DemoStage.Area>,
]

export const ItemAlign = () => [
    <DemoStage.Area title="horizontal">
        <DemoStage.Area name="stretch" border>
            <Linear align="end">
                <Item $align="stretch" name="1" height />
                <Item name="2" height />
                <Item name="3" height />
                <Item name="4" height />
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="start" border>
            <Linear>
                <Item $align="start" name="1" height />
                <Item name="2" height />
                <Item name="3" height />
                <Item name="4" height />
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="end" border>
            <Linear>
                <Item $align="end" name="1" height />
                <Item name="2" height />
                <Item name="3" height />
                <Item name="4" height />
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="center" border>
            <Linear>
                <Item $align="center" name="1" height />
                <Item name="2" height />
                <Item name="3" height />
                <Item name="4" height />
            </Linear>
        </DemoStage.Area>
    </DemoStage.Area>,

    <DemoStage.Area title="vertical">
        <DemoStage.Area name="stretch" border>
            <Linear direction="vertical" align="end">
                <Item $align="stretch" name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="start" border>
            <Linear direction="vertical">
                <Item $align="start" name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="end" border>
            <Linear direction="vertical">
                <Item $align="end" name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>

        <DemoStage.Area name="center" border>
            <Linear direction="vertical">
                <Item $align="center" name="1" />
                <Item name="2" />
                <Item name="3" />
                <Item name="4" />
            </Linear>
        </DemoStage.Area>
    </DemoStage.Area>,
]

export const Sugars = () => [
    <DemoStage.Area name="HLinear" border>
        <HLinear spacing="small">
            <Item name="1" />
            <Item name="2" />
            <Item name="3" />
            <Item name="4" />
        </HLinear>
    </DemoStage.Area>,

    <DemoStage.Area name="HrLinear" border>
        <HrLinear spacing="small">
            <Item name="1" />
            <Item name="2" />
            <Item name="3" />
            <Item name="4" />
        </HrLinear>
    </DemoStage.Area>,

    <DemoStage.Area name="VLinear" border>
        <VLinear spacing="small">
            <Item name="1" />
            <Item name="2" />
            <Item name="3" />
            <Item name="4" />
        </VLinear>
    </DemoStage.Area>,

    <DemoStage.Area name="VrLinear" border>
        <VrLinear spacing="small">
            <Item name="1" />
            <Item name="2" />
            <Item name="3" />
            <Item name="4" />
        </VrLinear>
    </DemoStage.Area>,
]

export const NestedLinear = () => [
    <DemoStage.Area name="horizontal" border>
        <Linear spacing="large">
            <Item name="1" />
            <Linear spacing>
                <Item name="2" />
                <Linear>
                    <Item name="3" />
                    <Item name="4" />
                </Linear>
            </Linear>
        </Linear>
    </DemoStage.Area>,

    <DemoStage.Area title="vertical" border>
        <Linear direction="vertical" spacing="large">
            <Item name="1" />
            <Linear direction="vertical" spacing>
                <Item name="2" />
                <Linear direction="vertical">
                    <Item name="3" />
                    <Item name="4" />
                </Linear>
            </Linear>
        </Linear>
    </DemoStage.Area>,

    <DemoStage.Area title="mixture" border>
        <Linear spacing="large">
            <Item name="1" />
            <Linear direction="vertical" spacing>
                <Item name="2" />
                <Linear>
                    <Item name="3" />
                    <Item name="4" />
                </Linear>
            </Linear>
        </Linear>
    </DemoStage.Area>,
]

function ContextItem({ name, ...otherProps }) {
    const context = useContext(LinearContext)

    return (
        <Item name={name} {...otherProps}>
            direction: {context.direction}, isReverse: {context.isReverse ? 'true' : 'false'}{' '}
        </Item>
    )
}

export const Context = () => [
    <DemoStage.Area name="horizontal" border>
        <Linear>
            <ContextItem name="1" />
            <ContextItem name="2" />
        </Linear>
    </DemoStage.Area>,

    <DemoStage.Area name="horizontal-reverse" border>
        <Linear direction="horizontal-reverse">
            <ContextItem name="1" />
            <ContextItem name="2" />
        </Linear>
    </DemoStage.Area>,

    <DemoStage.Area name="vertical" border>
        <Linear direction="vertical">
            <ContextItem name="1" />
            <ContextItem name="2" />
        </Linear>
    </DemoStage.Area>,

    <DemoStage.Area name="vertical-reverse" border>
        <Linear direction="vertical-reverse">
            <ContextItem name="1" />
            <ContextItem name="2" />
        </Linear>
    </DemoStage.Area>,

    <DemoStage.Area name="nested" border>
        <Linear direction="horizontal">
            <ContextItem name="1" />

            <Linear direction="vertical">
                <ContextItem name="2" />
                <Linear direction="horizontal-reverse">
                    <ContextItem name="3" />
                    <ContextItem name="4" />
                </Linear>
            </Linear>
        </Linear>
    </DemoStage.Area>,
]

Sugars.story = {
    name: 'HLinear/VLinear/HrLinear/VrLinear',
}

// function Text() {}
// function Button() {}
// function Price() {}
// function Image() {}
// function Space() {}

// export const Demo = () => (
//     <HLinear className="card" padding spacing>
//         <Image src="xxx" />

//         <VLinear $flex spacing>
//             <Text type="subtitle">Standard License</Text>

//             <VLinear spacing="small">
//                 <Text>Full resolution 1920x1080 * JPEG</Text>
//                 <Text type="secondary">ID: 1030114</Text>
//             </VLinear>

//             <Space $flex />

//             <Button $align="start" type="text">Remove</Button>
//         </VLinear>

//         <Price $align="top" prefix="$" value="19.00" />
//     </HLinear>
// )
