(window.webpackJsonp=window.webpackJsonp||[]).push([[82],{665:function(n){n.exports={name:"radio",displayName:"Radio *单选框*",group:"form",text:'\n传统风格的单选框组件；\n\n``` demo.507d8166\nimport { Radio } from \'nami\'\n\nrender(\n    <div>\n        <Radio name="default" label="Radio 1" />\n        <Radio name="default" label="Radio 2" />\n    </div>\n)\n```\n\n## 状态\n\n通过 `state` 参数定义组件状态：\n\n``` demo.5392fd11\nimport { Radio } from \'nami\'\n\nrender(\n    <div>\n        <Radio name="state" label="Success" state="success" />\n        <Radio name="state" label="Warning" state="warning" />\n        <Radio name="state" label="Danger" state="danger" />\n    </div>\n)\n```\n\n## 禁用\n\n通过 `disabled` 参数，可以禁用组件：\n\n``` demo.1feebe5e\nimport { Radio } from \'nami\'\n\nrender(\n    <div>\n        <Radio name="disabled" label="Radio" disabled />\n        <Radio name="disabled" label="Radio" disabled defaultChecked />\n    </div>\n)\n```\n\n**注意：**禁用或只读输入框没有状态样式：\n\n``` demo.296adc98\nimport { Radio } from \'nami\'\n\nrender(\n    <div>\n        <Radio name="disabled-has-state" label="Success" state="success" disabled />\n        <Radio name="disabled-has-state" label="Success" state="success" disabled defaultChecked />\n    </div>\n)\n```\n\n## 参数\n\n### Radio\n\n| 参数             | 说明                   | 类型                                             | 默认值  |\n| ---------------- | ---------------------- | ------------------------------------------------ | ------- |\n| `name`           | 该单选框所属分组的名字 | `string`                                         |         |\n| `label`          | 标题文本               | `string`                                         |         |\n| `checked`        | 是否选中               | `boolean`                                        |         |\n| `defaultChecked` | 默认是否选中           | `boolean`                                        |         |\n| `value`          | 表单值                 | `string`                                         |         |\n| `state`          | 状态                   | `\'success\'` &#124; `\'warning\'` &#124; `\'danger\'` |         |\n| `disabled`       | 是否禁用               | `boolean`                                        | `false` |\n| `onChange`       | 选中状态改变事件       | `(e: ChangeEvent) => void`                       |         |\n',path:"./src/components/radio/index.md",demos:{"507d8166":{name:"default"},"5392fd11":{name:"state"},"1feebe5e":{name:"disabled"},"296adc98":{name:"disabled-has-state"}}}}}]);