import { Linear } from 'nami'

render(
    <div>
        <Linear direction="vertical" spacing>
            <Linear.Item>
                <div className="box" />
            </Linear.Item>
            <Linear.Item>
                <div className="box" />
            </Linear.Item>
            <Linear.Item>
                <div className="box" />
            </Linear.Item>
            <Linear.Item>
                <div className="box" />
            </Linear.Item>
        </Linear>

        <Linear direction="vertical" spacing="large">
            <Linear.Item>
                <div className="box" />
            </Linear.Item>
            <Linear.Item>
                <div className="box" />
            </Linear.Item>
            <Linear.Item>
                <div className="box" />
            </Linear.Item>
            <Linear.Item>
                <div className="box" />
            </Linear.Item>
        </Linear>

        <Linear direction="vertical" spacing="small">
            <Linear.Item>
                <div className="box" />
            </Linear.Item>
            <Linear.Item>
                <div className="box" />
            </Linear.Item>
            <Linear.Item>
                <div className="box" />
            </Linear.Item>
            <Linear.Item>
                <div className="box" />
            </Linear.Item>
        </Linear>
    </div>
)
