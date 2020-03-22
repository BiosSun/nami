import { ChangeEvent, createContext } from 'react'
import { State } from '../../utils'

export interface CheckBoxGroupContextData {
    /**
     * 该复选框组的名字
     */
    name?: string

    /**
     * 该分组中所有选中项的值
     */
    value: string[]

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
