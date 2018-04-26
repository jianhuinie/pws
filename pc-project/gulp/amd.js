/**
 * @file amd 模块打包合并
 * @author musicode
 */

var gulp = require('gulp');

var config = require('./config');
var tool = require('./tool');


gulp.task('amd', function () {

    var stream = gulp.src(
        config.amdFiles
    )
    .pipe(
        config.filter()
    )
    .pipe(
        tool.buildAmdModules()
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
