import React, { HTMLAttributes, FunctionComponent, useContext } from 'react'
import classnames from 'classnames'
import { LinearContext } from '../linear/context'
import { LinearItemProps } from '../linear/linear'

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
