import React, { PureComponent } from 'react'
import Logo from '@site/components/logo'
import { DocsIndexContext } from '@site/components/contexts'

import './index.scss'

export default class IndexView extends PureComponent<{}> {
    render() {
        return (
            <DocsIndexContext.Consumer>
                {({ lang }) => (
                    <div className="app-view">
                        <div className="app-masthead">
                            <Logo className="app-masthead__logo" />
                            <h1 className="app-masthead__slogen">{lang.slogan}</h1>
                            <p className="app-masthead__version">v{process.env.VERSION}</p>
                        </div>
                    </div>
                )}
            </DocsIndexContext.Consumer>
        )
    }
}
