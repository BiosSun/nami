import { Linear } from 'nami'

render(
    <div>
        <strong>small</strong>

        <Linear spacing="small">
            <div className="box" />
            <div className="box" />
            <div className="box" />
            <div className="box" />
        </Linear>

        <hr />

        <strong>true</strong>

        <Linear spacing>
            <div className="box" />
            <div className="box" />
            <div className="box" />
            <div className="box" />
        </Linear>

        <hr />

        <strong>large</strong>

        <Linear spacing="large">
            <div className="box" />
            <div className="box" />
            <div className="box" />
            <div className="box" />
        </Linear>
    </div>
)
