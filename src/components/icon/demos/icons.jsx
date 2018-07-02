import { Icon } from 'nami'

function IconBox({ name }) {
    return (
        <li className="icon-box">
            <Icon name={name} />
            <span className="icon-box__name">{name}</span>
        </li>
    )
}

function IconBoxList({ children }) {
    return <ul className="icon-box-list">{children}</ul>
}

render(
    <IconBoxList>
        <IconBox name="up" />
        <IconBox name="down" />
        <IconBox name="left" />
        <IconBox name="right" />
        <IconBox name="check" />
        <IconBox name="github" />
    </IconBoxList>
)
