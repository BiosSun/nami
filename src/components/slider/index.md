---
name: slider
displayName: Slider *滑动条*
group: form
---

使用拖动方式在一个有限区间内选择一个值（或一个子区间）。

{@demo "./demos/default.jsx"}

## 值区间及步进

滑动条的可选值区间通过 `min` 和 `max` 两个配置项指定：

{@demo "./demos/min-max.jsx"}

而通过 `step` 可以指定步进长度：

{@demo "./demos/step.jsx"}

## 状态

通过 `state` 参数定义滑动条状态：

{@demo "./demos/state.jsx"}

## 禁用

通过 `disabled` 参数，可以禁用滑动条：

{@demo "./demos/disabled.jsx"}

**注意：**禁用或只读输入框没有状态样式：

{@demo "./demos/disabled-has-state.jsx"}

## 参数

### Slider

| 参数           | 说明           | 类型                                             | 默认值  |
| -------------- | -------------- | ------------------------------------------------ | ------- |
| `value`        | 所选值         | `number`                                         |         |
| `defaultValue` | 默认所选值     | `number`                                         |         |
| `min`          | 最小值         | `number`                                         | `0`     |
| `max`          | 最大值         | `number`                                         | `100`   |
| `step`         | 步进           | `number`                                         | `1`     |
| `state`        | 状态           | `'success'` &#124; `'warning'` &#124; `'danger'` |         |
| `disabled`     | 是否禁用       | `boolean`                                        | `false` |
| `onChange`     | 所选值改变事件 | `(event: ChangeEvent, value: number) => void`    |         |

## CSS 变量

| 变量                        | 说明                                 | 默认值                      |
| --------------------------- | ------------------------------------ | --------------------------- |
| `--slider-bar-breadth`      | 滑动条宽度                           | `6px`                       |
| `--slider-knob-length`      | 滑块长度                             | `18px`                      |
| `--slider-knob-breadth`     | 滑块宽度                             | `18px`                      |
| `--slider-bar-color`        | 滑动条颜色                           | `var(--line-color)`         |
| `--slider-fill-color`       | 滑动条填充区颜色                     | `var(--primary-color)`      |
| `--slider-knob-color`       | 滑块颜色（边框色）                   | `var(--primary-color)`      |
| `--slider-hover-bar-color`  | 指针悬停在组件上时滑动条的颜色       | `var(--line-color-loud)`    |
| `--slider-hover-fill-color` | 指针悬停在组件上时滑动条填充区的颜色 | `var(--primary-color-loud)` |
| `--slider-hover-knob-color` | 指针悬停在滑块上时滑块的颜色         | `var(--primary-color-loud)` |
