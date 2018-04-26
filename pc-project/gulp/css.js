/**
 * @file 处理 css
 * @author musicode
 */

var path = require('path');

var gulp = require('gulp');
var config = require('./config');
var tool = require('./tool');


gulp.task('css', function () {

    var stream = gulp.src(
        config.cssFiles
    )
    .pipe(
        config.filter()
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