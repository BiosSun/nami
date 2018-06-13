import React, { Component } from 'react'
import classnames from 'classnames'
import CommonProps from '@utils/common-props'

export interface ColProps extends CommonProps<Col> {
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

/**
 * @component
 *
 * @displayname 栅格列
 * @parent Grid
 */
export default class Col extends Component<ColProps> {
    render() {
        const { span, offset, align, children, className, style } = this.props
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
            <div className={classes} style={style}>
                {children}
            </div>
        )
    }
}
