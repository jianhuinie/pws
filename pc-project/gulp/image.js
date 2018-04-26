/**
 * @file 压缩图片
 * @author musicode
 */

var path = require('path');

var gulp = require('gulp');

var config = require('./config');
var tool = require('./tool');

gulp.task('image', function () {

    var stream = gulp.src(
        config.imageFiles
    )
    .pipe(
        config.filter()
    );

    // 挺耗时的
    if (config.release) {
        // stream = stream.pipe(
        //     tool.minifyImage()
        // );
    }

    return stream.pipe(
        gulp.dest(config.dest)
    );

});
