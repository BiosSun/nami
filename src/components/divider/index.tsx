import React, { HTMLAttributes, FunctionComponent, useContext } from 'react'
import clsx from 'clsx'
import { LinearContext, LinearItemProps } from '../linear'

import './index.scss'

export type DividerProps = HTMLAttributes<HTMLDivElement> & Pick<LinearItemProps, '$align'>

export type DividerType = FunctionComponent<DividerProps>

export const Divider: DividerType = ({ className, ...otherProps }) => {
    const linear = useContext(LinearContext)

    className = clsx(
        'nami-divider',
        `nami-divider--${linear.direction === 'horizontal' ? 'vertical' : 'horizontal'}`,
        className
    )

    return <div className={className} {...otherProps} />
}
