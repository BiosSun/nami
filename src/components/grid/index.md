---
name: grid
displayName: Grid *栅格布局*
group: layout
---

提供一个传统的栅格布局，24 列，使用 CSS Flex 实现。

{@demo "./demos/basic.jsx"}

## 列宽

得益于 CSS Flex 技术，一个栅格内的所有未配置宽度的列默认会平分栅格中的剩余空间*（剩余空间=栅格总空间-已配置列宽的列所占用空间）*。

而通过 `Col` 的参数 `span`，可以为某一列明确指定其列宽：

{@demo "./demos/span.jsx"}

## 列间距

栅格默认列之间没有间距，如果需要，可以通过参数 `spacing` 来设置，该参数提供了三个间距宽度：

-   `true` 普通间距，使用样式配置变量 `--distance-horizontal` 的宽度值；
-   `"large"` 较大间距，是普通间距的两倍；
-   `"small"` 较小间距，是普通间距的一半；

{@demo "./demos/spacing.jsx"}

## 偏移

在列中，我们可以控制某个列向右偏移 n 个列宽：

{@demo "./demos/offset.jsx"}

## 对齐

在 `Grid` 上，我们可以控制该栅格内列的水平及垂直对齐方式：

{@demo "./demos/justify.jsx"}
{@demo "./demos/align.jsx"}

额外的，也可以单独控制某个列的垂直对齐方式：

{@demo "./demos/col-align.jsx"}

## 参数

### Grid

| 参数       | 说明                         | 类型                                                                            | 默认值 |
| ---------- | ---------------------------- | ------------------------------------------------------------------------------- | ------ |
| `justify`  | 所有列的水平对齐方式         | `'start'` &#124; `'end'` &#124; `'center'` &#124; `'between'` &#124; `'around'` |        |
| `align`    | 所有列的垂直对齐方式         | `'start'` &#124; `'end'` &#124; `'center'`                                      |        |
| `spacing`  | 列之间是否有间距，及间距宽度 | `boolean` &#124; `'small'` &#124; `'large'`                                     |        |
| `children` | 栅格中的列元素               | `Grid.Col`                                                                      |        |

### Grid.Col

| 参数       | 说明               | 类型                                       | 默认值 |
| ---------- | ------------------ | ------------------------------------------ | ------ |
| `span`     | 列宽               | `number`                                   |        |
| `offset`   | 列偏移量           | `number`                                   |        |
| `align`    | 该列的垂直对齐方式 | `'start'` &#124; `'end'` &#124; `'center'` |        |
| `children` | 列中的内容         | `React.ReactNode`                          |        |
