import React, { Component, HTMLAttributes } from 'react'
import classnames from 'classnames'

interface BaseBrandProps {
    /**
     * 自定义标识内容
     */
    children?: React.ReactNode
}

export type BrandProps = BaseBrandProps & HTMLAttributes<HTMLDivElement>

export default class Brand extends Component<BrandProps> {
    render() {
        const { children, className, ...otherProps } = this.props
        const classes = classnames('nami-navbar-brand', className)

        return (
            <div {...otherProps} className={classes}>
                {children}
            </div>
        )
    }
}
