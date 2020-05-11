import { ColorScreen, HLinear } from 'nami'

render(
    <HLinear align="center" spacing>
        <ColorScreen value="hsva(0, 100%, 100%, 1)" size="large" />
        <ColorScreen value="hsva(120, 100%, 100%, 0.6)" />
        <ColorScreen value="hsva(240, 100%, 100%, 0.2)" size="small" />
    </HLinear>
)
