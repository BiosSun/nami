import React, { PureComponent, HTMLAttributes } from 'react'
import classnames from 'classnames'

export type FlexibleSpaceProps = HTMLAttributes<HTMLDivElement>

/**
 * @component
 *
 * @displayname 弹性空隔
 * @parent Menu
 *
 * @description
 *
 *   菜单项间弹性长度空隔；
 */
export default class FlexibleSpace extends PureComponent<FlexibleSpaceProps> {
    render() {
        const { className, ...otherProps } = this.props
        const classes = classnames('menu__flexible-space', className)
        return <div {...otherProps} className={classes} />
    }
}
