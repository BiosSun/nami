---
name: popover
displayName: Popover *弹出层*
group: general
---

Popover 提供一个可以相对某个元素进行绝对定位的弹出层组件。

{@demo "./demos/default.jsx"}

## 定位

Popover 提供两个定位参数：

-   at：指定弹出层相对于目标元素的位置；
-   offset：指定弹出层相对于目标元素的偏移；

{@demo "./demos/position.jsx"}

## 限定宽度

一般弹出层的宽度由其内容来决定，但也可以指定在弹出层位于目标元素的上方或下方时，
设置弹出层的宽度（或最小宽度）为目标元素宽度：

{@demo "./demos/width-follow-of.jsx"}

## 箭头指针

通过设置 `arrow` 参数为 `true`，可以让弹出层额外显示一个箭头指针指向目标元素：

{@demo "./demos/arrow.jsx"}

## 悬停切换

Popover 默认是通过用户点击目标元素来切换弹出层的打开/关闭状态，
但额外的也支持通过鼠标悬停/离开来切换弹出层。

{@demo "./demos/hover.jsx"}

不过应尽量避免使用悬停切换，
因为「点击」才是一种明确的触发行为，而「悬停」更多的是一种试探性的查看行为，
所以通常只用于反馈一些提示性的内容以引导用户进行后续操作。

## 触发关闭

默认有三种操作会导致弹出层被关闭：

-   点击目标元素中的任意位置；
-   点击页面中除目标元素及弹出层元素之外的任意位置；
-   按下 `Esc` 键；

相应的，可以选择是否禁止让某个操作导致弹出层关闭：

{@demo "./demos/disabled-close.jsx"}

如果用户作出了一些会触发弹出层关闭的操作，弹出层组件会触发 `onClose` 事件回调，该事件没有捕获及冒泡阶段，只会在组件上触发。

## 渲染目标元素

如果想要在目标元素中根据当前弹出层的打开或关闭状态来呈现不同的样式或内容，那么可以改为为 `of` 参数指定一个渲染函数，
在这个函数中，你能够知道当前弹出层的状态：

{@demo "./demos/render-of.jsx"}

## 受控组件

但如果你想要在目标元素之外根据弹出层的状态作些改变，或是想要自己控制弹出层的打开或关闭，那么你需要将 Popover 作为受控组件来使用它：

{@demo "./demos/controlled.jsx"}

_注：在受控状态下，用户点击目标组件时将不会导致弹出层关闭。_

## 参数

### Popover

| 参数                        | 说明                                                                               | 类型                                                                                                                                                                                                                                                                                                                                                                                                                                 | 默认值     |
| --------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| `of`                        | 该弹出层所绑定的目标元素，弹出层将相对该元素对齐                                   | `ReactElement` &#124; `(props: { open: boolean }) => ReactElement`                                                                                                                                                                                                                                                                                                                                                                   |            |
| `at`                        | 弹出层相对于目标元素的位置                                                         | `'auto-start'`&nbsp;&#124;&nbsp;`'auto'`&nbsp;&#124;&nbsp;`'auto-end'`&nbsp;&#124;<br>`'top-start'`&nbsp;&#124;&nbsp;`'top'`&nbsp;&#124;&nbsp;`'top-end'`&nbsp;&#124;<br>`'right-start'`&nbsp;&#124;&nbsp;`'right'`&nbsp;&#124;&nbsp;`'right-end'`&nbsp;&#124;<br>`'bottom-start'`&nbsp;&#124;&nbsp;`'bottom'`&nbsp;&#124;&nbsp;`'bottom-end'`&nbsp;&#124;<br>`'left-start'`&nbsp;&#124;&nbsp;`'left'`&nbsp;&#124;&nbsp;`'left-end'` | `'bottom'` |
| `offset`                    | 弹出层相对于目标元素的偏移长度                                                     | `number` &#124; `string`                                                                                                                                                                                                                                                                                                                                                                                                             | `0`        |
| `widthFollowOf`             | 是否将弹出层的最小宽度限定为目标元素宽度                                           | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                            | `false`    |
| `minWidthFollowOf`          | 是否将弹出层的最小宽度限定为目标元素宽度                                           | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                            | `false`    |
| `open`                      | 是否打开弹出层                                                                     | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                            |            |
| `defaultOpen`               | 是否默认打开弹出层                                                                 | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                            |            |
| `event`                     | 弹出层显示触发事件<br>_在组件为受控状态时，该参数无效_                             | `'click'` &#124; `'hover'`                                                                                                                                                                                                                                                                                                                                                                                                           | `click`    |
| `disabledCloseOnOfClick`    | 禁止点击绑定元素时关闭弹出层<br>_在组件为受控状态时，或使用悬停切换时，该参数无效_ | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                            | `false`    |
| `disabledCloseOnOtherClick` | 禁止点击页面其它位置时（弹出层及所绑定元素之外的位置）关闭弹出层                   | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                            | `false`    |
| `disabledCloseOnEscape`     | 禁止按下 Escape 键时关闭弹出层                                                     | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                            | `false`    |
| `onClose`                   | 在受控状态下，需要隐藏弹出层时触发的事件                                           | `(e: CustomEvent) => void`                                                                                                                                                                                                                                                                                                                                                                                                           |            |
| `arrow`                     | 是否显示箭头指针                                                                   | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                            | `false`    |
| `children`                  | 弹出层内容                                                                         | `React.ReactNode`                                                                                                                                                                                                                                                                                                                                                                                                                    |            |
