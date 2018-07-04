import { Grid } from 'nami'

render(
    <div>
        <Grid spacing>
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

        <Grid spacing="large">
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

        <Grid spacing="small">
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
