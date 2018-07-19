---
name: checkbox
displayName: CheckBox *复选框*
group: form
---

传统「CheckBox」风格的切换选择组件；

{@demo "./demos/default.jsx"}

## 状态

通过 `state` 参数定义组件状态：

{@demo "./demos/state.jsx"}

## 禁用

通过 `disabled` 参数，可以禁用组件：

{@demo "./demos/disabled.jsx"}

**注意：**禁用或只读输入框没有状态样式：

{@demo "./demos/disabled-has-state.jsx"}

## 参数

### CheckBox

| 参数             | 说明                   | 类型                                             | 默认值  |
| ---------------- | ---------------------- | ------------------------------------------------ | ------- |
| `name`           | 该复选框所属分组的名字 | `string`                                         |         |
| `label`          | 标题文本               | `string`                                         |         |
| `checked`        | 是否选中               | `boolean`                                        |         |
| `defaultChecked` | 默认是否选中           | `boolean`                                        |         |
| `value`          | 表单值                 | `string`                                         |         |
| `state`          | 状态                   | `'success'` &#124; `'warning'` &#124; `'danger'` |         |
| `disabled`       | 是否禁用               | `boolean`                                        | `false` |
| `onChange`       | 选中状态改变事件       | `(e: ChangeEvent) => void`                       |         |
