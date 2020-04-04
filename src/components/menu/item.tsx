import React, { Component, ReactNode, ReactElement, HTMLAttributes, isValidElement } from 'react'
import classnames from 'classnames'
import omit from 'object.omit'
import Icon from '../icon'
import { MenuMode, SubMenuModeEnum } from './utils'
import { MenuProps } from './menu'

export type HeaderElement = ReactElement<HTMLAttributes<HTMLDivElement>>
export type SubMenuElement = ReactElement<MenuProps>

export interface BaseItemProps {
    /**
     * 该菜单项当前是否处于激活状态
     * @default false
     */
    active?: boolean

    /**
     * 该菜单项默认是否处于打开状态
     * @default false
     */
    defaultOpen?: boolean

    /**
     * 菜单项头部内容及子菜单<br />
     * *第一个子元素将做为菜单项的头部内容，而第二个子元素将做为子菜单，其余的子元素被忽略*
     */
    children?: ReactNode

    /**
     * 该菜单项是否禁用
     */
    disabled?: boolean

    /**
     * @private
     * 该菜单项所属菜单的深度
     */
    menuDepth?: number

    /**
     * @private
     * 该菜单项的深度
     */
    itemDepth?: number

    /**
     * @private
     * 该菜单项所属菜单的展示模式
     */
    menuMode?: MenuMode
}

export type ItemProps = BaseItemProps & HTMLAttributes<HTMLDivElement>

export interface ItemState {
    /**
     * 该菜单项当前是否处于鼠标悬停状态
     */
    hover: boolean

    /**
     * 该菜单项中的子菜单（如果有的话）当前是否处于打开状态
     */
    open: boolean

    /**
     * 该菜单项中包含的头部内容
     */
    headerContent: ReactNode

    /**
     * 该菜单项中包含的所有子菜单元素
     */
    subMenu: SubMenuElement
}

export default class Item extends Component<ItemProps, ItemState> {
    static displayName = 'Menu.Item'

    static propKeys = ['active', 'defaultOpen', 'menuDepth', 'itemDepth', 'menuMode', 'children']

    readonly state: Readonly<ItemState> = {
        hover: false,
        open: this.props.defaultOpen,
        subMenu: undefined,
        headerContent: undefined,
    }

    static getDerivedStateFromProps(nextProps: ItemProps, prevState: ItemState): ItemState {
        return {
            ...prevState,
            ...Item.takeHeaderContentAndSubMenu(nextProps.children),
        }
    }

    render() {
        const { active, disabled, className } = this.props
        const { hover, open } = this.state

        const header = this.renderHeader()
        const subMenu = this.renderSubMenu(header)

        const classes = {
            root: classnames(
                'nami-menu__item',
                {
                    [`nami-menu__item--active`]: active || hover || open,
                    [`nami-menu__item--open`]: open,
                    [`nami-menu__item--disabled`]: disabled,
                },
                className
            ),
        }

        return (
            <div {...omit(this.props, Item.propKeys)} className={classes.root} component="li">
                {// subMenu 会负责去渲染 header，因此在有 subMenu 时无须渲染它
                subMenu ? subMenu : header}
            </div>
        )
    }

    private renderHeader(): HeaderElement {
        const { itemDepth, menuDepth, menuMode } = this.props
        const { headerContent, subMenu } = this.state

        const classes = {
            root: classnames('nami-menu__item__header', {
                [`nami-menu__item__header--indent-${itemDepth}`]: !!itemDepth,
            }),
            arrows: 'nami-menu__item__header__arrows',
        }

        const arrowsIconName = menuMode === 'popover' && menuDepth >= 1 ? 'right' : 'down'
        const arrows = subMenu ? (
            <Icon name={arrowsIconName} className={classes.arrows} />
        ) : (
            undefined
        )

        return (
            <div
                className={classes.root}
                onMouseEnter={this.handleHeaderMouseEnter}
                onMouseLeave={this.handleHeaderMouseLeave}
                onClick={this.handleHeaderClick}
            >
                {headerContent}
                {arrows}
            </div>
        )
    }

    private renderSubMenu(header: HeaderElement): SubMenuElement {
        const { menuDepth, itemDepth, menuMode } = this.props
        const { open, subMenu } = this.state

        if (!subMenu) {
            return null
        } else {
            return (
                <subMenu.type
                    {...subMenu.props}
                    mode={SubMenuModeEnum[menuMode]}
                    subMenuOf={header}
                    subMenuOpen={open}
                    onSubMenuClose={this.handleSubMenuClose}
                    menuDepth={menuDepth + 1}
                    itemDepth={itemDepth}
                />
            )
        }
    }

    private handleHeaderMouseEnter = () => {
        this.setState({ hover: true })
    }

    private handleHeaderMouseLeave = () => {
        this.setState({ hover: false })
    }

    private handleHeaderClick = () => {
        if (this.state.subMenu) {
            this.setState({ open: !this.state.open })
        }
    }

    private handleSubMenuClose = () => {
        this.setState({ open: false })
    }

    /**
     * 从子元素中拿取头部内容及子菜单
     */
    private static takeHeaderContentAndSubMenu(
        children: ReactNode
    ): { headerContent: ReactNode; subMenu: SubMenuElement } {
        let headerContent: ReactNode
        let subMenu: SubMenuElement

        if (Array.isArray(children)) {
            const [first, second] = children

            headerContent = first

            if (isValidElement<MenuProps>(second)) {
                subMenu = second
            }
        } else {
            headerContent = children
        }

        return { headerContent, subMenu }
    }
}
