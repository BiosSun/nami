import { Linear } from 'nami'

render(
    <div>
        <Linear>
            <div className="box" $col={1}>
                1
            </div>
            <div className="box" $col={2}>
                2
            </div>
            <div className="box" $col={3}>
                3
            </div>
            <div className="box" $col={6}>
                6
            </div>
            <div className="box" $col={12}>
                12
            </div>
        </Linear>
    </div>
)
