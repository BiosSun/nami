import React, { Component, ReactElement, ReactNode } from 'react'
import { Menu, MenuItemGroupProps } from 'nami'

import MenuItemLink from '@site/components/menu-item-link'
import DisplayName from '@site/components/display-name'
import { DocsIndexContext } from '@site/components/contexts'
import {
    DocsIndexItemInfo,
    DocsIndexGroupsInfo,
    DocsIndexLangInfo,
    DocsIndexSortInfo,
} from '@site/utils/docs-index-info.interface'

export default class DocumentsNav extends Component {
    render() {
        return (
            <DocsIndexContext.Consumer>
                {({ sort, lang, articles, components }) => (
                    <Menu className="app-documents-nav" mode="vertical">
                        {this.renderArticles(articles)}
                        {this.renderComponents(components, lang, sort)}
                    </Menu>
                )}
            </DocsIndexContext.Consumer>
        )
    }

    renderArticles(articles: Array<DocsIndexItemInfo>): ReactNode[] {
        return this.renderMenuItems('articles', articles)
    }

    renderComponents(
        components: DocsIndexGroupsInfo,
        lang: DocsIndexLangInfo,
        sort: DocsIndexSortInfo
    ): ReactNode {
        return (
            <Menu.Item defaultOpen>
                {lang['components'] || 'Components'}
                <Menu>{this.renderGroups('components', components, lang, sort)}</Menu>
            </Menu.Item>
        )
    }

    renderGroups(
        fragmentName: string,
        groups: DocsIndexGroupsInfo,
        lang: DocsIndexLangInfo,
        sort?: DocsIndexSortInfo
    ): ReactNode[] {
        if (!groups) {
            return undefined
        }

        const groupElements: Array<ReactElement<MenuItemGroupProps>> = []
        const groupNames = Object.keys(groups)

        if (sort) {
            groupNames.sort(
                (i, j) => sort.indexOf(groups[i][0].name) - sort.indexOf(groups[j][0].name)
            )
        }

        for (let groupName of groupNames) {
            const items = groups[groupName]

            const element = (
                <Menu.ItemGroup key={groupName}>
                    <DisplayName name={groupName} displayName={lang[groupName]} />
                    {this.renderMenuItems(fragmentName, items, sort)}
                </Menu.ItemGroup>
            )

            groupElements.push(element)
        }

        return groupElements
    }

    renderMenuItems(
        fragmentName: string,
        items: Array<DocsIndexItemInfo>,
        sort?: DocsIndexSortInfo
    ): ReactNode[] {
        if (sort) {
            items = [...items].sort((i, j) => sort.indexOf(i.name) - sort.indexOf(j.name))
        }

        return items.map(item => {
            const path = `/documents/${fragmentName}/${item.name}`

            return (
                <MenuItemLink key={path} to={path}>
                    <DisplayName name={item.name} displayName={item.displayName} />
                </MenuItemLink>
            )
        })
    }
}
