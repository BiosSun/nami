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

import './styles'

interface BaseLinearProps {
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

/**
 * @component
 *
 * @displayname 线性布局
 * @group layout
 *
 * @description
 *
 *     提供一种简单的线性布局，使用 CSS Flex 实现。
 *
 *     {@demo "./demos/default.jsx"}
 *
 * @example 垂直布局
 *
 *     默认所有元素按水平方向排列，通过 `direction` 参数可以更改为垂直方向：
 *
 *     {@demo "./demos/vertical.jsx"}
 *
 * @example 元素间距
 *
 *     默认所有元素之间都是没有间距的，如果需要，可以通过参数 `spacing` 来设置，该参数提供三个间距宽度：
 *
 *     - true 普通间距，使用样式配置变量 `--distance-horizontal` 的宽度值；
 *     - `"large"` 较大间距，是普通间距的两倍；
 *     - `"small"` 较小间距，是普通间距的一半；
 *
 *     {@demo "./demos/spacing-horizontal.jsx"}
 *     {@demo "./demos/spacing-vertical.jsx"}
 *
 * @example 元素分隔
 *
 *     除了通过 `spacing` 给所有元素添加间距外，还可以通过 `Divider`、`Space` 及 `FlexibleSpace` 三个分隔组件来隔开某两个元素。
 *
 *     {@demo "./demos/separator-horizontal.jsx"}
 *     {@demo "./demos/separator-vertical.jsx"}
 *
 * @example - 对齐
 *
 *     通过 `justify` 及 `align` 两个参数，我们可以控制该线性布局内元素在主轴及副轴上的对齐方式：
 *
 *     {@demo "./demos/justify.jsx"}
 *     {@demo "./demos/align.jsx"}
 *
 * @example - 填充元素
 *
 *     默认 Linear 内的所有元素仅分配其自身所占用的空间，并在容器可用空间不足时自动等比例收缩（即 `flex: 0 1 auto;`），
 *     但通常在实现自适应布局时，我们往往会需要其中的一个或多个元素自动填充剩余空间，此时只需给这些元素添加 `fill` 参数即可：
 *
 *     {@demo "./demos/fill.jsx"}
 */
export default class Linear extends Component<LinearProps> {
    static Item = Item

    static propKeys: string[] = ['direction', 'justify', 'align', 'spacing']

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
