import React, {
    Component,
    HTMLAttributes,
    Children,
    isValidElement,
    cloneElement,
    ReactElement,
    ReactNode,
} from 'react'
import classnames from 'classnames'

import { warning } from '@utils/log'
import noop from '@utils/noop'
import isReactFragment from '@utils/is-react-fragment'
import Icon from '@components/icon'
import Popover from '@components/popover'

import './styles'

import { SelectValue, SelectEvent, selectEventFactory } from './utils'
import Option, { OptionProps } from './option'

export { default as SelectOption, OptionProps as SelectOptionProps } from './option'

interface BaseSelectProps {
    /**
     * 选中值
     */
    value?: SelectValue

    /**
     * 默认选中值
     */
    defaultValue?: SelectValue

    /**
     * 状态
     */
    state?: 'success' | 'warning' | 'danger'

    /**
     * 是否禁用
     * @default false
     */
    disabled?: boolean

    /**
     * 更改所选项处理函数
     */
    onChange?: (e: SelectEvent) => void

    /**
     * 选项
     */
    children?: ReactNode
}

export type SelectProps = BaseSelectProps & HTMLAttributes<HTMLDivElement>

interface SelectState {
    /**
     * 是否为受控状态，this.controlled 属性的镜像，用于在 getDerivedStateFromProps 中访问
     */
    controlled: boolean

    /**
     * 当前选中项的值
     */
    value: SelectValue

    /**
     * 当前选中项的展示文本
     */
    label: string

    /**
     * 是否打开选择弹出层
     */
    open: boolean

    /**
     * 当前是否在等待被选中项返回新的 label 后触发 onChange 事件，
     * 这种情况一般发生在由 select 发起更改选项的时候。
     */
    waitLableToTriggerOnChange: boolean
}

/**
 * @component
 *
 * @displayname 选择框
 * @group form
 *
 * @description
 *
 *     下拉选择框。
 *
 *     {@demo "./demos/default.jsx"}
 *
 * @example 状态
 *
 *     通过 state 参数定义选择框状态：
 *
 *     {@demo "./demos/state.jsx"}
 *
 * @example 禁用
 *
 *     通过 disabled 参数，可以禁用选择框：
 *
 *     {@demo "./demos/disabled.jsx"}
 *
 *     或禁用某个选择：
 *
 *     {@demo "./demos/disabled-option.jsx"}
 */
export default class Select extends Component<SelectProps, SelectState> {
    static Option = Option

    static defaultProps = {
        onChange: noop,
    }

    // 该组件实例是否处于受控状态
    readonly controlled: boolean = 'value' in this.props

    // 指定 state 默认值
    readonly state: SelectState = {
        controlled: this.controlled,
        value: this.controlled ? this.props.value : this.props.defaultValue,
        label: undefined,
        open: false,
        waitLableToTriggerOnChange: false,
    }

    constructor(props: SelectProps, context?: any) {
        super(props, context)

        if ('value' in this.props && 'defaultValue' in this.props) {
            warning.conflictOfControl('select', 'value')
        }

        if ('open' in this.props && typeof this.props.onChange !== 'function') {
            warning.disappearedListenerInControlled('select', 'value', 'onChange', 'modify')
        }
    }

    static getDerivedStateFromProps(props: SelectProps, prevState: SelectState): SelectState {
        const state = { ...prevState }

        if (state.controlled) {
            state.value = props.value
        } else {
            if (state.value == undefined) {
                const firstOption = Select.findFirstOption(props.children)

                if (firstOption) {
                    state.value = firstOption.props.value
                    state.waitLableToTriggerOnChange = true
                } else {
                    warning('Cannot find a valid option in Select component.')
                }
            }
        }

        return state
    }

    componentDidUpdate() {
        if (this.controlled && 'defaultValue' in this.props) {
            warning.controlledToUncontrolled('select', this)
        }

        if (!this.controlled && 'value' in this.props) {
            warning.uncontrolledToControlled('select', this)
        }
    }

    render() {
        const { state, disabled, className, children, ...otherProps }: SelectProps = this.props
        const { value, label, open } = this.state

        const classes = {
            root: classnames(
                'nami-select',
                {
                    [`nami-select--${state}`]: !!state,
                    [`nami-select--open`]: open,
                    [`nami-select--disabled`]: disabled,
                },
                className
            ),

            opened: 'nami-select--open',

            label: 'nami-select__label',
            arrows: 'nami-select__arrows',
            panel: 'nami-select-panel',
        }

        otherProps.tabIndex = 0

        if (disabled) {
            otherProps.tabIndex = undefined

            Object.assign(otherProps, {
                'data-disabled': true,
            })
        }

        const header = (
            <div {...otherProps} className={classes.root} onClick={this.handleHeaderClick}>
                <span className={classes.label}>{label}</span>
                <Icon className={classes.arrows} name="down" />
            </div>
        )

        return (
            <Popover
                of={header}
                className={classes.panel}
                open={open}
                onClose={this.handlePopoverClose}
                widthFollowOf
            >
                {this.mapChildren(children, value, label)}
            </Popover>
        )
    }

    private mapChildren(children: ReactNode, value: SelectValue, label: string): ReactNode[] {
        return Children.map(children, child => {
            if (isReactFragment(child)) {
                return this.mapChildren(child.props.children, value, label)
            } else if (isValidElement(child)) {
                return cloneElement<any>(child, {
                    onSelect: this.handleOptionSelect,
                    onNeedRefreshLabel: this.handleNeedRefreshLabel,
                    selectedValue: value,
                    selectedLabel: label,
                })
            } else {
                return child
            }
        })
    }

    private handleOptionSelect = (e: SelectEvent) => {
        const selected = e.detail

        if (this.state.value !== selected.value) {
            this.props.onChange(e)

            if (!this.controlled && !e.defaultPrevented) {
                this.setState({
                    ...selected,
                    waitLableToTriggerOnChange: false,
                })
            }

            this.setState({ open: false })
        }
    }

    private handleNeedRefreshLabel = (value: SelectValue, label: string) => {
        const state = this.state

        if (value === state.value && label !== state.label) {
            this.setState({ label })

            if (state.waitLableToTriggerOnChange) {
                this.props.onChange(selectEventFactory(value, label))
                this.setState({ waitLableToTriggerOnChange: false })
            }
        }
    }

    private handleHeaderClick = () => {
        this.toggle()
    }

    private handlePopoverClose = () => {
        this.close()
    }

    /**
     * 切换选项选择面板的打开状态
     */
    private toggle() {
        this.state.open ? this.close() : this.open()
    }

    /**
     * 打开选项选择面板
     */
    private open() {
        if (!this.props.disabled) {
            this.setState({ open: !this.state.open })
        }
    }

    /**
     * 关闭选项选择面板
     */
    private close() {
        this.setState({ open: false })
    }

    /**
     * 从子元素中查找第一个选项并返回其选项值
     */
    private static findFirstOption(children: ReactNode): ReactElement<OptionProps> {
        let firstOption: ReactElement<OptionProps> = undefined

        Children.forEach(children, child => {
            if (firstOption) {
                return
            }

            if (!isValidElement<OptionProps>(child)) {
                return
            }

            if (child.type === Option && !child.props.disabled) {
                firstOption = child
            } else {
                firstOption = Select.findFirstOption(child.props.children)
            }
        })

        return firstOption
    }
}
