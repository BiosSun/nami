import React, {
    Children,
    HTMLAttributes,
    ComponentClass,
    cloneElement,
    isValidElement,
    FunctionComponent,
} from 'react'
import classnames from 'classnames'

import './index.scss'

type LinearComponentProps = {
    className?: string
}

export type LinearProps = HTMLAttributes<HTMLDivElement> & {
    /**
     * 布局方向
     * @default "horizontal"
     */
    direction?: 'horizontal' | 'vertical'

    /**
     * 所有元素在主轴上的对齐方式
     */
    justify?: 'start' | 'end' | 'center' | 'between' | 'around'

    /**
     * 所有元素在副轴上的对齐方式
     */
    align?: 'start' | 'end' | 'center'

    /**
     * 用于渲染 Linear 容器的组件
     * @default "div"
     */
    component?:
        | FunctionComponent<LinearComponentProps>
        | ComponentClass<LinearComponentProps>
        | string

    /**
     * 元素之间是否有间距，及间距宽度配置
     */
    spacing?: boolean | 'small' | 'large'
}

export type LinearType = FunctionComponent<LinearProps>

export const Linear: LinearType = ({
    component: Component = 'div',
    direction = 'horizontal',
    spacing,
    justify,
    align,
    className,
    children,
    ...otherProps
}) => {
    className = classnames(
        'nami-linear',
        `nami-linear--${direction}`,
        {
            [`nami-linear--align-${align}`]: !!align,
            [`nami-linear--justify-${justify}`]: !!justify,
            [`nami-linear--spacing${typeof spacing === 'string' ? '-' + spacing : ''}`]: !!spacing,
        },
        className
    )

    // 向所有子元素中传入 direction 配置，虽然 LinearItem 不需要，
    // 但其它元素（如 Divider）会需要它。
    // TODO 使用 Context 向下传入 direction 配置。
    const childs = Children.map(children, child => {
        if (isValidElement(child)) {
            return cloneElement<any>(child, { direction })
        } else {
            return child
        }
    })

    return (
        <Component {...otherProps} className={className}>
            {childs}
        </Component>
    )
}
