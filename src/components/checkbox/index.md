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

## 分组

通常，复选框组件都是成组出现，以供用户在多个可选项中选择一些选项。而通过额外提供的 `CheckBox.Group` 组件，可以非常方便地实现分组功能：

{@demo "./demos/group.jsx"}

_注：分组中的 `CheckBox` 组件将只支持 `label` 及 `value` 两个参数，其余参数将被忽略。_

## 参数

### CheckBox

| 参数             | 说明                   | 类型                                                                                                                      | 默认值  |
| ---------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------- |
| `name`           | 该复选框所属分组的名字 | `string`                                                                                                                  |         |
| `label`          | 标题文本               | `string`                                                                                                                  |         |
| `checked`        | 是否选中               | `boolean`                                                                                                                 |         |
| `defaultChecked` | 默认是否选中           | `boolean`                                                                                                                 |         |
| `value`          | 表单值                 | `string`                                                                                                                  |         |
| `state`          | 状态                   | `'success'` &#124; `'warning'` &#124; `'danger'`                                                                          |         |
| `disabled`       | 是否禁用               | `boolean`                                                                                                                 | `false` |
| `onChange`       | 选中状态改变事件       | `(`<br>&nbsp;&nbsp;`event: ChangeEvent,`<br>&nbsp;&nbsp;`value: string,`<br>&nbsp;&nbsp;`checked: boolean`<br>`) => void` |         |

### CheckBox.Group

| 参数           | 说明                   | 类型                                             | 默认值  |
| -------------- | ---------------------- | ------------------------------------------------ | ------- |
| `name`         | 该复选框所属分组的名字 | `string`                                         |         |
| `value`        | 被选中项的值           | `string[]`                                       |         |
| `defaultValue` | 默认被选中项的值       | `string[]`                                       |         |
| `state`        | 状态                   | `'success'` &#124; `'warning'` &#124; `'danger'` |         |
| `disabled`     | 是否禁用               | `boolean`                                        | `false` |
| `onChange`     | 选中状态改变事件       | `(event: ChangeEvent, value: string[]) => void`  |         |
