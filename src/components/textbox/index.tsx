import React, { Component, InputHTMLAttributes, ChangeEvent } from 'react'
import classnames from 'classnames'

import './styles'

interface BaseTextBoxProps {
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

export type TextBoxProps = BaseTextBoxProps & InputHTMLAttributes<HTMLInputElement>

/**
 * @component
 *
 * @displayname 文本框
 * @group form
 *
 * @description
 *
 *     用于输入一些简短的文本内容；
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
export default class TextBox extends Component<TextBoxProps> {
    static defaultProps: TextBoxProps = {
        type: 'text',
    }

    render() {
        const { type, state, disabled, round, className, ...otherProps }: TextBoxProps = this.props // NOTE: 这里通过指定 TextBoxProps 类型以使 otherProps 变为可写的

        const classes = {
            root: classnames(
                'textbox',
                {
                    [`textbox--${state}`]: !!state,
                    [`textbox--round`]: round,
                    [`textbox--disabled`]: disabled,
                },
                className
            ),

            editor: 'textbox__editor',
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
