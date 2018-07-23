(window.webpackJsonp=window.webpackJsonp||[]).push([[71],{634:function(n){n.exports={name:"grid",displayName:"Grid *栅格*",group:"layout",text:'\n提供一个传统的栅格布局，24 列，使用 CSS Flex 实现。\n\n``` demo.b875d069\nimport { Grid } from \'nami\'\n\nrender(\n    <div>\n        <Grid>\n            <Grid.Col>\n                <div className="box">24</div>\n            </Grid.Col>\n        </Grid>\n        <Grid>\n            <Grid.Col>\n                <div className="box">12</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">12</div>\n            </Grid.Col>\n        </Grid>\n        <Grid>\n            <Grid.Col>\n                <div className="box">8</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">8</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">8</div>\n            </Grid.Col>\n        </Grid>\n        <Grid>\n            <Grid.Col>\n                <div className="box">6</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">6</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">6</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">6</div>\n            </Grid.Col>\n        </Grid>\n        <Grid>\n            <Grid.Col>\n                <div className="box">4</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">4</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">4</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">4</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">4</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">4</div>\n            </Grid.Col>\n        </Grid>\n        <Grid>\n            <Grid.Col>\n                <div className="box">2</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">2</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">2</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">2</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">2</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">2</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">2</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">2</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">2</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">2</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">2</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">2</div>\n            </Grid.Col>\n        </Grid>\n        <Grid>\n            <Grid.Col>\n                <div className="box">1</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">1</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">1</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">1</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">1</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">1</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">1</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">1</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">1</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">1</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">1</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">1</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">1</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">1</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">1</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">1</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">1</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">1</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">1</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">1</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">1</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">1</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">1</div>\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box">1</div>\n            </Grid.Col>\n        </Grid>\n    </div>\n)\n```\n\n## 列宽\n\n得益于 CSS Flex 技术，一个栅格内的所有未配置宽度的列默认会平分栅格中的剩余空间*（剩余空间=栅格总空间-已配置列宽的列所占用空间）*。\n\n而通过 `Col` 的参数 `span`，可以为某一列明确指定其列宽：\n\n``` demo.6269460a\nimport { Grid } from \'nami\'\n\nrender(\n    <div>\n        <Grid>\n            <Grid.Col span={11}>\n                <div className="box">11</div>\n            </Grid.Col>\n            <Grid.Col span={13}>\n                <div className="box">13</div>\n            </Grid.Col>\n        </Grid>\n\n        <Grid>\n            <Grid.Col span={7}>\n                <div className="box">7</div>\n            </Grid.Col>\n            <Grid.Col span={8}>\n                <div className="box">8</div>\n            </Grid.Col>\n            <Grid.Col span={9}>\n                <div className="box">9</div>\n            </Grid.Col>\n        </Grid>\n\n        <Grid>\n            <Grid.Col span={2}>\n                <div className="box">2</div>\n            </Grid.Col>\n            <Grid.Col span={4}>\n                <div className="box">4</div>\n            </Grid.Col>\n            <Grid.Col span={4}>\n                <div className="box">4</div>\n            </Grid.Col>\n            <Grid.Col span={6}>\n                <div className="box">6</div>\n            </Grid.Col>\n            <Grid.Col span={8}>\n                <div className="box">8</div>\n            </Grid.Col>\n        </Grid>\n    </div>\n)\n```\n\n## 列间距\n\n栅格默认列之间没有间距，如果需要，可以通过参数 `spacing` 来设置，该参数提供了三个间距宽度：\n\n-   `true` 普通间距，使用样式配置变量 `--distance-horizontal` 的宽度值；\n-   `"large"` 较大间距，是普通间距的两倍；\n-   `"small"` 较小间距，是普通间距的一半；\n\n``` demo.0a2fbb13\nimport { Grid } from \'nami\'\n\nrender(\n    <div>\n        <Grid spacing>\n            <Grid.Col>\n                <div className="box" />\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box" />\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box" />\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box" />\n            </Grid.Col>\n        </Grid>\n\n        <hr />\n\n        <Grid spacing="large">\n            <Grid.Col>\n                <div className="box" />\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box" />\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box" />\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box" />\n            </Grid.Col>\n        </Grid>\n\n        <hr />\n\n        <Grid spacing="small">\n            <Grid.Col>\n                <div className="box" />\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box" />\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box" />\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box" />\n            </Grid.Col>\n        </Grid>\n    </div>\n)\n```\n\n## 偏移\n\n在列中，我们可以控制某个列向右偏移 n 个列宽：\n\n``` demo.71190787\nimport { Grid } from \'nami\'\n\nrender(\n    <div>\n        <Grid>\n            <Grid.Col span={4} offset={4}>\n                <div className="box" />\n            </Grid.Col>\n            <Grid.Col span={4} offset={8}>\n                <div className="box" />\n            </Grid.Col>\n        </Grid>\n        <Grid>\n            <Grid.Col span={4}>\n                <div className="box" />\n            </Grid.Col>\n            <Grid.Col span={4} offset={4}>\n                <div className="box" />\n            </Grid.Col>\n            <Grid.Col span={4}>\n                <div className="box" />\n            </Grid.Col>\n            <Grid.Col span={4} offset={4}>\n                <div className="box" />\n            </Grid.Col>\n        </Grid>\n    </div>\n)\n```\n\n## 对齐\n\n在 `Grid` 上，我们可以控制该栅格内列的水平及垂直对齐方式：\n\n``` demo.00a67c5f\nimport { Grid } from \'nami\'\n\nrender(\n    <div>\n        <strong>start - 左对齐</strong>\n\n        <Grid justify="start">\n            <Grid.Col span={4}>\n                <div className="box" />\n            </Grid.Col>\n            <Grid.Col span={4}>\n                <div className="box" />\n            </Grid.Col>\n            <Grid.Col span={4}>\n                <div className="box" />\n            </Grid.Col>\n        </Grid>\n\n        <hr />\n\n        <strong>end - 右对齐</strong>\n\n        <Grid justify="end">\n            <Grid.Col span={4}>\n                <div className="box" />\n            </Grid.Col>\n            <Grid.Col span={4}>\n                <div className="box" />\n            </Grid.Col>\n            <Grid.Col span={4}>\n                <div className="box" />\n            </Grid.Col>\n        </Grid>\n\n        <hr />\n\n        <strong>center - 居中对齐</strong>\n\n        <Grid justify="center">\n            <Grid.Col span={4}>\n                <div className="box" />\n            </Grid.Col>\n            <Grid.Col span={4}>\n                <div className="box" />\n            </Grid.Col>\n            <Grid.Col span={4}>\n                <div className="box" />\n            </Grid.Col>\n        </Grid>\n\n        <hr />\n\n        <strong>between - 两端对齐</strong>\n\n        <Grid justify="between">\n            <Grid.Col span={4}>\n                <div className="box" />\n            </Grid.Col>\n            <Grid.Col span={4}>\n                <div className="box" />\n            </Grid.Col>\n            <Grid.Col span={4}>\n                <div className="box" />\n            </Grid.Col>\n        </Grid>\n\n        <hr />\n\n        <strong>around - 分散对齐</strong>\n\n        <Grid justify="around">\n            <Grid.Col span={4}>\n                <div className="box" />\n            </Grid.Col>\n            <Grid.Col span={4}>\n                <div className="box" />\n            </Grid.Col>\n            <Grid.Col span={4}>\n                <div className="box" />\n            </Grid.Col>\n        </Grid>\n    </div>\n)\n```\n``` demo.eb53fa03\nimport { Grid } from \'nami\'\n\nrender(\n    <div>\n        <strong>start - 顶端对齐</strong>\n\n        <Grid align="start">\n            <Grid.Col>\n                <div className="box box-h-small" />\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box box-h-large" />\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box box-h-middle" />\n            </Grid.Col>\n        </Grid>\n\n        <hr />\n\n        <strong>center - 中部对齐</strong>\n\n        <Grid align="center">\n            <Grid.Col>\n                <div className="box box-h-small" />\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box box-h-large" />\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box box-h-middle" />\n            </Grid.Col>\n        </Grid>\n\n        <hr />\n\n        <strong>end - 底端对齐</strong>\n\n        <Grid align="end">\n            <Grid.Col>\n                <div className="box box-h-small" />\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box box-h-large" />\n            </Grid.Col>\n            <Grid.Col>\n                <div className="box box-h-middle" />\n            </Grid.Col>\n        </Grid>\n    </div>\n)\n```\n\n额外的，也可以单独控制某个列的垂直对齐方式：\n\n``` demo.0a4944dd\nimport { Grid } from \'nami\'\n\nrender(\n    <Grid align="end">\n        <Grid.Col align="start">\n            <div className="box" />\n        </Grid.Col>\n        <Grid.Col align="center">\n            <div className="box" />\n        </Grid.Col>\n        <Grid.Col align="end">\n            <div className="box" />\n        </Grid.Col>\n    </Grid>\n)\n```\n\n## 参数\n\n### Grid\n\n| 参数       | 说明                         | 类型                                                                            | 默认值 |\n| ---------- | ---------------------------- | ------------------------------------------------------------------------------- | ------ |\n| `justify`  | 所有列的水平对齐方式         | `\'start\'` &#124; `\'end\'` &#124; `\'center\'` &#124; `\'between\'` &#124; `\'around\'` |        |\n| `align`    | 所有列的垂直对齐方式         | `\'start\'` &#124; `\'end\'` &#124; `\'center\'`                                      |        |\n| `spacing`  | 列之间是否有间距，及间距宽度 | `boolean` &#124; `\'small\'` &#124; `\'large\'`                                     |        |\n| `children` | 栅格中的列元素               | `Grid.Col`                                                                      |        |\n\n### Grid.Col\n\n| 参数       | 说明               | 类型                                       | 默认值 |\n| ---------- | ------------------ | ------------------------------------------ | ------ |\n| `span`     | 列宽               | `number`                                   |        |\n| `offset`   | 列偏移量           | `number`                                   |        |\n| `align`    | 该列的垂直对齐方式 | `\'start\'` &#124; `\'end\'` &#124; `\'center\'` |        |\n| `children` | 列中的内容         | `React.ReactNode`                          |        |\n',path:"./src/components/grid/index.md",demos:{71190787:{name:"offset"},b875d069:{name:"basic"},"6269460a":{name:"span"},"0a2fbb13":{name:"spacing"},"00a67c5f":{name:"justify"},eb53fa03:{name:"align"},"0a4944dd":{name:"col-align"}}}}}]);