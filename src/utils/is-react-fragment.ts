import { isValidElement, ReactElement } from 'react'

export default function isReactFragment(el: any): el is ReactElement<any> {
    return (
        isValidElement(el) &&
        typeof el.type === 'symbol' &&
        (el.type as symbol).toString() === 'Symbol(react.fragment)'
    )
}
