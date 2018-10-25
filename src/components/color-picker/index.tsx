import React, { PureComponent, HTMLAttributes, CSSProperties } from 'react'
import classnames from 'classnames'
import { Omit, noop, Color } from '@utils'

import Palette from './palette'

import './index.scss'

interface BaseProps {
    /**
     * 色值
     */
    value?: string

    /**
     * 默认色值
     */
    defaultValue?: string

    /**
     * 色值输出格式
     */
    format?: 'auto' | 'hex' | 'hexa' | 'rgb' | 'rgba' | 'hsl' | 'hsla'

    /**
     * 是否开启缩写格式
     * _包括缩写 hex 格式，以及当 alpha 值为 1 时改为使用没有 alpha 的对等格式_
     */
    abbreviatedFormat?: boolean

    /**
     * 是否支持设置 alpha 值
     */
    alpha?: boolean

    /**
     * 色值改变事件
     */
    onChange?: (event: Event, value: string) => void
}

export type Props = BaseProps & Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>

interface State {
    /**
     * 是否为受控状态，this.controlled 属性的镜像，用于在 getDerivedStateFromProps 中访问
     */
    controlled: boolean

    /**
     * 色值
     */
    color: Color
}

export default class ColorPicker extends PureComponent<Props, State> {
    // 默认色值，当组件初始时 props 中所传入的色值无效时，使用该色值。
    static DEFAULT_COLOR = new Color('#F00')

    static readonly defaultProps: BaseProps = {
        format: 'auto',
        abbreviatedFormat: false,
        alpha: false,
        onChange: noop,
    }

    readonly controlled: boolean = 'value' in this.props

    readonly state: State = (() => {
        const state = {
            controlled: this.controlled,
            color: this.controlled
                ? new Color(this.props.value)
                : new Color(this.props.defaultValue),
        }

        if (!state.color.valid) {
            state.color = ColorPicker.DEFAULT_COLOR
        }

        return state
    })()

    static getDerivedStateFromProps(props: Props, prevState: State): State {
        const state = {
            ...prevState,
            value: prevState.controlled ? new Color(props.value) : prevState.color,
        }

        return state
    }

    render() {
        const { className, style } = this.props
        const { color } = this.state
        const classes = classnames('nami-color-picker', className)

        console.info(color)

        const styles = {
            ...style,
            '--color-picker-color': color.toString('hsl'),
            '--color-picker-hue': color.getHue(),
            '--color-picker-saturation': color.getSaturation() + '%',
            '--color-picker-value': color.getValue() + '%',
        } as CSSProperties

        return (
            <div className={classes} style={styles}>
                <Palette onChange={this.handlePaletteChange} />
            </div>
        )
    }

    handlePaletteChange = () => {}
}
