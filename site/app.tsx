import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Header from '@site/components/header'
import Footer from '@site/components/footer'
import { DocsIndexContext } from '@site/components/contexts'

import DocumentsView from '@site/views/documents'
import IndexView from '@site/views/index'

import docsIndex from '@site/docs/index.json'

import './app.scss'

export default class App extends Component {
    render() {
        return (
            <DocsIndexContext.Provider value={docsIndex}>
                <React.Fragment>
                    <Route path="/" component={Header} />

                    <Route path="/" exact component={IndexView} />
                    <Route path="/documents/:fragment?/:name?" component={DocumentsView} />

                    <Route path="/" component={Footer} />
                </React.Fragment>
            </DocsIndexContext.Provider>
        )
    }
}
