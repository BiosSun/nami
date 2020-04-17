import { useToggle } from './index'
import { useSwipeable, EventData } from 'react-swipeable'
import { calcPercent } from '../utils'
import { useRef } from 'react'

interface UseSlideProps {
    /**
     * 获取当前滑块在滑动条中的偏移位置，及最大可允许的偏移位置；
     */
    getOffsetInfo: (event: MouseEvent | TouchEvent) => { offset: number; maxOffset: number }

    /**
     * 当开始滑动时，触发该事件；
     */
    onStart?: (percent?: number) => void

    /**
     * 当在滑动操作中，需要改变滑块位置时，触发该事件；
     */
    onChange: (percent: number) => void

    /**
     * 当结束滑动操作后，触发该事件；
     */
    onFinish: (percent: number) => void
}

interface UseSlideResult {
    /**
     * 当前是否在滑动中；
     */
    sliding: boolean

    /**
     * handles - DOM 操作信息，需要解构到滑块元素上。
     */
    handles: object
}

/**
 * 一个滑动器交互的通用封装模块，所有滑动条组件（仅限一个滑块）都可以基于其实现
 */
export function useSlide(props: UseSlideProps): UseSlideResult {
    const [sliding, startSlide, finishSlide] = useToggle(false)
    const maxOffsetRef = useRef(0)
    const offsetRef = useRef(0)

    const slide = {
        maxOffset: 0,
        offset: 0,

        start({ event }: EventData) {
            startSlide()
            props.onStart?.()

            const offsetInfo = props.getOffsetInfo(event)
            maxOffsetRef.current = offsetInfo.maxOffset
            offsetRef.current = offsetInfo.offset
        },

        move({ deltaX }: EventData) {
            const percent = calcPercent(offsetRef.current - deltaX, maxOffsetRef.current)
            props.onChange(percent)
        },

        finish({ deltaX }: EventData) {
            const percent = calcPercent(offsetRef.current - deltaX, maxOffsetRef.current)

            finishSlide()

            props.onChange(percent)
            props.onFinish(percent)
        },
    }

    const handles = useSwipeable({
        onSwiping(eventData) {
            if (!sliding) {
                slide.start(eventData)
            }

            slide.move(eventData)
        },

        onSwiped(eventData) {
            slide.move(eventData)
            slide.finish(eventData)
        },

        delta: 0,
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
        trackTouch: true,
    })

    return {
        sliding,
        handles,
    }
}
