import { Grid } from 'nami'

render(
    <div>
        <strong>start - 顶端对齐</strong>

        <Grid align="start">
            <Grid.Col>
                <div className="box box-h-small" />
            </Grid.Col>
            <Grid.Col>
                <div className="box box-h-large" />
            </Grid.Col>
            <Grid.Col>
                <div className="box box-h-middle" />
            </Grid.Col>
        </Grid>

        <hr />

        <strong>center - 中部对齐</strong>

        <Grid align="center">
            <Grid.Col>
                <div className="box box-h-small" />
            </Grid.Col>
            <Grid.Col>
                <div className="box box-h-large" />
            </Grid.Col>
            <Grid.Col>
                <div className="box box-h-middle" />
            </Grid.Col>
        </Grid>

        <hr />

        <strong>end - 底端对齐</strong>

        <Grid align="end">
            <Grid.Col>
                <div className="box box-h-small" />
            </Grid.Col>
            <Grid.Col>
                <div className="box box-h-large" />
            </Grid.Col>
            <Grid.Col>
                <div className="box box-h-middle" />
            </Grid.Col>
        </Grid>
    </div>
)
