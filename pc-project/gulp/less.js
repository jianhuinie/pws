/**
 * @file 编译 less
 * @author musicode
 */

var gulp = require('gulp');

var config = require('./config');
var tool = require('./tool');

gulp.task('less', function () {

    var stream = gulp.src(
        config.lessFiles
    )
    .pipe(
        config.filter()
    )
    .pipe(
        tool.compileLess()
    )
    .pipe(
        tool.autoPrefixer()
    );

    if (config.release) {
        stream = stream.pipe(
            tool.minifyCss()
        );
    }

    return stream.pipe(
        gulp.dest(config.dest)
    );

});