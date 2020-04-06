---
name: space
displayName: Space *空隔*
group: layout
---

用于在两个布局元素之间插入一段空白间隔。

{@demo "./demos/default.jsx"}

## 尺寸

和 Linear 的间距一样，Space 也提供三种尺寸：

-   `default` 普通间距，使用样式配置变量 `--distance-horizontal` 的宽度值；
-   `"small"` 较小间距，是普通间距的一半；
-   `"large"` 较大间距，是普通间距的两倍；

{@demo "./demos/size.jsx"}

## 弹性空隔

结合 Linear 的 `$flex` 属性，Space 可以变为弹性空隔：

{@demo "./demos/flex.jsx"}

## 栅格空隔

当然，Linear 的 `$col` 属性也可以应用在 Space 上，这可以实现如 bootstrap 中栅格组件的 [offset](https://getbootstrap.com/docs/4.4/layout/grid/#offsetting-columns) 的效果：

{@demo "./demos/col.jsx"}

## 参数

### Space

| 参数   | 说明     | 类型             | 默认值 |
| ------ | -------- | ---------------- | ------ |
| `size` | 空隔长度 | `small`, `large` |        |
