/**
 * @file 删除输出目录，保持干净
 * @author musicode
 */

var gulp = require('gulp');
var del = require('del');

var config = require('./config');

gulp.task('clean', function (callback) {

    // 删除操作不需要用到文件内容
    // 因此不需要用到流

    del(
        [
            config.outputDir
        ],
        callback
    );

});