import React, { PureComponent } from 'react'
import classnames from 'classnames'
import CommonProps from '@utils/common-props'

export interface SpaceProps extends CommonProps<Space> {}

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
        const { className, style } = this.props
        const classes = classnames('menu__space', className)
        return <div className={classes} style={style} />
    }
}
