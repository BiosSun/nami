import React, { Component, InputHTMLAttributes, ChangeEvent } from 'react'
import clsx from 'clsx'
import { State, noop } from '../../utils'

import './index.scss'

export interface BaseTextBoxProps {
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
    state?: State

    /**
     * 是否禁用
     */
    disabled?: boolean

    /**
     * 内容修改处理函数
     */
    onChange?: (e: ChangeEvent<HTMLInputElement>, value: string) => void
}

export type TextBoxProps = BaseTextBoxProps &
    Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>

export default class TextBox extends Component<TextBoxProps> {
    static defaultProps: TextBoxProps = {
        type: 'text',
        onChange: noop,
    }

    render() {
        const {
            type,
            state,
            disabled,
            className,
            onChange,
            ...otherProps
        }: TextBoxProps = this.props // NOTE: 这里通过指定 TextBoxProps 类型以使 otherProps 变为可写的

        const classes = {
            root: clsx(
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
                <input
                    {...otherProps}
                    className={classes.editor}
                    type={type}
                    disabled={disabled}
                    onChange={this.changeHandle}
                />
            </div>
        )
    }

    changeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(e, e.target.value)
    }
}
