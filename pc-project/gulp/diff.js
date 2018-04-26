/**
 * @file 通过 diff md5 区分文件是否变化
 * @author musicode
 */

/**
 * 思路如下：
 *
 * 1. 生成需要 build 的所有文件的 hashMap 和 dependencyMap
 * 2. 和上一个版本比较是否变化
 * 3. 把比较结果更新到 config.xxxFiles
 */

var path = require('path');

var gulp = require('gulp');
var sequence = require('gulp-sequence');

var config = require('./config');
var tool = require('./tool');


var resourceProcessor = config.resourceProcessor;

/**
 * 获取需要对比的文件列表
 *
 * @inner
 * @return {Array}
 */
function getDiffFiles() {
    return tool.mergeArray(
        config.amdFiles,
        config.jsFiles,
        config.cssFiles,
        config.lessFiles,
        config.stylusFiles,
        config.imageFiles,
        config.otherFiles,
        path.join(config.srcDir, '**/*.*'),
        path.join(config.depDir, '**/*.*')
    );
}


gulp.task('diff-calculate', function () {
    return gulp.src(
        getDiffFiles()
    )
    .pipe(
        config.filter()
    )
    .pipe(
        resourceProcessor.analyzeHash()
    )
    .pipe(
        resourceProcessor.analyzeDependencies({
            filter: function (file) {

                switch (path.extname(file.path).toLowerCase()) {
                    case '.js':
                    case '.css':
                    case '.less':
                    case '.styl':
                        return false;
                }

                return true;

            }
        })
    );
});


gulp.task('diff-filter', function () {
    return gulp.src(
        getDiffFiles()
    )
    .pipe(
        config.filter()
    )
    .pipe(
        resourceProcessor.custom(
            function (file, callback) {

                var filePath = file.path;

                var prevHash = resourceProcessor.getFileHash(
                    filePath,
                    config.hashMap,
                    config.dependencyMap,
                    false
                );

                var currentHash = resourceProcessor.getFileHash(
                    filePath,
                    resourceProcessor.hashMap,
                    resourceProcessor.dependencyMap,
                    true
                );

                if (currentHash && prevHash === currentHash) {

                    config.filterFiles.push(
                        filePath
                    );

                }

                callback();
            }
        )
    );
});


gulp.task(
    'diff',
    sequence(
        'diff-calculate',
        'diff-filter'
    )
);

