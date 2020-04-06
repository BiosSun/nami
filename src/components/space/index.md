---
name: space
displayName: Space *空隔*
group: layout
---

用于在两个布局元素之间插入一段固定宽度（或高度）的空白间隔。

_注：为突显演示效果，我们为以下 Demo 中的 Space 组件添加了一些背景色。_

## Linear

{@demo "./demos/linear-horizontal.jsx"}
{@demo "./demos/linear-vertical.jsx"}

## 参数

### Divider

| 参数        | 说明                                                                                     | 类型                                         | 默认值       |
| ----------- | ---------------------------------------------------------------------------------------- | -------------------------------------------- | ------------ |
| `direction` | 分隔方向<br>_一般在布局组件中使用时无须设置该参数，布局组件会自动按其布局方向为其设置；_ | `'horizontal'`&nbsp;&#124;&nbsp;`'vertical'` | `horizontal` |
