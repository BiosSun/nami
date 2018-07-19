import React, { PureComponent, SVGAttributes } from 'react'
import classnames from 'classnames'

import icons from './icons'

import './index.scss'

interface BaseIconProps {
    /**
     * 图标名称；
     */
    name?: string
}

export type IconProps = BaseIconProps & SVGAttributes<SVGElement>

export default class Icon extends PureComponent<IconProps> {
    render() {
        const { name, className, ...otherProps } = this.props
        const classes = classnames('nami-icon', className)

        return (
            <svg {...otherProps} className={classes} width="16" height="16" viewBox="0 0 1024 1024">
                {icons[name]()}
            </svg>
        )
    }
}
