import { PureComponent } from 'react'
import { findDOMNode } from 'react-dom'

export interface ReferenceProps {
    innerElement(referenceElement: Element | null | Text): void
}

export default class Reference extends PureComponent<ReferenceProps> {
    componentDidMount() {
        this.props.innerElement(findDOMNode(this))
    }

    render() {
        return this.props.children
    }
}
