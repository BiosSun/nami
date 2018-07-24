import React, {
    Component,
    Children,
    HTMLAttributes,
    ComponentClass,
    cloneElement,
    isValidElement,
} from 'react'
import classnames from 'classnames'

import Item from './item'
export { default as LinearItem, ItemProps as LinearItemProps } from './item'

import './index.scss'

export interface BaseLinearProps {
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
    component?: ComponentClass | string

    /**
     * 元素之间是否有间距，及间距宽度配置
     */
    spacing?: boolean | 'small' | 'large'
}

export type LinearProps = BaseLinearProps & HTMLAttributes<HTMLDivElement>

export default class Linear extends Component<LinearProps> {
    static Item = Item

    static defaultProps: LinearProps = {
        direction: 'horizontal',
        component: 'div',
    }

    render() {
        const {
            component: Container,
            direction,
            spacing,
            justify,
            align,
            className,
            children,
            ...otherProps
        } = this.props

        const classes = {
            root: classnames(
                'nami-linear',
                `nami-linear--${direction}`,
                {
                    [`nami-linear--align-${align}`]: !!align,
                    [`nami-linear--justify-${justify}`]: !!justify,
                    [`nami-linear--spacing${
                        typeof spacing === 'string' ? '-' + spacing : ''
                    }`]: !!spacing,
                },
                className
            ),
        }

        const childs = Children.map(children, child => {
            if (isValidElement(child)) {
                return cloneElement<any>(child, { direction })
            } else {
                return child
            }
        })

        return (
            <Container {...otherProps} className={classes.root}>
                {childs}
            </Container>
        )
    }
}
