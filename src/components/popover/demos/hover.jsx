import { Button, Popover } from 'nami'

render(
    <Popover of={<Button type="primary">Toggle Popover</Button>} event="hover">
        <div className="mv-s mh-l">Popover content.</div>
    </Popover>
)
