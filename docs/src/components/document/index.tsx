import React, { Component, ReactElement, ReactNode } from 'react'
import classnames from 'classnames'
import Markdown from 'react-markdown'
import {
    ComponentInfo,
    ComponentPropInfo,
    ComponentExampleInfo,
    ComponentPropTypeInfo,
} from '@docs/utils/component-info.interface'
import DemoCode from '@docs/components/demo-code'

import './index.scss'

interface DocumentProps {
    /**
     * 自定义样式类名
     */
    className: string

    /**
     * 该组件须要渲染的组件的信息
     */
    componentInfo: ComponentInfo
}

export default class Document extends Component<DocumentProps> {
    render() {
        const classes = classnames('app-document', 'rio', this.props.className)
        const { componentInfo } = this.props

        return (
            <div className={classes}>
                {componentInfo ? this.renderDocument(componentInfo) : this.renderLoading()}
            </div>
        )
    }

    renderDocument(componentInfo: ComponentInfo): ReactElement<any> {
        return (
            <React.Fragment>
                {this.renderTitle(componentInfo.name, componentInfo.displayName)}
                {this.renderDescription(componentInfo.text, componentInfo)}
                {this.renderExamples(componentInfo.examples, componentInfo)}

                <h2>参数</h2>
                {this.renderProps(componentInfo.props, componentInfo.name)}
                {this.renderSubComponents(componentInfo.subComponents)}
            </React.Fragment>
        )
    }

    renderTitle(name: string, displayName: string): ReactElement<any> {
        return (
            <h1 className="app-document__title">
                {name}
                {displayName ? <span>{displayName}</span> : undefined}
            </h1>
        )
    }

    renderDescription(description: string, componentInfo: ComponentInfo): ReactElement<any> {
        return this.renderSection(description, componentInfo)
    }

    renderExamples(
        examples: ComponentExampleInfo[],
        componentInfo: ComponentInfo
    ): ReactElement<any> {
        if (!examples) {
            return undefined
        }

        return (
            <div className="app-document__examples">
                {examples.map(({ title, text }) => (
                    <div className="app-document__example" key={title || text}>
                        {title ? <h2>{title}</h2> : undefined}
                        {this.renderSection(text, componentInfo)}
                    </div>
                ))}
            </div>
        )
    }

    renderSection(text: string, componentInfo: ComponentInfo): ReactElement<any> {
        return (
            <Markdown
                escapeHtml={false}
                source={text}
                renderers={{
                    root: React.Fragment,
                    code: props => <DemoCode {...props} componentInfo={componentInfo} />,
                }}
            />
        )
    }

    renderSubComponents(subComponents: ComponentInfo[]): ReactElement<any>[] {
        if (!subComponents) {
            return undefined
        }

        return subComponents.map(subComponent => {
            const name = `${subComponent.parentComponentName}.${subComponent.name}`
            const key = `sub-components-${name}`

            return (
                <React.Fragment key={key}>
                    {this.renderProps(subComponent.props, name)}
                </React.Fragment>
            )
        })
    }

    renderProps(props: ComponentPropInfo[], title?: string): ReactElement<any> {
        return (
            <React.Fragment>
                {title ? <h3>{title}</h3> : undefined}
                <table className="app-document__props">
                    <thead>
                        <tr>
                            <th>参数</th>
                            <th>说明</th>
                            <th>类型</th>
                            <th>默认值</th>
                        </tr>
                    </thead>
                    <tbody>{props.map(prop => this.renderProp(prop))}</tbody>
                </table>
            </React.Fragment>
        )
    }

    renderProp(prop: ComponentPropInfo): ReactElement<any> {
        return prop.flags.isPrivate ? (
            undefined
        ) : (
            <tr key={`prop-${prop.name}`}>
                <td className="app-document__props__name">
                    <code>{prop.name}</code>
                </td>
                <Markdown
                    className="app-document__props__description"
                    escapeHtml={false}
                    source={prop.text}
                    renderers={{ root: 'td' }}
                />
                <td className="app-document__props__type">{this.renderPropType(prop.type)}</td>
                <td className="app-document__props__default">
                    {prop.default ? <code>{prop.default}</code> : undefined}
                </td>
            </tr>
        )
    }

    renderPropType(type: ComponentPropTypeInfo): ReactNode {
        switch (type.type) {
            case 'intrinsic':
            case 'reference':
                return (
                    <code key={`type-${type.name}`} className={`type__${type.type}`}>
                        {type.name}
                    </code>
                )
            case 'stringLiteral':
                return (
                    <code
                        key={`type-string-literal-${type.value}`}
                        className="type__string-literal"
                    >
                        '{type.value}'
                    </code>
                )
            case 'union':
                return type.types
                    .map(this.renderPropType)
                    .reduce((prev, curr) => [prev, ' | ', curr])
        }
    }

    renderLoading(): ReactElement<any> {
        const classes = classnames('app-document--loading', this.props.className)
        return <div className={classes}>loading ...</div>
    }
}
