import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Header from '@docs/components/header'
import Footer from '@docs/components/footer'

import DocumentsView from '@docs/views/documents'
import IndexView from '@docs/views/index'

import './app.scss'

export default class App extends Component {
    constructor(props: {}) {
        super(props)
    }

    render() {
        return (
            <React.Fragment>
                <Route path="/" component={Header} />

                <Route path="/" exact component={IndexView} />
                <Route path="/documents/:name?/:subname?" component={DocumentsView} />

                <Route path="/" component={Footer} />
            </React.Fragment>
        )
    }
}
