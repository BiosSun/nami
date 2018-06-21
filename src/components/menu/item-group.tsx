import React, { Component, ReactNode, ReactElement, ReactChild, HTMLAttributes } from 'react'
import classnames from 'classnames'
import childrenUtils from '@utils/children'
import { ItemProps } from './item'

interface BaseItemGroupProps {
    /**
     * 该分组的头部内容及其所包含的菜单项<br/>
     * *第一个子元素将做为分组的头部内容，其余子元素为该分组中所包含的菜单项*
     */
    children?: ReactNode
}

export type ItemGroupProps = BaseItemGroupProps & HTMLAttributes<HTMLDivElement>

interface ItemGroupState {
    /**
     * 组件头部内容
     */
    headerContent: ReactChild

    /**
     * 该分组内所包含的所有菜单项
     */
    items: ReactElement<ItemProps>[]
}

/**
 * @component
 *
 * @displayname 菜单分组
 * @parent Menu
 */
export default class ItemGroup extends Component<ItemGroupProps, ItemGroupState> {
    readonly state: Readonly<ItemGroupState> = {
        items: undefined,
        headerContent: undefined,
    }

    static getDerivedStateFromProps(nextProps: ItemGroupProps): ItemGroupState {
        const { children } = nextProps
        const [headerContent, items] = childrenUtils.cons<ReactChild, ReactElement<ItemProps>>(
            children
        )

        return { items, headerContent }
    }

    render(): ReactNode {
        const { className, children, ...otherProps } = this.props
        const { headerContent, items } = this.state

        const classes = {
            root: classnames('menu__item-group', className),
            header: 'menu__item-group__header',
        }

        return (
            <div {...otherProps} className={classes.root}>
                <div className={classes.header}>{headerContent}</div>
                {items}
            </div>
        )
    }
}
