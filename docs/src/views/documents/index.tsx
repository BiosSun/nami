import React, { Component } from 'react'
import { RouteComponentProps, Redirect } from 'react-router-dom'

import Document from '@docs/components/document'
import DocumentNav from '@docs/components/document-nav'
import { ComponentNavInfo } from '@docs/utils/component-nav-info.interface'
import { ComponentInfo } from '@docs/utils/component-info.interface'

import './index.scss'

interface DocumentsViewRouteParams {
    name: string
    subname: string
}
interface DocumentsViewProps extends RouteComponentProps<DocumentsViewRouteParams, {}> {}

interface DocumentsViewState {
    // 必要的数据是否已加载完毕
    finish?: boolean

    // 组件导航信息（必要数据）
    componentNavInfo?: ComponentNavInfo

    // 当前所浏览的组件信息
    componentInfo?: ComponentInfo
}

export default class DocumentsView extends Component<DocumentsViewProps, DocumentsViewState> {
    constructor(props: DocumentsViewProps) {
        super(props)

        this.state = {
            componentNavInfo: undefined,
            componentInfo: undefined,
            finish: false,
        }
    }

    async componentDidMount() {
        this.setState({
            finish: true,
            componentNavInfo: await this.loadComponentNavInfo(),
        })
    }

    async componentDidUpdate() {
        const componentInfo = await this.loadComponentInfo()

        if (componentInfo !== this.state.componentInfo) {
            this.setState({
                componentInfo,
            })
        }
    }

    async loadComponentNavInfo(): Promise<ComponentNavInfo> {
        const componentNavInfo = await import(`@docs/datas/components/${'index'}.json`)
        return componentNavInfo.default // webpack package need use default
    }

    async loadComponentInfo(): Promise<ComponentInfo> {
        const loadedComponentName = this.getLoadedComponentName()
        const loadComponentName = this.getLoadComponentName()

        if (loadComponentName && loadComponentName !== loadedComponentName) {
            const componentInfo = await import(`@docs/datas/components/${loadComponentName}.json`)
            return componentInfo.default // webpack package need use default
        } else {
            return this.state.componentInfo
        }
    }

    /** 获取已加载的组件信息的名称 */
    getLoadedComponentName() {
        const { componentInfo } = this.state
        return componentInfo && componentInfo.name
    }

    /** 获取待加载的组件信息的名称 */
    getLoadComponentName() {
        return this.props.match.params.subname
    }

    /** 获取第一篇文档的地址 */
    getFirstDocumentPath() {
        const { componentNavInfo } = this.state
        const firstComponentName = componentNavInfo.general[0].name
        return `/documents/components/${firstComponentName}`
    }

    render() {
        const { match } = this.props
        const { finish, componentNavInfo, componentInfo } = this.state

        if (!finish) {
            return <div className="app-view">loading ...</div>
        } else if (!match.params.name) {
            return <Redirect to={this.getFirstDocumentPath()} />
        } else {
            return (
                <div className="app-view">
                    <div className="app-sidebar">
                        <DocumentNav componentNavInfo={componentNavInfo} />
                    </div>
                    <Document className="app-content" componentInfo={componentInfo} />
                </div>
            )
        }
    }
}
