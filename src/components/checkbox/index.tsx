import React, { PureComponent, InputHTMLAttributes, ChangeEvent, LabelHTMLAttributes } from 'react'
import classnames from 'classnames'

import Icon from '@components/icon'

import './index.scss'

export interface BaseCheckBoxProps {
    /**
     * 该复选框所属分组的名字
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

export type InputCheckBoxProps = BaseCheckBoxProps & InputHTMLAttributes<HTMLInputElement>
export type CheckBoxProps = InputCheckBoxProps & LabelHTMLAttributes<HTMLLabelElement>

export interface CheckBoxState {
    /**
     * 是否为受控状态，this.controlled 属性的镜像，用于在 getDerivedStateFromProps 中访问
     */
    controlled: boolean

    /**
     * 当前是否为选中状态
     */
    checked: boolean
}

export default class CheckBox extends PureComponent<CheckBoxProps, CheckBoxState> {
    // 该组件实例是否处于受控状态
    controlled: boolean = 'checked' in this.props

    // 指定 state 默认值
    readonly state: CheckBoxState = {
        controlled: this.controlled,
        checked: !!(this.controlled ? this.props.checked : this.props.defaultChecked),
    }

    static getDerivedStateFromProps(props: CheckBoxProps, state: CheckBoxState): CheckBoxState {
        return {
            ...state,
            checked: state.controlled ? !!props.checked : state.checked,
        }
    }

    render() {
        const {
            label,
            state,
            className,

            name,
            checked: _c,
            defaultChecked,
            value,
            disabled,
            onChange,
            onFocus,
            onBlur,

            ...otherProps
        } = this.props

        const { checked } = this.state

        const classes = {
            root: classnames(
                'nami-checkbox',
                {
                    [`nami-checkbox--${state}`]: !!state,
                    [`nami-checkbox--disabled`]: disabled,
                    [`nami-checkbox--checked`]: checked,
                },
                className
            ),
            cell: `nami-checkbox__cell`,
            cellFrame: `nami-checkbox__cell__frame`,
            cellCheck: `nami-checkbox__cell__check`,
            cellInput: `nami-checkbox__cell__input`,
        }

        const inputProps: InputCheckBoxProps = {
            name,
            checked,
            value,
            disabled,
            onChange: this.handleChange,
            onFocus,
            onBlur,
        }

        return (
            <label {...otherProps} className={classes.root}>
                <span className={classes.cell}>
                    <input className={classes.cellInput} type="checkbox" {...inputProps} />
                    <span className={classes.cellFrame} />
                    <Icon className={classes.cellCheck} name="check" />
                </span>
                {label ? <span>{label}</span> : null}
            </label>
        )
    }

    handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { onChange } = this.props
        onChange && onChange(e)

        if (!this.controlled && !e.defaultPrevented) {
            this.setState({
                checked: e.target.checked,
            })
        }
    }
}
