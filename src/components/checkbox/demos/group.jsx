import _ from 'lodash'
import { CheckBox, TextBox } from 'nami'

function App() {
    const [value, setValue] = useState('ts, as')

    const checkedItemValues = useMemo(() => {
        return _.chain(value)
            .split(',')
            .map(_.trim)
            .compact()
            .value()
    }, [value])

    return (
        <div>
            <CheckBox.Group
                name="group"
                value={checkedItemValues}
                onChange={(_event, value) => setValue(value.join(', '))}
            >
                <CheckBox value="js" label="JavaScript(js)" />
                <CheckBox value="ts" label="TypeScript(ts)" />
                <CheckBox value="cs" label="CoffeeScript(cs)" />
                <CheckBox value="as" label="ActionScript(as)" />
            </CheckBox.Group>

            <br />

            <TextBox type="text" value={value} onChange={(_event, value) => setValue(value)} />
        </div>
    )
}

render(<App />)
