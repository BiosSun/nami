import React, { PureComponent } from 'react'
import classnames from 'classnames'
import CommonProps from '@utils/common-props'

export interface DividerProps extends CommonProps<Divider> {}

/**
 * @component
 *
 * @displayname 分隔线
 * @parent Menu
 */
export default class Divider extends PureComponent<DividerProps> {
    render() {
        const { className, style } = this.props

        const classes = {
            root: classnames('menu__divider', className),
            inner: classnames('menu__divider__inner'),
        }

        return (
            <div className={classes.root} style={style}>
                <div className={classes.inner} />
            </div>
        )
    }
}
