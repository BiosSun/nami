import React, { PureComponent, HTMLAttributes, CSSProperties, createRef } from 'react'
import classnames from 'classnames'
import omit from 'object.omit'
import { noop, State } from '../../utils'
import EventListener from 'react-event-listener'
import Popover from '../popover'

import './index.scss'

declare module 'react' {
    interface CSSProperties {
        '--slider-knob-position': string
        '--slider-fill-start': string
        '--slider-fill-end': string
    }
}

interface BaseSliderProps {
    /**
     * 所选值
     */
    value?: number

    /**
     * 默认所选值
     */
    defaultValue?: number

    /**
     * 最小值
     */
    min?: number

    /**
     * 最大值
     */
    max?: number

    /**
     * 步进
     */
    step?: number

    /**
     * 状态
     */
    state?: State

    /**
     * 是否禁用
     */
    disabled?: boolean

    /**
     * 所选值改变事件
     */
    onChange?: (event: Event, value: number) => void
}

export type SliderProps = BaseSliderProps & Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>

/**
 * 拖动滑块时所需的相关信息
 */
interface KnobDragInitInfo {
    /**
     * 该滑块的索引
     */
    index: number

    /**
     * 滑动条相对于页面的位置
     */
    bar: {
        pageX: number
        pageY: number
        width: number
        height: number
    }

    /**
     * 触发拖动时指针相对于所拖动的滑块中心点的偏移量
     */
    knobCenter: {
        offsetX: number
        offsetY: number
    }
}

export interface SliderState {
    /**
     * 是否为受控状态，this.controlled 属性的镜像，用于在 getDerivedStateFromProps 中访问
     */
    controlled: boolean

    /**
     * 当前选中值
     */
    value: number

    /**
     * 值的精度
     */
    precision: number

    /**
     * 指针悬停是否在某个滑块上
     */
    knobHoverIndex: false | number

    /**
     * 拖动滑块时所需的初始化信息
     */
    knobDragInitInfo: KnobDragInitInfo
}

export default class Slider extends PureComponent<SliderProps, SliderState> {
    static readonly defaultProps: SliderProps = {
        min: 0,
        max: 100,
        step: 1,
        disabled: false,
        onChange: noop,
    }

    static readonly propKeys = [
        'value',
        'defaultValue',
        'min',
        'max',
        'step',
        'state',
        'disabled',
        'onChange',
    ]

    readonly controlled: boolean = 'value' in this.props

    readonly state: SliderState = {
        controlled: this.controlled,
        value: (this.controlled ? this.props.value : this.props.defaultValue) || this.props.min,
        knobDragInitInfo: undefined,
        knobHoverIndex: false,
        precision: 0,
    }

    readonly barRef = createRef<HTMLDivElement>()

    static getDerivedStateFromProps(props: SliderProps, prevState: SliderState): SliderState {
        const state = {
            ...prevState,
            value: prevState.controlled ? props.value : prevState.value,
            precision: Math.max(
                Slider.calcPrecision(props.min),
                Slider.calcPrecision(props.max),
                Slider.calcPrecision(props.step)
            ),
        }

        return state
    }

    render() {
        const { state, disabled, className } = this.props
        const { knobDragInitInfo } = this.state

        const classes = {
            root: classnames(
                'nami-slider',
                {
                    [`nami-slider--${state}`]: !!state,
                    [`nami-slider--disabled`]: disabled,
                    [`nami-slider--active`]: knobDragInitInfo,
                },
                className
            ),
            container: 'nami-slider__container',
            bar: 'nami-slider__bar',
        }

        return (
            <div {...omit(this.props, Slider.propKeys)} className={classes.root}>
                {knobDragInitInfo ? (
                    <EventListener
                        target="document"
                        onPointerMove={this.handleKnobPointerMove}
                        onPointerUp={this.handleKnobPointerUp}
                    />
                ) : null}
                <div className={classes.container}>
                    <div className={classes.bar} ref={this.barRef}>
                        {this.renderFills()}
                    </div>
                    {this.renderKnobs()}
                </div>
            </div>
        )
    }

    renderFills() {
        const { min, max } = this.props
        const { value } = this.state

        const percentage = ((value - min) / (max - min)) * 100

        const classes = 'nami-slider__fill'
        const style = {
            '--slider-fill-start': '0%',
            '--slider-fill-end': `${percentage}%`,
        } as CSSProperties

        return <div className={classes} style={style} />
    }

