import React, { HTMLAttributes, FunctionComponent } from 'react'
import classnames from 'classnames'
import { LinearItemProps } from '../linear/linear'

import './index.scss'

export type SpaceProps = HTMLAttributes<HTMLDivElement> &
    LinearItemProps & {
        // 空隔符大小
        size?: boolean | 'large' | 'small'
    }

export type SpaceType = FunctionComponent<SpaceProps>

export const Space: SpaceType = ({ size, className, ...otherProps }) => {
    className = classnames(
        'nami-space',
        {
            [`nami-space--size-${size}`]: size,
        },
        className
    )

    return <div className={className} {...otherProps} />
}
