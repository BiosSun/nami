import React, { HTMLAttributes, FunctionComponent } from 'react'
import clsx from 'clsx'

declare module 'react' {
    interface CSSProperties {
        '--nami-color__screen--color': string
    }
}

export type ColorScreenProps = HTMLAttributes<HTMLDivElement> & {
    // 颜色值
    color: string

    // 尺寸
    size?: boolean | 'large' | 'small'
}

export type ColorScreenType = FunctionComponent<ColorScreenProps>

export const ColorScreen: ColorScreenType = ({ color, size, className, style, ...otherProps }) => {
    className = clsx(
        'nami-color__screen',
        {
            [`nami-color__screen--size-${size}`]: size,
        },
        className
    )

    style = {
        ...style,
        '--nami-color__screen--color': color,
    }

    return <div className={className} style={style} {...otherProps} />
}
