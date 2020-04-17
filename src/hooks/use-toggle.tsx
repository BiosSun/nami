import { useState, useRef } from 'react'

type Open = () => void
type Close = () => void
type Toggle = (value: boolean) => void

export function useToggle(initialState: boolean): [boolean, Open, Close, Toggle] {
    const [state, setState] = useState(initialState)

    const { current: open } = useRef(() => {
        setState(true)
    })

    const { current: close } = useRef(() => {
        setState(false)
    })

    const { current: toggle } = useRef((val: boolean) => {
        if (typeof val === 'boolean') {
            setState(!!val)
        } else {
            setState(state => !state)
        }
    })

    return [state, open, close, toggle]
}
