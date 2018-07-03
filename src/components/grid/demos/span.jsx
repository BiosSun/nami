import { Grid } from 'nami'

render(
    <div>
        <Grid>
            <Grid.Col span={11}>
                <div className="box">11</div>
            </Grid.Col>
            <Grid.Col span={13}>
                <div className="box">13</div>
            </Grid.Col>
        </Grid>

        <Grid>
            <Grid.Col span={7}>
                <div className="box">7</div>
            </Grid.Col>
            <Grid.Col span={8}>
                <div className="box">8</div>
            </Grid.Col>
            <Grid.Col span={9}>
                <div className="box">9</div>
            </Grid.Col>
        </Grid>

        <Grid>
            <Grid.Col span={2}>
                <div className="box">2</div>
            </Grid.Col>
            <Grid.Col span={4}>
                <div className="box">4</div>
            </Grid.Col>
            <Grid.Col span={4}>
                <div className="box">4</div>
            </Grid.Col>
            <Grid.Col span={6}>
                <div className="box">6</div>
            </Grid.Col>
            <Grid.Col span={8}>
                <div className="box">8</div>
            </Grid.Col>
        </Grid>
    </div>
)
