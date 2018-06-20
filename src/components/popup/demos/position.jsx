import { Popup } from 'nami'

class Demo extends Component {
    state = {
        at: 'bottom',
        offset: undefined,
    }

    popupTarget = React.createRef()

    render() {
        const { at, offset } = this.state
        const { popupTarget, handleAtChange, handleOffsetChange } = this

        return (
            <React.Fragment>
                <div className="demo-popup__console" ref={popupTarget}>
                    <select value={at} onChange={handleAtChange}>
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

                    <input
                        value={offset || ''}
                        onChange={handleOffsetChange}
                        placeholder="offset"
                    />
                </div>

                <Popup className="demo-popup-panel" of={popupTarget} at={at} offset={offset} show>
                    Popup content.
                </Popup>
            </React.Fragment>
        )
    }

    handleAtChange = e => {
        this.setState({
            at: e.target.value,
        })
    }

    handleOffsetChange = e => {
        this.setState({
            offset: e.target.value,
        })
    }
}

render(<Demo />)
