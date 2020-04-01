(window.webpackJsonp=window.webpackJsonp||[]).push([[90],{632:function(n){n.exports=JSON.parse('{"name":"linear","displayName":"Linear *线性布局*","group":"layout","text":"\\n提供一种简单的线性布局，使用 CSS Flex 实现。\\n\\n``` demo.804ca2dd\\nimport { Linear } from \'nami\'\\n\\nrender(\\n    <Linear>\\n        <div className=\\"box\\" />\\n        <div className=\\"box\\" />\\n        <div className=\\"box\\" />\\n        <div className=\\"box\\" />\\n    </Linear>\\n)\\n```\\n\\n## 垂直布局\\n\\n默认所有元素按水平方向排列，通过 `direction` 参数可以更改为垂直方向：\\n\\n``` demo.127adfb9\\nimport { Linear } from \'nami\'\\n\\nrender(\\n    <Linear direction=\\"vertical\\">\\n        <div className=\\"box\\" />\\n        <div className=\\"box\\" />\\n        <div className=\\"box\\" />\\n        <div className=\\"box\\" />\\n    </Linear>\\n)\\n```\\n\\n## 元素间距\\n\\n默认所有元素之间都是没有间距的，如果需要，可以通过参数 `spacing` 来设置，该参数提供三个间距宽度：\\n\\n-   `true` 普通间距，使用样式配置变量 `--distance-horizontal` 的宽度值；\\n-   `\\"large\\"` 较大间距，是普通间距的两倍；\\n-   `\\"small\\"` 较小间距，是普通间距的一半；\\n\\n``` demo.a288a7ba\\nimport { Linear } from \'nami\'\\n\\nrender(\\n    <div>\\n        <Linear spacing>\\n            <div className=\\"box\\" />\\n            <div className=\\"box\\" />\\n            <div className=\\"box\\" />\\n            <div className=\\"box\\" />\\n        </Linear>\\n        <hr />\\n        <Linear spacing=\\"large\\">\\n            <div className=\\"box\\" />\\n            <div className=\\"box\\" />\\n            <div className=\\"box\\" />\\n            <div className=\\"box\\" />\\n        </Linear>\\n        <hr />\\n        <Linear spacing=\\"small\\">\\n            <div className=\\"box\\" />\\n            <div className=\\"box\\" />\\n            <div className=\\"box\\" />\\n            <div className=\\"box\\" />\\n        </Linear>\\n    </div>\\n)\\n```\\n``` demo.dfc6c437\\nimport { Linear } from \'nami\'\\n\\nrender(\\n    <div>\\n        <Linear direction=\\"vertical\\" spacing>\\n            <div className=\\"box\\" />\\n            <div className=\\"box\\" />\\n            <div className=\\"box\\" />\\n            <div className=\\"box\\" />\\n        </Linear>\\n\\n        <Linear direction=\\"vertical\\" spacing=\\"large\\">\\n            <div className=\\"box\\" />\\n            <div className=\\"box\\" />\\n            <div className=\\"box\\" />\\n            <div className=\\"box\\" />\\n        </Linear>\\n\\n        <Linear direction=\\"vertical\\" spacing=\\"small\\">\\n            <div className=\\"box\\" />\\n            <div className=\\"box\\" />\\n            <div className=\\"box\\" />\\n            <div className=\\"box\\" />\\n        </Linear>\\n    </div>\\n)\\n```\\n\\n## 对齐\\n\\n通过 `justify` 及 `align` 两个参数，我们可以控制该线性布局内元素在主轴及副轴上的对齐方式：\\n\\n``` demo.f83ae10a\\nimport { Linear } from \'nami\'\\n\\nrender(\\n    <div>\\n        <strong>start - 起始位置对齐</strong>\\n\\n        <Linear justify=\\"start\\">\\n            <div className=\\"box\\" />\\n            <div className=\\"box\\" />\\n            <div className=\\"box\\" />\\n        </Linear>\\n\\n        <hr />\\n\\n        <strong>end - 结束位置对齐</strong>\\n\\n        <Linear justify=\\"end\\">\\n            <div className=\\"box\\" />\\n            <div className=\\"box\\" />\\n            <div className=\\"box\\" />\\n        </Linear>\\n\\n        <hr />\\n\\n        <strong>center - 居中对齐</strong>\\n\\n        <Linear justify=\\"center\\">\\n            <div className=\\"box\\" />\\n            <div className=\\"box\\" />\\n            <div className=\\"box\\" />\\n        </Linear>\\n\\n        <hr />\\n\\n        <strong>between - 两端对齐</strong>\\n\\n        <Linear justify=\\"between\\">\\n            <div className=\\"box\\" />\\n            <div className=\\"box\\" />\\n            <div className=\\"box\\" />\\n        </Linear>\\n\\n        <hr />\\n\\n        <strong>around - 分散对齐</strong>\\n\\n        <Linear justify=\\"around\\">\\n            <div className=\\"box\\" />\\n            <div className=\\"box\\" />\\n            <div className=\\"box\\" />\\n        </Linear>\\n    </div>\\n)\\n```\\n``` demo.f7c063c3\\nimport { Linear } from \'nami\'\\n\\nrender(\\n    <div>\\n        <strong>start - 顶端对齐</strong>\\n\\n        <Linear align=\\"start\\">\\n            <div className=\\"box box-h-small\\" />\\n            <div className=\\"box box-h-large\\" />\\n            <div className=\\"box box-h-middle\\" />\\n        </Linear>\\n\\n        <hr />\\n\\n        <strong>end - 底端对齐</strong>\\n\\n        <Linear align=\\"end\\">\\n            <div className=\\"box box-h-small\\" />\\n            <div className=\\"box box-h-large\\" />\\n            <div className=\\"box box-h-middle\\" />\\n        </Linear>\\n\\n        <hr />\\n\\n        <strong>center - 中部对齐</strong>\\n\\n        <Linear align=\\"center\\">\\n            <div className=\\"box box-h-small\\" />\\n            <div className=\\"box box-h-large\\" />\\n            <div className=\\"box box-h-middle\\" />\\n        </Linear>\\n    </div>\\n)\\n```\\n\\n## 填充元素\\n\\n默认 Linear 内的所有元素仅分配其自身所占用的空间，并在容器可用空间不足时自动等比例收缩（即 `flex: 0 1 auto;`），\\n但通常在实现自适应布局时，我们往往会需要其中的一个或多个元素自动填充剩余空间，此时只需给这些元素添加 `fill` 参数即可：\\n\\n``` demo.c326e3c6\\nimport { Linear } from \'nami\'\\n\\nrender(\\n    <div>\\n        <Linear>\\n            <div $flex className=\\"box\\" />\\n            <div className=\\"box\\" />\\n        </Linear>\\n        <Linear>\\n            <div $flex className=\\"box\\" />\\n            <div $flex className=\\"box\\" />\\n            <div className=\\"box\\" />\\n        </Linear>\\n    </div>\\n)\\n```\\n\\n## 分隔符\\n\\n额外地，除了可以通过 `spacing` 设置元素间距之外，还可以通过 `Divider`、`Space` 及 `FlexibleSpace` 三个分隔符组件来隔开某两个元素。\\n\\n## 参数\\n\\n### Linear\\n\\n| 参数        | 说明                       | 类型                                                                             | 默认值         |\\n| ----------- | -------------------------- | -------------------------------------------------------------------------------- | -------------- |\\n| `direction` | 布局方向                   | `\\"horizontal\\"`, `\\"vertical\\"`, <br />`\\"horizontal-reverse\\"`, `\\"vertical-reverse\\"` | `\\"horizontal\\"` |\\n| `justify`   | 所有元素在主轴上的对齐方式 | `\\"start\\"`, `\\"end\\"`, `\\"center\\"`, `\\"between\\"`, `\\"around\\"`                          | `\\"start\\"`      |\\n| `align`     | 所有元素在副轴上的对齐方式 | `\\"start\\"`, `\\"end\\"`, `\\"center\\"`, `\\"stretch\\"`                                      | `\\"stretch\\"`    |\\n| `spacing`   | 元素之间的间距             | `boolean`, `\\"small\\"`, `\\"large\\"`                                                  | `false`        |\\n| `padding`   | 元素与容器之间的间距       | `boolean`, `\\"small\\"`, `\\"large\\"`                                                  | `false`        |\\n| `component` | 用于渲染 Linear 容器的组件 | `string`, `FunctionComponent`, `ComponentClass`                                  | `\\"div\\"`        |\\n| `children`  | 布局项                     | `ReactElement`                                                                   |                |\\n\\n### 布局项修饰属性\\n\\n| 参数        | 说明                       | 类型                             | 默认值  |\\n| ----------- | -------------------------- | -------------------------------- | ------- |\\n| `$flex`     | 弹性布局项                 | `boolean`                        | `false` |\\n| `$col`      | 固定列宽                   | `number<1...24>`                 |         |\\n","path":"./src/components/linear/index.md","demos":{"804ca2dd":{"name":"default"},"127adfb9":{"name":"vertical"},"a288a7ba":{"name":"spacing-horizontal"},"dfc6c437":{"name":"spacing-vertical"},"f83ae10a":{"name":"justify"},"f7c063c3":{"name":"align"},"c326e3c6":{"name":"fill"}}}')}}]);