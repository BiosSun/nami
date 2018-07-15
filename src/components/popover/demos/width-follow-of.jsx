import { Popover, Linear, Button, Radio } from 'nami'

class Demo extends Component {
    state = {
        prop: 'widthFollowOf',
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
        const isMinWidth = this.state.prop === 'minWidthFollowOf'

        return (
            <Popover
                of={<Button type="primary">Toggle Popover</Button>}
                widthFollowOf={!isMinWidth}
                minWidthFollowOf={isMinWidth}
            >
                <div className="mv-s mh-l">Popover content.</div>
            </Popover>
        )
    }

    renderController() {
        const { prop } = this.state
        const radios = ['widthFollowOf', 'minWidthFollowOf'].map(val => (
            <Linear.Item key={val}>
                <Radio
                    name="popover:width-follow-of"
                    label={val}
                    value={val}
                    checked={prop === val}
                    onChange={e => this.setState({ prop: val })}
                />
            </Linear.Item>
        ))

        return (
            <Linear className="demo-popover__controller" spacing>
                {radios}
            </Linear>
        )
    }
}

render(<Demo />)
