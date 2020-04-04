import { Linear } from 'nami'

render(
    <div>
        <strong>start - 起始位置对齐（默认）</strong>

        <Linear justify="start">
            <div className="box" />
            <div className="box" />
            <div className="box" />
        </Linear>

        <hr />

        <strong>end - 结束位置对齐</strong>

        <Linear justify="end">
            <div className="box" />
            <div className="box" />
            <div className="box" />
        </Linear>

        <hr />

        <strong>center - 居中对齐</strong>

        <Linear justify="center">
            <div className="box" />
            <div className="box" />
            <div className="box" />
        </Linear>

        <hr />

        <strong>between - 两端对齐</strong>

        <Linear justify="between">
            <div className="box" />
            <div className="box" />
            <div className="box" />
        </Linear>

        <hr />

        <strong>around - 分散对齐</strong>

        <Linear justify="around">
            <div className="box" />
            <div className="box" />
            <div className="box" />
        </Linear>
    </div>
)
