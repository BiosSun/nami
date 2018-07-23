(window.webpackJsonp=window.webpackJsonp||[]).push([[76],{639:function(n){n.exports={name:"popover",displayName:"Popover *弹出层*",group:"general",text:'\nPopover 提供一个可以相对某个元素进行绝对定位的弹出层组件。\n\n``` demo.659dd85f\nimport { Popover, Button } from \'nami\'\n\nrender(\n    <Popover of={<Button type="primary">Toggle Popover</Button>}>\n        <div className="mv-s mh-l">Popover content.</div>\n    </Popover>\n)\n```\n\n## 定位\n\nPopover 提供两个定位参数：\n\n-   at：指定弹出层相对于目标元素的位置；\n-   offset：指定弹出层相对于目标元素的偏移；\n\n``` demo.ac2f1793\nimport { Popover, Grid, Select, Button, TextBox } from \'nami\'\n\nclass Demo extends Component {\n    state = {\n        at: \'bottom\',\n        offset: 0,\n    }\n\n    render() {\n        return (\n            <React.Fragment>\n                {this.renderController()}\n                {this.renderPopover()}\n            </React.Fragment>\n        )\n    }\n\n    renderPopover() {\n        return (\n            <Popover\n                of={<Button type="primary">Toggle Popover</Button>}\n                at={this.state.at}\n                offset={this.state.offset}\n            >\n                <div className="mv-s mh-l">Popover content.</div>\n            </Popover>\n        )\n    }\n\n    renderController() {\n        return (\n            <div className="demo-popover__controller">\n                <Grid spacing>\n                    <Grid.Col span={4}>\n                        <Select\n                            value={this.state.at}\n                            onChange={e => this.setState({ at: e.detail.value })}\n                        >\n                            <Select.Option value="auto-start">auto-start</Select.Option>\n                            <Select.Option value="auto">auto</Select.Option>\n                            <Select.Option value="auto-end">auto-end</Select.Option>\n                            <Select.Option value="top-start">top-start</Select.Option>\n                            <Select.Option value="top">top</Select.Option>\n                            <Select.Option value="top-end">top-end</Select.Option>\n                            <Select.Option value="right-start">right-start</Select.Option>\n                            <Select.Option value="right">right</Select.Option>\n                            <Select.Option value="right-end">right-end</Select.Option>\n                            <Select.Option value="bottom-start">bottom-start</Select.Option>\n                            <Select.Option value="bottom">bottom</Select.Option>\n                            <Select.Option value="bottom-end">bottom-end</Select.Option>\n                            <Select.Option value="left-start">left-start</Select.Option>\n                            <Select.Option value="left">left</Select.Option>\n                            <Select.Option value="left-end">left-end</Select.Option>\n                        </Select>\n                    </Grid.Col>\n                    <Grid.Col span={4}>\n                        <TextBox\n                            value={this.state.offset.toString()}\n                            onChange={e => this.setState({ offset: e.target.value })}\n                            placeholder="offset"\n                        />\n                    </Grid.Col>\n                </Grid>\n            </div>\n        )\n    }\n}\n\nrender(<Demo />)\n```\n\n## 限定宽度\n\n一般弹出层的宽度由其内容来决定，但也可以指定在弹出层位于目标元素的上方或下方时，\n设置弹出层的宽度（或最小宽度）为目标元素宽度：\n\n``` demo.212b8ce0\nimport { Popover, Linear, Button, Radio } from \'nami\'\n\nclass Demo extends Component {\n    state = {\n        prop: \'widthFollowOf\',\n    }\n\n    render() {\n        return (\n            <React.Fragment>\n                {this.renderController()}\n                {this.renderPopover()}\n            </React.Fragment>\n        )\n    }\n\n    renderPopover() {\n        const isMinWidth = this.state.prop === \'minWidthFollowOf\'\n\n        return (\n            <Popover\n                of={<Button type="primary">Toggle Popover</Button>}\n                widthFollowOf={!isMinWidth}\n                minWidthFollowOf={isMinWidth}\n            >\n                <div className="mv-s mh-l">Popover content.</div>\n            </Popover>\n        )\n    }\n\n    renderController() {\n        const { prop } = this.state\n        const radios = [\'widthFollowOf\', \'minWidthFollowOf\'].map(val => (\n            <Linear.Item key={val}>\n                <Radio\n                    name="popover:width-follow-of"\n                    label={val}\n                    value={val}\n                    checked={prop === val}\n                    onChange={e => this.setState({ prop: val })}\n                />\n            </Linear.Item>\n        ))\n\n        return (\n            <Linear className="demo-popover__controller" spacing>\n                {radios}\n            </Linear>\n        )\n    }\n}\n\nrender(<Demo />)\n```\n\n## 箭头指针\n\n通过设置 `arrow` 参数为 `true`，可以让弹出层额外显示一个箭头指针指向目标元素：\n\n``` demo.b4c48656\nimport { Popover, Grid, Select, Button } from \'nami\'\n\nclass Demo extends Component {\n    state = {\n        at: \'bottom\',\n    }\n\n    render() {\n        return (\n            <React.Fragment>\n                {this.renderController()}\n                {this.renderPopover()}\n            </React.Fragment>\n        )\n    }\n\n    renderPopover() {\n        return (\n            <Popover of={<Button type="primary">Toggle Popover</Button>} at={this.state.at} arrow>\n                <div className="mv-s mh-l">Popover content.</div>\n            </Popover>\n        )\n    }\n\n    renderController() {\n        return (\n            <div className="demo-popover__controller">\n                <Grid spacing>\n                    <Grid.Col span={4}>\n                        <Select\n                            value={this.state.at}\n                            onChange={e => this.setState({ at: e.detail.value })}\n                        >\n                            <Select.Option value="auto-start">auto-start</Select.Option>\n                            <Select.Option value="auto">auto</Select.Option>\n                            <Select.Option value="auto-end">auto-end</Select.Option>\n                            <Select.Option value="top-start">top-start</Select.Option>\n                            <Select.Option value="top">top</Select.Option>\n                            <Select.Option value="top-end">top-end</Select.Option>\n                            <Select.Option value="right-start">right-start</Select.Option>\n                            <Select.Option value="right">right</Select.Option>\n                            <Select.Option value="right-end">right-end</Select.Option>\n                            <Select.Option value="bottom-start">bottom-start</Select.Option>\n                            <Select.Option value="bottom">bottom</Select.Option>\n                            <Select.Option value="bottom-end">bottom-end</Select.Option>\n                            <Select.Option value="left-start">left-start</Select.Option>\n                            <Select.Option value="left">left</Select.Option>\n                            <Select.Option value="left-end">left-end</Select.Option>\n                        </Select>\n                    </Grid.Col>\n                </Grid>\n            </div>\n        )\n    }\n}\n\nrender(<Demo />)\n```\n\n## 悬停切换\n\nPopover 默认是通过用户点击目标元素来切换弹出层的打开/关闭状态，\n但额外的也支持通过鼠标悬停/离开来切换弹出层。\n\n``` demo.3bdea438\nimport { Button, Popover } from \'nami\'\n\nrender(\n    <Popover of={<Button type="primary">Toggle Popover</Button>} event="hover">\n        <div className="mv-s mh-l">Popover content.</div>\n    </Popover>\n)\n```\n\n不过应尽量避免使用悬停切换，\n因为「点击」才是一种明确的触发行为，而「悬停」更多的是一种试探性的查看行为，\n所以通常只用于反馈一些提示性的内容以引导用户进行后续操作。\n\n## 触发关闭\n\n默认有三种操作会导致弹出层被关闭：\n\n-   点击目标元素中的任意位置；\n-   点击页面中除目标元素及弹出层元素之外的任意位置；\n-   按下 `Esc` 键；\n\n相应的，可以选择是否禁止让某个操作导致弹出层关闭：\n\n``` demo.5001a96c\nimport { Popover, Linear, CheckBox, Button } from \'nami\'\n\nclass Demo extends Component {\n    state = {\n        disabledCloseOnOfClick: false,\n        disabledCloseOnOtherClick: false,\n        disabledCloseOnEscape: false,\n    }\n\n    render() {\n        return (\n            <React.Fragment>\n                {this.renderController()}\n                {this.renderPopover()}\n            </React.Fragment>\n        )\n    }\n\n    renderPopover() {\n        const {\n            disabledCloseOnOfClick,\n            disabledCloseOnOtherClick,\n            disabledCloseOnEscape,\n        } = this.state\n\n        return (\n            <Popover\n                of={<Button type="primary">Toggle Popover</Button>}\n                disabledCloseOnOfClick={disabledCloseOnOfClick}\n                disabledCloseOnOtherClick={disabledCloseOnOtherClick}\n                disabledCloseOnEscape={disabledCloseOnEscape}\n            >\n                <div className="mv-s mh-l">Popover content.</div>\n            </Popover>\n        )\n    }\n\n    renderController() {\n        const {\n            disabledCloseOnOfClick,\n            disabledCloseOnOtherClick,\n            disabledCloseOnEscape,\n        } = this.state\n\n        return (\n            <Linear className="demo-popover__controller" spacing>\n                <Linear.Item>\n                    <CheckBox\n                        label="disabledCloseOnOfClick"\n                        checked={disabledCloseOnOfClick}\n                        onChange={e => this.setState({ disabledCloseOnOfClick: e.target.checked })}\n                    />\n                </Linear.Item>\n                <Linear.Item>\n                    <CheckBox\n                        label="disabledCloseOnOtherClick"\n                        checked={disabledCloseOnOtherClick}\n                        onChange={e =>\n                            this.setState({ disabledCloseOnOtherClick: e.target.checked })\n                        }\n                    />\n                </Linear.Item>\n                <Linear.Item>\n                    <CheckBox\n                        label="disabledCloseOnEscape"\n                        checked={disabledCloseOnEscape}\n                        onChange={e => this.setState({ disabledCloseOnEscape: e.target.checked })}\n                    />\n                </Linear.Item>\n            </Linear>\n        )\n    }\n}\n\nrender(<Demo />)\n```\n\n如果用户作出了一些会触发弹出层关闭的操作，弹出层组件会触发 `onClose` 事件回调，该事件没有捕获及冒泡阶段，只会在组件上触发。\n\n## 渲染目标元素\n\n如果想要在目标元素中根据当前弹出层的打开或关闭状态来呈现不同的样式或内容，那么可以改为为 `of` 参数指定一个渲染函数，\n在这个函数中，你能够知道当前弹出层的状态：\n\n``` demo.2f8d1f9d\nimport { Popover, Button } from \'nami\'\n\nrender(\n    <Popover of={({ open }) => <Button type="primary">{open ? \'Close\' : \'Open\'} Popover</Button>}>\n        <div className="mv-s mh-l">Popover content.</div>\n    </Popover>\n)\n```\n\n## 受控组件\n\n但如果你想要在目标元素之外根据弹出层的状态作些改变，或是想要自己控制弹出层的打开或关闭，那么你需要将 Popover 作为受控组件来使用它：\n\n``` demo.9291e2ae\nimport { Popover, Linear, Button } from \'nami\'\n\nclass Demo extends Component {\n    state = {\n        open: false,\n    }\n\n    render() {\n        return (\n            <React.Fragment>\n                {this.renderController()}\n                {this.renderPopover()}\n            </React.Fragment>\n        )\n    }\n\n    renderPopover() {\n        const { open } = this.state\n\n        return (\n            <Popover\n                of={\n                    <Button type="primary" onClick={() => this.setState({ open: !open })}>\n                        {open ? \'Close\' : \'Open\'} Popover\n                    </Button>\n                }\n                open={open}\n                onClose={() => this.setState({ open: false })}\n            >\n                <div className="mv-s mh-l">Popover content.</div>\n            </Popover>\n        )\n    }\n\n    renderController() {\n        const { open } = this.state\n\n        return (\n            <Linear className="demo-popover__controller" spacing align="center">\n                <Linear.Item>\n                    <Button type="primary" onClick={() => this.setState({ open: true })}>\n                        Open Popover\n                    </Button>\n                </Linear.Item>\n                <Linear.Item>{open ? \' opened\' : \' closed\'}</Linear.Item>\n            </Linear>\n        )\n    }\n}\n\nrender(<Demo />)\n```\n\n_注意：在受控状态下，用户点击目标组件时将不会导致弹出层关闭。_\n\n## 参数\n\n### Popover\n\n| 参数                        | 说明                                                                               | 类型                                                                                                                                                                                                                                                                                                                                                                                                                                 | 默认值     |\n| --------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |\n| `of`                        | 该弹出层所绑定的目标元素，弹出层将相对该元素对齐                                   | `ReactElement` &#124; `(props: { open: boolean }) => ReactElement`                                                                                                                                                                                                                                                                                                                                                                   |            |\n| `at`                        | 弹出层相对于目标元素的位置                                                         | `\'auto-start\'`&nbsp;&#124;&nbsp;`\'auto\'`&nbsp;&#124;&nbsp;`\'auto-end\'`&nbsp;&#124;<br>`\'top-start\'`&nbsp;&#124;&nbsp;`\'top\'`&nbsp;&#124;&nbsp;`\'top-end\'`&nbsp;&#124;<br>`\'right-start\'`&nbsp;&#124;&nbsp;`\'right\'`&nbsp;&#124;&nbsp;`\'right-end\'`&nbsp;&#124;<br>`\'bottom-start\'`&nbsp;&#124;&nbsp;`\'bottom\'`&nbsp;&#124;&nbsp;`\'bottom-end\'`&nbsp;&#124;<br>`\'left-start\'`&nbsp;&#124;&nbsp;`\'left\'`&nbsp;&#124;&nbsp;`\'left-end\'` | `\'bottom\'` |\n| `offset`                    | 弹出层相对于目标元素的偏移长度                                                     | `number` &#124; `string`                                                                                                                                                                                                                                                                                                                                                                                                             | `0`        |\n| `widthFollowOf`             | 是否将弹出层的最小宽度限定为目标元素宽度                                           | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                            | `false`    |\n| `minWidthFollowOf`          | 是否将弹出层的最小宽度限定为目标元素宽度                                           | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                            | `false`    |\n| `open`                      | 是否打开弹出层                                                                     | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                            |            |\n| `defaultOpen`               | 是否默认打开弹出层                                                                 | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                            |            |\n| `event`                     | 弹出层显示触发事件<br>_在组件为受控状态时，该参数无效_                             | `\'click\'` &#124; `\'hover\'`                                                                                                                                                                                                                                                                                                                                                                                                           | `click`    |\n| `disabledCloseOnOfClick`    | 禁止点击绑定元素时关闭弹出层<br>_在组件为受控状态时，或使用悬停切换时，该参数无效_ | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                            | `false`    |\n| `disabledCloseOnOtherClick` | 禁止点击页面其它位置时（弹出层及所绑定元素之外的位置）关闭弹出层                   | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                            | `false`    |\n| `disabledCloseOnEscape`     | 禁止按下 Escape 键时关闭弹出层                                                     | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                            | `false`    |\n| `onClose`                   | 在受控状态下，需要隐藏弹出层时触发的事件                                           | `(e: CustomEvent) => void`                                                                                                                                                                                                                                                                                                                                                                                                           |            |\n| `arrow`                     | 是否显示箭头指针                                                                   | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                            | `false`    |\n| `children`                  | 弹出层内容                                                                         | `React.ReactNode`                                                                                                                                                                                                                                                                                                                                                                                                                    |            |\n',path:"./src/components/popover/index.md",demos:{"659dd85f":{name:"default"},ac2f1793:{name:"position"},"212b8ce0":{name:"width-follow-of"},b4c48656:{name:"arrow"},"3bdea438":{name:"hover"},"5001a96c":{name:"disabled-close"},"2f8d1f9d":{name:"render-of"},"9291e2ae":{name:"controlled"}}}}}]);