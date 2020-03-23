(window.webpackJsonp=window.webpackJsonp||[]).push([[96],{638:function(n){n.exports=JSON.parse('{"name":"slider","displayName":"Slider *滑动条*","group":"form","text":"\\n使用拖动方式在一个有限区间内选择一个值（或一个子区间）。\\n\\n``` demo.e175e51e\\nimport { Slider } from \'nami\'\\n\\nrender(<Slider />)\\n```\\n\\n## 值区间及步进\\n\\n滑动条的可选值区间通过 `min` 和 `max` 两个配置项指定：\\n\\n``` demo.1d551d3e\\nimport { Slider } from \'nami\'\\n\\nrender(<Slider min={10} max={20} />)\\n```\\n\\n而通过 `step` 可以指定步进长度：\\n\\n``` demo.3a207b1f\\nimport { Slider } from \'nami\'\\n\\nrender(<Slider min={0} max={1} step={0.01} />)\\n```\\n\\n## 状态\\n\\n通过 `state` 参数定义滑动条状态：\\n\\n``` demo.fd5e2d7e\\nimport { Slider } from \'nami\'\\n\\nrender(\\n    <div>\\n        <Slider state=\\"success\\" />\\n        <Slider state=\\"warning\\" />\\n        <Slider state=\\"danger\\" />\\n    </div>\\n)\\n```\\n\\n## 禁用\\n\\n通过 `disabled` 参数，可以禁用滑动条：\\n\\n``` demo.b630e534\\nimport { Slider } from \'nami\'\\n\\nrender(<Slider defaultValue={50} disabled />)\\n```\\n\\n**注意：**禁用或只读输入框没有状态样式：\\n\\n``` demo.6b7771a0\\nimport { Slider } from \'nami\'\\n\\nrender(<Slider defaultValue={50} disabled state=\\"success\\" />)\\n```\\n\\n## 参数\\n\\n### Slider\\n\\n| 参数           | 说明           | 类型                                             | 默认值  |\\n| -------------- | -------------- | ------------------------------------------------ | ------- |\\n| `value`        | 所选值         | `number`                                         |         |\\n| `defaultValue` | 默认所选值     | `number`                                         |         |\\n| `min`          | 最小值         | `number`                                         | `0`     |\\n| `max`          | 最大值         | `number`                                         | `100`   |\\n| `step`         | 步进           | `number`                                         | `1`     |\\n| `state`        | 状态           | `\'success\'` &#124; `\'warning\'` &#124; `\'danger\'` |         |\\n| `disabled`     | 是否禁用       | `boolean`                                        | `false` |\\n| `onChange`     | 所选值改变事件 | `(event: ChangeEvent, value: number) => void`    |         |\\n\\n## CSS 变量\\n\\n| 变量                        | 说明                                 | 默认值                      |\\n| --------------------------- | ------------------------------------ | --------------------------- |\\n| `--slider-bar-breadth`      | 滑动条宽度                           | `6px`                       |\\n| `--slider-knob-length`      | 滑块长度                             | `18px`                      |\\n| `--slider-knob-breadth`     | 滑块宽度                             | `18px`                      |\\n| `--slider-bar-color`        | 滑动条颜色                           | `var(--line-color)`         |\\n| `--slider-fill-color`       | 滑动条填充区颜色                     | `var(--primary-color)`      |\\n| `--slider-knob-color`       | 滑块颜色（边框色）                   | `var(--primary-color)`      |\\n| `--slider-hover-bar-color`  | 指针悬停在组件上时滑动条的颜色       | `var(--line-color-loud)`    |\\n| `--slider-hover-fill-color` | 指针悬停在组件上时滑动条填充区的颜色 | `var(--primary-color-loud)` |\\n| `--slider-hover-knob-color` | 指针悬停在滑块上时滑块的颜色         | `var(--primary-color-loud)` |\\n| `--slider-hover-knob-scale` | 指针悬停在滑块上时滑块的放大比例     | `1.2`                       |\\n","path":"./src/components/slider/index.md","demos":{"e175e51e":{"name":"default"},"1d551d3e":{"name":"min-max"},"3a207b1f":{"name":"step"},"fd5e2d7e":{"name":"state"},"b630e534":{"name":"disabled"},"6b7771a0":{"name":"disabled-has-state"}}}')}}]);