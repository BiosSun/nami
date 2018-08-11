---
name: divider
displayName: Divider *分隔线*
group: layout
---

用于在两个布局元素之间插入一条分隔线。

_注：该分隔线并不会占用 1 像素空间，而是会停靠在其下一个元素的最左边（或上边）。_

## Linear

{@demo "./demos/linear-horizontal.jsx"}
{@demo "./demos/linear-vertical.jsx"}

## Grid

_注：在栅格中，只能使用水平方向分隔线。_

{@demo "./demos/grid.jsx"}

## 参数

### Divider

| 参数        | 说明                                                                                     | 类型                                         | 默认值       |
| ----------- | ---------------------------------------------------------------------------------------- | -------------------------------------------- | ------------ |
| `direction` | 分隔方向<br>_一般在布局组件中使用时无须设置该参数，布局组件会自动按其布局方向为其设置；_ | `'horizontal'`&nbsp;&#124;&nbsp;`'vertical'` | `horizontal` |
