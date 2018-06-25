import { Popover, Button } from 'nami'

render(
    <Popover of={<Button type="primary">Toggle Popover</Button>}>
        <div className="mv-s mh-l">Popover content.</div>
    </Popover>
)
