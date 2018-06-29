import { ReactNode } from 'react'
import { getIterator } from 'iterall'

/**
 * 返回第一个子元素及其余子元素结点
 * @param children 子元素
 * @return 返回值是一个二元元组：
 *         第一个值是子元素结点中的第一个子元素，第二个值是其余子元素，
 *         若只有一个子元素，则第二个值是一个空数组。
 */
function cons<T extends ReactNode, P extends ReactNode>(children: ReactNode): [T, P[]] {
    let car: T = children as T
    let cdr: P[] = []

    if (typeof children === 'object') {
        let iterator, step

        if (Array.isArray(children)) {
            car = children[0] as T
            cdr = children.slice(1) as P[]
        } else if ((iterator = getIterator(children))) {
            while (!(step = iterator.next()).done) {
                cdr.push(step.value)
            }

            car = (cdr.shift() as any) as T
        }
    }

    return [car, cdr]
}

export default {
    cons,
}
