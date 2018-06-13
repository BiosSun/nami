import React, { Component } from 'react'
import classnames from 'classnames'
import CommonProps from '@utils/common-props'

import Brand from './brand'
export { default as NavbarBrand, BrandProps as NavbarBrandProps } from './brand'

import './styles'

export interface NavbarProps extends CommonProps<Navbar> {
    /**
     * 导航栏内容项
     */
    children?: React.ReactNode
}

/**
 * @component
 *
 * @displayname 导航栏
 * @group navigation
 *
 * @description
 *
 *     提供一个页面级的水平布局导航栏组件。
 *
 *     {@demo "./demos/common.tsx"}
 */
export default class Navbar extends Component<NavbarProps> {
    static Brand = Brand

    render() {
        const { children, className, style } = this.props

        const classes = classnames('navbar', className)

        return (
            <div className={classes} style={style}>
                {children}
            </div>
        )
    }
}
