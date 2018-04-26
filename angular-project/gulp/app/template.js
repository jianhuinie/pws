
var gulp = require('gulp');
var minifyHtml = require('gulp-minify-html');
var templateCache = require('gulp-angular-templatecache');
var md5 = require('gulp-md5-plus');

var es = require('event-stream');
var path = require('path');

var constants = require('./constants');




gulp.task('app.template', ['app.img'], function (cb) {
    var needTemplates = constants.MODULE_NAMES;

    var minifyOpts  = {
        spare: true,
        empty: true,
        quotes: true,
        comments: true
    };

    var streams = [];

    needTemplates.forEach(function (item) {

        var templateArr = [
            'app/common/**/*.html',
            'app/module/' + item + '/**/*.html'
        ];

        // if (item === 'master') {
        //     templateArr.push('app/module/main/cash/**/*.html');
        //     templateArr.push('app/module/main/account/**/*.html');

        // }

        streams.push(
            gulp.src(templateArr)
                .pipe(minifyHtml(minifyOpts))
                .pipe(templateCache({
                    base: '../../',
                    transformUrl: function (url) {
                        var currentPath = path.join(__dirname, '..', '..');
                        // console.log('url:' + url);
                        // console.log('currentPath:' + currentPath);
                            return url.replace(currentPath + '/', '');
                    }
                }))
                .pipe(md5(10, './b-fe-compiled/' + item + '.html'))
                .pipe(gulp.dest('./b-fe-compiled/asset/module/' + item + '/'))

        );
    });

    return es.merge(streams);

});
