import React, { Component, ReactElement } from 'react'
import { Menu, MenuItemGroupProps } from 'nami'

import { ComponentNavInfo } from '@docs/utils/component-nav-info.interface'
import MenuItemLink from '@docs/components/menu-item-link'

interface DocumentNavProps {
    componentNavInfo: ComponentNavInfo
}

export default class DocumentNav extends Component<DocumentNavProps, {}> {
    render() {
        const { componentNavInfo } = this.props

        return (
            <Menu mode="vertical">
                <Menu.Item defaultOpen>
                    组件
                    <Menu>{this.renderGroups(componentNavInfo)}</Menu>
                </Menu.Item>
            </Menu>
        )
    }

    renderGroups(componentNavInfo: ComponentNavInfo): ReactElement<{}>[] {
        if (!componentNavInfo) {
            return
        }

        const groups: ReactElement<MenuItemGroupProps>[] = []

        for (let groupName of Object.keys(componentNavInfo)) {
            const componentInfos = componentNavInfo[groupName]

            const group = (
                <Menu.ItemGroup key={groupName}>
                    {groupName}

                    {componentInfos.map(componentInfo => (
                        <MenuItemLink
                            key={componentInfo.name}
                            to={`/documents/components/${componentInfo.name}`}
                        >
                            {componentInfo.name}
                        </MenuItemLink>
                    ))}
                </Menu.ItemGroup>
            )

            groups.push(group)
        }

        return groups
    }
}
