import React, { Component } from 'react'
import classnames from 'classnames'
import CommonProps from '@utils/common-props'

export interface BrandProps extends CommonProps<Brand> {
    /**
     * 自定义标识内容；
     */
    children?: React.ReactNode
}

interface BrandState {}

/**
 * @component
 *
 * @displayname 导航栏标识
 * @parent Navbar
 */
export default class Brand extends Component<BrandProps, BrandState> {
    render() {
        const { children, className, style } = this.props
        const classes = classnames('navbar-brand', className)

        return (
            <div className={classes} style={style}>
                {children}
            </div>
        )
    }
}
