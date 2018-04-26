/**
 * @file 提取模板内的静态资源
 * @author musicode
 */

var path = require('path');

var gulp = require('gulp');
var frep = require('gulp-frep');

var config = require('./config');

gulp.task('html', function (callback) {

    return gulp.src(
        config.htmlFiles
    )
    .pipe(
        config.filter()
    )
    .pipe(
        frep([
            {
                pattern: /{edp-variable:{version}}/g,
                replacement: function (match) {
                    return Date.now();
                }
            }
        ])
    )
    .pipe(
        config.resourceProcessor.htmlDependencies({

            process: function (file, dependencies) {

                dependencies.forEach(function (dependency) {

                    var absolute = dependency.absolute;

                    var files;

                    var ext = path.extname(absolute);

                    // 脚本样式之外的静态资源用模糊匹配，不需要在这里精确获取
                    switch (ext.toLowerCase()) {
                        case '.js':

                            files = dependency.amd
                                  ? config.amdFiles
                                  : config.jsFiles;

                            break;
                        case '.less':
                            files = config.lessFiles;
                            break;
                        case '.styl':
                            files = config.stylusFiles;
                            break;
                        case '.css':
                            files = config.cssFiles;
                            break;
                    }

                    if (files
                        && files.indexOf(absolute) < 0
                    ) {
                        files.push(absolute);
                    }

                });
            }
        })
    )
    .pipe(
        gulp.dest(config.dest)
    );

});
