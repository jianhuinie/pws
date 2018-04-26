/**
 * @file 缓存控制
 * @author musicode
 */

/**
 * 流程如下：
 *
 * 非源码目录，用版本号控制足够了，如 jquery/1.10.0/src/jquery.js
 *
 * 1. 扫描 output/asset/ 下所有的静态资源，建立哈希表（path -> hash）
 * 2. 建立哈希表之后，先处理 js 和 css 这种分支节点，建立依赖表 （path -> dependencies）
 *
 * 基于上面这两张表，递归计算哈希完全不是问题
 *
 * 3. 递归计算的方式是递归依赖表，获取到每个依赖的哈希，相加再计算一个总哈希
 * 4. 遍历 html css js，替换引用路径
 * 5. 根据哈希表，生成对应的哈希文件，比如 a.js 变成 a_123.js
 *
 * 生成哈希文件务必最后做，这样才能减少扫描文件的量级
 */


var path = require('path');

var gulp = require('gulp');

var sequence = require('gulp-sequence');

var config = require('./config');
var tool = require('./tool');


var resourceProcessor = config.resourceProcessor;


// 合并上次 build 的 hashMap 和 dependencyMap
gulp.task('version-merge-prev', function (callback) {

    var prevHashMap = config.hashMap;
    var prevDependencyMap = config.dependencyMap;

    var currentHashMap = resourceProcessor.hashMap;
    var currentDependencyMap = resourceProcessor.dependencyMap;

    tool.extend(
        currentHashMap,
        prevHashMap
    );

    tool.extend(
        currentDependencyMap,
        prevDependencyMap
    );

    callback();

});


// 扫描 config.assetDir，建立全量静态资源哈希表和依赖表
gulp.task('version-calculate', function () {

    return gulp.src(
        path.join(config.assetDir, '**/*.*')
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
                        return false;
                }

                return true;

            }
        })
    );

});

gulp.task('version-replace-view', function () {

    return gulp.src(
        tool.toOutputFiles(config.htmlFiles)
    )
    .pipe(
        resourceProcessor.renameDependencies({
            replace: function (file, content) {

                var list = resourceProcessor.parseAmdConfig(content);

                if (Array.isArray(list) && list.length > 0) {

                    var parts = [ ];
                    var fromIndex = 0;

                    list.forEach(function (item, index) {

                        parts.push(
                            content.substring(fromIndex, item.fromIndex)
                        );

                        var code;

                        if (item.data) {
                            code = JSON.stringify(
                                config.replaceRequireConfig(item.data),
                                null,
                                item.indentBase
                            );
                        }
                        else {
                            code = content.substring(
                                item.fromIndex,
                                item.toIndex
                            );
                        }

                        parts.push(code);

                        fromIndex = item.toIndex;

                    });

                    parts.push(
                        content.substring(fromIndex)
                    );

                    return parts.join('');

                }
            }
        })
    )
    .pipe(
        gulp.dest(config.dest)
    );

});

gulp.task('version-replace-asset', function () {

    return gulp.src(
        path.join(config.assetDir, '**/*.*')
    )
    .pipe(
        resourceProcessor.renameDependencies()
    )
    .pipe(
        gulp.dest(config.dest)
    )
    .pipe(
        resourceProcessor.renameFiles()
    )
    .pipe(
        resourceProcessor.renameDependencies()
    )
    .pipe(
        gulp.dest(config.dest)
    );

});

gulp.task('version-save', function (callback) {

    tool.writeHashMapFile(
        resourceProcessor.hashMap
    );

    tool.writeDependencyMapFile(
        resourceProcessor.dependencyMap
    );

    callback();

});

gulp.task(
    'version',
    sequence(
        'version-merge-prev',
        'version-calculate',
        'version-replace-view',
        'version-replace-asset',
        'version-save'
    )
);

