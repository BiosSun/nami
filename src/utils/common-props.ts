/** @module Components */

import React from 'react'

/**
 * 通用组件属性，所有组件必须支持这些属性。
 */
export default interface CommonProps<T> {
    /**
     * @private
     * 自定义样式名称
     */
    readonly className?: string

    /**
     * @private
     * 自定义样式
     */
    readonly style?: object

    /**
     * @private
     * @description 组件实例标识符
     */
    readonly key?: React.Key

    /**
     * @private
     * @description 引用组件实例
     */
    readonly ref?: React.Ref<T>
}
