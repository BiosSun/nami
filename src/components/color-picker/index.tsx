import React, { PureComponent, HTMLAttributes } from 'react'
import classnames from 'classnames'
import { Omit, noop, Color } from '@utils'

import Palette from './palette'

import './index.scss'

interface BaseColorPickerProps {
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

export type ColorPickerProps = BaseColorPickerProps &
    Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>

interface ColorPickerState {
    /**
     * 是否为受控状态，this.controlled 属性的镜像，用于在 getDerivedStateFromProps 中访问
     */
    controlled: boolean

    /**
     * 色值
     */
    value: string
}

export default class ColorPicker extends PureComponent<ColorPickerProps, ColorPickerState> {
    static readonly defaultProps: BaseColorPickerProps = {
        format: 'auto',
        abbreviatedFormat: false,
        alpha: false,
        onChange: noop,
    }

    readonly controlled: boolean = 'value' in this.props

    readonly state: ColorPickerState = {
        controlled: this.controlled,
        value: this.controlled
            ? ColorPicker.parseColorString(this.props.value)
            : ColorPicker.parseColorString(this.props.defaultValue),
    }

    static getDerivedStateFromProps(
        props: ColorPickerProps,
        prevState: ColorPickerState
    ): ColorPickerState {
        const state = {
            ...prevState,
            value: prevState.controlled
                ? ColorPicker.parseColorString(props.value)
                : prevState.value,
        }

        return state
    }

    render() {
        const { className } = this.props
        const classes = classnames('nami-color-picker', className)

        return (
            <div className={classes}>
                <Palette onChange={this.handlePaletteChange} />
            </div>
        )
    }

    static parseColorString(str: string) {
        // TODO
        return str
    }
}
