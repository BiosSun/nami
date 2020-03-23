(window.webpackJsonp=window.webpackJsonp||[]).push([[84],{626:function(n){n.exports=JSON.parse('{"name":"button","displayName":"Button *按钮*","group":"general","text":"\\n用于触发某个操作，并体现当前的操作状态：可触发、进行中、已禁用……\\n\\n``` demo.0b84f431\\nimport { Button } from \'nami\'\\n\\nrender(<Button>Button</Button>)\\n```\\n\\n## 样式\\n\\n通过 `type` 参数定义按钮配色类型，并通过 `outline`、`round`、`circle`、`shadow` 来定义按钮外形：\\n\\n``` demo.269e6a56\\nimport { Button, Icon } from \'nami\'\\n\\nrender(\\n    <div>\\n        <Button>Button</Button>\\n        <Button type=\\"primary\\">Button</Button>\\n        <Button type=\\"info\\">Button</Button>\\n        <Button type=\\"success\\">Button</Button>\\n        <Button type=\\"warning\\">Button</Button>\\n        <Button type=\\"danger\\">Button</Button>\\n\\n        <hr />\\n\\n        <Button round>Button</Button>\\n        <Button round type=\\"primary\\">\\n            Button\\n        </Button>\\n        <Button round type=\\"info\\">\\n            Button\\n        </Button>\\n        <Button round type=\\"success\\">\\n            Button\\n        </Button>\\n        <Button round type=\\"warning\\">\\n            Button\\n        </Button>\\n        <Button round type=\\"danger\\">\\n            Button\\n        </Button>\\n\\n        <hr />\\n\\n        <Button outline>Button</Button>\\n        <Button outline type=\\"primary\\">\\n            Button\\n        </Button>\\n        <Button outline type=\\"info\\">\\n            Button\\n        </Button>\\n        <Button outline type=\\"success\\">\\n            Button\\n        </Button>\\n        <Button outline type=\\"warning\\">\\n            Button\\n        </Button>\\n        <Button outline type=\\"danger\\">\\n            Button\\n        </Button>\\n\\n        <hr />\\n\\n        <Button outline round>\\n            Button\\n        </Button>\\n        <Button outline round type=\\"primary\\">\\n            Button\\n        </Button>\\n        <Button outline round type=\\"info\\">\\n            Button\\n        </Button>\\n        <Button outline round type=\\"success\\">\\n            Button\\n        </Button>\\n        <Button outline round type=\\"warning\\">\\n            Button\\n        </Button>\\n        <Button outline round type=\\"danger\\">\\n            Button\\n        </Button>\\n\\n        <hr />\\n\\n        <Button flat>Button</Button>\\n        <Button flat type=\\"primary\\">\\n            Button\\n        </Button>\\n        <Button flat type=\\"info\\">\\n            Button\\n        </Button>\\n        <Button flat type=\\"success\\">\\n            Button\\n        </Button>\\n        <Button flat type=\\"warning\\">\\n            Button\\n        </Button>\\n        <Button flat type=\\"danger\\">\\n            Button\\n        </Button>\\n\\n        <hr />\\n\\n        <Button circle>\\n            <Icon name=\\"up\\" />\\n        </Button>\\n        <Button circle type=\\"primary\\">\\n            <Icon name=\\"up\\" />\\n        </Button>\\n        <Button circle type=\\"info\\">\\n            <Icon name=\\"up\\" />\\n        </Button>\\n        <Button circle type=\\"success\\">\\n            <Icon name=\\"up\\" />\\n        </Button>\\n        <Button circle type=\\"warning\\">\\n            <Icon name=\\"up\\" />\\n        </Button>\\n        <Button circle type=\\"danger\\">\\n            <Icon name=\\"up\\" />\\n        </Button>\\n\\n        <hr />\\n\\n        <Button circle outline>\\n            <Icon name=\\"up\\" />\\n        </Button>\\n        <Button circle outline type=\\"primary\\">\\n            <Icon name=\\"up\\" />\\n        </Button>\\n        <Button circle outline type=\\"info\\">\\n            <Icon name=\\"up\\" />\\n        </Button>\\n        <Button circle outline type=\\"success\\">\\n            <Icon name=\\"up\\" />\\n        </Button>\\n        <Button circle outline type=\\"warning\\">\\n            <Icon name=\\"up\\" />\\n        </Button>\\n        <Button circle outline type=\\"danger\\">\\n            <Icon name=\\"up\\" />\\n        </Button>\\n\\n        <hr />\\n\\n        <Button circle flat>\\n            <Icon name=\\"up\\" />\\n        </Button>\\n        <Button circle flat type=\\"primary\\">\\n            <Icon name=\\"up\\" />\\n        </Button>\\n        <Button circle flat type=\\"info\\">\\n            <Icon name=\\"up\\" />\\n        </Button>\\n        <Button circle flat type=\\"success\\">\\n            <Icon name=\\"up\\" />\\n        </Button>\\n        <Button circle flat type=\\"warning\\">\\n            <Icon name=\\"up\\" />\\n        </Button>\\n        <Button circle flat type=\\"danger\\">\\n            <Icon name=\\"up\\" />\\n        </Button>\\n    </div>\\n)\\n```\\n\\n## 禁用\\n\\n通过 `disabled` 参数，可以设置按钮为禁用状态：\\n\\n``` demo.8b6ccca2\\nimport { Button } from \'nami\'\\n\\nrender(<Button disabled>Button</Button>)\\n```\\n\\n## 参数\\n\\n### Button\\n\\n| 参数       | 说明         | 类型                                                                                | 默认值  |\\n| ---------- | ------------ | ----------------------------------------------------------------------------------- | ------- |\\n| `type`     | 按钮类型     | `\'primary\'` &#124; `\'info\'` &#124; `\'success\'` &#124; `\'warning\'` &#124; `\'danger\'` |         |\\n| `outline`  | 轮廓按钮     | `boolean`                                                                           | `false` |\\n| `flat`     | 文字按钮     | `boolean`                                                                           | `false` |\\n| `round`    | 圆角按钮     | `boolean`                                                                           | `false` |\\n| `circle`   | 圆形按钮     | `boolean`                                                                           | `false` |\\n| `disabled` | 是否已禁用   | `boolean`                                                                           | `false` |\\n| `onClick`  | 按钮点击事件 | `(e: MouseEvent) => void`                                                           |         |\\n| `children` | 按钮内容     | `ReactNode`                                                                         |         |\\n","path":"./src/components/button/index.md","demos":{"0b84f431":{"name":"default"},"269e6a56":{"name":"mode-type"},"8b6ccca2":{"name":"disabled"}}}')}}]);