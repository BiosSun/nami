import React, { FunctionComponent, ComponentClass, HTMLAttributes } from 'react'
import classnames from 'classnames'

type LinearItemComponentProps = {
    className?: string
}

export type LinearItemProps = HTMLAttributes<HTMLDivElement> & {
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
    component?:
        | FunctionComponent<LinearItemComponentProps>
        | ComponentClass<LinearItemComponentProps>
        | string

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

export type LinearItemType = FunctionComponent<LinearItemProps>

export const LinearItem: LinearItemType = ({
    component: Component = 'div',
    fill = false,
    align,
    direction,
    children,
    className,
    ...otherProps
}) => {
    className = classnames(
        'nami-linear__item',
        {
            [`nami-linear__item--fill`]: fill,
            [`nami-linear__item--align-${align}`]: !!align,
        },
        className
    )

    return (
        <Component {...otherProps} className={className}>
            {children}
        </Component>
    )
}

LinearItem.displayName = 'Linear.Item'
