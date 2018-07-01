import React, { Component, HTMLAttributes } from 'react'
import classnames from 'classnames'

import Brand from './brand'
export { default as NavbarBrand, BrandProps as NavbarBrandProps } from './brand'

import './styles'

interface BaseNavbarProps {
    /**
     * 导航栏内容项
     */
    children?: React.ReactNode
}

export type NavbarProps = BaseNavbarProps & HTMLAttributes<HTMLDivElement>

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
 *     {@demo "./demos/common.jsx"}
 */
export default class Navbar extends Component<NavbarProps> {
    static Brand = Brand

    render() {
        const { children, className, ...otherProps } = this.props

        const classes = classnames('nami-navbar', className)

        return (
            <div {...otherProps} className={classes}>
                {children}
            </div>
        )
    }
}
