import React from 'react'

import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/prism-light'
import { SyntaxHighlighterProps } from 'react-syntax-highlighter/light'

import jsx from 'react-syntax-highlighter/languages/prism/jsx'
import js from 'react-syntax-highlighter/languages/prism/javascript'
import bash from 'react-syntax-highlighter/languages/prism/bash'

registerLanguage('jsx', jsx)
registerLanguage('javascript', js)
registerLanguage('bash', bash)

import syntaxHighlighterStyle from 'react-syntax-highlighter/styles/prism/hopscotch'
delete syntaxHighlighterStyle['code[class*="language-"]']
delete syntaxHighlighterStyle['pre[class*="language-"]']

const Component: React.StatelessComponent<SyntaxHighlighterProps> = props => (
    <SyntaxHighlighter {...props} style={syntaxHighlighterStyle} />
)

export default Component
