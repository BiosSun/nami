(window.webpackJsonp=window.webpackJsonp||[]).push([[79],{642:function(n){n.exports={name:"space",displayName:"Space *空隔*",group:"layout",text:"\n用于在两个布局元素之间插入一段固定宽度（或高度）的空白间隔；\n\n_注：为突显演示效果，我们为以下 Demo 中的 FlexibleSpace 组件添加了一些背景色。_\n\n``` demo.0a68c815\nimport { Linear, Space } from 'nami'\n\nrender(\n    <Linear>\n        <Linear.Item>Item</Linear.Item>\n        <Linear.Item>Item</Linear.Item>\n        <Space />\n        <Linear.Item>Item</Linear.Item>\n    </Linear>\n)\n```\n``` demo.8b676aad\nimport { Linear, Space } from 'nami'\n\nrender(\n    <Linear direction=\"vertical\">\n        <Linear.Item>Item</Linear.Item>\n        <Linear.Item>Item</Linear.Item>\n        <Space />\n        <Linear.Item>Item</Linear.Item>\n    </Linear>\n)\n```\n\n## 参数\n\n### Divider\n\n| 参数        | 说明                                                                                     | 类型                               | 默认值       |\n| ----------- | ---------------------------------------------------------------------------------------- | ---------------------------------- | ------------ |\n| `direction` | 分隔方向<br>_一般在布局组件中使用时无须设置该参数，布局组件会自动按其布局方向为其设置；_ | `'horizontal'` &#124; `'vertical'` | `horizontal` |\n",path:"./src/components/space/index.md",demos:{"0a68c815":{name:"horizontal"},"8b676aad":{name:"vertical"}}}}}]);