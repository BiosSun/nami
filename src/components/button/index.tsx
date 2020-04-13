import React, { ReactNode, MouseEvent, ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

import { State } from '../../utils'

import './index.scss'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    /**
     * 按钮类型
     */
    type: 'primary' | 'info' | State

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

export default function Button({
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
}: ButtonProps) {
    const classNames = {
        root: clsx(
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
        <button {...otherProps} className={classNames.root} disabled={disabled} onClick={onClick}>
            <span className={classNames.text}>{children}</span>
        </button>
    )
}
