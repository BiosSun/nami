import { useRef, RefObject } from 'react'
import { useToggle } from '../use-toggle'
import { useMoving } from '../use-moving'

interface UseSliderProps {
    /**
     * 当开始滑动时，触发该事件
     */
    onStart: () => RailRect

    /**
     * 当滑动位置改变时，触发该事件
     */
    onChange: (eventData: UseSliderEventData) => void

    /**
     * 当结束滑动操作后，触发该事件
     */
    onFinish?: () => void
}

/**
 * 滑动信息
 */
export interface UseSliderEventData {
    x: number
    y: number

    breakX: number
    breakY: number

    px: number
    py: number

    breakPX: number
    breakPY: number

    dirX: 'left' | 'right'
    dirY: 'up' | 'down'

    velocity: number
}

/**
 * 滑动区域信息
 */
interface RailRect {
    /**
     * 滑动区域左边界距离视口左侧的距离
     */
    left: number

    /**
     * 滑动区域上边界距离视口顶部的距离
     */
    top: number

    /**
     *滑动区域宽度
     */
    width: number

    /**
     * 滑动区域高度
     */
    height: number
}

interface Result {
    /**
     * 容器元素的引用对象
     */
    ref: RefObject<HTMLElement | null>

    /**
     * 当前是否在滑动中
     */
    sliding: boolean
}

interface StartInfo {
    offsetX: number
    offsetY: number
    timeStamp: number
}

interface PrevInfo {
    x: number
    y: number
    timeStamp: number
}

export function useSlider(props: UseSliderProps): Result {
    const [sliding, startSlide, finishSlide] = useToggle(false)
    const containerRef = useRef<HTMLElement | null>(null)
    const railRectRef = useRef<RailRect>(null)
    const startInfoRef = useRef<StartInfo>(null)
    const prevInfoRef = useRef<PrevInfo[]>([])

    useMoving(containerRef, {
        onStart(event: PointerEvent) {
            const thumb = (event.target as HTMLElement).closest('[role="slider"]')
            const thumbRect = thumb ? thumb.getBoundingClientRect() : null

            railRectRef.current = props.onStart()
            startInfoRef.current = thumbRect
                ? {
                      offsetX: event.clientX - (thumbRect.left + thumbRect.width / 2),
                      offsetY: event.clientY - (thumbRect.top + thumbRect.height / 2),
                      timeStamp: event.timeStamp,
                  }
                : {
                      offsetX: 0,
                      offsetY: 0,
                      timeStamp: event.timeStamp,
                  }
            prevInfoRef.current = [
                {
                    x: event.clientX,
                    y: event.clientY,
                    timeStamp: event.timeStamp,
                },
            ]

            startSlide()
            handleChange(event)
        },

        onMove(event: PointerEvent) {
            handleChange(event)
        },

        onFinish(event: PointerEvent) {
            handleChange(event)
            finishSlide()
            props.onFinish?.()
        },
    })

    function handleChange(event: PointerEvent) {
        const railRect = railRectRef.current
        const startInfo = startInfoRef.current
        const prevInfo = prevInfoRef.current[0]

        const x = event.clientX - startInfo.offsetX - railRect.left
        const y = event.clientY - startInfo.offsetY - railRect.top
        const px = x / railRect.width
        const py = y / railRect.height
        const deltaX = event.clientX - prevInfo.x
        const deltaY = event.clientY - prevInfo.y

        props.onChange({
            x: Math.min(Math.max(0, x), railRect.width),
            y: Math.min(Math.max(0, y), railRect.height),

            breakX: x,
            breakY: y,

            px: Math.min(Math.max(0, px), 1),
            py: Math.min(Math.max(0, py), 1),

            breakPX: px,
            breakPY: py,

            dirX: deltaX > 0 ? 'right' : 'left',
            dirY: deltaY > 0 ? 'down' : 'up',

            velocity:
                Math.sqrt(Math.abs(deltaX) ** 2 + Math.abs(deltaY) ** 2) /
                (event.timeStamp - prevInfo.timeStamp),
        })

        prevInfoRef.current.push({
            x: event.clientX,
            y: event.clientY,
            timeStamp: event.timeStamp,
        })

        if (prevInfoRef.current.length > 10) {
            prevInfoRef.current.shift()
        }
    }

    return {
        ref: containerRef,
        sliding,
    }
}
