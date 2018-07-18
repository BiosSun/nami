import { Menu, Space } from 'nami'

render(
    <Menu>
        <Menu.Item>菜单项 一</Menu.Item>

        <Menu.Item>
            菜单项 二
            <Menu>
                <Menu.Item>子菜单项 一</Menu.Item>
                <Space />
                <Menu.Item>子菜单项 二</Menu.Item>
                <Menu.Item>子菜单项 三</Menu.Item>
            </Menu>
        </Menu.Item>
    </Menu>
)
