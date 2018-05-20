import { Children, ReactChild, ReactNode } from 'react'

/**
 * 返回第一个子元素及其余子元素结点
 * @param children 子元素
 * @return 返回值是一个二元元组，第一个值是子元素结点中的第一个子元素，第二个值是其余子元素，若只有一个子元素，则第二个值是一个空数组。
 */
function cons<T extends ReactChild, P extends ReactChild>(children: ReactNode): [T, P[]] {
    const ary = Children.toArray(children)

    let car: T = ary.shift() as T
    let cdr: P[] = ary as P[]

    return [car, cdr]
}

export default {
    cons,
}
