import React, { PureComponent, HTMLAttributes } from 'react'
import classnames from 'classnames'

import './styles'

interface BaseSpaceProps {
    /**
     * 分隔方向<br>
     * *一般在布局组件中使用时无须设置该参数，布局组件会自动按其布局方向为其设置；*
     * @default "horizontal"
     */
    direction?: 'horizontal' | 'vertical'
}

export type SpaceProps = BaseSpaceProps & HTMLAttributes<HTMLDivElement>

/**
 * @component
 *
 * @displayname 空隔
 * @group layout
 *
 * @description
 *
 *   用于在两个布局元素之间插入一段固定宽度（或高度）的空白间隔；
 *
 *   *\* 注：以下 Demo 中 Space 的背景色仅是为了演示效果而添加的，实际都是透明的。*
 *
 *   {@demo "./demos/horizontal.jsx"}
 *   {@demo "./demos/vertical.jsx"}
 */
export default class Space extends PureComponent<SpaceProps> {
    static defaultProps: SpaceProps = {
        direction: 'horizontal',
    }

    render() {
        const { direction, className, ...otherProps } = this.props

        const classes = {
            root: classnames('nami-space', `nami-space--${direction}`, className),
        }

        return <div {...otherProps} className={classes.root} />
    }
}
