import React, { Component } from 'react'
import classnames from 'classnames'
import CommonProps from '@utils/common-props'

import './styles'

export interface ButtonProps extends CommonProps<Button> {
    /**
     * 按钮类型；
     * @default 'type'
     */
    type: 'primary' | 'info' | 'success' | 'warning' | 'danger'

    /**
     * 轮廓按钮；
     */
    outline: boolean

    /**
     * 文字按钮；
     */
    flat: boolean

    /**
     * 圆角按钮；
     */
    round: boolean

    /**
     * 圆形按钮；
     */
    circle: boolean

    /**
     * 是否已禁用；
     * @default false
     */
    disabled?: boolean

    /**
     * 按钮中显示的内容；
     */
    children: React.ReactNode
}

interface ButtonState {}

/**
 * @component
 *
 * @displayname 按钮
 * @group general
 *
 * @description
 *
 *     用于触发某个操作，并体现当前的操作状态：可触发、进行中、已禁用……
 *
 *     {@demo "./demos/default.jsx"}
 *
 * @example 样式
 *
 *     通过 `type` 参数定义按钮配色类型，并通过 `outline`、`round`、`circle`、`shadow` 来定义按钮外形：
 *
 *     {@demo "./demos/mode-type.jsx"}
 *
 * @example 禁用
 *
 *     通过 `disabled` 参数，可以设置按钮为禁用状态：
 *
 *     {@demo "./demos/disabled.jsx"}
 */
export default class Button extends Component<ButtonProps, ButtonState> {
    static defaultProps = {
        mode: 'plain',
    }

    render() {
        const {
            type,
            outline,
            flat,
            round,
            circle,
            disabled,
            children,
            className,
            style,
        } = this.props

        const classes = {
            root: classnames(
                'button',
                `button--${type}`,
                {
                    [`button--outline`]: outline,
                    [`button--flat`]: flat,
                    [`button--round`]: round,
                    [`button--circle`]: circle,
                    [`button--disabled`]: disabled,
                },
                className
            ),

            text: 'button__text',
        }

        return (
            <button className={classes.root} style={style} disabled={disabled}>
                <span className={classes.text}>{children}</span>
            </button>
        )
    }
}
