/**
 * 用于过滤某个类型中的属性
 */
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

/**
 * 组件处理状态
 */
type State = 'success' | 'warning' | 'danger'

export { Omit, State }
