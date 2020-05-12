import React, { HTMLAttributes, FunctionComponent } from 'react'
import clsx from 'clsx'
import { useColor } from './color-picker-base'
import Color from '@biossun/color'

type Props = HTMLAttributes<HTMLDivElement> & {
    // 颜色值
    value?: string

    // 尺寸
    size?: boolean | 'large' | 'small'
}

export const ColorScreen: FunctionComponent<Props> = ({
    value,
    size,
    className,
    style,
    ...otherProps
}) => {
    const model = useColor(value)

    className = clsx(
        'nami-color__screen',
        {
            [`nami-color__screen--size-${size}`]: size,
        },
        className
    )

    style = {
        ...style,
        '--color': Color.format(model.value, 'hsl'),
    }

    return <div className={className} style={style} {...otherProps} />
}
