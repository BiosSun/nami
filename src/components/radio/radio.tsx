import React, { PureComponent, InputHTMLAttributes, ChangeEvent, LabelHTMLAttributes } from 'react'
import classnames from 'classnames'

import { Omit, State } from '@utils/types'

import { default as Group, RadioGroupContext, RadioGroupContextData } from './radio-group'

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
    state?: State

    /**
     * 是否禁用
     */
    disabled?: boolean

    /**
     * 选中状态改变处理函数
     */
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export type InputRadioProps = BaseRadioProps & InputHTMLAttributes<HTMLInputElement>
export type RadioProps = InputRadioProps & Omit<LabelHTMLAttributes<HTMLLabelElement>, 'onChange'>

export default class Radio extends PureComponent<RadioProps> {
    static Group = Group

    render() {
        return (
            <RadioGroupContext.Consumer>
                {groupInfo => this.renderRadio(groupInfo)}
            </RadioGroupContext.Consumer>
        )
    }

    renderRadio(groupInfo: RadioGroupContextData) {
        const isInGroup = !!groupInfo

        let {
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

        if (isInGroup) {
            name = groupInfo.name
            checked = value === groupInfo.value
            state = groupInfo.state
            disabled = groupInfo.disabled
            onChange = groupInfo.onChange
        }

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

        if (isInGroup) {
            inputProps.checked = checked
        } else {
            if ('checked' in this.props) {
                inputProps.checked = checked
            }

            if ('defaultChecked' in this.props) {
                inputProps.defaultChecked = defaultChecked
            }
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
