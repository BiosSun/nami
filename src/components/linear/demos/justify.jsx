import { Linear } from 'nami'

render(
    <div>
        <strong>start - 起始位置对齐</strong>

        <Linear justify="start">
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

        <strong>end - 结束位置对齐</strong>

        <Linear justify="end">
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

        <strong>center - 居中对齐</strong>

        <Linear justify="center">
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

        <strong>between - 两端对齐</strong>

        <Linear justify="between">
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

        <strong>around - 分散对齐</strong>

        <Linear justify="around">
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
