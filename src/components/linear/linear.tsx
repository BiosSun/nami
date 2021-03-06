import React, {
    Children,
    HTMLAttributes,
    ComponentClass,
    isValidElement,
    FunctionComponent,
    ReactNode,
    useMemo,
} from 'react'
import clsx from 'clsx'
import { LinearContext, LinearContextType } from './context'

declare module 'react' {
    interface HTMLAttributes<T> extends LinearItemProps {}
}

type LinearComponentProps = {
    className?: string
}

export type LinearProps = HTMLAttributes<HTMLDivElement> &
    LinearItemProps & {
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

    const context = useMemo<LinearContextType>(() => {
        const isHorizontal = direction === 'horizontal' || direction === 'horizontal-reverse'
        const isReverse = direction === 'horizontal-reverse' || direction === 'vertical-reverse'

        return {
            direction: isHorizontal ? 'horizontal' : 'vertical',
            isReverse,
        }
    }, [direction])

    className = clsx(
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
        <LinearContext.Provider value={context}>
            <Component className={className} {...otherProps}>
                {childs}
            </Component>
        </LinearContext.Provider>
    )
}

export interface LinearItemProps {
    /**
     * 是否为弹性子元素
     */
    $flex?: Boolean

    /**
     * 是否为栅格子元素
     */
    $col?:
        | 1
        | 2
        | 3
        | 4
        | 5
        | 6
        | 7
        | 8
        | 9
        | 10
        | 11
        | 12
        | 13
        | 14
        | 15
        | 16
        | 17
        | 18
        | 19
        | 20
        | 21
        | 22
        | 23
        | 24

    /**
     * 子元素在副轴上的对齐方式
     */
    $align?: 'start' | 'end' | 'center' | 'stretch'
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
            // 因为需要删除子元素上的 $flex, $col 及 $align 三个属性，因此无法使用 React.cloneElement，
            // 虽然官方文档中在说明 clonseElement 时有提到其几乎与 `<element.type {...element.props} />` 相同，
            // 但除了文档中说的 `ref` 之外，还有几个属性是需要注意的：
            //     https://github.com/facebook/react/blob/master/packages/react/src/ReactElement.js#L360-L381
            key={child.key}
            ref={(child as any).ref}
            __self={(child as any).__self}
            __source={(child as any).__source}
            className={clsx(
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
            {...otherProps}
        />
    )

    return closed
}
