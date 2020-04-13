import React, { HTMLAttributes, FunctionComponent } from 'react'
import clsx from 'clsx'
import { LinearItemProps } from '../linear'

import './index.scss'

export type SpaceProps = HTMLAttributes<HTMLDivElement> &
    LinearItemProps & {
        // 空隔符大小
        size?: boolean | 'large' | 'small'
    }

export type SpaceType = FunctionComponent<SpaceProps>

export const Space: SpaceType = ({ size, className, ...otherProps }) => {
    className = clsx(
        'nami-space',
        {
            [`nami-space--size-${size}`]: size,
        },
        className
    )

    return <div className={className} {...otherProps} />
}
