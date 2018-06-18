import React, {
    Component,
    ReactNode,
    ReactElement,
    isValidElement,
    Children,
    cloneElement,
    ReactChild,
} from 'react'

import classnames from 'classnames'
import CommonProps from '@utils/common-props'
import childrenUtils from '@utils/children'

import { ItemProps } from './item'

export interface ItemGroupProps extends CommonProps<ItemGroup> {
    /**
     * 该分组的头部内容及其所包含的菜单项<br/>
     * *第一个子元素将做为分组的头部内容，其余子元素为该分组中所包含的菜单项*
     */
    readonly children?: ReactNode
}

interface ItemGroupState {
    /**
     * 组件头部内容
     */
    readonly headerContent: ReactChild

    /**
     * 该分组内所包含的所有菜单项
     */
    readonly items: ReactElement<ItemProps>[]
}

/**
 * @component
 *
 * @displayname 菜单分组
 * @parent Menu
 */
export default class ItemGroup extends Component<ItemGroupProps, ItemGroupState> {
    constructor(props: ItemGroupProps, context?: any) {
        super(props, context)

        this.state = {
            items: undefined,
            headerContent: undefined,
        }
    }

    static getDerivedStateFromProps(nextProps: ItemGroupProps): ItemGroupState {
        const { children } = nextProps
        const [headerContent, items] = childrenUtils.cons<ReactChild, ReactElement<ItemProps>>(
            children
        )

        return { items, headerContent }
    }

    render(): ReactNode {
        const { className, style, children, ...otherProps } = this.props
        const { headerContent, items } = this.state

        const classes = {
            root: classnames('menu__item-group', className),
            header: 'menu__item-group__header',
        }

        return (
            <div className={classes.root} style={style}>
                <div className={classes.header}>{headerContent}</div>
                {Children.map(
                    items,
                    item => isValidElement(item) && cloneElement(item, otherProps)
                )}
            </div>
        )
    }
}
