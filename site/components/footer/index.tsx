import React, { Component } from 'react'
import Markdown from 'react-markdown'
import { DocsIndexContext } from '@site/components/contexts'

import './index.scss'

export default class Footer extends Component {
    render() {
        return (
            <DocsIndexContext.Consumer>
                {({ lang }) => (
                    <div className="app-footer">
                        {/*
                                Designed and built by <a href="http://biossun.org" target="_blank">Bios Sun</a>, 
                                the design is inspired by <a href="https://www.youtube.com/embed/j0xbX5ivgdA?autoplay=1" target="_blank">snow from Hokkaido</a>, 
                                and the name comes from the character of the same name in the <a href="https://one-piece.com/" target="_blank">One Piece</a> Comics.
                                <br />

                                Code licensed <a href="https://github.com/biossun/nami/blob/master/LICENSE" target="_blank">MIT</a>, 
                                docs <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank">CC BY 3.0</a>.
                            */}

                        <Markdown
                            escapeHtml={false}
                            source={lang.floor}
                            renderers={{
                                root: React.Fragment,
                            }}
                        />
                    </div>
                )}
            </DocsIndexContext.Consumer>
        )
    }
}
