import { Grid } from 'nami'

render(
    <div>
        <strong>start - 顶端对齐</strong>

        <Grid align="start">
            <Grid.Col>
                <div className="box-h-small">&nbsp;</div>
            </Grid.Col>
            <Grid.Col>
                <div className="box-h-large">&nbsp;</div>
            </Grid.Col>
            <Grid.Col>
                <div className="box-h-middle">&nbsp;</div>
            </Grid.Col>
        </Grid>

        <hr />

        <strong>end - 底端对齐</strong>

        <Grid align="end">
            <Grid.Col>
                <div className="box-h-small">&nbsp;</div>
            </Grid.Col>
            <Grid.Col>
                <div className="box-h-large">&nbsp;</div>
            </Grid.Col>
            <Grid.Col>
                <div className="box-h-middle">&nbsp;</div>
            </Grid.Col>
        </Grid>

        <hr />

        <strong>center - 中部对齐</strong>

        <Grid align="center">
            <Grid.Col>
                <div className="box-h-small">&nbsp;</div>
            </Grid.Col>
            <Grid.Col>
                <div className="box-h-large">&nbsp;</div>
            </Grid.Col>
            <Grid.Col>
                <div className="box-h-middle">&nbsp;</div>
            </Grid.Col>
        </Grid>

        <hr />

        <strong>baseline - 列内第一行文本的基线对齐</strong>

        <Grid align="baseline">
            <Grid.Col>
                <div className="box-h-small">text</div>
            </Grid.Col>
            <Grid.Col>
                <div className="box-h-large">text</div>
            </Grid.Col>
            <Grid.Col>
                <div className="box-h-middle">text</div>
            </Grid.Col>
        </Grid>

        <hr />

        <strong>stretch - 两端对齐</strong>

        <Grid align="stretch">
            <Grid.Col>
                <div className="box-h-small">&nbsp;</div>
            </Grid.Col>
            <Grid.Col>
                <div className="box-h-large">&nbsp;</div>
            </Grid.Col>
            <Grid.Col>
                <div className="box-h-middle">&nbsp;</div>
            </Grid.Col>
        </Grid>
    </div>
)
