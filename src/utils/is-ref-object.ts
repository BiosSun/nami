import { Component, RefObject, PureComponent } from 'react'

export default function isRefObject<T>(x: any): x is RefObject<T> {
    const hasCurrent = Object.prototype.hasOwnProperty.call(x, 'current')
    const isComponent = x instanceof Component
    const isPureComponent = x instanceof PureComponent
    const isNode = x instanceof Node
    const isFunction = typeof x === 'function'

    return hasCurrent && !isComponent && !isPureComponent && !isNode && !isFunction
}
