---
name: linear
displayName: Linear *线性布局*
group: layout
---

提供一种简单的线性布局，使用 CSS Flex 实现。

{@demo "./demos/default.jsx"}

## 垂直布局

默认所有元素按水平方向排列，通过 `direction` 参数可以更改为垂直方向：

{@demo "./demos/vertical.jsx"}

## 元素间距

默认所有元素之间都是没有间距的，如果需要，可以通过参数 `spacing` 来设置，该参数提供三个间距宽度：

-   true 普通间距，使用样式配置变量 `--distance-horizontal` 的宽度值；
-   `"large"` 较大间距，是普通间距的两倍；
-   `"small"` 较小间距，是普通间距的一半；

{@demo "./demos/spacing-horizontal.jsx"}
{@demo "./demos/spacing-vertical.jsx"}

## 对齐

通过 `justify` 及 `align` 两个参数，我们可以控制该线性布局内元素在主轴及副轴上的对齐方式：

{@demo "./demos/justify.jsx"}
{@demo "./demos/align.jsx"}

## 填充元素

默认 Linear 内的所有元素仅分配其自身所占用的空间，并在容器可用空间不足时自动等比例收缩（即 `flex: 0 1 auto;`），
但通常在实现自适应布局时，我们往往会需要其中的一个或多个元素自动填充剩余空间，此时只需给这些元素添加 `fill` 参数即可：

{@demo "./demos/fill.jsx"}

## 分隔符

额外地，除了可以通过 `spacing` 设置元素间距之外，还可以通过 `Divider`、`Space` 及 `FlexibleSpace` 三个分隔符组件来隔开某两个元素。

## 参数

### Linear

| 参数        | 说明                           | 类型                                                                            | 默认值         |
| ----------- | ------------------------------ | ------------------------------------------------------------------------------- | -------------- |
| `direction` | 布局方向                       | `'horizontal'` &#124; `'vertical'`                                              | `'horizontal'` |
| `justify`   | 所有元素在主轴上的对齐方式     | `'start'` &#124; `'end'` &#124; `'center'` &#124; `'between'` &#124; `'around'` |                |
| `align`     | 所有元素在副轴上的对齐方式     | `'start'` &#124; `'end'` &#124; `'center'`                                      |                |
| `spacing`   | 元素之间是否有间距，及间距宽度 | `boolean` &#124; `'small'` &#124; `'large'`                                     | `false`        |
| `component` | 用于渲染 Linear 容器的组件     | `string` &#124; `React.ComponentClass`                                          | `'div'`        |
| `children`  | Linear 元素                    | `Linear.Item`                                                                   |                |

### Linear.Item

| 参数        | 说明                         | 类型                                       | 默认值  |
| ----------- | ---------------------------- | ------------------------------------------ | ------- |
| `fill`      | 该元素是否填充窗口内剩余空间 | `boolean`                                  | `false` |
| `align`     | 该元素在副轴上的对齐方式     | `'start'` &#124; `'end'` &#124; `'center'` |         |
| `component` | 用于渲染 Linear 元素的组件   | `string` &#124; `React.ComponentClass`     | `'div'` |
| `children`  | 元素中的内容                 | `React.ReactNode`                          |         |
