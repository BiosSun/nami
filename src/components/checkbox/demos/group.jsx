import { CheckBox, TextBox } from 'nami'

class App extends React.Component {
    state = {
        value: 'ts, as',
    }

    render() {
        const { value } = this.state

        return (
            <div>
                <CheckBox.Group
                    name="group"
                    value={value.split(',').map(v => v.trim())}
                    onChange={this.onChange}
                >
                    <CheckBox value="js" label="JavaScript" />
                    <CheckBox value="ts" label="TypeScript" />
                    <CheckBox value="cs" label="CoffeeScript" />
                    <CheckBox value="as" label="ActionScript" />
                </CheckBox.Group>

                <br />

                <TextBox type="text" value={value} onChange={this.onChange} />
            </div>
        )
    }

    onChange = (e, value) => {
        if (Array.isArray(value)) {
            value = value.join(', ')
        }

        this.setState({ value })
    }
}

render(<App />)
