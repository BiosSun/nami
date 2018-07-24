import { PureComponent, ReactElement, ReactNode } from 'react'
import { findDOMNode } from 'react-dom'

export interface ReferenceProps {
    innerElement(referenceElement: Element | null | Text): void
    children: ReactElement<any>
}

export default class Reference extends PureComponent<ReferenceProps> {
    componentDidMount() {
        this.props.innerElement(findDOMNode(this))
    }

    render(): ReactNode {
        return this.props.children
    }
}
