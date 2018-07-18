import { Navbar, Icon, Menu, FlexibleSpace } from 'nami'

render(
    <Navbar>
        <Navbar.Brand>
            <a href="#">App</a>
        </Navbar.Brand>

        <Menu>
            <Menu.Item>
                <a href="#">首页</a>
            </Menu.Item>
            <Menu.Item>
                <a href="#documents">文档</a>
            </Menu.Item>
            <Menu.Item>
                <a href="#about">关于</a>
            </Menu.Item>

            <FlexibleSpace />

            <Menu.Item>
                v3.x
                <Menu>
                    <Menu.Item>
                        <a href="#v2">v2.x</a>
                    </Menu.Item>
                    <Menu.Item>
                        <a href="#v1">v1.x</a>
                    </Menu.Item>
                </Menu>
            </Menu.Item>
            <Menu.Item>
                <a href="https://github.com/biossun/nami">
                    <Icon name="github" />&nbsp;Github
                </a>
            </Menu.Item>
        </Menu>
    </Navbar>,
    containerEl
)
