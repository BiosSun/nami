import React, { Component } from 'react'
import classnames from 'classnames'
import Loadable from 'react-loadable'
import { Icon } from 'nami'

import SyntaxHighlighter from 'react-syntax-highlighter/prism'
import syntaxHighlighterStyle from 'react-syntax-highlighter/styles/prism/hopscotch'

delete syntaxHighlighterStyle['code[class*="language-"]']
delete syntaxHighlighterStyle['pre[class*="language-"]']

import { ComponentInfo } from '@docs/utils/component-info.interface'

import './index.scss'

const DEMO_FLAG = 'demo-'

const DemoComponents: {
    [id: string]: React.ComponentType<{}> & Loadable.LoadableComponent
} = {}

interface DemoProps {
    /**
     * 代码语法
     */
    language: string

    /**
     * 示例代码
     */
    value: string

    /**
     * 所在组件的组件信息
     */
    componentInfo: ComponentInfo
}

interface DemoState {
    /**
     * 是否展开以显示示例代码
     */
    expand: boolean
}

export default class Demo extends Component<DemoProps, DemoState> {
    constructor(props: DemoProps) {
        super(props)

        this.state = {
            expand: false,
        }
    }

    onCodeHandleBarClick = () => {
        this.setState({
            expand: !this.state.expand,
        })
    }

    render() {
        const { language, value: code, componentInfo } = this.props
        const isDemo = language.indexOf(DEMO_FLAG) === 0

        if (isDemo) {
            const demoId = language.substring(DEMO_FLAG.length)
            return this.renderDemo(demoId, code, componentInfo)
        } else {
            return this.renderCode(code)
        }
    }

    renderDemo(id: string, code: string, componentInfo: ComponentInfo): React.ReactNode {
        const name = componentInfo.codes[id].name
        const { expand } = this.state

        const classes = {
            root: classnames(`app-demo rio-block`, {
                'app-demo--expand': expand,
            }),

            stage: classnames(
                `app-demo__stage`,
                `demo-${componentInfo.name.toLowerCase()}`,
                `demo-${componentInfo.name.toLowerCase()}-${name}`
            ),

            code: `app-demo__code`,
            codeHandleBar: `app-demo__code__handle-bar`,
        }

        return (
            <div className={classes.root}>
                <div className={classes.stage}>{this.renderDemoComponent(id)}</div>
                <div className={classes.code}>
                    <button className={classes.codeHandleBar} onClick={this.onCodeHandleBarClick}>
                        <Icon name={expand ? 'up' : 'down'} />
                        &nbsp;
                        {expand ? '隐藏' : '展开'}代码
                    </button>
                    {expand && this.renderCode(code)}
                </div>
            </div>
        )
    }

    renderCode(code: string): React.ReactNode {
        return (
            <SyntaxHighlighter language="jsx" style={syntaxHighlighterStyle}>
                {code}
            </SyntaxHighlighter>
        )
    }

    renderDemoComponent(id: string): React.ReactNode {
        let DemoComponent = DemoComponents[id]

        if (!DemoComponent) {
            DemoComponent = DemoComponents[id] = Loadable({
                loader: () => import(`@docs/demos/${id}.jsx`),
                loading: () => <span>Demo Loading ...</span>,
            })
        }

        return <DemoComponent />
    }
}
