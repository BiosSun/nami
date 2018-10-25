import React, { PureComponent, HTMLAttributes, CSSProperties } from 'react'
import classnames from 'classnames'
import EventListener from 'react-event-listener'
import { Omit, noop } from '@utils'

interface BaseProps {
    /**
     * 色调 - [0， 360]
     */
    hue?: number

    /**
     * 对比度 - [0, 100]
     * 值越高，颜色越鲜艳
     */
    saturation?: number

    /**
     * 明度 - [0, 100]
     * 值越高，颜色越明亮
     */
    value?: number

    /**
     * 一个 CSS 支持的颜色值，与 hue, saturation 及 value 这三个值对应
     * _该参数将仅用于显示_
     */
    color?: string

    /**
     * 对比度或明度改变事件
     */
    onChange?: (event: Event, saturation: number, value: number) => void
}

export type Props = BaseProps & Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>

/**
 * 一个用于调整颜色对比度和明度的调色板组件（受控组件）
 */
export default class ColorPickerPalette extends PureComponent<Props> {
    static readonly defaultProps: Props = {
        hue: 0,
        saturation: 100,
        value: 100,
        color: '#f00',
        onChange: noop,
    }

    render() {
        const {
            hue,
            saturation,
            value,
            color,
            onChange,
            className,
            style,
            ...otherProps
        } = this.props

        const classes = {
            root: classnames('nami-color-picker__palette', className),
            hue: 'nami-color-picker__palette__hue',
            saturation: 'nami-color-picker__palette__saturation',
            value: 'nami-color-picker__palette__value',
            thumb: 'nami-color-picker__palette__thumb',
            cover: 'nami-color-picker__palette__cover',
        }

        const styles = {
            ...style,
            '--color-picker-palette-color': color,
            '--color-picker-palette-hue': hue,
            '--color-picker-palette-saturation': saturation + '%',
            '--color-picker-palette-value': value + '%',
        } as CSSProperties

        return (
            <div
                {...otherProps}
                className={classes.root}
                style={styles}
                onPointerDown={this.handlePointerDown}
            >
                <div className={classes.hue} />
                <div className={classes.saturation} />
                <div className={classes.value} />
                <button className={classes.thumb} />
                <div className={classes.cover} />
            </div>
        )
    }

    handlePointerDown = (event: React.PointerEvent<HTMLDivElement>): void => {}
}
