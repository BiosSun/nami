---
name: textbox
displayName: TextBox *文本框*
group: form
---

用于输入一些简短的文本内容；

{@demo "./demos/default.jsx"}

## 状态

通过 `state` 参数定义文本框状态：

{@demo "./demos/state.jsx"}

## 禁用、只读

通过 `disabled` 或 `readOnly` 参数，可以设置文本框为禁用或只读状态：

{@demo "./demos/disabled.jsx"}

**注意：**禁用输入框没有状态样式：

{@demo "./demos/disabled-has-state.jsx"}

## 参数

### TextBox

| 参数           | 说明             | 类型                                             | 默认值  |
| -------------- | ---------------- | ------------------------------------------------ | ------- |
| `value`        | 表单值           | `string`                                         |         |
| `defaultValue` | 默认表单值       | `string`                                         |         |
| `type`         | 内容类型         | `string`                                         | `text`  |
| `state`        | 状态             | `'success'` &#124; `'warning'` &#124; `'danger'` |         |
| `disabled`     | 是否禁用         | `boolean`                                        | `false` |
| `onChange`     | 选中状态改变事件 | `(e: ChangeEvent) => void`                       |         |
