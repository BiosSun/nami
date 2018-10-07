import React, { Component, ReactNode, HTMLAttributes } from 'react'
import classnames from 'classnames'

import './index.scss'

export interface BaseProps {
    /**
     * 卡片内容
     */
    children: ReactNode
}

export type Props = BaseProps & HTMLAttributes<HTMLDivElement>

export default class Card extends Component<Props> {
    render() {
        const { className, children, ...otherProps } = this.props

        const classes = {
            root: classnames('nami-card', className),
        }

        return (
            <div {...otherProps} className={classes.root}>
                {children}
            </div>
        )
    }
}
