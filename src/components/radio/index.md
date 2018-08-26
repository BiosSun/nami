---
name: radio
displayName: Radio *单选框*
group: form
---

传统风格的单选框组件；

{@demo "./demos/default.jsx"}

## 状态

通过 `state` 参数定义组件状态：

{@demo "./demos/state.jsx"}

## 禁用

通过 `disabled` 参数，可以禁用组件：

{@demo "./demos/disabled.jsx"}

**注意：**禁用或只读输入框没有状态样式：

{@demo "./demos/disabled-has-state.jsx"}

## 分组

通常，单选框组件都是成组出现，以供用户在多个可选项中选择一个选项。而通过额外提供的 `Radio.Group` 组件，可以非常方便地实现分组功能：

{@demo "./demos/group.jsx"}

_注：分组中的 `Radio` 组件将只支持 `label` 及 `value` 两个参数，其余参数将被忽略。_

## 参数

### Radio

| 参数             | 说明                   | 类型                                             | 默认值  |
| ---------------- | ---------------------- | ------------------------------------------------ | ------- |
| `name`           | 该单选框所属分组的名字 | `string`                                         |         |
| `label`          | 标题文本               | `string`                                         |         |
| `value`          | 表单值                 | `string`                                         |         |
| `checked`        | 是否选中               | `boolean`                                        |         |
| `defaultChecked` | 默认是否选中           | `boolean`                                        |         |
| `state`          | 状态                   | `'success'` &#124; `'warning'` &#124; `'danger'` |         |
| `disabled`       | 是否禁用               | `boolean`                                        | `false` |
| `onChange`       | 选中状态改变事件       | `(e: ChangeEvent) => void`                       |         |

### Radio.Group

| 参数           | 说明                   | 类型                                             | 默认值  |
| -------------- | ---------------------- | ------------------------------------------------ | ------- |
| `name`         | 该单选框所属分组的名字 | `string`                                         |         |
| `value`        | 被选中项的值           | `string`                                         |         |
| `defaultValue` | 默认被选中项的值       | `string`                                         |         |
| `state`        | 状态                   | `'success'` &#124; `'warning'` &#124; `'danger'` |         |
| `disabled`     | 是否禁用               | `boolean`                                        | `false` |
| `onChange`     | 选中状态改变事件       | `(e: ChangeEvent) => void`                       |         |
