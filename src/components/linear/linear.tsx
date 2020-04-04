import React, {
    Children,
    HTMLAttributes,
    ComponentClass,
    isValidElement,
    FunctionComponent,
    ReactNode,
} from 'react'
import classnames from 'classnames'

declare module 'react' {
    interface CSSProperties {
        '--nami-linear--direction': string
        '--nami-linear--justify': string
        '--nami-linear--align': string
        '--nami-linear--padding': string
        '--nami-linear--spacing': string
    }
}

type LinearComponentProps = {
    className?: string
}

export type LinearProps = HTMLAttributes<HTMLDivElement> & {
    /**
     * 布局方向
     * @default 'horizontal'
     */
    direction: 'horizontal' | 'horizontal-reverse' | 'vertical' | 'vertical-reverse'

    /**
     * 所有元素在主轴上的对齐方式
     */
    justify?: 'start' | 'end' | 'center' | 'between' | 'around'

    /**
     * 所有元素在副轴上的对齐方式
     */
    align?: 'start' | 'end' | 'center' | 'stretch'

    /**
     * 子项与容器之间的间距
     */
    padding?: boolean | 'common' | 'small' | 'large'

    /**
     * 子项之间的间距
     */
    spacing?: boolean | 'common' | 'small' | 'large'

    /**
     * 用于渲染 Linear 容器的组件
     * @default "div"
     */
    component?:
        | FunctionComponent<LinearComponentProps>
        | ComponentClass<LinearComponentProps>
        | string
}

export type LinearType = FunctionComponent<LinearProps>

export const Linear: LinearType = ({
    component: Component = 'div',
    direction = 'horizontal',
    justify,
    align,
    padding = false,
    spacing = false,
    className,
    children,
    ...otherProps
}) => {
    if (padding === true) {
        padding = 'common'
    }

    if (spacing === true) {
        spacing = 'common'
    }

    className = classnames(
        'nami-linear',
        `nami-linear--${direction}`,
        {
            [`nami-linear--justify-${justify}`]: justify,
            [`nami-linear--align-${align}`]: align,
            [`nami-linear--padding-${padding}`]: padding,
            [`nami-linear--spacing-${spacing}`]: spacing,
        },
        className
    )

    const childs = Children.map(children, linearItem)

    return (
        <Component className={className} {...otherProps}>
            {childs}
        </Component>
    )
}

function linearItem(child: ReactNode): ReactNode {
    if (!isValidElement(child)) {
        return child
    }

    const { className, $flex: flex, $col: col, $align: align, ...otherProps } = child.props

    const flexSuffix = flex === true ? '' : `-${flex}`
    const colSuffix = `-${col}`
    const alignSuffix = `-${align}`

    const closed = (
        <child.type
            key={child.key}
            {...otherProps}
            className={classnames(
                'nami-linear__item',
                {
                    [`nami-linear__item--flex`]: flex,
                    [`nami-linear__item--flex${flexSuffix}`]: flex,
                    [`nami-linear__item--col`]: col,
                    [`nami-linear__item--col${colSuffix}`]: col,
                    [`nami-linear__item--align${alignSuffix}`]: align,
                },
                className
            )}
        />
    )

    return closed
}
