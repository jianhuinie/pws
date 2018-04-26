
var fs = require('fs');
var path = require('path');

var gulp = require('gulp');
var sequence = require('gulp-sequence');

// 命令行参数
var argv = require('yargs').argv;


var config = require('./gulp/config');
var tool = require('./gulp/tool');

require('./gulp/clean');
require('./gulp/diff');
require('./gulp/html');
require('./gulp/amd');
require('./gulp/js');
require('./gulp/less');
require('./gulp/stylus');
require('./gulp/css');
require('./gulp/image');
require('./gulp/other');
require('./gulp/version');


function init() {

}

gulp.task(
    'env-source',
    function () {
        config.release = false;
        init();
    }
);

gulp.task(
    'env-min',
    function () {
        config.release = true;
        init();
    }
);

gulp.task(
    'source',
    sequence(
        'env-source',
        'clean',
        'html',
        // 'diff',
        ['js', 'less', 'stylus', 'css', 'image', 'other'],
        'amd',
        'version',
        'end'
    )
);

gulp.task(
    'min',
    sequence(
        'env-min',
        'clean',
        'html',
        // 'diff',
        ['js', 'less', 'stylus', 'css', 'image', 'other'],
        'amd',
        'version',
        'end'
    )
);

gulp.task(
    'end',
    function (callback) {

        var writeFile = function (name, json) {

            tool.writeJSON(
                path.join(config.outputDir, name),
                json
            );

        };

        writeFile('html.json', config.htmlFiles);
        writeFile('js.json', config.jsFiles);
        writeFile('amd.json', config.amdFiles);
        writeFile('css.json', config.cssFiles);
        writeFile('less.json', config.lessFiles);
        writeFile('stylus.json', config.stylusFiles);
        writeFile('image.json', config.imageFiles);

        callback();

    }
);


/**
 * 改造老项目，把所有 url 转到相对于 src 目录
 */
gulp.task(
    'updateStylusPaths',
    function () {
        return gulp.src(
            path.join(config.srcDir, '**/*.styl')
        )
        .pipe(
            config.resourceProcessor.cssDependencies({
                rename: function (file, dependency) {

                    // 相对路径基本都是 ../../../../ 的格式
                    // 因此一旦检测到相对路径，可以先把 .. 全去掉，一次加一级去尝试

                    var dirname = path.dirname(file.path);

                    // 尝试长度
                    var length = 0;
                    // 最大尝试长度
                    var maxLength = 10;

                    var makeDotArray = function (length) {
                        var array = [ ];
                        for (var i = 0; i < length; i++) {
                            array.push('..');
                        }
                        return array;
                    };

                    var getFilePath = function (raw) {

                        if (length === maxLength) {
                            console.log('[' + raw + '] not found.');
                            return;
                        }

                        var filePath = raw;

                        var terms = makeDotArray(length++);

                        if (terms.length > 0) {

                            filePath = path.join(
                                terms.join(path.sep),
                                filePath
                            );

                        }

                        filePath = path.join(
                            dirname,
                            filePath
                        );

                        if (filePath && fs.existsSync(filePath)) {
                            return filePath;
                        }
                        else {
                            return getFilePath(raw);
                        }

                    };

                    var raw = dependency.raw;

                    if (/^(?:\w|\.(?:\.)?)/.test(raw)) {

                        var terms = raw.split('/');

                        for (var i = terms.length - 1; i >= 0; i--) {
                            if (terms[i] === '.' || terms[i] === '..') {
                                terms.splice(i, 1);
                            }
                        }

                        raw = terms.join('/');

                        var extname = dependency.extname;
                        if (extname && extname.length > 1) {

                            terms = raw.split('.');
                            terms.pop();
                            terms.push(
                                extname.substr(1)
                            );

                            raw = terms.join('.');

                        }

                        var filePath = getFilePath(raw);

                        if (filePath) {
                            return path.relative(config.srcDir, filePath);
                        }

                    }

                }
            })
        )
        .pipe(
            gulp.dest(function (file) {
                return file.base;
            })
        );
    }
);

gulp.task('test', ['source']);
gulp.task('beta', ['min']);

gulp.task('default', ['source']);
