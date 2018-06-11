import { Grid } from 'nami'

render(
    <div>
        <Grid gutter>
            <Grid.Col>col</Grid.Col>
            <Grid.Col>col</Grid.Col>
            <Grid.Col>col</Grid.Col>
            <Grid.Col>col</Grid.Col>
        </Grid>

        <hr />

        <Grid gutter="large">
            <Grid.Col>col</Grid.Col>
            <Grid.Col>col</Grid.Col>
            <Grid.Col>col</Grid.Col>
            <Grid.Col>col</Grid.Col>
        </Grid>

        <hr />

        <Grid gutter="small">
            <Grid.Col>col</Grid.Col>
            <Grid.Col>col</Grid.Col>
            <Grid.Col>col</Grid.Col>
            <Grid.Col>col</Grid.Col>
        </Grid>
    </div>
)
