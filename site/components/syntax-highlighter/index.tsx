import React from 'react'

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import SyntaxHighlighterProps from 'react-syntax-highlighter/dist/esm/light'

import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import js from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash'

SyntaxHighlighter.registerLanguage('jsx', jsx)
SyntaxHighlighter.registerLanguage('javascript', js)
SyntaxHighlighter.registerLanguage('bash', bash)

import syntaxHighlighterStyle from 'react-syntax-highlighter/dist/esm/styles/prism/hopscotch'
delete syntaxHighlighterStyle['code[class*="language-"]']
delete syntaxHighlighterStyle['pre[class*="language-"]']

const Component: React.StatelessComponent<SyntaxHighlighterProps> = props => (
    <SyntaxHighlighter {...props} style={syntaxHighlighterStyle} />
)

export default Component
