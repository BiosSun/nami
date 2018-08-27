import { Radio, TextBox } from 'nami'

class App extends React.Component {
    state = {
        value: 'js',
    }

    render() {
        const { value } = this.state

        return (
            <div>
                <Radio.Group name="group" value={value} onChange={this.onChange}>
                    <Radio value="js" label="JavaScript" />
                    <Radio value="ts" label="TypeScript" />
                    <Radio value="cs" label="CoffeeScript" />
                    <Radio value="as" label="ActionScript" />
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
