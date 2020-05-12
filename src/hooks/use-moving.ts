import { RefObject, useLayoutEffect } from 'react'
import { useValueRef } from './use-value-ref'

export function useMoving(
    handleRef: RefObject<HTMLElement | null>,
    listeners: {
        onStart(event: PointerEvent): void
        onMove(event: PointerEvent): void
        onFinish(event: PointerEvent): void
    }
) {
    const listenersRef = useValueRef(listeners)

    useLayoutEffect(() => {
        const handle = handleRef.current

        if (!handle) {
            return
        }

        function bindMoving() {
            document.addEventListener('pointermove', handleMove, { passive: true })
            document.addEventListener('pointercancel', handleFinish, false)
            document.addEventListener('pointerup', handleFinish, false)
        }

        function unbindMoving() {
            document.removeEventListener('pointermove', handleMove)
            document.removeEventListener('pointercancel', handleFinish, false)
            document.removeEventListener('pointerup', handleFinish, false)
        }

        function handleStart(event: PointerEvent) {
            listenersRef.current.onStart(event)
            bindMoving()
        }

        function handleMove(event: PointerEvent) {
            listenersRef.current.onMove(event)
        }

        function handleFinish(event: PointerEvent) {
            unbindMoving()
            listenersRef.current.onFinish(event)
        }

        handle.addEventListener('pointerdown', handleStart)

        return () => {
            handle.removeEventListener('pointerdown', handleStart)
            unbindMoving()
        }
    }, [handleRef.current])
}
