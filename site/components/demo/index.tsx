import React, { Component } from 'react'
import classnames from 'classnames'
import Loadable from 'react-loadable'
import { Icon } from 'nami'

import SyntaxHighlighter from 'react-syntax-highlighter/prism'
import syntaxHighlighterStyle from 'react-syntax-highlighter/styles/prism/hopscotch'

delete syntaxHighlighterStyle['code[class*="language-"]']
delete syntaxHighlighterStyle['pre[class*="language-"]']

import { DocInfo } from '@site/utils/doc-info.interface'

import './index.scss'

const DEMO_FLAG = 'demo.'

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
     * 所在文档信息
     */
    docInfo: DocInfo

    /**
     * 所属文档分组名称
     */
    fragment: string
}

interface DemoState {
    /**
     * 是否是 Demo 示例
     */
    isDemo: boolean

    /**
     * demo 组件信息，若 isDemo 为 true，则该属性有值
     */
    demoInfo: {
        hash: string
        name: string
        path: string
    }

    /**
     * 是否展开以显示示例代码
     */
    expand: boolean
}

export default class Demo extends Component<DemoProps, DemoState> {
    constructor(props: DemoProps) {
        super(props)

        this.state = {
            isDemo: false,
            demoInfo: undefined,
            expand: false,
        }
    }

    static getDerivedStateFromProps(props: DemoProps, state: DemoState): DemoState {
        const { language, fragment, docInfo } = props

        const isDemo = language.startsWith(DEMO_FLAG)

        if (isDemo) {
            const hash = language.substring(DEMO_FLAG.length)
            const name = docInfo.demos[hash].name
            const path = `${fragment}/${docInfo.name}/${name}.jsx`

            return {
                ...state,
                isDemo,
                demoInfo: { hash, name, path },
            }
        } else {
            return {
                ...state,
                isDemo,
            }
        }
    }

    onCodeHandleBarClick = () => {
        this.setState({
            expand: !this.state.expand,
        })
    }

    render() {
        const { language, value: code } = this.props
        const { isDemo } = this.state

        if (isDemo) {
            return this.renderDemo(code)
        } else {
            return this.renderCode(code, language)
        }
    }

    renderDemo(code: string): React.ReactNode {
        const { docInfo } = this.props
        const { demoInfo, expand } = this.state

        const classes = {
            root: classnames(`app-demo rio-block`, {
                'app-demo--expand': expand,
            }),

            stage: classnames(
                `app-demo__stage`,
                `demo-${docInfo.name.toLowerCase()}`,
                `demo-${docInfo.name.toLowerCase()}-${demoInfo.name.toLowerCase()}`
            ),

            code: `app-demo__code`,
            codeHandleBar: `app-demo__code__handle-bar`,
        }

        return (
            <div className={classes.root}>
                <div className={classes.stage}>{this.renderDemoComponent()}</div>
                <div className={classes.code}>
                    <button className={classes.codeHandleBar} onClick={this.onCodeHandleBarClick}>
                        <Icon name={expand ? 'up' : 'down'} />
                        &nbsp;
                        {expand ? '隐藏' : '展开'}代码
                    </button>
                    {expand && this.renderCode(code, 'jsx')}
                </div>
            </div>
        )
    }

    renderCode(code: string, language: string): React.ReactNode {
        return (
            <SyntaxHighlighter language={language} style={syntaxHighlighterStyle}>
                {code}
            </SyntaxHighlighter>
        )
    }

    renderDemoComponent(): React.ReactNode {
        const {
            demoInfo: { path },
        } = this.state

        let DemoComponent = DemoComponents[path]

        if (!DemoComponent) {
            DemoComponent = DemoComponents[path] = Loadable({
                loader: () => import(`@site/demos/${path}`),
                loading: () => <span>Demo Loading ...</span>,
            })
        }

        return <DemoComponent />
    }
}
