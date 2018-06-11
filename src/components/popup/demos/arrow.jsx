import { Popup } from 'nami'

class Demo extends Component {
    state = { at: 'bottom' }

    popupTarget = React.createRef()

    render() {
        const { at } = this.state
        const { popupTarget, handleAtChange } = this

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
                </div>

                <Popup className="demo-popup-panel" of={popupTarget} at={at} show arrow>
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
}

render(<Demo />)
