import React, { PureComponent, SVGAttributes } from 'react'
import classnames from 'classnames'

import icons from './icons'

import './styles'

interface BaseIconProps {
    /**
     * 图标类型；
     */
    name?: string
}

export type IconProps = BaseIconProps & SVGAttributes<SVGElement>

/**
 * @component
 *
 * @displayname 图标
 * @group general
 *
 * @description
 *
 *     Icon 组件提供一组 SVG 格式的图标。
 *
 *     {@demo "./demos/icons.jsx"}
 *
 *     ## "SVG Icon" vs "Icon Font"
 *
 *     Icon 组件之所以选择提供 SVG 格式的图标，而非通常所使用的 "Icon Font"，
 *     是因为我们认为「图标应当是一种图形，而非文字」。*（有关详细的区别，请参阅[这篇文章](https://css-tricks.com/icon-fonts-vs-svg/)）*
 *
 *     当然，"Icon Font" 也是有很多优点的，而最要紧的一点是："Icon Font" 的图标颜色默认即为文本颜色，
 *     为在 SVG 图标中实现这一优点，我们为图标设置了 `fill: currentColor;` 样式，以使图标颜色与其父元素的文本颜色的保持一致。
 *
 */
export default class Icon extends PureComponent<IconProps> {
    render() {
        const { name, className, ...otherProps } = this.props
        const classes = classnames('nami-icon', className)

        return (
            <svg {...otherProps} className={classes} width="16" height="16" viewBox="0 0 1024 1024">
                {icons[name]()}
            </svg>
        )
    }
}
