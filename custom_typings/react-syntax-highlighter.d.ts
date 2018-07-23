declare module 'react-syntax-highlighter/prism-light' {
    import SyntaxHighlighter from 'react-syntax-highlighter/light'
    export { registerLanguage } from 'react-syntax-highlighter/light'
    export default SyntaxHighlighter
}

declare module 'react-syntax-highlighter/languages/prism/javascript' {
    const js: any
    export default js
}

declare module 'react-syntax-highlighter/languages/prism/jsx' {
    const jsx: any
    export default jsx
}
