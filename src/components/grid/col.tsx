import React, { Component, HTMLAttributes } from 'react'
import classnames from 'classnames'

interface BaseColProps {
    /**
     * 栅格列宽
     */
    span?: number

    /**
     * 列偏移量
     */
    offset?: number

    /**
     * 列中的内容
     */
    children?: React.ReactNode

    /**
     * 该列的垂直对齐方式
     */
    align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
}

export type ColProps = BaseColProps & HTMLAttributes<HTMLDivElement>

/**
 * @component
 *
 * @displayname 栅格列
 * @parent Grid
 */
export default class Col extends Component<ColProps> {
    render() {
        const { span, offset, align, children, className, ...otherProps } = this.props
        const classes = classnames(
            'nami-grid__col',
            {
                [`nami-grid__col--${span}`]: !!span,
                [`nami-grid__col--offset-${offset}`]: !!offset,
                [`nami-grid__col--align-${align}`]: !!align,
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
