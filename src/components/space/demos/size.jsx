import { HLinear, Space } from 'nami'

render(
    <div>
        <strong>small</strong>

        <HLinear>
            <div>Item</div>
            <Space size="small" />
            <div>Item</div>
            <Space size="small" />
            <div>Item</div>
        </HLinear>

        <hr />

        <strong>default</strong>

        <HLinear>
            <div>Item</div>
            <Space />
            <div>Item</div>
            <Space />
            <div>Item</div>
        </HLinear>

        <hr />

        <strong>large</strong>

        <HLinear>
            <div>Item</div>
            <Space size="large" />
            <div>Item</div>
            <Space size="large" />
            <div>Item</div>
        </HLinear>
    </div>
)
