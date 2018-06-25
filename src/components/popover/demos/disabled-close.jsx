import { Popover, Button } from 'nami'

class Demo extends Component {
    state = {
        disabledCloseOnOfClick: false,
        disabledCloseOnOtherClick: false,
        disabledCloseOnEscape: false,
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
        const {
            disabledCloseOnOfClick,
            disabledCloseOnOtherClick,
            disabledCloseOnEscape,
        } = this.state

        return (
            <Popover
                of={<Button type="primary">Toggle Popover</Button>}
                disabledCloseOnOfClick={disabledCloseOnOfClick}
                disabledCloseOnOtherClick={disabledCloseOnOtherClick}
                disabledCloseOnEscape={disabledCloseOnEscape}
            >
                <div className="mv-s mh-l">Popover content.</div>
            </Popover>
        )
    }

    renderController() {
        const {
            disabledCloseOnOfClick,
            disabledCloseOnOtherClick,
            disabledCloseOnEscape,
        } = this.state

        return (
            <div className="demo-popover__controller">
                <label>
                    <input
                        type="checkbox"
                        checked={disabledCloseOnOfClick}
                        onChange={e => this.setState({ disabledCloseOnOfClick: e.target.checked })}
                    />
                    disabledCloseOnOfClick
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={disabledCloseOnOtherClick}
                        onChange={e =>
                            this.setState({ disabledCloseOnOtherClick: e.target.checked })
                        }
                    />
                    disabledCloseOnOtherClick
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={disabledCloseOnEscape}
                        onChange={e => this.setState({ disabledCloseOnEscape: e.target.checked })}
                    />
                    disabledCloseOnEscape
                </label>
            </div>
        )
    }
}

render(<Demo />)
