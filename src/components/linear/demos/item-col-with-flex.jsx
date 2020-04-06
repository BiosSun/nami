import { Linear } from 'nami'

render(
    <div>
        <Linear>
            <div className="box"></div>
            <div className="box" $col={12} $flex>
                12
            </div>
            <div className="box"></div>
            <div className="box" $col={12} $flex>
                12
            </div>
            <div className="box"></div>
        </Linear>
    </div>
)
