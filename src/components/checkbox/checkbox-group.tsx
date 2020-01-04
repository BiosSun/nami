import React, { FunctionComponent, HTMLAttributes, ChangeEvent, ReactNode } from 'react'
import classnames from 'classnames'
import { State, useValue } from '@utils'
import { CheckBoxGroupContext } from './checkbox-group-context'

export type CheckBoxGroupProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
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

export type CheckBoxGroupType = FunctionComponent<CheckBoxGroupProps>

export const CheckBoxGroup: CheckBoxGroupType = ({
    name,
    value,
    defaultValue,
    state,
    disabled,
    onChange,
    className,
    children,
    ...otherProps
}) => {
    const [checkedValues, setCheckedValues, controlled] = useValue(value, defaultValue, [])

    function handleItemChange(
        event: ChangeEvent<HTMLInputElement>,
        value: string,
        checked: boolean
    ) {
        const newCheckedValues = getNewCheckedValues(checkedValues, value, checked)

        onChange?.(event, newCheckedValues)

        if (!controlled && !event.defaultPrevented) {
            setCheckedValues(newCheckedValues)
        }
    }

    const context = {
        name,
        value: checkedValues,
        state,
        disabled,
        onChange: handleItemChange,
    }

    className = classnames('nami-checkbox-group', className)

    return (
        <div {...otherProps} className={className}>
            <CheckBoxGroupContext.Provider value={context}>
                {children}
            </CheckBoxGroupContext.Provider>
        </div>
    )
}

function getNewCheckedValues(
    checkedValues: string[],
    itemValue: string,
    itemChecked: boolean
): string[] {
    const vset = new Set(checkedValues)

    if (itemChecked) {
        vset.add(itemValue)
    } else {
        vset.delete(itemValue)
    }

    return Array.from(vset)
}
