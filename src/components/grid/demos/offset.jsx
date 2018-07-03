import { Grid } from 'nami'

render(
    <div>
        <Grid>
            <Grid.Col span={4} offset={4}>
                <div className="box" />
            </Grid.Col>
            <Grid.Col span={4} offset={8}>
                <div className="box" />
            </Grid.Col>
        </Grid>
        <Grid>
            <Grid.Col span={4}>
                <div className="box" />
            </Grid.Col>
            <Grid.Col span={4} offset={4}>
                <div className="box" />
            </Grid.Col>
            <Grid.Col span={4}>
                <div className="box" />
            </Grid.Col>
            <Grid.Col span={4} offset={4}>
                <div className="box" />
            </Grid.Col>
        </Grid>
    </div>
)
