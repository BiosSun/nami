import React, { HTMLAttributes, FunctionComponent, useContext } from 'react'
import classnames from 'classnames'
import { LinearContext, LinearItemProps } from '../linear'

import './index.scss'

export type DividerProps = HTMLAttributes<HTMLDivElement> & Pick<LinearItemProps, '$align'>

export type DividerType = FunctionComponent<DividerProps>

export const Divider: DividerType = ({ className, ...otherProps }) => {
    const linear = useContext(LinearContext)

    className = classnames(
        'nami-divider',
        `nami-divider--${linear.direction === 'horizontal' ? 'vertical' : 'horizontal'}`,
        className
    )

    return <div className={className} {...otherProps} />
}
