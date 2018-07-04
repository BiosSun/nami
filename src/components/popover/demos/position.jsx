import { Popover, Grid, Button, TextBox } from 'nami'

class Demo extends Component {
    state = {
        at: 'bottom',
        offset: 0,
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
            <Popover
                of={<Button type="primary">Toggle Popover</Button>}
                at={this.state.at}
                offset={this.state.offset}
            >
                <div className="mv-s mh-l">Popover content.</div>
            </Popover>
        )
    }

    renderController() {
        return (
            <div className="demo-popover__controller">
                <Grid spacing>
                    <Grid.Col span={4}>
                        <select
                            value={this.state.at}
                            onChange={e => this.setState({ at: e.target.value })}
                        >
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
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <TextBox
                            value={this.state.offset.toString()}
                            onChange={e => this.setState({ offset: e.target.value })}
                            placeholder="offset"
                        />
                    </Grid.Col>
                </Grid>
            </div>
        )
    }
}

render(<Demo />)
