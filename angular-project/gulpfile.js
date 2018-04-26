
var gulp = require('gulp');
var gulpStats = require('gulp-stats');

require('./gulp/app');
require('./gulp/server');


gulp.task('moveAsset', function () {
    // gulp.src('bower_components/**/*')
        // .pipe(gulp.dest('output/bower_components/'));

    return gulp.src('dep/**/*')
        .pipe(gulp.dest('b-fe-compiled/dep/'));

});

gulp.task('deploy', ['app.nocdn', 'moveAsset']);
gulp.task('deploy.cdn', ['app.cdn', 'moveAsset']);
gulp.task('server', ['server:start', 'jshint', 'watch']);

//gulpStats(gulp);