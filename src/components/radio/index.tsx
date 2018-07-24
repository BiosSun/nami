import React, { PureComponent, InputHTMLAttributes, ChangeEvent, LabelHTMLAttributes } from 'react'
import classnames from 'classnames'

import './index.scss'

export interface BaseRadioProps {
    /**
     * 该单选框所属分组的名字
     */
    name?: string

    /**
     * 标题文本
     */
    label?: string

    /**
     * 是否选中
     */
    checked?: boolean

    /**
     * 默认是否选中
     */
    defaultChecked?: boolean

    /**
     * 表单值
     */
    value?: string

    /**
     * 状态
     */
    state?: 'success' | 'warning' | 'danger'

    /**
     * 是否禁用
     */
    disabled?: boolean

    /**
     * 选中状态改变处理函数
     */
    onChange?: (e: ChangeEvent<HTMLElement>) => void
}

export type InputRadioProps = BaseRadioProps & InputHTMLAttributes<HTMLInputElement>
export type RadioProps = InputRadioProps & LabelHTMLAttributes<HTMLLabelElement>

export default class Radio extends PureComponent<RadioProps> {
    render() {
        const {
            label,
            state,
            className,

            name,
            checked,
            defaultChecked,
            value,
            disabled,
            onChange,
            onFocus,
            onBlur,

            ...otherProps
        } = this.props

        const classes = {
            root: classnames(
                'nami-radio',
                {
                    [`nami-radio--${state}`]: !!state,
                    [`nami-radio--disabled`]: disabled,
                },
                className
            ),
            cell: `nami-radio__cell`,
            cellFrame: `nami-radio__cell__frame`,
            cellCheck: `nami-radio__cell__check`,
            cellInput: `nami-radio__cell__input`,
        }

        const inputProps: InputRadioProps = { name, value, disabled, onChange, onFocus, onBlur }

        if ('checked' in this.props) {
            inputProps.checked = checked
        }

        if ('defaultChecked' in this.props) {
            inputProps.defaultChecked = defaultChecked
        }

        return (
            <label {...otherProps} className={classes.root}>
                <span className={classes.cell}>
                    <input className={classes.cellInput} type="radio" {...inputProps} />
                    <span className={classes.cellFrame} />
                    <span className={classes.cellCheck} />
                </span>
                {label ? <span>{label}</span> : null}
            </label>
        )
    }
}
