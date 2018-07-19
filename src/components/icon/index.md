---
name: icon
displayName: Icon *图标*
group: general
---

Icon 组件提供一组 SVG 格式的图标。

{@demo "./demos/icons.jsx"}

## "SVG Icon" vs "Icon Font"

Icon 组件之所以选择提供 SVG 格式的图标，而非通常所使用的 "Icon Font"，
是因为我们认为「图标应当是一种图形，而非文字」。_（有关详细的区别，请参阅[这篇文章](https://css-tricks.com/icon-fonts-vs-svg/)）_

当然，"Icon Font" 也是有很多优点的，而最要紧的一点是："Icon Font" 的图标颜色默认即为文本颜色，
为在 SVG 图标中实现这一优点，我们为图标设置了 `fill: currentColor;` 样式，以使图标颜色与其父元素的文本颜色的保持一致。

## 参数

### Icon

| 参数   | 说明     | 类型     | 默认值 |
| ------ | -------- | -------- | ------ |
| `name` | 图标名称 | `string` |        |
