import { Popover, Grid, CheckBox, Button } from 'nami'

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
                <Grid gutter>
                    <Grid.Col>
                        <CheckBox
                            label="disabledCloseOnOfClick"
                            checked={disabledCloseOnOfClick}
                            onChange={e =>
                                this.setState({ disabledCloseOnOfClick: e.target.checked })
                            }
                        />
                    </Grid.Col>
                    <Grid.Col>
                        <CheckBox
                            label="disabledCloseOnOtherClick"
                            checked={disabledCloseOnOtherClick}
                            onChange={e =>
                                this.setState({ disabledCloseOnOtherClick: e.target.checked })
                            }
                        />
                    </Grid.Col>
                    <Grid.Col>
                        <CheckBox
                            label="disabledCloseOnEscape"
                            checked={disabledCloseOnEscape}
                            onChange={e =>
                                this.setState({ disabledCloseOnEscape: e.target.checked })
                            }
                        />
                    </Grid.Col>
                </Grid>
            </div>
        )
    }
}

render(<Demo />)
