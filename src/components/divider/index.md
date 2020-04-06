---
name: divider
displayName: Divider *分隔线*
group: layout
---

用于在两个布局元素之间插入一条分隔线。

_注：为突显演示效果，我们在以下 Demo 中设置了行高为 `40px`。_

{@demo "./demos/linear-horizontal.jsx"}

Linear 组件对齐方式默认为 `stretch`，受此影响，分隔符的长度默认与容器交叉轴的长度相同。
而当切换为其它对齐方式时，分隔符的长度将转为自身所设置的长度。

在水平布局中，其长度默认为 `1em + 2px`：

{@demo "./demos/linear-horizontal-align.jsx"}

而在垂直布局中，长度默认为 `100%`：

{@demo "./demos/linear-vertical-align.jsx"}

## 参数

_无_
