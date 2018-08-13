---
name: menu
displayName: Menu *菜单*
group: navigation
---

提供一个菜单列表，支持水平或垂直布局、支持最多三级子菜单、支持任意菜单项内容。

适用于导航菜单、功能菜单、Tabs 切换等场景。

{@demo "./demos/default.jsx"}

## 垂直菜单

菜单默认水平布局模式，通过 `mode` 可以设置为垂直模式：

{@demo "./demos/vertical.jsx"}

## 子菜单

在一个菜单项中插入子菜单项非常简单，只需要在菜单项中再放一个菜单即可：

{@demo "./demos/submenu.jsx"}

_\* 注 1：Item 中的第一个子元素将做为菜单项头部内容，第二个子元素为子菜单，而其余的子元素被忽略；_<br>
_\* 注 2：含有子菜单的菜单项会自动在其右侧添加一个箭头图标，以提示用户该菜单项包含子菜单。_

在水平布局模式的菜单中，子菜单以弹出方式呈现，
而在垂直布局模式中则会改为内联方式：

{@demo "./demos/submenu-vertical.jsx"}

若希望自动打开某个子菜单，则只需在包含该子菜单的菜单项上设置 `defaultOpen` 属性为 `true` 即可：

{@demo "./demos/submenu-default-open.jsx"}

## 分组菜单

Menu 提供了一个 `ItemGroup` 子组件用于对某些菜单项进行分组，这在垂直布局的菜单中很有用：

{@demo "./demos/item-group-vertical.jsx"}

_\* 注：与 Item 类似，ItemGroup 中的第一个子元素将做为此分组的头部内容，其余子元素为该分组下的菜单项。_<br>

当然，水平布局菜单中也支持菜单分组：_虽然感觉并没有多少用处 :p_

{@demo "./demos/item-group-horizontal.jsx"}

以及在子菜单中进行分组：

{@demo "./demos/item-group-horizontal-submenu.jsx"}

## 禁用菜单项

通过为 `Menu.Item` 设置 `disabled` 属性，可以禁用某个菜单项：

{@demo "./demos/item-disabled.jsx"}

禁用状态只会影响被设置该状态的菜单项自身，而不会影响其子菜单。

另外，在垂直布局模式中，若禁用了一个已打开子菜单的菜单项，则其子菜单将无法被关闭。

{@demo "./demos/item-disabled-for-sub-menu.jsx"}

## 分隔菜单项

Menu 支持 Nami 中所提供的三种分隔符组件：

-   分隔线 `Divider`
-   空隔 `Space`
-   弹性空隔 `FlexibleSpace`

_\* 注：以下 Demo 中 Space 及 FlexibleSpace 的背景色仅是为了体现分隔效果而添加的，实际上都是透明的。_

{@demo "./demos/divider.jsx"}
{@demo "./demos/space.jsx"}
{@demo "./demos/flexible-space.jsx"}

不过在弹出的子菜单中，一般只使用分隔线和空隔两种方式：_因为弹出式子菜单的高度是不固定的，所以使用弹性空隔的效果与空隔相同_

{@demo "./demos/divider-submenu.jsx"}
{@demo "./demos/space-submenu.jsx"}

而在垂直布局模式的菜单中，若需要使用弹性空隔，那么请确保有给菜单指定高度：

{@demo "./demos/divider-vertical.jsx"}
{@demo "./demos/space-vertical.jsx"}
{@demo "./demos/flexible-space-vertical.jsx"}

## 参数

### Menu

| 参数       | 说明                   | 类型                                | 默认值       |
| ---------- | ---------------------- | ----------------------------------- | ------------ |
| `mode`     | 菜单展示模式           | `'horizontal'` &#124; `'vertical'`  | `horizontal` |
| `children` | 该菜单中所包含的菜单项 | `Menu.Item` &#124; `Menu.ItemGroup` |              |

### Menu.Item

| 参数          | 说明                                                                                                   | 类型                                          | 默认值  |
| ------------- | ------------------------------------------------------------------------------------------------------ | --------------------------------------------- | ------- |
| `active`      | 该菜单项是否处于激活状态                                                                               | `boolean`                                     | `false` |
| `defaultOpen` | 默认是否打开该菜单项中的子菜单                                                                         | `boolean`                                     |         |
| `disabled`    | 是否禁用                                                                                               | `boolean`                                     | `false` |
| `children`    | 菜单项状况内容及子菜单<br>_第一个子元素将作为菜单项的头部内容，而第二个子元素为子菜单，其余子元素忽略_ | \[&nbsp;`React.ReactNode`,&nbsp;`Menu`&nbsp;] |         |

### Menu.ItemGroup

| 参数       | 说明                                                                                                           | 类型                                                  | 默认值 |
| ---------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ------ |
| `children` | 该分组内的头部内容及其所包含的菜单项<br>_第一个子元素将作为分组的头部内容，其余子元素为该分组中所包含的菜单项_ | \[&nbsp;`React.ReactNode`,&nbsp;`...Menu.Item`&nbsp;] |        |
