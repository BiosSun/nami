import { Popover, Button } from 'nami'

class Demo extends Component {
    state = {
        at: 'bottom',
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
        return (
            <Popover of={<Button type="primary">Toggle Popover</Button>} at={this.state.at} arrow>
                <div className="mv-s mh-l">Popover content.</div>
            </Popover>
        )
    }

    renderController() {
        return (
            <div className="demo-popover__controller">
                <select value={this.state.at} onChange={e => this.setState({ at: e.target.value })}>
                    <option>auto-start</option>
                    <option>auto</option>
                    <option>auto-end</option>
                    <option>top-start</option>
                    <option>top</option>
                    <option>top-end</option>
                    <option>right-start</option>
                    <option>right</option>
                    <option>right-end</option>
                    <option>bottom-start</option>
                    <option>bottom</option>
                    <option>bottom-end</option>
                    <option>left-start</option>
                    <option>left</option>
                    <option>left-end</option>
                </select>
            </div>
        )
    }
}

render(<Demo />)
