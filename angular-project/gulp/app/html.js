
var gulp = require('gulp');
var minifyHtml = require('gulp-minify-html');
var es = require('event-stream');

gulp.task('app.html', function (cb) {
    var streams = [];
    streams.push(
        gulp.src('app/crossdomain.xml')
            .pipe(gulp.dest('b-fe-compiled/'))
    );

    streams.push(
        gulp.src('*.html')
            .pipe(minifyHtml({
                spare: true,
                empty: true,
                quotes: true,
                comments: true
            }))
            .pipe(gulp.dest('b-fe-compiled/'))
    );
    // streams.push(
    //     gulp.src('main.html')
    //         .pipe(minifyHtml({
    //             spare: true,
    //             empty: true,
    //             quotes: true,
    //             comments: true
    //         }))
    //         .pipe(gulp.dest('b-fe-compiled/'))
    // );
    return es.merge(streams);
});