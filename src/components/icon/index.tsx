import React, { SVGAttributes } from 'react'
import clsx from 'clsx'

import icons from './icons'

import './index.scss'

export type IconProps = SVGAttributes<SVGElement> & {
    /**
     * 图标名称；
     */
    name?: string
}

export default function Icon({ name, className, ...otherProps }: IconProps) {
    className = clsx('nami-icon', className)

    return (
        <svg {...otherProps} className={className} width="16" height="16" viewBox="0 0 1024 1024">
            {icons[name]()}
        </svg>
    )
}
