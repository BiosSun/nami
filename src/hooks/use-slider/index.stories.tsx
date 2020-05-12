/* eslint-disable react/jsx-key */
import React, { useState, useRef, RefObject } from 'react'

import { useSlider, UseSliderEventData } from '@biossun/nami'
import { DemoStage } from '@biossun/nami/storybook-utils'
import styles from './index.stories.module.scss'
import clsx from 'clsx'

export default {
    title: 'useSlide',
}

function Debug() {
    const [eventData, setEventData] = useState<UseSliderEventData>(null)
    const railRef = useRef(null)

    const slide = useSlider({
        onStart() {
            return railRef.current.getBoundingClientRect()
        },

        onChange(eventData) {
            setEventData(eventData)
        },
    })

    return (
        <div
            className={clsx(styles.debugSlider, { [styles.grabbing]: slide.sliding })}
            ref={slide.ref as RefObject<HTMLDivElement>}
        >
            <div className={styles.rail} ref={railRef}>
                <div
                    role="slider"
                    className={styles.thumb}
                    style={{
                        left: (eventData?.px ?? 0) * 100 + '%',
                        top: (eventData?.py ?? 0) * 100 + '%',
                    }}
                />
            </div>
            <div className={styles.note}>{JSON.stringify(eventData, null, 4)}</div>
        </div>
    )
}

function Horizontal() {
    const [value, setValue] = useState<number>(0)
    const railRef = useRef(null)

    const slide = useSlider({
        onStart() {
            return railRef.current.getBoundingClientRect()
        },

        onChange({ px }) {
            setValue(px)
        },
    })

    return (
        <div
            className={clsx(styles.horizontalSlider, { [styles.grabbing]: slide.sliding })}
            ref={slide.ref as RefObject<HTMLDivElement>}
        >
            <div className={styles.rail} ref={railRef}>
                <div role="slider" className={styles.thumb} style={{ left: value * 100 + '%' }} />
            </div>
        </div>
    )
}

function Vertical() {
    const [value, setValue] = useState(0)
    const railRef = useRef(null)

    const slide = useSlider({
        onStart() {
            return railRef.current.getBoundingClientRect()
        },

        onChange({ py }) {
            setValue(py)
        },
    })

    return (
        <div
            className={clsx(styles.verticalSlider, { [styles.grabbing]: slide.sliding })}
            ref={slide.ref as RefObject<HTMLDivElement>}
        >
            <div className={styles.rail} ref={railRef}>
                <div role="slider" className={styles.thumb} style={{ top: value * 100 + '%' }} />
            </div>
        </div>
    )
}

function Circle() {
    const [value, setValue] = useState([0.5, 0])
    const [info, setInfo] = useState({ x: 0, y: 0.5, r: 0, r_360: 0 })
    const railRef = useRef(null)

    const slide = useSlider({
        onStart() {
            return railRef.current.getBoundingClientRect()
        },

        onChange({ px, py }) {
            const x = px - 0.5
            const y = 0.5 - py
            const DPI = Math.PI * 2
            const atan2 = Math.atan2(x, y)
            let r = (DPI + atan2) % DPI

            setInfo({
                x,
                y,
                r,
                r_360: Math.round((r / (2 * Math.PI)) * 360),
            })

            setValue([0.5 + Math.sin(r) / 2, 0.5 - Math.cos(r) / 2])
        },
    })

    return (
        <div
            className={clsx(styles.circleSlider, { [styles.grabbing]: slide.sliding })}
            ref={slide.ref as RefObject<HTMLDivElement>}
        >
            <div className={styles.rail} ref={railRef}>
                <div
                    role="slider"
                    className={styles.thumb}
                    style={{
                        left: value[0] * 100 + '%',
                        top: value[1] * 100 + '%',
                    }}
                />
            </div>
            <div className={styles.note}>{JSON.stringify(info, null, 4)}</div>
        </div>
    )
}

function Planar() {
    const [value, setValue] = useState([0, 0])
    const railRef = useRef(null)

    const slide = useSlider({
        onStart() {
            return railRef.current.getBoundingClientRect()
        },

        onChange({ px, py }) {
            setValue([px, py])
        },
    })

    return (
        <div
            className={clsx(styles.planarSlider, { [styles.grabbing]: slide.sliding })}
            ref={slide.ref as RefObject<HTMLDivElement>}
        >
            <div className={styles.rail} ref={railRef}>
                <div
                    role="slider"
                    className={styles.thumb}
                    style={{
                        left: value[0] * 100 + '%',
                        top: value[1] * 100 + '%',
                    }}
                />
            </div>
        </div>
    )
}

export const common = () => {
    return (
        <DemoStage.Area title="useSlider">
            <DemoStage.Area name="调试信息" border>
                <Debug />
            </DemoStage.Area>
            <DemoStage.Area name="水平" border>
                <Horizontal />
            </DemoStage.Area>
            <DemoStage.Area name="垂直" border>
                <Vertical />
            </DemoStage.Area>
            <DemoStage.Area name="圆" border>
                <Circle />
            </DemoStage.Area>
            <DemoStage.Area name="二维" border>
                <Planar />
            </DemoStage.Area>
        </DemoStage.Area>
    )
}
