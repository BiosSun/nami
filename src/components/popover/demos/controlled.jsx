import { Popover, HLinear, Button } from 'nami'

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
            <HLinear className="demo-popover__controller" spacing align="center">
                <Button
                    type="primary"
                    onClick={() => this.setState({ open: true })}
                    disabled={open}
                >
                    Open Popover
                </Button>
                <div>{open ? ' opened' : ' closed'}</div>
            </HLinear>
        )
    }
}

render(<Demo />)
