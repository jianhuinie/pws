
var gulp = require('gulp');
var gulpLess = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var md5 = require('gulp-md5-plus');
var gulpReplace = require('gulp-replace');
var es = require('event-stream');
var fs = require('fs');

var appModules = require('./constants').MODULE_NAMES;

gulp.task('app.fonts', function (cb) {
    var version, no;
    var files = fs.readdirSync(__dirname + '/../../app/resource/icomoon/');
    files.forEach(function (v, i) {
        if (i === 0) {
            version = v;
            no = parseInt(v.replace(/\./g, ''));
        }
        else {
            var curNo = parseInt(v.replace(/\./g, ''));
            if (curNo > no) {
                version = v;
                no = curNo;
            }
        }
    });
    var streams = [];
    streams.push(gulp.src('app/resource/icomoon/' + version + '/fonts/*')
            .pipe(gulp.dest('b-fe-compiled/asset/resource/icomoon/' + version + '/fonts/')));

    return es.merge(streams);
});


gulp.task('app.css', ['app.html'], function (cb) {


    var streams = [];
    appModules.forEach(function (item) {
        streams.push(
            gulp.src('app/resource/css/' + item + '.less')
                .pipe(gulpLess())
                .pipe(minifyCss())
                .pipe(md5(10, './b-fe-compiled/' + item + '.html'))
                .pipe(gulp.dest('b-fe-compiled/asset/resource/css/'))
        );
    });

    return es.merge(streams);
});

gulp.task('app.preimg', ['app.css', 'app.fonts'], function (cb) {

    return gulp.src('app/resource/img/**/*')
        .pipe(md5(10, './b-fe-compiled/asset/resource/css/*.css'))
        .pipe(gulp.dest('b-fe-compiled/asset/resource/img/'));
});

gulp.task('app.img', ['app.preimg'], function (cb) {
    return gulp.src('b-fe-compiled/asset/resource/css/*.css')
        .pipe(gulpReplace(/\/app\/resource\/img/g, '/asset/resource/img'))
        .pipe(gulp.dest('b-fe-compiled/asset/resource/css/'));
});
