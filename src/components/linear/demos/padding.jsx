import { Linear } from 'nami'

render(
    <div>
        <strong>small</strong>

        <Linear padding="small">
            <div className="box" />
            <div className="box" />
            <div className="box" />
            <div className="box" />
        </Linear>

        <hr />

        <strong>true</strong>

        <Linear padding>
            <div className="box" />
            <div className="box" />
            <div className="box" />
            <div className="box" />
        </Linear>

        <hr />

        <strong>large</strong>

        <Linear padding="large">
            <div className="box" />
            <div className="box" />
            <div className="box" />
            <div className="box" />
        </Linear>
    </div>
)
