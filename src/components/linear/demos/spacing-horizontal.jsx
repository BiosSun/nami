import { Linear } from 'nami'

render(
    <div>
        <Linear spacing>
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
        <hr />
        <Linear spacing="large">
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
        <hr />
        <Linear spacing="small">
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
