const gulp = require('gulp')
const del = require('del')
const webpack = require('webpack-stream')
const ghpages = require('gh-pages')
const shell = require('shelljs')
const appRoot = require('app-root-path').toString()

/**
 * Nami 使用 gulp 及 webpack 进行发布构建
 */

var paths = {
    nami: {
        entry: 'src/index.ts',
        ts: 'src/**/*@(.ts|.tsx)',
    },
    site: {
        entry: 'site/index.tsx',
    },
}

gulp.task('clean', function() {
    return del(['_site', 'dist', 'es'])
})

gulp.task('nami:dist', function() {
    return gulp
        .src(paths.nami.entry)
        .pipe(webpack(require('./webpack.config.js')()))
        .pipe(gulp.dest('dist/'))
})

gulp.task('site:docs-parser', function(done) {
    shell.cd(appRoot)

    if (shell.exec('npm run docs-parser').code !== 0) {
        throw new Error('docs-parser failed!')
    }

    done()
})

gulp.task('site:webpack', function() {
    return gulp
        .src(paths.site.entry)
        .pipe(webpack(require('./site/webpack.config.js')({ production: true })))
        .pipe(gulp.dest('_site/'))
})

gulp.task('site:gh-pages', function(done) {
    ghpages.publish('_site', done)
})

gulp.task('nami:build', gulp.series('nami:dist'))
gulp.task('site:build', gulp.series('site:docs-parser', 'site:webpack'))
gulp.task('site:publish', gulp.series('site:build', 'site:gh-pages'))

gulp.task('build', gulp.series('clean', gulp.series('nami:build', 'site:build')))
gulp.task('publish', gulp.series('clean', gulp.series('nami:build', 'site:publish')))
