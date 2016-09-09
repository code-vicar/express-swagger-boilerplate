var fs = require('fs')
var path = require('path')
var del = require('del')
var gulp = require('gulp')
var babel = require('gulp-babel')
var gulpFilter = require('gulp-filter')
var sourcemaps = require('gulp-sourcemaps')

var moduleInfo = require('./package.json')

gulp.task('clean', function () {
    return del('dist')
})

gulp.task('transpile', ['clean'], function () {
    var jsFilter = gulpFilter(['**/*.js'], { restore: true })
    return gulp.src(['src/**/*'], { base: './src' })
        .pipe(jsFilter)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write())
        .pipe(jsFilter.restore)
        .pipe(gulp.dest('dist'))
})

gulp.task('version', ['transpile'], function (cb) {
    try {
        var versionFile = path.resolve(__dirname, 'dist', 'app', 'version.json')
        fs.writeFileSync(versionFile, JSON.stringify({
            version: moduleInfo.version,
            timestamp: (new Date()).toISOString()
        }), 'utf-8')
    } catch (err) {
        return cb(err)
    }

    return cb()
})

gulp.task('default', ['clean', 'transpile', 'version'])
