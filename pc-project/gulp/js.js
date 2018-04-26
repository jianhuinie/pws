/**
 * @file 压缩 js
 * @author musicode
 */

var path = require('path');

var gulp = require('gulp');

var config = require('./config');
var tool = require('./tool');

gulp.task('js', function () {

    var stream = gulp.src(
        config.jsFiles
    )
    .pipe(
        config.filter()
    );

    if (config.release) {
        stream = stream.pipe(
            tool.minifyJs()
        );
    }

    return stream.pipe(
        gulp.dest(config.dest)
    );

});
