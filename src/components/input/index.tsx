import React, { Component, InputHTMLAttributes, ChangeEvent } from 'react'
import classnames from 'classnames'

import './styles'

interface BaseInputProps {
    /**
     * 默认内容
     */
    defaultValue?: string

    /**
     * 内容
     */
    value?: string

    /**
     * 内容类型
     * @default 'text'
     */
    type?: string

    /**
     * 状态
     */
    state?: 'success' | 'warning' | 'danger'

    /**
     * 圆角框
     */
    round?: boolean

    /**
     * 是否已禁用
     * @default false
     */
    disabled?: boolean

    /**
     * 内容修改处理函数
     */
    onChange?: (e: ChangeEvent<HTMLElement>) => void
}

export type InputProps = BaseInputProps & InputHTMLAttributes<HTMLInputElement>

/**
 * @component
 *
 * @displayname 输入框
 * @group form
 *
 * @description
 *
 *     用于输入内容；
 *
 *     {@demo "./demos/default.jsx"}
 *
 * @example 状态
 *
 *     通过 `state` 参数定义按钮配状态：
 *
 *     {@demo "./demos/state.jsx"}
 *
 * @example 禁用、只读
 *
 *     通过 `disabled` 或 `readOnly` 参数，可以设置输入框为禁用或只读状态：
 *
 *     {@demo "./demos/disabled.jsx"}
 *
 *     **注意：**禁用或只读输入框没有状态样式：
 *
 *     {@demo "./demos/disabled-has-state.jsx"}
 */
export default class Input extends Component<InputProps> {
    static defaultProps: InputProps = {
        type: 'text',
    }

    render() {
        const { type, state, disabled, round, className, ...otherProps }: InputProps = this.props // NOTE: 这里通过指定 InputProps 类型以使 otherProps 变为可写的

        const classes = {
            root: classnames(
                'input',
                {
                    [`input--${state}`]: !!state,
                    [`input--round`]: round,
                    [`input--disabled`]: disabled,
                },
                className
            ),

            editor: 'input__editor',
        }

        if ('value' in otherProps) {
            otherProps.value = otherProps.value == null ? '' : otherProps.value
            delete otherProps.defaultValue
        }

        return (
            <div className={classes.root}>
                <input {...otherProps} className={classes.editor} type={type} disabled={disabled} />
            </div>
        )
    }
}
