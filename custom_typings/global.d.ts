// 伪全局变量，用于管理开发环境中需运行的代码块
// 在构建后会转化成 `process.env.NODE_ENV !== 'production'`
declare const __DEV__: boolean
