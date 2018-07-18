import React, { PureComponent, HTMLAttributes } from 'react'
import classnames from 'classnames'

import './styles'

interface BaseDividerProps {
    /**
     * 分隔方向<br>
     * *一般在布局组件中使用时无须设置该参数，布局组件会自动按其布局方向为其设置；*
     * @default "horizontal"
     */
    direction?: 'horizontal' | 'vertical'
}

export type DividerProps = BaseDividerProps & HTMLAttributes<HTMLDivElement>

/**
 * @component
 *
 * @displayname 分隔线
 * @group layout
 *
 * @description
 *
 *   用于在两个布局元素之间插入一条分隔线：
 *
 *   {@demo "./demos/horizontal.jsx"}
 *   {@demo "./demos/vertical.jsx"}
 */
export default class Divider extends PureComponent<DividerProps> {
    static defaultProps: DividerProps = {
        direction: 'horizontal',
    }

    render() {
        const { direction, className } = this.props

        const classes = {
            root: classnames('nami-divider', `nami-divider--${direction}`, className),
        }

        return <div className={classes.root}>&nbsp;</div>
    }
}
