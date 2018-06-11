import { Icon, Navbar } from 'nami'
const { Brand, Menu, MenuItem } = Navbar

const masterMenu = [
    { title: '首页', href: '/' },
    { title: '文档', href: '/document' },
    { title: '关于', href: '/about' },
]

const submasterMenu = [
    {
        title: 'v3.x',
        menu: [{ title: 'v2.x', href: '/v2' }, { title: 'v1.x', href: '/v1' }],
    },
    {
        title: (
            <MenuItem.Title>
                <Icon name="github" /> Github
            </MenuItem.Title>
        ),
        href: 'https://github.com/biossun/nami',
    },
]

render(
    <Navbar>
        <Brand href="/">App</Brand>
        <Menu items={masterMenu} />
        <Menu items={submasterMenu} />
    </Navbar>,
    containerEl
)
