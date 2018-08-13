import { Menu } from 'nami'

render(
    <Menu mode="vertical">
        <Menu.Item disabled>菜单项 一</Menu.Item>

        <Menu.Item disabled defaultOpen>
            菜单项 二
            <Menu>
                <Menu.Item>子菜单项 一</Menu.Item>
                <Menu.Item>子菜单项 二</Menu.Item>
                <Menu.Item>子菜单项 三</Menu.Item>
            </Menu>
        </Menu.Item>
    </Menu>
)
