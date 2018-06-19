import React, { PureComponent, HTMLAttributes } from 'react'
import classnames from 'classnames'

export type DividerProps = HTMLAttributes<HTMLDivElement>

/**
 * @component
 *
 * @displayname 分隔线
 * @parent Menu
 *
 * @description
 *
 *   菜单项间分隔线；
 */
export default class Divider extends PureComponent<DividerProps> {
    render() {
        const { className, ...otherProps } = this.props

        const classes = {
            root: classnames('menu__divider', className),
            inner: classnames('menu__divider__inner'),
        }

        return (
            <div {...otherProps} className={classes.root}>
                <div className={classes.inner} />
            </div>
        )
    }
}
