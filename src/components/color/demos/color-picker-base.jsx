import Color from '@biossun/color'
import {
    ColorPickerBase,
    useColor,
    ColorSaturationAndValueSlider,
    ColorScreen,
    ColorHueSlider,
    VLinear,
    HLinear,
    Divider,
    Space,
} from 'nami'

function CustomColorPicker({ value, defaultValue, onChange, ...otherProps }) {
    return (
        <ColorPickerBase value={value} defaultValue={defaultValue} onChange={onChange}>
            <VLinear spacing="small" {...otherProps}>
                <HLinear align="center" spacing="small">
                    <ColorScreen size="small" />
                    <ColorHueSlider $flex />
                </HLinear>
                <ColorSaturationAndValueSlider />
                <CustomColorComponent />
            </VLinear>
        </ColorPickerBase>
    )
}

function CustomColorComponent({ value, defaultValue }) {
    const model = useColor(value, defaultValue)

    function handleChange(prop, step) {
        const propValue = Color.round[prop]((Color.get(model.value, prop) ?? 1) + step)
        model.onChange(Color.set(model.value, prop, propValue))
    }
    return (
        <HLinear justify="between">
            <button onClick={() => handleChange('alpha', -0.1)}>- 0.1</button>
            Alpha
            <button onClick={() => handleChange('alpha', +0.1)}>+ 0.1</button>
        </HLinear>
    )
}

function Demo() {
    const [value, setValue] = React.useState('hsva(0, 100%, 100%, 1)')

    return (
        <VLinear spacing>
            <CustomColorPicker value={value} onChange={setValue} />
            <span>{value}</span>
        </VLinear>
    )
}

render(<Demo />)
