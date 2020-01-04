import React, { FunctionComponent } from 'react'

import {
    PrismLight as PrismLightSyntaxHighlighter,
    SyntaxHighlighterProps,
} from 'react-syntax-highlighter'

import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import js from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash'

PrismLightSyntaxHighlighter.registerLanguage('jsx', jsx)
PrismLightSyntaxHighlighter.registerLanguage('javascript', js)
PrismLightSyntaxHighlighter.registerLanguage('bash', bash)

import syntaxHighlighterStyle from 'react-syntax-highlighter/dist/esm/styles/prism/hopscotch'

// TODO 这里改变了模块内的数据，并不太好
delete syntaxHighlighterStyle['code[class*="language-"]']
delete syntaxHighlighterStyle['pre[class*="language-"]']

export const SyntaxHighlighter: FunctionComponent<SyntaxHighlighterProps> = props => (
    <PrismLightSyntaxHighlighter {...props} style={syntaxHighlighterStyle} />
)
