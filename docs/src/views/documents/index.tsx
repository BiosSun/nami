import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'

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
    componentNavInfo?: ComponentNavInfo
    componentInfo?: ComponentInfo
}

export default class DocumentsView extends Component<DocumentsViewProps, DocumentsViewState> {
    constructor(props: DocumentsViewProps) {
        super(props)

        this.state = {
            componentNavInfo: undefined,
            componentInfo: undefined,
        }
    }

    async componentDidMount() {
        const componentNavInfo = await this.loadComponentNavInfo()
        this.setState({ componentNavInfo })

        console.info('did mount')
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

        if (loadedComponentName !== loadComponentName) {
            const name = this.getLoadComponentName()
            const componentInfo = await import(`@docs/datas/components/${name}.json`)
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
        const { componentNavInfo } = this.state
        return (
            this.props.match.params.subname ||
            (componentNavInfo && componentNavInfo['general'][0].name)
        )
    }

    render() {
        const { componentNavInfo, componentInfo } = this.state

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
