import React, { Component, ReactNode, ReactElement, HTMLAttributes } from 'react'
import clsx from 'clsx'
import omit from 'object.omit'
import { Children as ChildrenUtils } from '../../utils'
import { Linear } from '../linear'
import { ItemProps } from './item'
import { MenuMode, DirectionEnum } from './utils'

export interface BaseItemGroupProps {
    /**
     * 该分组的头部内容及其所包含的菜单项<br/>
     * *第一个子元素将做为分组的头部内容，其余子元素为该分组中所包含的菜单项*
     */
    children?: ReactNode

    /**
     * @private
     * 该分组所属菜单的深度
     */
    menuDepth?: number

    /**
     * @private
     * 该分组的深度
     */
    itemDepth?: number

    /**
     * @private
     * 该分组所属菜单的展示模式
     */
    menuMode?: MenuMode
}

export type ItemGroupProps = BaseItemGroupProps & HTMLAttributes<HTMLDivElement>

export interface ItemGroupState {
    /**
     * 组件头部内容
     */
    headerContent: ReactNode

    /**
     * 该分组内所包含的所有菜单项
     */
    items: ReactElement<ItemProps>[]
}

export default class ItemGroup extends Component<ItemGroupProps, ItemGroupState> {
    static displayName = 'Menu.ItemGroup'

    static propKeys = ['children', 'menuDepth', 'itemDepth', 'menuMode']

    readonly state: Readonly<ItemGroupState> = {
        items: undefined,
        headerContent: undefined,
    }

    static getDerivedStateFromProps(nextProps: ItemGroupProps): ItemGroupState {
        const [headerContent, items] = ChildrenUtils.cons(nextProps.children)

        return {
            headerContent,
            items: ChildrenUtils.cloneChildren(items, {
                menuMode: nextProps.menuMode,
                menuDepth: nextProps.menuDepth,
                itemDepth: nextProps.itemDepth + 1,
            }),
        }
    }

    render(): ReactNode {
        const { className, itemDepth, menuMode } = this.props
        const { headerContent, items } = this.state

        const classes = {
            root: clsx('nami-menu__item-group', className),
            header: clsx('nami-menu__item-group__header', {
                [`nami-menu__item-group__header--indent-${itemDepth}`]: !!itemDepth,
            }),
            items: 'nami-menu__item-group__items',
        }

        return (
            <li {...omit(this.props, ItemGroup.propKeys)} className={classes.root}>
                <div className={classes.header}>{headerContent}</div>
                <Linear
                    className={classes.items}
                    direction={DirectionEnum[menuMode]}
                    component="ul"
                >
                    {items}
                </Linear>
            </li>
        )
    }
}
