import { Select } from 'nami'

render(
    <Select>
        <Select.Option disabled value="js">
            JavaScript
        </Select.Option>
        <Select.Option disabled value="ts">
            TypeScript
        </Select.Option>
        <Select.Option value="cs">CoffeeScript</Select.Option>
        <Select.Option value="ls">LiveScript</Select.Option>
        <Select.Option value="as">ActionScript</Select.Option>
    </Select>
)
