import React, { PureComponent, ChangeEvent, HTMLAttributes, ReactNode, createContext } from 'react'
import classnames from 'classnames'
import omit from 'object.omit'
import { State, noop } from '../../utils'

export interface RadioGroupContextData {
    /**
     * 该单选框组的名字
     */
    name?: string

    /**
     * 该分组中所选中项的值
     */
    value: string

    /**
     * 选中项改变处理函数
     */
    onChange: (e: ChangeEvent<HTMLInputElement>, value: string) => void

    /**
     * 状态
     */
    state?: State

    /**
     * 是否禁用
     */
    disabled?: boolean
}

export const RadioGroupContext = createContext<RadioGroupContextData>(undefined)

export interface BaseRadioGroupProps {
    /**
     * 该单选框组的名字
     */
    name?: string

    /**
     * 该分组中所选中项的值
     */
    value?: string

    /**
     * 该分组中默认所选中项的值
     */
    defaultValue?: string

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
    onChange?: (e: ChangeEvent<HTMLElement>, value: string) => void

    /**
     * 该分组中所包含的单选框组件
     */
    children?: ReactNode
}

export type RadioGroupProps = BaseRadioGroupProps & HTMLAttributes<HTMLDivElement>

interface RadioGroupState {
    /**
     * 是否为受控状态，this.controlled 属性的镜像，用于在 getDerivedStateFromProps 中访问
     */
    controlled: boolean

    /**
     * 所选中项的值
     */
    value: string
}

export default class RadioGroup extends PureComponent<RadioGroupProps, RadioGroupState> {
    static propKeys = ['name', 'value', 'defaultValue', 'state', 'disabled', 'onChange', 'children']

    static defaultProps: RadioGroupProps = {
        onChange: noop,
    }

    // 该组件实例是否处于受控状态
    controlled: boolean = 'value' in this.props

    // 指定 state 默认值
    readonly state: Readonly<RadioGroupState> = {
        controlled: this.controlled,
        value: this.controlled ? this.props.value : this.props.defaultValue,
    }

    static getDerivedStateFromProps(
        props: RadioGroupProps,
        state: RadioGroupState
    ): RadioGroupState {
        return {
            ...state,
            value: state.controlled ? props.value : state.value,
        }
    }

    render() {
        const { name, state, disabled, className, style, children } = this.props
        const { value } = this.state

        const classes = classnames('nami-radio-group', className)
        const context = {
            name,
            value,
            state,
            disabled,
            onChange: this.handleChange,
        }

        return (
            <div {...omit(this.props, RadioGroup.propKeys)} className={classes} style={style}>
                <RadioGroupContext.Provider value={context}>{children}</RadioGroupContext.Provider>
            </div>
        )
    }

    handleChange = (event: ChangeEvent<HTMLInputElement>, value: string) => {
        const { onChange } = this.props
        onChange && onChange(event, value)

        if (!this.controlled && !event.defaultPrevented) {
            this.setState({ value })
        }
    }
}
