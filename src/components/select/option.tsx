import React, { Component, ReactNode, HTMLAttributes, createRef } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { SelectValue, SelectEvent, selectEventFactory } from './utils'
import shallowequal from 'shallowequal'
import noop from '@utils/noop'

export interface BaseOptionProps {
    /**
     * 该选项的值
     */
    value?: SelectValue

    /**
     * 该选项的显示内容
     */
    children?: ReactNode

    /**
     * 是否禁用该选项
     * @default false
     */
    disabled?: boolean

    /**
     * @private
     * 被选中项的值（由 Select 组件传入）<br>
     * *各选项须判断自己的值是否与该值相等（===），若相等则可认为自己被选中。*
     */
    selectedValue?: string

    /**
     * @private
     * 被选中项的展示文本（由 Select 组件传入）<br>
     * *若选项判断自己已被选中，但 label 与自己的不一致，则需要通过 onNeedRefreshLabel 通知更新。*
     */
    selectedLabel?: string

    /**
     * @private
     * 该选项被选中时的事件处理函数（由 Select 组件传入）
     */
    onSelect?: (e: SelectEvent) => void

    /**
     * @private
     * 当选项检测到自己为被选中项，但是 Select 中的 label 与自己的不同时，
     * 通过该事件回调来通知 Select 进行更新。
     */
    onNeedRefreshLabel?: (value: SelectValue, label: string) => void
}

export type OptionProps = BaseOptionProps & HTMLAttributes<HTMLDivElement>

export default class Option extends Component<OptionProps> {
    static propTypes = {
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.symbol]),
        disabled: PropTypes.bool,
        onSelect: PropTypes.func,
        onNeedRefreshLabel: PropTypes.func,
    }

    static defaultProps: OptionProps = {
        disabled: false,
        onSelect: noop,
        onNeedRefreshLabel: noop,
    }

    ref = createRef<HTMLDivElement>()

    componentDidMount() {
        this.refreshLabelWhenNeed()
    }

    shouldComponentUpdate(nextProps: OptionProps): boolean {
        const { props } = this

        const selectChanged = this.isSelected(props) !== this.isSelected(nextProps)
        const ownPropsEquals = shallowequal(
            props,
            nextProps,
            (_p, _n, propName) =>
                propName === 'selectedValue' || propName === 'selectedLabel' ? true : undefined
        )

        return selectChanged || !ownPropsEquals
    }

    componentDidUpdate() {
        this.refreshLabelWhenNeed()
    }

    render() {
        const {
            className,
            value,
            children,
            disabled,
            selectedValue,
            selectedLabel,
            onSelect,
            onNeedRefreshLabel,
            ...otherProps
        } = this.props

        const classes = {
            root: classnames('nami-select-panel__option', {
                'nami-select-panel__option--selected': this.isSelected(),
                'nami-select-panel__option--disabled': disabled,
            }),
        }

        if (disabled) {
            Object.assign(otherProps, {
                'data-disabled': true,
            })
        }

        return (
            <div {...otherProps} ref={this.ref} className={classes.root} onClick={this.handleClick}>
                {children}
            </div>
        )
    }

    handleClick = () => {
        this.triggerSelected()
    }

    private triggerSelected() {
        const { disabled } = this.props

        if (disabled || this.isSelected()) {
            return
        }

        const { onSelect, value } = this.props
        const label = this.getLabel()

        onSelect(selectEventFactory(value, label))
    }

    private isSelected(props: OptionProps = this.props): boolean {
        const { value, selectedValue } = props
        return value === selectedValue
    }

    private getLabel(): string {
        return this.ref.current.textContent
    }

    private refreshLabelWhenNeed(): void {
        if (this.isSelected()) {
            const label = this.getLabel()
            const { value, selectedLabel, onNeedRefreshLabel } = this.props

            if (label !== selectedLabel) {
                onNeedRefreshLabel(value, label)
            }
        }
    }
}
