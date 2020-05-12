import { useRef, MutableRefObject } from 'react'

export function useValueRef<T>(value: T): MutableRefObject<T> {
    const ref = useRef<T>(null)
    ref.current = value
    return ref
}
