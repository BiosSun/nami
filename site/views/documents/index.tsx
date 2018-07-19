import React, { Component } from 'react'
import { RouteComponentProps, Redirect } from 'react-router-dom'

import Document from '@site/components/document'
import DocumentsNav from '@site/components/documents-nav'
import { DocsIndexContext } from '@site/components/contexts'

interface DocumentsViewRouteParams {
    // 文章所属分组
    fragment?: string
    // 文章名称
    name?: string
}
interface DocumentsViewProps extends RouteComponentProps<DocumentsViewRouteParams> {}

export default class DocumentsView extends Component<DocumentsViewProps> {
    render() {
        const { match } = this.props

        if (!match.params.name) {
            return (
                <DocsIndexContext.Consumer>
                    {({ articles }) => <Redirect to={`/documents/articles/${articles[0].name}`} />}
                </DocsIndexContext.Consumer>
            )
        } else {
            return (
                <div className="app-view">
                    <div className="app-sidebar">
                        <DocumentsNav />
                    </div>
                    <Document className="app-content" {...match.params} />
                </div>
            )
        }
    }
}
