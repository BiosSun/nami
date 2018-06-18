export interface ComponentInfo {
    /**
     * 组件名称；
     */
    name: string

    /**
     * 组件显示名称；
     */
    displayName?: string

    /**
     * 组件所属组名称；
     */
    groupName?: string

    /**
     * 若是子组件，该属性表示其所属父组件的名称；
     */
    parentComponentName?: string

    /**
     * 组件源代码文件相对于项目根目录的相对路径，如：'src/components/menu/index.tsx'；
     */
    sourceFile: string

    /**
     * 组件描述；
     */
    text?: string

    /**
     * 组件示例；
     */
    examples?: ComponentExampleInfo[]

    /**
     * 示例代码作为重点；
     */
    codes?: ComponentCodesInfo

    /**
     * 组件属性；
     */
    props?: ComponentPropInfo[]

    /**
     * 子组件信息；
     */
    subComponents?: ComponentInfo[]
}

export interface ComponentExampleInfo {
    /**
     * 示例标题
     */
    title: string

    /**
     * 示例文本
     */
    text: string
}

export interface ComponentPropInfo {
    /**
     * 属性名称；
     */
    name: string

    /**
     * 属性的默认值；
     */
    default: string

    /**
     * 属性描述
     */
    text: string

    /**
     * 属性类型；
     */
    type: ComponentPropTypeInfo

    /**
     * 组件标记；
     */
    flags: {
        /**
         * 该属性是否是私有的；
         */
        isPrivate: true

        /**
         * 该属性是否是可选的；
         */
        isOptional: true
    }
}

export interface ComponentPropTypeInfo {
    /**
     * 该类型所属类别；
     */
    type: 'intrinsic' | 'reference' | 'union' | 'stringLiteral' | 'function'

    /**
     * 如果是内部类型或引用类型，则该属性表示类型名称；
     */
    name?: string

    /**
     * 如果是联合类型，则会通过该属性提供所有类型信息；
     */
    types?: ComponentPropTypeInfo[]

    /**
     * 如果是字符串字面量，则该属性表示字面量值；
     */
    value?: string

    /**
     * 如果是函数类型，则该属性表示函数的参数信息；
     */
    parameters?: ComponentPropInfo[]

    /**
     * 如果是函数类型，则该属性表示函数的返回结果信息；
     */
    result?: ComponentPropTypeInfo
}

export interface ComponentCodesInfo {
    [id: string]: {
        /**
         * 示例代码 ID
         */
        id: string

        /**
         * 示例代码名称
         */
        name: string
    }
}
