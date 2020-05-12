import { ColorAlphaTextBox, VLinear } from 'nami'

function Demo() {
    const [value, setValue] = React.useState('hsv(0, 100%, 100%)')

    return (
        <VLinear spacing>
            <ColorAlphaTextBox value={value} onChange={setValue} />
            <span>{value}</span>
        </VLinear>
    )
}

render(<Demo />)
