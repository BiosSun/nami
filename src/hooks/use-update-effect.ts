import { useEffect } from 'react'
import { useFirstMountState } from './use-first-mount-state'

export const useUpdateEffect: typeof useEffect = (effect, deps) => {
    const isFirstMount = useFirstMountState()

    useEffect(() => {
        if (!isFirstMount) {
            return effect()
        }
    }, deps)
}
