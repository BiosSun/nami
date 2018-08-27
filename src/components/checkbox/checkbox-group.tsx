import React, { PureComponent, ChangeEvent, createContext, ReactNode, HTMLAttributes } from 'react'
import classnames from 'classnames'
import omit from 'object.omit'

import { Omit, State } from '@utils/types'

export interface CheckBoxGroupContextData {
    /**
     * 该复选框组的名字
     */
    name?: string

    /**
     * 该分组中所有选中项的值
     */
    value: Set<string>

    /**
     * 选中项改变处理函数
     */
    onChange: (e: ChangeEvent<HTMLInputElement>, value: string, checked: boolean) => void

    /**
     * 状态
     */
    state?: State

    /**
     * 是否禁用
     */
    disabled?: boolean
}

export const CheckBoxGroupContext = createContext<CheckBoxGroupContextData>(undefined)

export interface BaseCheckBoxGroupProps {
    /**
     * 该单选框组的名字
     */
    name?: string

    /**
     * 该分组中所有选中项的值
     */
    value?: string[]

    /**
     * 该分组中默认所有选中项的值
     */
    defaultValue?: string[]

    /**
     * 状态
     */
    state?: State

    /**
     * 是否禁用
     */
    disabled?: boolean

    /**
     * 选中项改变处理函数
     */
    onChange?: (e: ChangeEvent<HTMLElement>, value: string[]) => void

    /**
     * 该分组中所包含的单选框组件
     */
    children: ReactNode
}

export type CheckBoxGroupProps = BaseCheckBoxGroupProps &
    Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>

interface CheckBoxGroupState {
    /**
     * 是否为受控状态，this.controlled 属性的镜像，用于在 getDerivedStateFromProps 中访问
     */
    controlled: boolean

    /**
     * 所选中项的值
     */
    value: Set<string>
}

export default class CheckBoxGroup extends PureComponent<CheckBoxGroupProps, CheckBoxGroupState> {
    static propKeys = ['name', 'value', 'defaultValue', 'state', 'disabled', 'onChange', 'children']

    // 该组件实例是否处于受控状态
    controlled: boolean = 'value' in this.props

    // 指定 state 默认值
    readonly state: Readonly<CheckBoxGroupState> = {
        controlled: this.controlled,
        value: this.controlled ? new Set(this.props.value) : new Set(this.props.defaultValue),
    }

    static getDerivedStateFromProps(
        props: CheckBoxGroupProps,
        state: CheckBoxGroupState
    ): CheckBoxGroupState {
        return {
            ...state,
            value: state.controlled ? new Set(props.value) : state.value,
        }
    }

    render() {
        const { name, state, disabled, className, style, children } = this.props
        const { value } = this.state

        const classes = classnames('nami-checkbox-group', className)
        const context = {
            name,
            value,
            state,
            disabled,
            onChange: this.handleChange,
        }

        return (
            <div {...omit(this.props, CheckBoxGroup.propKeys)} className={classes} style={style}>
                <CheckBoxGroupContext.Provider value={context}>
                    {children}
                </CheckBoxGroupContext.Provider>
            </div>
        )
    }

    handleChange = (e: ChangeEvent<HTMLInputElement>, v: string, checked: boolean) => {
        const { onChange } = this.props
        const value = new Set(this.state.value)

        if (checked) {
            value.add(v)
        } else {
            value.delete(v)
        }

        onChange && onChange(e, Array.from(value))

        if (!this.controlled && !e.defaultPrevented) {
            this.setState({ value })
        }
    }
}
