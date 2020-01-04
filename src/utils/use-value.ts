import { useState, Dispatch, SetStateAction } from 'react'

export function useValue<T>(
    value: T,
    defaultValue: T,
    initialValue: T
): [T, Dispatch<SetStateAction<T>>, boolean] {
    // 检测是否同时提供了 value 和 defaultValue
    if (__DEV__) {
        if (value != null && defaultValue != null) {
            console.error('[useValue] 组件不能同处于受控状态及非受控状态')
        }
    }

    // 是否处于受控状态
    const [controlled] = useState(value != null)

    if (controlled) {
        return [
            value ?? initialValue,
            function setValue() {
                if (__DEV__) {
                    console.error('在受控状态下，组件内不应该调用 setValue 以自行改变 value。')
                }

                // noop
            },
            controlled,
        ]
    } else {
        // NOTE 虽说不能在分支或循环语句内调用 useState，但这里的分支条件将保持不变，
        //      因此可以放心使用。
        const [value, setValue] = useState(defaultValue ?? initialValue)
        return [value, setValue, controlled]
    }
}
