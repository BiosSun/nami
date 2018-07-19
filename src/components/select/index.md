---
name: select
displayName: Select *选择框*
group: form
---

下拉选择框。

{@demo "./demos/default.jsx"}

## 状态

通过 state 参数定义选择框状态：

{@demo "./demos/state.jsx"}

## 禁用

通过 disabled 参数，可以禁用选择框：

{@demo "./demos/disabled.jsx"}

或禁用某个选择：

{@demo "./demos/disabled-option.jsx"}

## 参数

### Select

| 参数           | 说明           | 类型                                             | 默认值  |
| -------------- | -------------- | ------------------------------------------------ | ------- |
| `value`        | 选中值         | `'string'` &#124; `'number'`                     |         |
| `defaultValue` | 默认选中值     | `'string'` &#124; `'number'`                     |         |
| `state`        | 状态           | `'success'` &#124; `'warning'` &#124; `'danger'` |         |
| `disabled`     | 是否禁用       | `boolean`                                        | `false` |
| `onChange`     | 所选项更改事件 | `(e: SelectEvent) => void`                       |         |
| `children`     | 选项           | `Select.Option`                                  |         |

### Select.Option

| 参数       | 说明         | 类型                     | 默认值  |
| ---------- | ------------ | ------------------------ | ------- |
| `value`    | 选项值       | `string` &#124; `number` |         |
| `children` | 选项显示内容 | `React.ReactNode`        |         |
| `disabled` | 是否禁用选项 | `boolean`                | `false` |
