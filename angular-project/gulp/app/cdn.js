
var gulp = require('gulp');
var gulpReplace = require('gulp-replace');
var minifyHtml = require('gulp-minify-html');


var minifyOpts  = {
    spare: true,
    empty: true,
    quotes: true,
    comments: true
};


// 加上cdn 的路径替换
var https_cdn = "https:\/\/i-cdns.genshuixue.com";
var http_cdn = "http:\/\/i-cdn.gsxservice.com";

gulp.task('app.nocdn', ['app'], function (cb) {
    // console.log(gulp.env.env);
    return gulp.src('b-fe-compiled/*.html')
        .pipe(gulpReplace(/"\/app/g, '"' + '/asset'))
        .pipe(gulpReplace(/\'\/app/g, '\'' + '/asset'))
        .pipe(gulpReplace(/\'\/dep/g, '\'' + '/dep'))
        // .pipe(gulpReplace(/"\/app/g, '"' + '/asset'))
        .pipe(gulp.dest('b-fe-compiled/'));
});

gulp.task('app.cdn', ['app.js.uglify'], function (cb) {
    // console.log(gulp.env.env);
    var env = gulp.env.envName;
    // console.log(env);
    if (env === 'beta') {
        // 加上cdn 的路径替换
        https_cdn = "https:\/\/beta-i-cdns.genshuixue.com";
        http_cdn = "http:\/\/beta-i-cdn.gsxservice.com";
    }
    gulp.src([
            'b-fe-compiled/main.html',
            'b-fe-compiled/commonPage.html',
            'b-fe-compiled/detail.html'
        ])
        .pipe(gulpReplace(/\/app/g, https_cdn + '/asset'))
        .pipe(gulpReplace(/\'\/app/g, '\'' + '/asset'))
        .pipe(gulpReplace(/\.\/dep/g, https_cdn + '/dep'))
        // .pipe(gulpReplace(/\/bower_components/g, http_cdn + '/bower_components'))
        .pipe(minifyHtml(minifyOpts))
        .pipe(gulp.dest('b-fe-compiled/'));
});