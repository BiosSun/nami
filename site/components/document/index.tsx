import React, { Component, ReactNode } from 'react'
import clsx from 'clsx'
import Markdown from 'react-markdown'
import { DocInfo } from '@site/utils/doc-info.interface'
import Demo from '@site/components/demo'
import DisplayName from '@site/components/display-name'

import './index.scss'

interface DocumentProps {
    /**
     * 自定义样式类名
     */
    className?: string

    /**
     * 文档所属分组
     */
    fragment?: string

    /**
     * 文章名称
     */
    name?: string
}

interface DocumentState {
    docInfo: DocInfo
}

export default class Document extends Component<DocumentProps, DocumentState> {
    state: Readonly<DocumentState> = {
        docInfo: undefined,
    }

    componentDidMount() {
        this.loadDocument()
    }

    componentDidUpdate(prevProps: DocumentProps) {
        if (prevProps.fragment !== this.props.fragment || prevProps.name !== this.props.name) {
            this.loadDocument()
        }
    }

    render() {
        const classes = clsx('app-document', 'rio', this.props.className)
        const { docInfo } = this.state

        return (
            <div className={classes}>{docInfo ? this.renderDocument() : this.renderLoading()}</div>
        )
    }

    private renderDocument(): ReactNode {
        const { fragment } = this.props
        const { docInfo } = this.state

        return (
            <React.Fragment>
                <h1 className="app-document__title">
                    <DisplayName name={docInfo.name} displayName={docInfo.displayName} />
                </h1>
                <Markdown
                    escapeHtml={false}
                    source={docInfo.text}
                    renderers={{
                        root: React.Fragment,
                        code: props => <Demo {...props} docInfo={docInfo} fragment={fragment} />,
                    }}
                />
            </React.Fragment>
        )
    }

    private renderLoading(): ReactNode {
        const classes = clsx('app-document--loading', this.props.className)
        return <div className={classes}>loading ...</div>
    }

    private async loadDocument() {
        const { fragment, name } = this.props
        const { default: docInfo } = await import(`@site/docs/${fragment}/${name}.json`)
        this.setState({ docInfo })
    }
}
