import React, { PureComponent, HTMLAttributes } from 'react'
import classnames from 'classnames'

import './index.scss'

interface BaseSpaceProps {
    /**
     * 分隔方向<br>
     * *一般在布局组件中使用时无须设置该参数，布局组件会自动按其布局方向为其设置；*
     * @default "horizontal"
     */
    direction?: 'horizontal' | 'vertical'
}

export type SpaceProps = BaseSpaceProps & HTMLAttributes<HTMLDivElement>

export default class Space extends PureComponent<SpaceProps> {
    static defaultProps: SpaceProps = {
        direction: 'horizontal',
    }

    render() {
        const { direction, className } = this.props

        const classes = {
            root: classnames('nami-space', `nami-space--${direction}`, className),
        }

        return <div className={classes.root} />
    }
}
