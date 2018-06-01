export interface ComponentNavInfo {
    [groupName: string]: ComponentNavItemInfo[]
}

export interface ComponentNavItemInfo {
    /**
     * 所属组名
     */
    groupName: string

    /**
     * 组件名称
     */
    name: string

    /**
     * 对应的数据文件名
     */
    file: string
}
