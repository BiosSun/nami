import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Header from '@docs/components/header'
import Footer from '@docs/components/footer'
import Logo from '@docs/components/logo'

import DocumentsView from '@docs/views/documents'

import './app.scss'

function Index() {
    return (
        <div className="app-view">
            <div className="app-masthead">
                <Logo className="app-masthead__logo" />
                <h1 className="app-masthead__slogen">一个简洁的 UI 组件库</h1>
            </div>
        </div>
    )
}

function About() {
    return <div className="app-view">About</div>
}

interface AppProps {}
interface AppState {}

export default class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props)
    }

    render() {
        return (
            <React.Fragment>
                <Route path="/" component={Header} />

                <Route path="/" exact component={Index} />
                <Route path="/documents/:name?/:subname?" component={DocumentsView} />
                <Route path="/about" component={About} />

                <Route path="/" component={Footer} />
            </React.Fragment>
        )
    }
}
