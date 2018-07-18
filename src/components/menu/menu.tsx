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

/**
 * @component
 *
 * @displayname 菜单
 * @group navigation
 *
 * @description
 *
 *     提供一个菜单列表，支持水平或垂直布局、支持最多三级子菜单、支持任意菜单项内容。
 *
 *     适用于导航菜单、功能菜单、Tabs 切换等场景。
 *
 * @example
 *
 *     {@demo "./demos/default.jsx"}
 *
 * @example - 垂直菜单
 *
 *     菜单默认水平布局模式，通过 `mode` 可以设置为垂直模式：
 *
 *     {@demo "./demos/vertical.jsx"}
 *
 * @example - 子菜单
 *
 *     在一个菜单项中插入子菜单项非常简单，只需要在菜单项中再放一个菜单即可：
 *
 *     {@demo "./demos/submenu.jsx"}
 *
 *     *\* 注1：Item 中的第一个子元素将做为菜单项头部内容，第二个子元素为子菜单，而其余的子元素被忽略；*<br>
 *     *\* 注2：含有子菜单的菜单项会自动在其右侧添加一个箭头图标，以提示用户该菜单项包含子菜单。*
 *
 *     在水平布局模式的菜单中，子菜单以弹出方式呈现，
 *     而在垂直布局模式中则会改为内联方式：
 *
 *     {@demo "./demos/submenu-vertical.jsx"}
 *
 *     若希望自动打开某个子菜单，则只需在包含该子菜单的菜单项上设置 `defaultOpen` 属性为 `true` 即可：
 *
 *     {@demo "./demos/submenu-default-open.jsx"}
 *
 *
 * @example - 分组菜单
 *
 *     Menu 提供了一个 `ItemGroup` 子组件用于对某些菜单项进行分组，这在垂直布局的菜单中很有用：
 *
 *     {@demo "./demos/item-group-vertical.jsx"}
 *
 *     *\* 注：与 Item 类似，ItemGroup 中的第一个子元素将做为此分组的头部内容，其余子元素为该分组下的菜单项。*<br>
 *
 *     当然，水平布局菜单中也支持菜单分组：*虽然感觉并没有多少用处 :p*
 *
 *     {@demo "./demos/item-group-horizontal.jsx"}
 *
 *     以及在子菜单中进行分组：
 *
 *     {@demo "./demos/item-group-horizontal-submenu.jsx"}
 *
 * @example - 分隔菜单项
 *
 *     Menu 支持 Nami 中所提供的三种分隔符组件：
 *
 *     - 分隔线 `Divider`
 *     - 空隔 `Space`
 *     - 弹性空隔 `FlexibleSpace`
 *
 *     *\* 注：以下 Demo 中 Space 及 FlexibleSpace 的背景色仅是为了体现分隔效果而添加的，实际上都是透明的。*
 *
 *     {@demo "./demos/divider.jsx"}
 *     {@demo "./demos/space.jsx"}
 *     {@demo "./demos/flexible-space.jsx"}
 *
 *     不过在弹出的子菜单中，一般只使用分隔线和空隔两种方式：*因为弹出式子菜单的高度是不固定的，所以使用弹性空隔的效果与空隔相同*
 *
 *     {@demo "./demos/divider-submenu.jsx"}
 *     {@demo "./demos/space-submenu.jsx"}
 *
 *     而在垂直布局模式的菜单中，若需要使用弹性空隔，那么请确保有给菜单指定高度：
 *
 *     {@demo "./demos/divider-vertical.jsx"}
 *     {@demo "./demos/space-vertical.jsx"}
 *     {@demo "./demos/flexible-space-vertical.jsx"}
 */
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
