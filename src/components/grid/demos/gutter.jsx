import { Grid } from 'nami'

render(
    <div>
        <Grid gutter>
            <Grid.Col>
                <div className="box" />
            </Grid.Col>
            <Grid.Col>
                <div className="box" />
            </Grid.Col>
            <Grid.Col>
                <div className="box" />
            </Grid.Col>
            <Grid.Col>
                <div className="box" />
            </Grid.Col>
        </Grid>

        <hr />

        <Grid gutter="large">
            <Grid.Col>
                <div className="box" />
            </Grid.Col>
            <Grid.Col>
                <div className="box" />
            </Grid.Col>
            <Grid.Col>
                <div className="box" />
            </Grid.Col>
            <Grid.Col>
                <div className="box" />
            </Grid.Col>
        </Grid>

        <hr />

        <Grid gutter="small">
            <Grid.Col>
                <div className="box" />
            </Grid.Col>
            <Grid.Col>
                <div className="box" />
            </Grid.Col>
            <Grid.Col>
                <div className="box" />
            </Grid.Col>
            <Grid.Col>
                <div className="box" />
            </Grid.Col>
        </Grid>
    </div>
)
