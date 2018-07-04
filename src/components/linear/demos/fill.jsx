import { Linear } from 'nami'

render(
    <div>
        <Linear>
            <Linear.Item fill>
                <div className="box" />
            </Linear.Item>
            <Linear.Item>
                <div className="box" />
            </Linear.Item>
        </Linear>
        <Linear>
            <Linear.Item fill>
                <div className="box" />
            </Linear.Item>
            <Linear.Item fill>
                <div className="box" />
            </Linear.Item>
            <Linear.Item>
                <div className="box" />
            </Linear.Item>
        </Linear>
    </div>
)
