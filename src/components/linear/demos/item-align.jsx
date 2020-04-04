import { Linear } from 'nami'

render(
    <div>
        <strong>stretch - 填充</strong>

        <Linear align="end">
            <div className="box box-h-small" $align="stretch" />
            <div className="box box-h-large" />
            <div className="box box-h-middle" />
        </Linear>

        <hr />
        <strong>start - 顶端对齐</strong>

        <Linear>
            <div className="box box-h-small" $align="start" />
            <div className="box box-h-large" />
            <div className="box box-h-middle" />
        </Linear>

        <hr />

        <strong>end - 底端对齐</strong>

        <Linear>
            <div className="box box-h-small" $align="end" />
            <div className="box box-h-large" />
            <div className="box box-h-middle" />
        </Linear>

        <hr />

        <strong>center - 中部对齐</strong>

        <Linear>
            <div className="box box-h-small" $align="center" />
            <div className="box box-h-large" />
            <div className="box box-h-middle" />
        </Linear>
    </div>
)
