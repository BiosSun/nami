import { Popover, Button } from 'nami'

render(
    <Popover of={open => <Button type="primary">{open ? 'Close' : 'Open'} Popover</Button>}>
        <div className="mv-s mh-l">Popover content.</div>
    </Popover>
)
