import { Popover, HLinear, Select, Button } from 'nami'

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
                <HLinear>
                    <Select
                        $col={8}
                        value={this.state.at}
                        onChange={e => this.setState({ at: e.detail.value })}
                    >
                        <Select.Option value="auto-start">auto-start</Select.Option>
                        <Select.Option value="auto">auto</Select.Option>
                        <Select.Option value="auto-end">auto-end</Select.Option>
                        <Select.Option value="top-start">top-start</Select.Option>
                        <Select.Option value="top">top</Select.Option>
                        <Select.Option value="top-end">top-end</Select.Option>
                        <Select.Option value="right-start">right-start</Select.Option>
                        <Select.Option value="right">right</Select.Option>
                        <Select.Option value="right-end">right-end</Select.Option>
                        <Select.Option value="bottom-start">bottom-start</Select.Option>
                        <Select.Option value="bottom">bottom</Select.Option>
                        <Select.Option value="bottom-end">bottom-end</Select.Option>
                        <Select.Option value="left-start">left-start</Select.Option>
                        <Select.Option value="left">left</Select.Option>
                        <Select.Option value="left-end">left-end</Select.Option>
                    </Select>
                </HLinear>
            </div>
        )
    }
}

render(<Demo />)
