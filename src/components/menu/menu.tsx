import React, { Component, Fragment, ReactNode, HTMLAttributes, ReactElement } from 'react'
import classnames from 'classnames'
import omit from 'object.omit'

import childrenUtils from '@utils/children'
import Popover from '@components/popover'
import Linear from '@components/linear'

import Item from './item'
import ItemGroup from './item-group'
import { RootMenuMode, MenuMode, DirectionEnum } from './utils'

interface BaseMenuProps {
    /**
     * 菜单展示模式
     * @default 'horizontal'
     */
    mode?: RootMenuMode

    /**
     * 该菜单中所包含的菜单项
     */
    children?: ReactNode

    /**
     * @private
     * 该菜单深度，从 0 开始计数，在每一级子菜单中累加 1
     */
    menuDepth?: number

    /**
     * @private
     * 该菜单内的直接子菜单项的深度，从 0 开始计数，在每一级子菜单或菜单项分组中累加 1
     */
    itemDepth?: number

    /**
     * @private
     * 子菜单所属菜单项的头部元素
     */
    subMenuOf?: ReactElement<any>

    /**
     * @private
     * 是否打开子菜单
     */
    subMenuOpen?: boolean

    /**
     * @private
     * 子菜单关闭事件
     */
    onSubMenuClose?: () => void
}

export type MenuProps = BaseMenuProps & HTMLAttributes<HTMLDivElement>

export default class Menu extends Component<MenuProps> {
    static Item = Item
    static ItemGroup = ItemGroup

    static defaultProps = {
        mode: 'horizontal',
        menuDepth: 0,
        itemDepth: -1,
    }

    static propKeys: string[] = [
        'mode',
        'children',
        'menuDepth',
        'itemDepth',
        'subMenuOf',
        'subMenuOpen',
        'onSubMenuClose',
    ]

    render() {
        const { mode, menuDepth } = this.props

        if (menuDepth === 0) {
            return this.renderMenu(mode)
        } else {
            return this.renderSubMenu(mode)
        }
    }

    private renderMenu(mode: MenuMode, isSubMenu: boolean = false): ReactNode {
        const { className, menuDepth, itemDepth } = this.props

        const classes = classnames(
            `nami-menu`,
            `nami-menu--${mode}`,
            {
                [`nami-menu--submenu`]: isSubMenu,
            },
            className
        )

        const children = childrenUtils.cloneChildren(this.props.children, {
            menuMode: mode,
            menuDepth,
            itemDepth: itemDepth + 1,
        })

        return (
            <Linear
                {...omit(this.props, Menu.propKeys)}
                className={classes}
                direction={DirectionEnum[mode]}
                component="ul"
            >
                {children}
            </Linear>
        )
    }

    private renderSubMenu(mode: MenuMode): ReactNode {
        switch (mode) {
            case 'vertical':
                return this.renderVerticalSubMenu()
            case 'popover':
                return this.renderPopoverSubMenu()
            default:
                // TODO: 优化错误提示信息
                throw new Error(`错误的子菜单展示模式 - ${mode}`)
        }
    }

    private renderVerticalSubMenu(): ReactNode {
        const { subMenuOf: of, subMenuOpen: open } = this.props
        const subMenu = open ? this.renderMenu('vertical', true) : undefined

        return (
            <Fragment>
                {of}
                {subMenu}
            </Fragment>
        )
    }

    private renderPopoverSubMenu(): ReactNode {
        const { menuDepth, subMenuOf: of, subMenuOpen: open, onSubMenuClose: onClose } = this.props
        const at = menuDepth === 1 ? 'bottom-start' : 'right-start'

        return (
            <Popover of={of} at={at} open={open} onClose={onClose} minWidthFollowOf>
                {this.renderMenu('popover', true)}
            </Popover>
        )
    }
}
