import { Menu } from 'nami'

render(
    <Menu>
        <Menu.Item>菜单项 一</Menu.Item>

        <Menu.ItemGroup>
            分组 一
            <Menu.Item>分组菜单项 一</Menu.Item>
            <Menu.Item>分组菜单项 二</Menu.Item>
        </Menu.ItemGroup>

        <Menu.ItemGroup>
            分组 二
            <Menu.Item>分组菜单项 一</Menu.Item>
            <Menu.Item>分组菜单项 二</Menu.Item>
        </Menu.ItemGroup>
    </Menu>
)
