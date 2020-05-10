import { useState, RefObject, Dispatch, SetStateAction, useRef, useCallback } from 'react'

export function useRefState<S>(
    initialState: S | (() => S)
): [RefObject<S>, Dispatch<SetStateAction<S>>] {
    const [state, setState] = useState(initialState)
    const stateRef = useRef(state)

    const changeState = useCallback((state: S) => {
        setState(state)
        stateRef.current = state
    }, [])

    return [stateRef, changeState]
}
