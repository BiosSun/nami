import { Linear } from 'nami'

render(
    <div>
        <strong>stretch - 填充（默认）</strong>

        <Linear align="stretch">
            <div className="box box-h-small" />
            <div className="box box-h-large" />
            <div className="box box-h-middle" />
        </Linear>

        <hr />
        <strong>start - 顶端对齐</strong>

        <Linear align="start">
            <div className="box box-h-small" />
            <div className="box box-h-large" />
            <div className="box box-h-middle" />
        </Linear>

        <hr />

        <strong>end - 底端对齐</strong>

        <Linear align="end">
            <div className="box box-h-small" />
            <div className="box box-h-large" />
            <div className="box box-h-middle" />
        </Linear>

        <hr />

        <strong>center - 中部对齐</strong>

        <Linear align="center">
            <div className="box box-h-small" />
            <div className="box box-h-large" />
            <div className="box box-h-middle" />
        </Linear>
    </div>
)
