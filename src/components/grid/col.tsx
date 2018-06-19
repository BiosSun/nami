import React, { Component, HTMLAttributes } from 'react'
import classnames from 'classnames'

interface BaseColProps {
    /**
     * 栅格列宽
     */
    readonly span?: number

    /**
     * 列偏移量
     */
    readonly offset?: number

    /**
     * 列中的内容
     */
    readonly children?: React.ReactNode

    /**
     * 该列的垂直对齐方式
     */
    readonly align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'
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
            'grid__col',
            {
                [`grid__col--${span}`]: !!span,
                [`grid__col--offset-${offset}`]: !!offset,
                [`grid__col--align-${align}`]: !!align,
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
