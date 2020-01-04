import React, {
    FunctionComponent,
    InputHTMLAttributes,
    ChangeEvent,
    LabelHTMLAttributes,
    useContext,
} from 'react'
import classnames from 'classnames'
import { State, useValue } from '@utils'
import Icon from '@components/icon'
import { CheckBoxGroupContext } from './checkbox-group-context'

type OnChange = (event: ChangeEvent<HTMLInputElement>, value: string, checked: boolean) => void

export type CheckBoxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> &
    Omit<LabelHTMLAttributes<HTMLLabelElement>, 'onChange'> & {
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
        state?: State

        /**
         * 是否禁用
         */
        disabled?: boolean

        /**
         * 选中状态改变处理函数
         */
        onChange?: OnChange
    }

export type CheckBoxType = FunctionComponent<CheckBoxProps>

export const CheckBox: CheckBoxType = ({
    name,
    label,
    checked,
    defaultChecked,
    value,
    state,
    disabled,
    className,
    onChange,
    onFocus,
    onBlur,
    ...otherProps
}) => {
    const groupInfo = useContext(CheckBoxGroupContext)
    const isInGroup = !!groupInfo

    // 如果被包裹在一个 CheckBoxGroup 组件中，则完全受 Group 组件控制
    if (isInGroup) {
        name = groupInfo.name
        checked = groupInfo.value.includes(value)
        state = groupInfo.state
        disabled = groupInfo.disabled
        onChange = groupInfo.onChange
    }

    const [innerChecked, setInnerChecked, controlled] = useValue(checked, defaultChecked, false)

    function handleChange(event: ChangeEvent<HTMLInputElement>): void {
        const { value, checked } = event.target

        onChange?.(event, value, checked)

        if (!controlled && !event.defaultPrevented) {
            setInnerChecked(checked)
        }
    }

    const classNames = {
        root: classnames(
            'nami-checkbox',
            {
                [`nami-checkbox--${state}`]: !!state,
                [`nami-checkbox--disabled`]: disabled,
                [`nami-checkbox--checked`]: innerChecked,
            },
            className
        ),
        cell: `nami-checkbox__cell`,
        cellFrame: `nami-checkbox__cell__frame`,
        cellCheck: `nami-checkbox__cell__check`,
        cellInput: `nami-checkbox__cell__input`,
    }

    return (
        <label {...otherProps} className={classNames.root}>
            <span className={classNames.cell}>
                <input
                    className={classNames.cellInput}
                    type="checkbox"
                    name={name}
                    checked={innerChecked}
                    value={value}
                    disabled={disabled}
                    onChange={handleChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
                <span className={classNames.cellFrame} />
                <Icon className={classNames.cellCheck} name="check" />
            </span>
            {label ? <span>{label}</span> : null}
        </label>
    )
}
