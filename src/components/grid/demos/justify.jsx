import { Grid } from 'nami'

render(
    <div>
        <strong>start - 左对齐</strong>

        <Grid justify="start">
            <Grid.Col span={4}>
                <div className="box" />
            </Grid.Col>
            <Grid.Col span={4}>
                <div className="box" />
            </Grid.Col>
            <Grid.Col span={4}>
                <div className="box" />
            </Grid.Col>
        </Grid>

        <hr />

        <strong>end - 右对齐</strong>

        <Grid justify="end">
            <Grid.Col span={4}>
                <div className="box" />
            </Grid.Col>
            <Grid.Col span={4}>
                <div className="box" />
            </Grid.Col>
            <Grid.Col span={4}>
                <div className="box" />
            </Grid.Col>
        </Grid>

        <hr />

        <strong>center - 居中对齐</strong>

        <Grid justify="center">
            <Grid.Col span={4}>
                <div className="box" />
            </Grid.Col>
            <Grid.Col span={4}>
                <div className="box" />
            </Grid.Col>
            <Grid.Col span={4}>
                <div className="box" />
            </Grid.Col>
        </Grid>

        <hr />

        <strong>between - 两端对齐</strong>

        <Grid justify="between">
            <Grid.Col span={4}>
                <div className="box" />
            </Grid.Col>
            <Grid.Col span={4}>
                <div className="box" />
            </Grid.Col>
            <Grid.Col span={4}>
                <div className="box" />
            </Grid.Col>
        </Grid>

        <hr />

        <strong>around - 分散对齐</strong>

        <Grid justify="around">
            <Grid.Col span={4}>
                <div className="box" />
            </Grid.Col>
            <Grid.Col span={4}>
                <div className="box" />
            </Grid.Col>
            <Grid.Col span={4}>
                <div className="box" />
            </Grid.Col>
        </Grid>
    </div>
)
