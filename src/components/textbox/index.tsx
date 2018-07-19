import React, { Component, InputHTMLAttributes, ChangeEvent } from 'react'
import classnames from 'classnames'

import './index.scss'

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
     */
    type?: string

    /**
     * 状态
     */
    state?: 'success' | 'warning' | 'danger'

    /**
     * 是否禁用
     */
    disabled?: boolean

    /**
     * 内容修改处理函数
     */
    onChange?: (e: ChangeEvent<HTMLElement>) => void
}

export type TextBoxProps = BaseTextBoxProps & InputHTMLAttributes<HTMLInputElement>

export default class TextBox extends Component<TextBoxProps> {
    static defaultProps: TextBoxProps = {
        type: 'text',
    }

    render() {
        const { type, state, disabled, className, ...otherProps }: TextBoxProps = this.props // NOTE: 这里通过指定 TextBoxProps 类型以使 otherProps 变为可写的

        const classes = {
            root: classnames(
                'nami-textbox',
                {
                    [`nami-textbox--${state}`]: !!state,
                    [`nami-textbox--disabled`]: disabled,
                },
                className
            ),

            editor: 'nami-textbox__editor',
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
