import { Radio, TextBox } from 'nami'

class App extends React.Component {
    state = {
        value: '1',
    }

    render() {
        const { value } = this.state

        return (
            <div>
                <Radio.Group name="group" value={value} onChange={this.onChange}>
                    <Radio value="1" label="Radio 1" />
                    <Radio value="2" label="Radio 2" />
                    <Radio value="3" label="Radio 3" />
                    <Radio value="4" label="Radio 4" />
                </Radio.Group>

                <br />

                <TextBox type="text" value={value} onChange={this.onChange} />
            </div>
        )
    }

    onChange = this.onChange.bind(this)
    onChange(event, value) {
        this.setState({ value })
    }
}

render(<App />)
