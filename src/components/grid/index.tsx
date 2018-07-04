import React, { Component, HTMLAttributes } from 'react'
import classnames from 'classnames'

import Col from './col'
export { default as GridCol, ColProps as GridColProps } from './col'

import './styles'

interface BaseGridProps {
    /**
     * 所有列的水平对齐方式
     */
    justify?: 'start' | 'end' | 'center' | 'between' | 'around'

    /**
     * 所有列的垂直对齐方式
     */
    align?: 'start' | 'end' | 'center'

    /**
     * 列之间是否有间距，及间距宽度配置
     */
    spacing?: boolean | 'small' | 'large'

    /**
     * 栅格中的列元素
     */
    children?: React.ReactNode
}

export type GridProps = BaseGridProps & HTMLAttributes<HTMLDivElement>

/**
 * @component
 *
 * @displayname 栅格
 * @group layout
 *
 * @description
 *
 *     提供一个传统的栅格布局，24 列，使用 CSS Flex 实现。
 *
 * @example
 *
 *     {@demo "./demos/basic.jsx"}
 *
 * @example - 列宽
 *
 *     得益于 CSS Flex 技术，一个栅格内的所有未配置宽度的列默认会平分栅格中的剩余空间*（剩余空间=栅格总空间-已配置列宽的列所占用空间）*。
 *
 *     而通过 `Col` 的参数 `span`，可以为某一列明确指定其列宽：
 *
 *     {@demo "./demos/span.jsx"}
 *
 * @example - 列间距
 *
 *     栅格默认列之间没有间距，如果需要，可以通过参数 `spacing` 来设置，该参数提供了三个间距宽度：
 *
 *     - `true` 普通间距，使用样式配置变量 `--distance-horizontal` 的宽度值；
 *     - `"large"` 较大间距，是普通间距的两倍；
 *     - `"small"` 较小间距，是普通间距的一半；
 *
 *     {@demo "./demos/spacing.jsx"}
 *
 * @example - 偏移
 *
 *     在列中，我们可以控制某个列向右偏移 n 个列宽：
 *
 *     {@demo "./demos/offset.jsx"}
 *
 * @example - 对齐
 *
 *     在 `Grid` 上，我们可以控制该栅格内列的水平及垂直对齐方式：
 *
 *     {@demo "./demos/justify.jsx"}
 *     {@demo "./demos/align.jsx"}
 *
 *     额外的，也可以单独控制某个列的垂直对齐方式：
 *
 *     {@demo "./demos/col-align.jsx"}
 */
export default class Grid extends Component<GridProps> {
    static Col = Col

    render() {
        const { align, justify, children, className, spacing, ...otherProps } = this.props
        const classes = classnames(
            'nami-grid',
            {
                [`nami-grid--align-${align}`]: !!align,
                [`nami-grid--justify-${justify}`]: !!justify,
                [`nami-grid--spacing${
                    typeof spacing === 'string' ? '-' + spacing : ''
                }`]: !!spacing,
            },
            className
        )

        return (
            <div {...otherProps} className={classes}>
                {children}
            </div>
        )
    }
}
