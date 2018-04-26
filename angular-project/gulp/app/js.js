
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var md5 = require('gulp-md5-plus');
var gulpBrowserify = require('gulp-browserify');
var gulpRename = require('gulp-rename');

var es = require('event-stream');

var constants = require('./constants');

function appJsHandler() {
    var arr = constants.MODULE_NAMES;
    var streams = [];

    arr.forEach(function (name) {
        streams.push(
            gulp
                .src([
                    'b-fe-compiled/asset/module/' + name + '/app.js',
                    '!b-fe-compiled/asset/module/*/templates.js'
                ])
                .pipe(md5(10, './b-fe-compiled/' + name + '.html'))
                .pipe(gulp.dest('./b-fe-compiled/asset/module/' + name))
        );
    });
    return streams;
}

gulp.task('app.js',['app.amd'], function (cb) {
    return es.merge(appJsHandler());
});

gulp.task('app.js.uglify',['app.amd.uglify'], function (cb) {
    return es.merge(appJsHandler());
});

gulp.task('app.umeditor', function (cb) {
    return gulp.src('dep/umeditor/umeditor.js')
        .pipe(uglify())
        .pipe(gulpRename('umeditor.min.js'))
        .pipe(gulp.dest('dep/umeditor'));
});