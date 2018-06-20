import { Button, Popup } from 'nami'

class Demo extends Component {
    state = { show: false }
    popupTarget = React.createRef()

    render() {
        const { show } = this.state
        const { popupTarget, handleButtonClick } = this

        return (
            <React.Fragment>
                <Button type="primary" ref={popupTarget} onClick={handleButtonClick}>
                    {show ? 'Hide' : 'Show'} Popup
                </Button>

                <Popup of={popupTarget} className="demo-popup-panel" show={show}>
                    Popup content.
                </Popup>
            </React.Fragment>
        )
    }

    handleButtonClick = e => {
        this.setState({
            show: !this.state.show,
        })
    }
}

render(<Demo />)
