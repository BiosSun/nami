export type SelectValue = string | number

export interface SelectEventDetail {
    /**
     * 被选中项的值
     */
    value: SelectValue

    /**
     * 被选中项的展示文本
     */
    label: string
}

export type SelectEvent = CustomEvent<SelectEventDetail>

export function selectEventFactory(value: SelectValue, label: string): SelectEvent {
    return new CustomEvent<SelectEventDetail>('select', {
        detail: { value, label },
    })
}
