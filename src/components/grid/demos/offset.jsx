import { Grid } from 'nami'

render(
    <div>
        <Grid>
            <Grid.Col span={4} offset={4} />
            <Grid.Col span={4} offset={8} />
        </Grid>
        <Grid>
            <Grid.Col span={4} />
            <Grid.Col span={4} offset={4} />
            <Grid.Col span={4} />
            <Grid.Col span={4} offset={4} />
        </Grid>
    </div>
)