    renderKnobs() {
        const { min, max } = this.props
        const { value, knobHoverIndex, knobDragInitInfo } = this.state

        const percentage = ((value - min) / (max - min)) * 100
        const active = knobHoverIndex === 0 || (knobDragInitInfo && knobDragInitInfo.index === 0)

        const classes = {
            knob: classnames('nami-slider__knob', {
                'nami-slider__knob--active': active,
            }),
            tip: 'nami-slider__knob-tip',
        }
        const style = {
            '--slider-knob-position': `${percentage}%`,
        } as CSSProperties

        const knob = (
            <div
                className={classes.knob}
                style={style}
                onPointerDown={this.handleKnobPointerDown}
                onPointerEnter={this.handleKnobPointerEnter}
                onPointerLeave={this.handleKnobPointerLeave}
                data-index="0"
            />
        )

        return (
            <Popover of={knob} open={active} className={classes.tip} arrow at="top" offset={10}>
                {value}
            </Popover>
        )
    }

    handleKnobPointerDown = (event: React.PointerEvent<HTMLDivElement>): void => {
        const barEl = this.barRef.current
        const knobEl = event.currentTarget
        const knobIndex = Slider.getKnobIndexInEl(knobEl)

        this.setState({
            knobDragInitInfo: Slider.createKnobDragInitInfo(event, barEl, knobEl, knobIndex),
        })
    }

    handleKnobPointerMove = (event: PointerEvent): void => {
        this.setValueByKnobDrag(event)
    }

    handleKnobPointerUp = (event: PointerEvent): void => {
        this.setValueByKnobDrag(event)

        this.setState({
            knobDragInitInfo: undefined,
        })
    }

    handleKnobPointerEnter = (event: React.PointerEvent<HTMLDivElement>): void => {
        this.setState({
            knobHoverIndex: Slider.getKnobIndexInEl(event.currentTarget),
        })
    }

    handleKnobPointerLeave = (event: React.PointerEvent<HTMLDivElement>): void => {
        const index = Slider.getKnobIndexInEl(event.currentTarget)

        this.setState(state => {
            if (state.knobHoverIndex === index) {
                return {
                    knobHoverIndex: false,
                }
            }
        })
    }

    setValueByKnobDrag(event: PointerEvent): void {
        const { min, max, step } = this.props
        const { knobDragInitInfo, precision } = this.state

        const percentage = Slider.calcKnobDragPercentage(event, knobDragInitInfo)
        const value = Slider.calcValueByPercentage(percentage, min, max, step, precision)

        this.changeValue(value)
    }

    changeValue(value: number): void {
        const event = new Event('change', { cancelable: true })

        this.props.onChange(event, value)

        if (event.defaultPrevented) {
            return
        }

        this.setState({ value })
    }

    /**
     * 从某个滑块元素中获取其索引值
     * @param knobEl 滑块元素
     */
    static getKnobIndexInEl(knobEl: HTMLDivElement): number {
        return parseInt(knobEl.getAttribute('data-index'), 10)
    }

    /**
     * 创建滑块手动操作的初始化信息
     * @param event 指针事件
     * @param barEl 滑动条元素
     * @param knobEl 被拖动的滑块元素
     * @param knobIndex 被手动的滑块的索引值
     */
    static createKnobDragInitInfo(
        event: React.PointerEvent<HTMLDivElement>,
        barEl: HTMLDivElement,
        knobEl: HTMLDivElement,
        knobIndex: number
    ): KnobDragInitInfo {
        const barRect = barEl.getBoundingClientRect()
        const knobRect = knobEl.getBoundingClientRect()

        return {
            index: knobIndex,

            bar: {
                pageX: barRect.left + window.scrollX,
                pageY: barRect.top + window.scrollY,
                width: barRect.width,
                height: barRect.height,
            },

            knobCenter: {
                offsetX: event.pageX - (knobRect.width / 2 + knobRect.left + window.scrollX),
                offsetY: event.pageY - (knobRect.height / 2 + knobRect.top + window.scrollY),
            },
        }
    }

    /**
     * 计算滑块将被拖放到滑动条中距起始点百分之多少的位置上
     * @param event 指针事件
     * @return number 区间 [0, 1] 中的一个百分比值
     */
    static calcKnobDragPercentage(
        event: PointerEvent,
        { bar, knobCenter }: KnobDragInitInfo
    ): number {
        const percentage = (event.pageX - knobCenter.offsetX - bar.pageX) / bar.width
        return Math.min(Math.max(0, percentage), 1)
    }

    /**
     * 基于所指定的百分比计算一个有效值
     * @param percentage 百分比值
     * @param min 最小值
     * @param max 最大值
     * @param step 步进
     * @param precision 精度
     * @return number 区间 [min, max] 中的一个有效值
     */
    static calcValueByPercentage(
        percentage: number,
        min: number,
        max: number,
        step: number,
        precision: number
    ): number {
        const stepCount = Math.round(((max - min) * percentage) / step)
        const stepMaxCount = Math.floor((max - min) / step)
        const standardValue = Math.min(stepCount, stepMaxCount) * step + min

        return parseFloat(standardValue.toFixed(precision))
    }

    /**
     * 计算一个浮点数的精度
     * @param val 一个浮点数
     */
    static calcPrecision(val: number): number {
        const decimal = val.toString().split('.')[1]
        return decimal ? decimal.length : 0
    }
}
