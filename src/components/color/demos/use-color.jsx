import Color from '@biossun/color'
import { useColor, VLinear, HLinear, Divider } from 'nami'

function CustomColorComponent({ value, defaultValue, onChange, ...otherProps }) {
    const model = useColor(value, defaultValue, onChange)

    function handleChange(prop, step) {
        const propValue = Color.round[prop](Color.get(model.value, prop) + step)
        model.onChange(Color.set(model.value, prop, propValue))
    }

    return (
        <VLinear {...otherProps} spacing="small">
            <span>rgb: {Color.format(Color.normalize(Color.convert(model.value, 'rgb')))}</span>
            <span>hsl: {Color.format(Color.normalize(Color.convert(model.value, 'hsl')))}</span>
            <span>hsv: {Color.format(Color.normalize(Color.convert(model.value, 'hsv')))}</span>
            <Divider />
            <HLinear justify="between">
                <button onClick={() => handleChange('red', -10)}>- 10</button>
                Red
                <button onClick={() => handleChange('red', +10)}>+ 10</button>
            </HLinear>
            <HLinear justify="between">
                <button onClick={() => handleChange('green', -10)}>- 10</button>
                Green
                <button onClick={() => handleChange('green', +10)}>+ 10</button>
            </HLinear>
            <HLinear justify="between">
                <button onClick={() => handleChange('blue', -10)}>- 10</button>
                Blue
                <button onClick={() => handleChange('blue', +10)}>+ 10</button>
            </HLinear>
        </VLinear>
    )
}

function Demo() {
    const [value, setValue] = React.useState('rgb(255, 255, 255)')

    return (
        <VLinear spacing>
            <CustomColorComponent value={value} onChange={setValue} />
            <span>{value}</span>
        </VLinear>
    )
}

render(<Demo />)
