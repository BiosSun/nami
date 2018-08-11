import React, { PureComponent, HTMLAttributes } from 'react'
import classnames from 'classnames'

import './index.scss'

export interface BaseDividerProps {
    /**
     * 分隔方向<br>
     * *一般在布局组件中使用时无须设置该参数，布局组件会自动按其布局方向为其设置；*
     * @default "horizontal"
     */
    direction?: 'horizontal' | 'vertical'
}

export type DividerProps = BaseDividerProps & HTMLAttributes<HTMLDivElement>

export default class Divider extends PureComponent<DividerProps> {
    static defaultProps: DividerProps = {
        direction: 'horizontal',
    }

    render() {
        const { direction, className } = this.props

        const classes = {
            root: classnames('nami-divider', `nami-divider--${direction}`, className),
        }

        return <div className={classes.root} />
    }
}
