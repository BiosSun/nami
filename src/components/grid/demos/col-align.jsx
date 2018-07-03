import { Grid } from 'nami'

render(
    <div>
        <strong>start - 顶端对齐</strong>

        <Grid align="end">
            <Grid.Col align="start">
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

        <Grid align="start">
            <Grid.Col align="end">
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

        <Grid align="start">
            <Grid.Col align="center">
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

        <strong>baseline - 列内第一行文本的基线对齐</strong>

        <Grid align="start">
            <Grid.Col align="baseline">
                <div className="box box-h-small">text</div>
            </Grid.Col>
            <Grid.Col>
                <div className="box box-h-large">text</div>
            </Grid.Col>
            <Grid.Col align="baseline">
                <div className="box box-h-middle">text</div>
            </Grid.Col>
        </Grid>

        <hr />

        <strong>stretch - 两端对齐</strong>

        <Grid align="start">
            <Grid.Col align="stretch">
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
