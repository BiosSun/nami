(window.webpackJsonp=window.webpackJsonp||[]).push([[74],{657:function(n){n.exports={name:"divider",displayName:"Divider *分隔线*",group:"layout",text:"\n用于在两个布局元素之间插入一条分隔线。\n\n_注：该分隔线并不会占用 1 像素空间，而是会停靠在其下一个元素的最左边（或上边）。_\n\n## Linear\n\n``` demo.cd5560c6\nimport { Linear, Divider } from 'nami'\n\nrender(\n    <Linear>\n        <Linear.Item>Item</Linear.Item>\n        <Linear.Item>Item</Linear.Item>\n        <Divider />\n        <Linear.Item>Item</Linear.Item>\n    </Linear>\n)\n```\n``` demo.dbd05291\nimport { Linear, Divider } from 'nami'\n\nrender(\n    <Linear direction=\"vertical\">\n        <Linear.Item>Item</Linear.Item>\n        <Linear.Item>Item</Linear.Item>\n        <Divider />\n        <Linear.Item>Item</Linear.Item>\n    </Linear>\n)\n```\n\n## Grid\n\n_注：在栅格中，只能使用水平方向分隔线。_\n\n``` demo.3ba1d9fa\nimport { Grid, Divider } from 'nami'\n\nrender(\n    <Grid>\n        <Grid.Col>Col</Grid.Col>\n        <Grid.Col>Col</Grid.Col>\n        <Divider />\n        <Grid.Col>Col</Grid.Col>\n    </Grid>\n)\n```\n\n## 参数\n\n### Divider\n\n| 参数        | 说明                                                                                     | 类型                                         | 默认值       |\n| ----------- | ---------------------------------------------------------------------------------------- | -------------------------------------------- | ------------ |\n| `direction` | 分隔方向<br>_一般在布局组件中使用时无须设置该参数，布局组件会自动按其布局方向为其设置；_ | `'horizontal'`&nbsp;&#124;&nbsp;`'vertical'` | `horizontal` |\n",path:"./src/components/divider/index.md",demos:{cd5560c6:{name:"linear-horizontal"},dbd05291:{name:"linear-vertical"},"3ba1d9fa":{name:"grid"}}}}}]);