(window.webpackJsonp=window.webpackJsonp||[]).push([[91],{633:function(n){n.exports=JSON.parse('{"name":"menu","displayName":"Menu *菜单*","group":"navigation","text":"\\n提供一个菜单列表，支持水平或垂直布局、支持最多三级子菜单、支持任意菜单项内容。\\n\\n适用于导航菜单、功能菜单、Tabs 切换等场景。\\n\\n``` demo.d8e24dd6\\nimport { Menu } from \'nami\'\\n\\nrender(\\n    <Menu>\\n        <Menu.Item>首页</Menu.Item>\\n        <Menu.Item>文档</Menu.Item>\\n        <Menu.Item>关于</Menu.Item>\\n    </Menu>\\n)\\n```\\n\\n## 垂直菜单\\n\\n菜单默认水平布局模式，通过 `mode` 可以设置为垂直模式：\\n\\n``` demo.fef903d5\\nimport { Menu } from \'nami\'\\n\\nrender(\\n    <Menu mode=\\"vertical\\">\\n        <Menu.Item>首页</Menu.Item>\\n        <Menu.Item>文档</Menu.Item>\\n        <Menu.Item>关于</Menu.Item>\\n    </Menu>\\n)\\n```\\n\\n## 子菜单\\n\\n在一个菜单项中插入子菜单项非常简单，只需要在菜单项中再放一个菜单即可：\\n\\n``` demo.b635dba1\\nimport { Menu } from \'nami\'\\n\\nrender(\\n    <Menu>\\n        <Menu.Item>菜单项 一</Menu.Item>\\n\\n        <Menu.Item>\\n            菜单项 二\\n            <Menu>\\n                <Menu.Item>子菜单项 一</Menu.Item>\\n                <Menu.Item>子菜单项 二</Menu.Item>\\n                <Menu.Item>子菜单项 三</Menu.Item>\\n            </Menu>\\n        </Menu.Item>\\n\\n        <Menu.Item>\\n            菜单项 三\\n            <Menu>\\n                <Menu.Item>\\n                    子菜单项 一\\n                    <Menu>\\n                        <Menu.Item>子菜单项 1</Menu.Item>\\n                        <Menu.Item>子菜单项 2</Menu.Item>\\n                        <Menu.Item>子菜单项 3</Menu.Item>\\n                    </Menu>\\n                </Menu.Item>\\n                <Menu.Item>\\n                    子菜单项 二\\n                    <Menu>\\n                        <Menu.Item>子菜单项 1</Menu.Item>\\n                        <Menu.Item>子菜单项 2</Menu.Item>\\n                        <Menu.Item>子菜单项 3</Menu.Item>\\n                    </Menu>\\n                </Menu.Item>\\n                <Menu.Item>\\n                    子菜单项 三\\n                    <Menu>\\n                        <Menu.Item>子菜单项 1</Menu.Item>\\n                        <Menu.Item>子菜单项 2</Menu.Item>\\n                        <Menu.Item>子菜单项 3</Menu.Item>\\n                    </Menu>\\n                </Menu.Item>\\n            </Menu>\\n        </Menu.Item>\\n    </Menu>\\n)\\n```\\n\\n_注 1：Item 中的第一个子元素将做为菜单项头部内容，第二个子元素为子菜单，而其余的子元素被忽略；_<br>\\n_注 2：含有子菜单的菜单项会自动在其右侧添加一个箭头图标，以提示用户该菜单项包含子菜单。_\\n\\n在水平布局模式的菜单中，子菜单以弹出方式呈现，\\n而在垂直布局模式中则会改为内联方式：\\n\\n``` demo.591fd150\\nimport { Menu } from \'nami\'\\n\\nrender(\\n    <Menu mode=\\"vertical\\">\\n        <Menu.Item>菜单项 一</Menu.Item>\\n\\n        <Menu.Item>\\n            菜单项 二\\n            <Menu>\\n                <Menu.Item>子菜单项 一</Menu.Item>\\n                <Menu.Item>子菜单项 二</Menu.Item>\\n                <Menu.Item>子菜单项 三</Menu.Item>\\n            </Menu>\\n        </Menu.Item>\\n\\n        <Menu.Item>\\n            菜单项 三\\n            <Menu>\\n                <Menu.Item>\\n                    子菜单项 一\\n                    <Menu>\\n                        <Menu.Item>子菜单项 1</Menu.Item>\\n                        <Menu.Item>子菜单项 2</Menu.Item>\\n                        <Menu.Item>子菜单项 3</Menu.Item>\\n                    </Menu>\\n                </Menu.Item>\\n                <Menu.Item>\\n                    子菜单项 二\\n                    <Menu>\\n                        <Menu.Item>子菜单项 1</Menu.Item>\\n                        <Menu.Item>子菜单项 2</Menu.Item>\\n                        <Menu.Item>子菜单项 3</Menu.Item>\\n                    </Menu>\\n                </Menu.Item>\\n                <Menu.Item>\\n                    子菜单项 三\\n                    <Menu>\\n                        <Menu.Item>子菜单项 1</Menu.Item>\\n                        <Menu.Item>子菜单项 2</Menu.Item>\\n                        <Menu.Item>子菜单项 3</Menu.Item>\\n                    </Menu>\\n                </Menu.Item>\\n            </Menu>\\n        </Menu.Item>\\n    </Menu>\\n)\\n```\\n\\n若希望自动打开某个子菜单，则只需在包含该子菜单的菜单项上设置 `defaultOpen` 属性为 `true` 即可：\\n\\n``` demo.b9fd68f2\\nimport { Menu } from \'nami\'\\n\\nrender(\\n    <Menu mode=\\"vertical\\">\\n        <Menu.Item>菜单项 一</Menu.Item>\\n\\n        <Menu.Item defaultOpen>\\n            菜单项 二\\n            <Menu>\\n                <Menu.Item>子菜单项 一</Menu.Item>\\n                <Menu.Item>子菜单项 二</Menu.Item>\\n                <Menu.Item>子菜单项 三</Menu.Item>\\n            </Menu>\\n        </Menu.Item>\\n    </Menu>\\n)\\n```\\n\\n## 分组菜单\\n\\nMenu 提供了一个 `ItemGroup` 子组件用于对某些菜单项进行分组，这在垂直布局的菜单中很有用：\\n\\n``` demo.bd656901\\nimport { Menu } from \'nami\'\\n\\nrender(\\n    <Menu mode=\\"vertical\\">\\n        <Menu.Item>菜单项 一</Menu.Item>\\n        <Menu.Item>菜单项 二</Menu.Item>\\n\\n        <Menu.ItemGroup>\\n            分组 一\\n            <Menu.Item>分组菜单项 一</Menu.Item>\\n            <Menu.Item>分组菜单项 二</Menu.Item>\\n        </Menu.ItemGroup>\\n\\n        <Menu.ItemGroup>\\n            分组 二\\n            <Menu.Item>分组菜单项 一</Menu.Item>\\n            <Menu.Item>分组菜单项 二</Menu.Item>\\n        </Menu.ItemGroup>\\n    </Menu>\\n)\\n```\\n\\n_注：与 Item 类似，ItemGroup 中的第一个子元素将做为此分组的头部内容，其余子元素为该分组下的菜单项。_<br>\\n\\n当然，水平布局菜单中也支持菜单分组：_虽然感觉并没有多少用处 :p_\\n\\n``` demo.7f1ea37c\\nimport { Menu } from \'nami\'\\n\\nrender(\\n    <Menu>\\n        <Menu.Item>菜单项 一</Menu.Item>\\n\\n        <Menu.ItemGroup>\\n            分组 一\\n            <Menu.Item>分组菜单项 一</Menu.Item>\\n            <Menu.Item>分组菜单项 二</Menu.Item>\\n        </Menu.ItemGroup>\\n\\n        <Menu.ItemGroup>\\n            分组 二\\n            <Menu.Item>分组菜单项 一</Menu.Item>\\n            <Menu.Item>分组菜单项 二</Menu.Item>\\n        </Menu.ItemGroup>\\n    </Menu>\\n)\\n```\\n\\n以及在子菜单中进行分组：\\n\\n``` demo.c3d316e4\\nimport { Menu } from \'nami\'\\n\\nrender(\\n    <Menu>\\n        <Menu.Item>菜单项 一</Menu.Item>\\n\\n        <Menu.Item>\\n            菜单项 二\\n            <Menu>\\n                <Menu.ItemGroup>\\n                    分组 一\\n                    <Menu.Item>分组菜单项 一</Menu.Item>\\n                    <Menu.Item>分组菜单项 二</Menu.Item>\\n                </Menu.ItemGroup>\\n                <Menu.ItemGroup>\\n                    分组 二\\n                    <Menu.Item>分组菜单项 一</Menu.Item>\\n                    <Menu.Item>分组菜单项 二</Menu.Item>\\n                </Menu.ItemGroup>\\n            </Menu>\\n        </Menu.Item>\\n\\n        <Menu.Item>菜单项 三</Menu.Item>\\n    </Menu>\\n)\\n```\\n\\n## 禁用菜单项\\n\\n通过为 `Menu.Item` 设置 `disabled` 属性，可以禁用某个菜单项：\\n\\n``` demo.54ea8198\\nimport { Menu } from \'nami\'\\n\\nrender(\\n    <Menu>\\n        <Menu.Item disabled>菜单项 一</Menu.Item>\\n\\n        <Menu.Item disabled>\\n            菜单项 二\\n            <Menu>\\n                <Menu.Item>子菜单项 一</Menu.Item>\\n                <Menu.Item>子菜单项 二</Menu.Item>\\n                <Menu.Item>子菜单项 三</Menu.Item>\\n            </Menu>\\n        </Menu.Item>\\n\\n        <Menu.Item>\\n            菜单项 三\\n            <Menu>\\n                <Menu.Item disabled>\\n                    子菜单项 一\\n                    <Menu>\\n                        <Menu.Item>子菜单项 1</Menu.Item>\\n                        <Menu.Item>子菜单项 2</Menu.Item>\\n                        <Menu.Item>子菜单项 3</Menu.Item>\\n                    </Menu>\\n                </Menu.Item>\\n                <Menu.Item>\\n                    子菜单项 二\\n                    <Menu>\\n                        <Menu.Item disabled>子菜单项 1</Menu.Item>\\n                        <Menu.Item>子菜单项 2</Menu.Item>\\n                        <Menu.Item>子菜单项 3</Menu.Item>\\n                    </Menu>\\n                </Menu.Item>\\n                <Menu.Item>\\n                    子菜单项 三\\n                    <Menu>\\n                        <Menu.Item>子菜单项 1</Menu.Item>\\n                        <Menu.Item>子菜单项 2</Menu.Item>\\n                        <Menu.Item>子菜单项 3</Menu.Item>\\n                    </Menu>\\n                </Menu.Item>\\n            </Menu>\\n        </Menu.Item>\\n    </Menu>\\n)\\n```\\n\\n禁用状态只会影响被设置该状态的菜单项自身，而不会影响其子菜单。\\n\\n另外，在垂直布局模式中，若禁用了一个已打开子菜单的菜单项，则其子菜单将无法被关闭。\\n\\n``` demo.dacd03b9\\nimport { Menu } from \'nami\'\\n\\nrender(\\n    <Menu mode=\\"vertical\\">\\n        <Menu.Item disabled>菜单项 一</Menu.Item>\\n\\n        <Menu.Item disabled defaultOpen>\\n            菜单项 二\\n            <Menu>\\n                <Menu.Item>子菜单项 一</Menu.Item>\\n                <Menu.Item>子菜单项 二</Menu.Item>\\n                <Menu.Item>子菜单项 三</Menu.Item>\\n            </Menu>\\n        </Menu.Item>\\n    </Menu>\\n)\\n```\\n\\n## 分隔菜单项\\n\\nMenu 支持 Nami 中所提供的三种分隔符组件：\\n\\n-   分隔线 `Divider`\\n-   空隔 `Space`\\n-   弹性空隔 `FlexibleSpace`\\n\\n_注：以下 Demo 中 Space 及 FlexibleSpace 的背景色仅是为了体现分隔效果而添加的，实际上都是透明的。_\\n\\n``` demo.43179795\\nimport { Menu, Divider } from \'nami\'\\n\\nrender(\\n    <Menu>\\n        <Menu.Item>菜单项 一</Menu.Item>\\n        <Divider />\\n        <Menu.Item>菜单项 二</Menu.Item>\\n        <Menu.Item>菜单项 三</Menu.Item>\\n    </Menu>\\n)\\n```\\n``` demo.b148b650\\nimport { Menu, Space } from \'nami\'\\n\\nrender(\\n    <Menu>\\n        <Menu.Item>菜单项 一</Menu.Item>\\n        <Space />\\n        <Menu.Item>菜单项 二</Menu.Item>\\n        <Menu.Item>菜单项 三</Menu.Item>\\n    </Menu>\\n)\\n```\\n``` demo.886e2699\\nimport { Menu, FlexibleSpace } from \'nami\'\\n\\nrender(\\n    <Menu>\\n        <Menu.Item>菜单项 一</Menu.Item>\\n        <FlexibleSpace />\\n        <Menu.Item>菜单项 二</Menu.Item>\\n        <Menu.Item>菜单项 三</Menu.Item>\\n    </Menu>\\n)\\n```\\n\\n不过在弹出的子菜单中，一般只使用分隔线和空隔两种方式*（因为弹出式子菜单的高度是不固定的，所以使用弹性空隔的效果与空隔相同）*：\\n\\n``` demo.f4cfde6d\\nimport { Menu, Divider } from \'nami\'\\n\\nrender(\\n    <Menu>\\n        <Menu.Item>菜单项 一</Menu.Item>\\n\\n        <Menu.Item>\\n            菜单项 二\\n            <Menu>\\n                <Menu.Item>子菜单项 一</Menu.Item>\\n                <Divider />\\n                <Menu.Item>子菜单项 二</Menu.Item>\\n                <Menu.Item>子菜单项 三</Menu.Item>\\n            </Menu>\\n        </Menu.Item>\\n    </Menu>\\n)\\n```\\n``` demo.4f71475d\\nimport { Menu, Space } from \'nami\'\\n\\nrender(\\n    <Menu>\\n        <Menu.Item>菜单项 一</Menu.Item>\\n\\n        <Menu.Item>\\n            菜单项 二\\n            <Menu>\\n                <Menu.Item>子菜单项 一</Menu.Item>\\n                <Space />\\n                <Menu.Item>子菜单项 二</Menu.Item>\\n                <Menu.Item>子菜单项 三</Menu.Item>\\n            </Menu>\\n        </Menu.Item>\\n    </Menu>\\n)\\n```\\n\\n而在垂直布局模式的菜单中，若需要使用弹性空隔，那么请确保有给菜单指定高度：\\n\\n``` demo.9c19c851\\nimport { Menu, Divider } from \'nami\'\\n\\nrender(\\n    <Menu mode=\\"vertical\\">\\n        <Menu.Item>菜单项 一</Menu.Item>\\n        <Divider />\\n        <Menu.Item>菜单项 二</Menu.Item>\\n        <Menu.Item>菜单项 三</Menu.Item>\\n    </Menu>\\n)\\n```\\n``` demo.5dd0d4c1\\nimport { Menu, Space } from \'nami\'\\n\\nrender(\\n    <Menu mode=\\"vertical\\">\\n        <Menu.Item>菜单项 一</Menu.Item>\\n        <Space />\\n        <Menu.Item>菜单项 二</Menu.Item>\\n        <Menu.Item>菜单项 三</Menu.Item>\\n    </Menu>\\n)\\n```\\n``` demo.31304c04\\nimport { Menu, FlexibleSpace } from \'nami\'\\n\\nrender(\\n    <Menu mode=\\"vertical\\">\\n        <Menu.Item>菜单项 一</Menu.Item>\\n        <FlexibleSpace />\\n        <Menu.Item>菜单项 二</Menu.Item>\\n        <Menu.Item>菜单项 三</Menu.Item>\\n    </Menu>\\n)\\n```\\n\\n## 参数\\n\\n### Menu\\n\\n| 参数       | 说明                   | 类型                                | 默认值       |\\n| ---------- | ---------------------- | ----------------------------------- | ------------ |\\n| `mode`     | 菜单展示模式           | `\'horizontal\'` &#124; `\'vertical\'`  | `horizontal` |\\n| `children` | 该菜单中所包含的菜单项 | `Menu.Item` &#124; `Menu.ItemGroup` |              |\\n\\n### Menu.Item\\n\\n| 参数          | 说明                                                                                                   | 类型                                          | 默认值  |\\n| ------------- | ------------------------------------------------------------------------------------------------------ | --------------------------------------------- | ------- |\\n| `active`      | 该菜单项是否处于激活状态                                                                               | `boolean`                                     | `false` |\\n| `defaultOpen` | 默认是否打开该菜单项中的子菜单                                                                         | `boolean`                                     |         |\\n| `disabled`    | 是否禁用                                                                                               | `boolean`                                     | `false` |\\n| `children`    | 菜单项状况内容及子菜单<br>_第一个子元素将作为菜单项的头部内容，而第二个子元素为子菜单，其余子元素忽略_ | \\\\[&nbsp;`React.ReactNode`,&nbsp;`Menu`&nbsp;] |         |\\n\\n### Menu.ItemGroup\\n\\n| 参数       | 说明                                                                                                           | 类型                                                  | 默认值 |\\n| ---------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ------ |\\n| `children` | 该分组内的头部内容及其所包含的菜单项<br>_第一个子元素将作为分组的头部内容，其余子元素为该分组中所包含的菜单项_ | \\\\[&nbsp;`React.ReactNode`,&nbsp;`...Menu.Item`&nbsp;] |        |\\n","path":"./src/components/menu/index.md","demos":{"43179795":{"name":"divider"},"d8e24dd6":{"name":"default"},"fef903d5":{"name":"vertical"},"b635dba1":{"name":"submenu"},"591fd150":{"name":"submenu-vertical"},"b9fd68f2":{"name":"submenu-default-open"},"bd656901":{"name":"item-group-vertical"},"7f1ea37c":{"name":"item-group-horizontal"},"c3d316e4":{"name":"item-group-horizontal-submenu"},"54ea8198":{"name":"item-disabled"},"dacd03b9":{"name":"item-disabled-for-sub-menu"},"b148b650":{"name":"space"},"886e2699":{"name":"flexible-space"},"f4cfde6d":{"name":"divider-submenu"},"4f71475d":{"name":"space-submenu"},"9c19c851":{"name":"divider-vertical"},"5dd0d4c1":{"name":"space-vertical"},"31304c04":{"name":"flexible-space-vertical"}}}')}}]);