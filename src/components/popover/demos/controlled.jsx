import { Popover, Linear, Button } from 'nami'

class Demo extends Component {
    state = {
        open: false,
    }

    render() {
        return (
            <React.Fragment>
                {this.renderController()}
                {this.renderPopover()}
            </React.Fragment>
        )
    }

    renderPopover() {
        const { open } = this.state

        return (
            <Popover
                of={
                    <Button type="primary" onClick={() => this.setState({ open: !open })}>
                        {open ? 'Close' : 'Open'} Popover
                    </Button>
                }
                open={open}
                onClose={() => this.setState({ open: false })}
            >
                <div className="mv-s mh-l">Popover content.</div>
            </Popover>
        )
    }

    renderController() {
        const { open } = this.state

        return (
            <Linear className="demo-popover__controller" spacing align="center">
                <Linear.Item>
                    <Button type="primary" onClick={() => this.setState({ open: true })}>
                        Open Popover
                    </Button>
                </Linear.Item>
                <Linear.Item>{open ? ' opened' : ' closed'}</Linear.Item>
            </Linear>
        )
    }
}

render(<Demo />)
