import { Linear } from 'nami'

render(
    <div>
        <strong>start - 顶端对齐</strong>

        <Linear align="start">
            <Linear.Item>
                <div className="box box-h-small" />
            </Linear.Item>
            <Linear.Item>
                <div className="box box-h-large" />
            </Linear.Item>
            <Linear.Item>
                <div className="box box-h-middle" />
            </Linear.Item>
        </Linear>

        <hr />

        <strong>end - 底端对齐</strong>

        <Linear align="end">
            <Linear.Item>
                <div className="box box-h-small" />
            </Linear.Item>
            <Linear.Item>
                <div className="box box-h-large" />
            </Linear.Item>
            <Linear.Item>
                <div className="box box-h-middle" />
            </Linear.Item>
        </Linear>

        <hr />

        <strong>center - 中部对齐</strong>

        <Linear align="center">
            <Linear.Item>
                <div className="box box-h-small" />
            </Linear.Item>
            <Linear.Item>
                <div className="box box-h-large" />
            </Linear.Item>
            <Linear.Item>
                <div className="box box-h-middle" />
            </Linear.Item>
        </Linear>
    </div>
)
