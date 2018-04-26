var jshint = require('gulp-jshint');
var gulp   = require('gulp');
var stylish = require('jshint-stylish');

gulp.task('jshint', function() {
  	return gulp.src([
  			'app/**/*.js',
  			'!app/common/ui/**/*.js',
  			'!app/resource/**/*',
  			'!app/common/ngDirective/baiduShare/directive.js'
  		])
    	.pipe(jshint())
    	// .pipe(myReporter);
    	.pipe(jshint.reporter(stylish));
});

gulp.task('watch', function() {
	gulp.watch("app/**/*.js", ['jshint']);
});

