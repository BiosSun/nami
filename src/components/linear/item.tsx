import React, { Component, ComponentClass, HTMLAttributes } from 'react'
import classnames from 'classnames'

interface BaseItemProps {
    /**
     * 该元素是否填充容器内剩余空间
     * @default false
     */
    fill?: boolean

    /**
     * 该列的垂直对齐方式
     */
    align?: 'start' | 'end' | 'center'

    /**
     * 用于渲染 Linear 元素的组件
     * @default "div"
     */
    component?: ComponentClass | string

    /**
     * 列中的内容
     */
    children?: React.ReactNode

    /**
     * @private
     * 布局方向（由父组件传入，无须使用者设置）
     */
    direction?: string
}

export type ItemProps = BaseItemProps & HTMLAttributes<HTMLDivElement>

export default class Item extends Component<ItemProps> {
    static displayName = 'Linear.Item'

    static defaultProps: ItemProps = {
        fill: false,
        component: 'div',
    }

    render() {
        const {
            component: Element,
            fill,
            align,
            direction,
            children,
            className,
            ...otherProps
        } = this.props
        const classes = classnames(
            'nami-linear__item',
            {
                [`nami-linear__item--fill`]: fill,
                [`nami-linear__item--align-${align}`]: !!align,
            },
            className
        )

        return (
            <Element {...otherProps} className={classes}>
                {children}
            </Element>
        )
    }
}
