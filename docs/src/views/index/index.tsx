import React, { PureComponent } from 'react'
import Logo from '@docs/components/logo'

import './index.scss'

export default class IndexView extends PureComponent<{}> {
    render() {
        return (
            <div className="app-view">
                <div className="app-masthead">
                    <Logo className="app-masthead__logo" />
                    <h1 className="app-masthead__slogen">一个简洁的 UI 组件库</h1>
                </div>
            </div>
        )
    }
}
