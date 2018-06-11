import { Grid } from 'nami'

render(
    <div>
        <Grid>
            <Grid.Col span={11}>11</Grid.Col>
            <Grid.Col span={13}>13</Grid.Col>
        </Grid>

        <Grid>
            <Grid.Col span={7}>7</Grid.Col>
            <Grid.Col span={8}>8</Grid.Col>
            <Grid.Col span={9}>9</Grid.Col>
        </Grid>

        <Grid>
            <Grid.Col span={2}>2</Grid.Col>
            <Grid.Col span={4}>4</Grid.Col>
            <Grid.Col span={4}>4</Grid.Col>
            <Grid.Col span={6}>6</Grid.Col>
            <Grid.Col span={8}>8</Grid.Col>
        </Grid>
    </div>
)
