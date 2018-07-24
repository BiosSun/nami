import React, { Component, HTMLAttributes } from 'react'
import classnames from 'classnames'

import Col from './col'
export { default as GridCol, ColProps as GridColProps } from './col'

import './index.scss'

export interface BaseGridProps {
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
