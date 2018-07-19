import React, { Fragment } from 'react'
import Markdown from 'react-markdown'

import './index.scss'

interface DisplayNameProps {
    name: string
    displayName: string
}

const DisplayName: React.StatelessComponent<DisplayNameProps> = ({ name, displayName }) => {
    if (displayName) {
        return (
            <span className="app-display-name">
                <Markdown
                    escapeHtml={false}
                    source={displayName}
                    renderers={{
                        root: Fragment,
                        paragraph: Fragment,
                    }}
                />
            </span>
        )
    } else {
        return <Fragment>{name}</Fragment>
    }
}

export default DisplayName
