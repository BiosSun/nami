declare module 'react-syntax-highlighter/dist/esm/prism-light' {
    import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/light'
    export { registerLanguage } from 'react-syntax-highlighter/dist/esm/light'
    export default SyntaxHighlighter
}

declare module 'react-syntax-highlighter/dist/esm/languages/prism/javascript' {
    const js: any
    export default js
}

declare module 'react-syntax-highlighter/dist/esm/languages/prism/jsx' {
    const jsx: any
    export default jsx
}

declare module 'react-syntax-highlighter/dist/esm/languages/prism/bash' {
    const bash: any
    export default bash
}
