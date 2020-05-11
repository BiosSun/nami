import { ColorChannelsTextBox, VLinear } from 'nami'

function Demo() {
    const [value, setValue] = React.useState('hsv(0, 100%, 100%)')

    return (
        <VLinear spacing>
            <ColorChannelsTextBox value={value} onChange={setValue} />
            <span>{value}</span>
        </VLinear>
    )
}

render(<Demo />)
