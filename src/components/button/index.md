---
name: button
displayName: Button *按钮*
group: general
---

用于触发某个操作，并体现当前的操作状态：可触发、进行中、已禁用……

{@demo "./demos/default.jsx"}

## 样式

通过 `type` 参数定义按钮配色类型，并通过 `outline`、`round`、`circle`、`shadow` 来定义按钮外形：

{@demo "./demos/mode-type.jsx"}

## 禁用

通过 `disabled` 参数，可以设置按钮为禁用状态：

{@demo "./demos/disabled.jsx"}

## 参数

### Button

| 参数       | 说明         | 类型                                                                                | 默认值  |
| ---------- | ------------ | ----------------------------------------------------------------------------------- | ------- |
| `type`     | 按钮类型     | `'primary'` &#124; `'info'` &#124; `'success'` &#124; `'warning'` &#124; `'danger'` |         |
| `outline`  | 轮廓按钮     | `boolean`                                                                           | `false` |
| `flat`     | 文字按钮     | `boolean`                                                                           | `false` |
| `round`    | 圆角按钮     | `boolean`                                                                           | `false` |
| `circle`   | 圆形按钮     | `boolean`                                                                           | `false` |
| `disabled` | 是否已禁用   | `boolean`                                                                           | `false` |
| `onClick`  | 按钮点击事件 | `(e: MouseEvent) => void`                                                           |         |
| `children` | 按钮内容     | `ReactNode`                                                                         |         |
