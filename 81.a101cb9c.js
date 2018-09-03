(window.webpackJsonp=window.webpackJsonp||[]).push([[81],{679:function(n){n.exports={name:"checkbox",displayName:"CheckBox *复选框*",group:"form",text:'\n传统「CheckBox」风格的切换选择组件；\n\n``` demo.5e6c7c66\nimport { CheckBox } from \'nami\'\n\nrender(<CheckBox label="Check Box" />)\n```\n\n## 状态\n\n通过 `state` 参数定义组件状态：\n\n``` demo.91556b39\nimport { CheckBox } from \'nami\'\n\nrender(\n    <div>\n        <CheckBox label="Success" state="success" />\n        <CheckBox label="Warning" state="warning" />\n        <CheckBox label="Danger" state="danger" />\n    </div>\n)\n```\n\n## 禁用\n\n通过 `disabled` 参数，可以禁用组件：\n\n``` demo.0a7c5154\nimport { CheckBox } from \'nami\'\n\nrender(\n    <div>\n        <CheckBox label="Check Box" disabled />\n        <CheckBox label="Check Box" disabled defaultChecked />\n    </div>\n)\n```\n\n**注意：**禁用组件没有状态样式：\n\n``` demo.9ae41066\nimport { CheckBox } from \'nami\'\n\nrender(\n    <div>\n        <CheckBox label="Success" state="success" disabled />\n        <CheckBox label="Success" state="success" disabled defaultChecked />\n    </div>\n)\n```\n\n## 分组\n\n通常，复选框组件都是成组出现，以供用户在多个可选项中选择一些选项。而通过额外提供的 `CheckBox.Group` 组件，可以非常方便地实现分组功能：\n\n``` demo.dfc11042\nimport { CheckBox, TextBox } from \'nami\'\n\nclass App extends React.Component {\n    state = {\n        value: \'ts, as\',\n    }\n\n    render() {\n        const { value } = this.state\n\n        return (\n            <div>\n                <CheckBox.Group\n                    name="group"\n                    value={value.split(\',\').map(v => v.trim())}\n                    onChange={this.onChange}\n                >\n                    <CheckBox value="js" label="JavaScript" />\n                    <CheckBox value="ts" label="TypeScript" />\n                    <CheckBox value="cs" label="CoffeeScript" />\n                    <CheckBox value="as" label="ActionScript" />\n                </CheckBox.Group>\n\n                <br />\n\n                <TextBox type="text" value={value} onChange={this.onChange} />\n            </div>\n        )\n    }\n\n    onChange = (e, value) => {\n        if (Array.isArray(value)) {\n            value = value.join(\', \')\n        }\n\n        this.setState({ value })\n    }\n}\n\nrender(<App />)\n```\n\n_注：分组中的 `CheckBox` 组件将只支持 `label` 及 `value` 两个参数，其余参数将被忽略。_\n\n## 参数\n\n### CheckBox\n\n| 参数             | 说明                   | 类型                                                                                                                      | 默认值  |\n| ---------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------- |\n| `name`           | 该复选框所属分组的名字 | `string`                                                                                                                  |         |\n| `label`          | 标题文本               | `string`                                                                                                                  |         |\n| `checked`        | 是否选中               | `boolean`                                                                                                                 |         |\n| `defaultChecked` | 默认是否选中           | `boolean`                                                                                                                 |         |\n| `value`          | 表单值                 | `string`                                                                                                                  |         |\n| `state`          | 状态                   | `\'success\'` &#124; `\'warning\'` &#124; `\'danger\'`                                                                          |         |\n| `disabled`       | 是否禁用               | `boolean`                                                                                                                 | `false` |\n| `onChange`       | 选中状态改变事件       | `(`<br>&nbsp;&nbsp;`event: ChangeEvent,`<br>&nbsp;&nbsp;`value: string,`<br>&nbsp;&nbsp;`checked: boolean`<br>`) => void` |         |\n\n### CheckBox.Group\n\n| 参数           | 说明                   | 类型                                             | 默认值  |\n| -------------- | ---------------------- | ------------------------------------------------ | ------- |\n| `name`         | 该复选框所属分组的名字 | `string`                                         |         |\n| `value`        | 被选中项的值           | `string[]`                                       |         |\n| `defaultValue` | 默认被选中项的值       | `string[]`                                       |         |\n| `state`        | 状态                   | `\'success\'` &#124; `\'warning\'` &#124; `\'danger\'` |         |\n| `disabled`     | 是否禁用               | `boolean`                                        | `false` |\n| `onChange`     | 选中状态改变事件       | `(event: ChangeEvent, value: string[]) => void`  |         |\n',path:"./src/components/checkbox/index.md",demos:{"5e6c7c66":{name:"default"},"91556b39":{name:"state"},"0a7c5154":{name:"disabled"},"9ae41066":{name:"disabled-has-state"},dfc11042:{name:"group"}}}}}]);