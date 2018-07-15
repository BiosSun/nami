import { Select } from 'nami'

const options = (
    <React.Fragment>
        <Select.Option value="js">JavaScript</Select.Option>
        <Select.Option value="ts">TypeScript</Select.Option>
        <Select.Option value="cs">CoffeeScript</Select.Option>
        <Select.Option value="ls">LiveScript</Select.Option>
        <Select.Option value="as">ActionScript</Select.Option>
    </React.Fragment>
)

render(
    <div>
        <Select state="success">{options}</Select>
        <Select state="warning">{options}</Select>
        <Select state="danger">{options}</Select>
    </div>
)
