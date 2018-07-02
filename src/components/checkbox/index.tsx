import React, { PureComponent, InputHTMLAttributes, ChangeEvent } from 'react'
import classnames from 'classnames'
import omit from 'object.omit'

import Icon from '@components/icon'

import './styles'

interface BaseCheckBoxProps {
    /**
     * 标题文本
     */
    label: string

    /**
     * 是否选中
     */
    checked: boolean

    /**
     * 默认是否选中
     */
    defaultChecked: boolean

    /**
     * 状态
     */
    state: 'success' | 'warning' | 'danger'

    /**
     * 是否禁用
     */
    disabled?: boolean

    /**
     * 选中状态改变处理函数
     */
    onChange?: (e: ChangeEvent<HTMLElement>) => void
}

export type CheckBoxProps = BaseCheckBoxProps & InputHTMLAttributes<HTMLInputElement>

interface CheckBoxState {
    /**
     * 是否为受控状态，this.controlled 属性的镜像，用于在 getDerivedStateFromProps 中访问
     */
    controlled: boolean

    /**
     * 当前是否为选中状态
     */
    checked: boolean
}

/**
 * @component
 *
 * @displayname 复选框
 * @group form
 *
 * @description
 *
 *     传统「CheckBox」风格的切换选择组件；
 *
 *     {@demo "./demos/default.jsx"}
 *
 * @example 状态
 *
 *     通过 `state` 参数定义组件状态：
 *
 *     {@demo "./demos/state.jsx"}
 *
 * @example 禁用
 *
 *     通过 `disabled` 参数，可以禁用组件：
 *
 *     {@demo "./demos/disabled.jsx"}
 *
 *     **注意：**禁用或只读输入框没有状态样式：
 *
 *     {@demo "./demos/disabled-has-state.jsx"}
 */
export default class CheckBox extends PureComponent<CheckBoxProps, CheckBoxState> {
    static propKeys: string[] = [
        'label',
        'checked',
        'defaultChecked',
        'state',
        'disabled',
        'onChange',
    ]

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
        const { label, state, disabled, className } = this.props
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

        return (
            <label {...omit(this.props, CheckBox.propKeys)} className={classes.root}>
                <span className={classes.cell}>
                    <span className={classes.cellFrame} />
                    <Icon className={classes.cellCheck} name="check" />
                    <input
                        className={classes.cellInput}
                        type="checkbox"
                        disabled={disabled}
                        checked={checked}
                        onChange={this.handleChange}
                    />
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
