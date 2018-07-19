import React, { Component, ReactNode, MouseEvent, ButtonHTMLAttributes } from 'react'
import classnames from 'classnames'

import './index.scss'

interface BaseButtonProps {
    /**
     * 按钮类型
     */
    type: 'primary' | 'info' | 'success' | 'warning' | 'danger'

    /**
     * 轮廓按钮
     */
    outline: boolean

    /**
     * 文字按钮
     */
    flat: boolean

    /**
     * 圆角按钮
     */
    round: boolean

    /**
     * 圆形按钮
     */
    circle: boolean

    /**
     * 是否已禁用
     */
    disabled?: boolean

    /**
     * 按钮点击事件处理函数
     */
    onClick: (e: MouseEvent<HTMLElement>) => void

    /**
     * 按钮中显示的内容
     */
    children: ReactNode
}

export type ButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement>

export default class Button extends Component<ButtonProps> {
    render() {
        const {
            type,
            outline,
            flat,
            round,
            circle,
            disabled,
            onClick,
            children,
            className,
            ...otherProps
        } = this.props

        const classes = {
            root: classnames(
                'nami-button',
                {
                    [`nami-button--${type}`]: !!type,
                    [`nami-button--outline`]: outline,
                    [`nami-button--flat`]: flat,
                    [`nami-button--round`]: round,
                    [`nami-button--circle`]: circle,
                },
                className
            ),

            text: 'nami-button__text',
        }

        return (
            <button {...otherProps} className={classes.root} disabled={disabled} onClick={onClick}>
                <span className={classes.text}>{children}</span>
            </button>
        )
    }
}
