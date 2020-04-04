import { HLinear, VLinear, HrLinear, VrLinear } from 'nami'

render(
    <div>
        <strong>HLinear - 水平布局</strong>

        <HLinear>
            <div className="box">1</div>
            <div className="box">2</div>
            <div className="box">3</div>
        </HLinear>

        <hr />

        <strong>HrLinear - 水平反向布局</strong>

        <HrLinear>
            <div className="box">1</div>
            <div className="box">2</div>
            <div className="box">3</div>
        </HrLinear>

        <hr />

        <strong>VLinear</strong>

        <VLinear>
            <div className="box">1</div>
            <div className="box">2</div>
            <div className="box">3</div>
        </VLinear>

        <hr />

        <strong>VrLinear - 垂直反向布局</strong>

        <VrLinear>
            <div className="box">1</div>
            <div className="box">2</div>
            <div className="box">3</div>
        </VrLinear>
    </div>
)
