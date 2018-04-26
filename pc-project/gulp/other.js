/**
 * @file 一些只需要拷贝的静态资源
 * @author musicode
 */

var gulp = require('gulp');

var config = require('./config');

gulp.task('other', function () {

    return gulp.src(
        config.otherFiles
    )
    .pipe(
        config.filter()
    )
    .pipe(
        gulp.dest(config.dest)
    );

});