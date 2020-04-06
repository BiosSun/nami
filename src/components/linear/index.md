---
name: linear
displayName: Linear *线性布局*
group: layout
---

提供一种简单的线性布局，基于 CSS Flex 实现。

{@demo "./demos/default.jsx"}

## 布局方向

默认所有元素按水平方向布局，通过 `direction` 参数可以更改为垂直布局或反向布局：

{@demo "./demos/direction.jsx"}

在使用 Linear 时，我们经常会需要切换布局方向，尤其是垂直布局，有的场景下它的使用频度甚至高于水平布局。因此为了方便使用，我们额外提供了四个包装组件：HLinear、HrLinear、VLinear 及 VrLinear（参考自 SwiftUI）：

{@demo "./demos/sugars.jsx"}

## 间距

Linear 提供两个间距相关的属性：`padding` 及 `spacing`，分别用于控制容器与元素之间的间距，及元素与元素之间的间距。 它们都支持如下三个间距值：

-   `true` 普通间距，使用样式配置变量 `--distance-horizontal` 的宽度值；
-   `"small"` 较小间距，是普通间距的一半；
-   `"large"` 较大间距，是普通间距的两倍；

**padding**

{@demo "./demos/padding.jsx"}

**spacing**

{@demo "./demos/spacing.jsx"}

## 对齐

与对齐相关的也有两个属性：`justify` 及 `align`，分别用于控制主轴上的对齐方式，及交叉轴上的对齐方式。它们的默认值和 CSS 属性 `justify-content` 及 `align-items` 的默认值相同：

**justify**

{@demo "./demos/justify.jsx"}

**align**

{@demo "./demos/align.jsx"}

## 弹性布局

默认 Linear 内的所有元素在主轴上仅分配其自身所占用的空间，无论主轴空间是空余还是不足（即 `flex: 0 0 auto;`），
但通常在实现自适应布局时，我们往往会需要其中的一个或多个元素变为弹性元素，当主轴上有剩余空间时，它会会自动扩展以填充空间，而当主轴空间不足时，它们又会自动收缩。

在 Linear 组件中，若要实现这一点非常简单（当然有时也不简单），只需给需要弹性伸缩的子元素添加 `$flex` 属性即可：

{@demo "./demos/item-flex.jsx"}

## 栅格布局

除了弹性布局之外，我们还提供传统的栅格布局，即将容器空间等分为一定数量的列，其中的元素占据某几列的空间。
Nami 所提供的是 24 列栅格，你只需要在子元素上设置 `$col` 属性并指定所占据的列数即可：

{@demo "./demos/item-col.jsx"}

**注意：**设置了 `$col` 属性的子元素会被强制设置其 CSS 属性 `box-sizing` 为 `border-box`，有时这会影响子元素的原有样式，在使用时需要注意；

`$col` 可以和 `$flex` 同时使用，此时当容器空间不足时，栅格元素会自动收缩：

{@demo "./demos/item-col-with-flex.jsx"}

## 子元素对齐

通过 `$align` 属性，我们可以为子元素单独指定其在交叉轴上的对齐方式：

{@demo "./demos/item-align.jsx"}

## 注意事项

1\. 修饰属性 `$flex`、`$col` 及 `$align` 只能设置在 Linear 组件的直接子元素中，因此像下面的代码是无效的：

```jsx
function Demo() {
    return (
        <Linear>
            <SomeWrapComponent>
                <div $flex >
            </SomeWrapComponent>
        </Linear>
    )
}
```

当然，设置在子元素组件内也是无效的：

```jsx
function Demo() {
    return (
        <Linear>
            <Item />
        </Linear>
    )
}

function Item() {
    return <div $flex />
}
```

2\. Linear 组件会在子元素上追加一些额外的 class，因此子元素组件必须接收并处理从 props 传入的 className：

```jsx
import clsx from 'clsx'

function Demo() {
    return (
        <Linear>
            <Item $flex />
        </Linear>
    )
}

function Item({ className, ...otherProps }) {
    return <div className={clsx(className, 'own-class-name')} {...otherProps} />
}
```

3\. 在使用 `$flex` 或 `$col` 时，需要确保子元素组件是支持弹性  伸缩的。如果子元素组件仅支持固定宽/高，或仅支持在某个宽/高度区间内，那么就要考虑是改造该组件，还是确实不能将其应用于弹性布局或栅格布局中。

## 参数

### Linear

| 参数        | 说明                         | 类型                                                                     | 默认值       |
| ----------- | ---------------------------- | ------------------------------------------------------------------------ | ------------ |
| `direction` | 布局方向                     | `horizontal`, `vertical`, <br />`horizontal-reverse`, `vertical-reverse` | `horizontal` |
| `justify`   | 所有元素在主轴上的对齐方式   | `start`, `end`, `center`, `between`, `around`                            | `start`      |
| `align`     | 所有元素在交叉轴上的对齐方式 | `start`, `end`, `center`, `stretch`                                      | `stretch`    |
| `padding`   | 元素与容器之间的间距         | `boolean`, `small`, `large`                                              | `false`      |
| `spacing`   | 元素与元素之间的间距         | `boolean`, `small`, `large`                                              | `false`      |
| `component` | 用于渲染 Linear 容器的组件   | `string`, `FunctionComponent`, `ComponentClass`                          | `div`        |
| `children`  | 子元素                       | `ReactElement`                                                           |              |

### 子元素修饰属性

| 参数     | 说明                         | 类型                                | 默认值  |
| -------- | ---------------------------- | ----------------------------------- | ------- |
| `$flex`  | 弹性布局                     | `boolean`                           | `false` |
| `$col`   | 栅格布局                     | `number<1...24>`                    |         |
| `$align` | 该子元素在交叉轴上的对齐方式 | `start`, `end`, `center`, `stretch` |         |
