export interface DocsIndexInfo {
    lang: DocsIndexLangInfo
    sort: DocsIndexSortInfo
    articles: Array<DocsIndexItemInfo>
    components: DocsIndexGroupsInfo
}

export interface DocsIndexLangInfo {
    [name: string]: string
}

export type DocsIndexSortInfo = string[]

export interface DocsIndexItemInfo {
    id: string
    name: string
    displayName: string
}

export interface DocsIndexGroupsInfo {
    [groupName: string]: Array<DocsIndexItemInfo>
}
