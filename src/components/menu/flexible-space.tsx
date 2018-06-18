import React, { PureComponent } from 'react'
import classnames from 'classnames'
import CommonProps from '@utils/common-props'

export interface FlexibleSpaceProps extends CommonProps<FlexibleSpace> {}

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
        const { className, style } = this.props
        const classes = classnames('menu__flexible-space', className)
        return <div className={classes} style={style} />
    }
}
