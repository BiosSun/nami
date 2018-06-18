import React, { Component, ReactNode, ReactElement, ReactChild, cloneElement } from 'react'
import classnames from 'classnames'
import CommonProps from '@utils/common-props'
import childrenUtils from '@utils/children'

import { MenuProps } from './menu'
import Icon from '@components/icon'

export interface ItemProps extends CommonProps<Item> {
    /**
     * 该菜单项当前是否处于激活状态
     * @default false
     */
    readonly active?: boolean

    /**
     * 该菜单项默认是否处于打开状态
     * @default false
     */
    readonly defaultOpen?: boolean

    /**
     * 菜单项头部内容及子菜单<br />
     * *第一个子元素将做为菜单项的头部内容，而第二个子元素将做为子菜单，其余的子元素被忽略*
     */
    readonly children?: ReactNode
}

interface ItemState {
    /**
     * 该菜单项当前是否处于鼠标悬停状态
     */
    readonly hover: boolean

    /**
     * 该菜单项中的子菜单（如果有的话）当前是否处于打开状态
     */
    readonly open: boolean

    /**
     * 该菜单项中包含的头部内容
     */
    readonly headerContent: ReactChild

    /**
     * 该菜单项中包含的所有子菜单元素
     */
    readonly subMenu: ReactElement<MenuProps>
}

/**
 * @component
 *
 * @displayname 菜单项
 * @parent Menu
 */
export default class Item extends Component<ItemProps, ItemState> {
    readonly state: ItemState = {
        hover: false,
        open: !!this.props.defaultOpen,
        subMenu: undefined,
        headerContent: undefined,
    }

    onItemHeaderMouseEnter = () => {
        this.setState({ hover: true })
    }

    onItemHeaderMouseLeave = () => {
        this.setState({ hover: false })
    }

    onItemHeaderClick = () => {
        const hasSubMenu = !!this.state.subMenu

        if (hasSubMenu) {
            this.setState({ open: !this.state.open })
        }
    }

    static getDerivedStateFromProps(nextProps: ItemProps, prevState: ItemState): ItemState {
        const { children } = nextProps
        const [headerContent, [subMenu]] = childrenUtils.cons<ReactChild, ReactElement<MenuProps>>(
            children
        )

        return {
            ...prevState,
            subMenu,
            headerContent,
        }
    }

    render() {
        const { active, className, style } = this.props
        const { hover, open, headerContent, subMenu } = this.state

        const classes = {
            root: classnames(
                'menu__item',
                {
                    'menu__item--active': active || hover || open,
                    'menu__item--open': open,
                },
                className
            ),
            header: 'menu__item__header',
            headerArrows: 'menu__item__header__arrows',
        }

        const header = (
            <div
                className={classes.header}
                onMouseEnter={this.onItemHeaderMouseEnter}
                onMouseLeave={this.onItemHeaderMouseLeave}
                onClick={this.onItemHeaderClick}
            >
                {headerContent}
                {subMenu ? (
                    <Icon name={open ? 'up' : 'down'} className={classes.headerArrows} />
                ) : (
                    undefined
                )}
            </div>
        )

        const subMenuContainer = subMenu
            ? cloneElement(subMenu, {
                  subMenu: true,
              })
            : undefined

        return (
            <div className={classes.root} style={style}>
                {header}
                {subMenuContainer}
            </div>
        )
    }
}

export { Item }
