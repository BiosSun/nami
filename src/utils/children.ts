import { ReactNode, Children, isValidElement, cloneElement } from 'react'
import { getIterator } from 'iterall'
import isReactFragment from './is-react-fragment'

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

/**
 * 制做一份 children 的浅拷贝。
 * 支持 React.Fragment，当遍历到 React.Fragment 时，会将其中的子元素提取出来。
 * 通过 React.Children.map 方法结合 React.cloneElement 实现。
 */
function cloneChildren<T extends ReactNode>(children: ReactNode, props?: object): T[] {
    return Children.map(
        children,
        (child): T => {
            if (isReactFragment(child)) {
                return cloneChildren(child.props.children, props) as T
            } else if (isValidElement(child)) {
                return cloneElement<any>(child, props) as T
            } else {
                return child as T
            }
        }
    )
}

export default {
    cons,
    cloneChildren,
}
