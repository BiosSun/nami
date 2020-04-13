import React, { Component, HTMLAttributes } from 'react'
import clsx from 'clsx'

import Brand from './brand'
export { default as NavbarBrand, BrandProps as NavbarBrandProps } from './brand'

import './index.scss'

export interface BaseNavbarProps {
    /**
     * 导航栏内容项
     */
    children?: React.ReactNode
}

export type NavbarProps = BaseNavbarProps & HTMLAttributes<HTMLDivElement>

export default class Navbar extends Component<NavbarProps> {
    static Brand = Brand

    render() {
        const { children, className, ...otherProps } = this.props

        const classes = clsx('nami-navbar', className)

        return (
            <div {...otherProps} className={classes}>
                {children}
            </div>
        )
    }
}
