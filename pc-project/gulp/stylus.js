/**
 * @file 编译 stylus
 * @author musicode
 */

var gulp = require('gulp');

var config = require('./config');
var tool = require('./tool');

gulp.task('stylus', function () {

    var stream = gulp.src(
        config.stylusFiles
    )
    .pipe(
        config.filter()
    )
    .pipe(
        tool.compileStylus()
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