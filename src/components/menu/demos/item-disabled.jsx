import { Menu } from 'nami'

render(
    <Menu>
        <Menu.Item disabled>菜单项 一</Menu.Item>

        <Menu.Item disabled>
            菜单项 二
            <Menu>
                <Menu.Item>子菜单项 一</Menu.Item>
                <Menu.Item>子菜单项 二</Menu.Item>
                <Menu.Item>子菜单项 三</Menu.Item>
            </Menu>
        </Menu.Item>

        <Menu.Item>
            菜单项 三
            <Menu>
                <Menu.Item disabled>
                    子菜单项 一
                    <Menu>
                        <Menu.Item>子菜单项 1</Menu.Item>
                        <Menu.Item>子菜单项 2</Menu.Item>
                        <Menu.Item>子菜单项 3</Menu.Item>
                    </Menu>
                </Menu.Item>
                <Menu.Item>
                    子菜单项 二
                    <Menu>
                        <Menu.Item disabled>子菜单项 1</Menu.Item>
                        <Menu.Item>子菜单项 2</Menu.Item>
                        <Menu.Item>子菜单项 3</Menu.Item>
                    </Menu>
                </Menu.Item>
                <Menu.Item>
                    子菜单项 三
                    <Menu>
                        <Menu.Item>子菜单项 1</Menu.Item>
                        <Menu.Item>子菜单项 2</Menu.Item>
                        <Menu.Item>子菜单项 3</Menu.Item>
                    </Menu>
                </Menu.Item>
            </Menu>
        </Menu.Item>
    </Menu>
)
