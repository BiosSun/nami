/** @module Components */

import React from 'react'

/**
 * 通用组件属性，所有组件必须支持这些属性。
 */
export default interface CommonProps<T> {
    /**
     * 自定义样式名称
     */
    className?: string

    /**
     * 自定义样式
     */
    style?: object

    /**
     * @private
     * @description 组件实例标识符
     */
    key?: React.Key

    /**
     * @private
     * @description 引用组件实例
     */
    ref?: React.Ref<T>
}
