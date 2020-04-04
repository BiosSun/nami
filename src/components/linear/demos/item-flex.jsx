import { Linear } from 'nami'

render(
    <div>
        <Linear>
            <div className="box" $flex />
            <div className="box" />
            <div className="box" />
        </Linear>

        <Linear>
            <div className="box" $flex />
            <div className="box" />
            <div className="box" $flex />
        </Linear>
    </div>
)
