import React, { PureComponent, HTMLAttributes } from 'react'
import classnames from 'classnames'

export type SpaceProps = HTMLAttributes<HTMLDivElement>

/**
 * @component
 *
 * @displayname 空隔
 * @parent Menu
 *
 * @description
 *
 *   菜单项间固定长度空隔；
 */
export default class Space extends PureComponent<SpaceProps> {
    render() {
        const { className, ...otherProps } = this.props
        const classes = classnames('menu__space', className)
        return <div {...otherProps} className={classes} />
    }
}
