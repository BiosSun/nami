import { Linear } from 'nami'

render(
    <div>
        <strong>horizontal - 水平布局（默认）</strong>

        <Linear direction="horizontal">
            <div className="box">1</div>
            <div className="box">2</div>
            <div className="box">3</div>
        </Linear>

        <hr />

        <strong>horizontal-reverse - 水平反向布局</strong>

        <Linear direction="horizontal-reverse">
            <div className="box">1</div>
            <div className="box">2</div>
            <div className="box">3</div>
        </Linear>

        <hr />

        <strong>vertical - 垂直布局</strong>

        <Linear direction="vertical">
            <div className="box">1</div>
            <div className="box">2</div>
            <div className="box">3</div>
        </Linear>

        <hr />

        <strong>vertical-reverse - 垂直反向布局</strong>

        <Linear direction="vertical-reverse">
            <div className="box">1</div>
            <div className="box">2</div>
            <div className="box">3</div>
        </Linear>
    </div>
)
