/**
 * @file 各种工具
 * @author musicode
 */

var fs = require('fs');
var path = require('path');

var minimatch = require('minimatch');

var config = require('./config');

/**
 * 编译 amd
 */
exports.buildAmdModules = function () {
    return config.resourceProcessor.buildAmdModules();
};


var uglify = require('gulp-uglify');

/**
 * 压缩 js
 */
exports.minifyJs = function () {
    return uglify({
        compress: {
            warnings: false,
            // see https://github.com/ecomfe/edp/issues/230
            conditionals: false
        },
        mangle: {
            except: ['require', 'exports', 'module']
        }
    });
};


var less = require('gulp-less');

/**
 * 编译 less
 */
exports.compileLess = function () {
    return less({
        relativeUrls: true
    });
};

var gulpStylus = require('gulp-stylus');
var stylus = require('stylus');
var rider = require('rider');

/**
 * 编译 stylus
 */
exports.compileStylus = function () {
    return gulpStylus({
        'resolve url': true,
        define: {
            url: stylus.resolver({
                paths: [
                    config.projectDir,
                    config.srcDir
                ]
            })
        },
        paths: [
            config.projectDir,
            config.srcDir
        ]
   });
};


var minifyCss = require('gulp-minify-css');

/**
 * 压缩 css
 */
exports.minifyCss = function () {
    return minifyCss({
        compatibility: 'ie8'
    });
};


var autoPrefixer = require('gulp-autoprefixer');

/**
 * auto prefixer
 */
exports.autoPrefixer = function () {
    return autoPrefixer({
        browsers: [
            '> 0%',
            'last 10 version'
        ]
    });
};


var imagemin = require('gulp-imagemin');

/**
 * 压缩图片
 */
exports.minifyImage = function () {
    return imagemin({
        optimizationLevel: 3,
        progressive: true,
        interlaced: true
    });
};

/**
 * 文件路径移除扩展名
 *
 * @param {string} filePath
 * @return {string}
 */
exports.removeExtname = function (filePath) {

    var prefix = './';

    // "./a.js" 重命名为 "./a_123.js"
    // 但是 path.join('.', 'a.js') 会变成 a.js

    if (filePath.indexOf(prefix) !== 0) {
        prefix = '';
    }

    var extName = path.extname(filePath);

    var result = path.join(
        path.dirname(filePath),
        path.basename(filePath, extName)
    );

    if (prefix) {
        result = prefix + result;
    }

    return result;

};

/**
 * 把源文件转到 outputDir
 *
 * @inner
 * @param {Array.<string>} files
 * @return {Array.<string>}
 */
exports.toOutputFiles = function (files) {

    var result = [ ];

    files.forEach(function (file) {

        if (file.indexOf(config.projectDir) === 0) {
            file = config.replaceResource(
                file.replace(config.projectDir, config.outputDir)
            );
            result.push(file);
        }

    });

    return result;

};

/**
 * 改写文件名，添加 hash 后缀
 *
 * @inner
 * @param {string} filePath
 * @param {string} hash
 * @return {string}
 */
exports.appendFileHash = function (filePath, hash) {

    return exports.removeExtname(filePath)
         + '_'
         + hash
         + path.extname(filePath);

};

/**
 * 扩展对象
 *
 * @param {Object} source
 * @param {Object} target
 */
exports.extend = function (source, target) {
    for (var key in target) {
        source[ key ] = target[ key ];
    }
};

/**
 * 合并数组
 *
 * @return {Array.<string>}
 */
exports.mergeArray = function () {

    var result = [ ];

    var addItem = function (item) {
        result.push(item);
    };

    for (var i = 0, len = arguments.length, item; i < len; i++) {

        item = arguments[i];

        if (item) {

            if (Array.isArray(item)) {
                item.forEach(addItem);
            }
            else {
                addItem(item);
            }

        }

    }

    return result;

};

/**
 * push 一个数组
 *
 * @param {Array} source
 * @param {Array} target
 */
exports.pushArray = function (source, target) {

    target.forEach(function (item) {
        source.push(item);
    });

};

/**
 *
 * filePath 是否能匹配 files 中的至少一项
 *
 * @param {string} filePath
 * @param {Array.<string>} files
 * @return {boolean}
 */
exports.inFiles = function (filePath, files) {

    var result = false;

    files.forEach(function (pattern) {
        if (exports.matchPath(filePath, pattern)) {
            result = true;
        }
    });

    return result;
};

/**
 * 读取 json 数据
 *
 * @param {string} file
 * @return {Object?}
 */
exports.readJSON = function (file) {

    var json;

    try {
        json = fs.readFileSync(file).toString();
        json = JSON.parse(json);
    }
    catch (e) {
        json = null;
    }

    return json;

};

/**
 * 持久化 json 数据
 *
 * @param {string} file
 * @param {Object|Array} json
 */
exports.writeJSON = function (file, json) {
    try {
        fs.writeFileSync(
            file,
            JSON.stringify(json, null, 4)
        );
    }
    catch (e) {

    }
};

/**
 * 读取哈希表文件
 *
 * @return {Object}
 */
exports.readHashMapFile = function () {

    var hashMap = exports.readJSON(config.hashMapFile) || { };

    var absolutePath;

    for (var key in hashMap) {

        absolutePath = exports.projectToAbsolute(key);

        // 过滤 output 目录下的文件
        if (absolutePath.indexOf(config.outputDir) !== 0) {
            hashMap[ absolutePath ] = hashMap[ key ];
        }

        delete hashMap[ key ];
    }

    return hashMap;

};

/**
 * 写入哈希表文件
 *
 * @param {Object} data
 * @return {Object}
 */
exports.writeHashMapFile = function (hashMap) {

    for (var key in hashMap) {
        hashMap[ exports.absoluteToProject(key) ] = hashMap[ key ];
        delete hashMap[ key ];
    }

    exports.writeJSON(config.hashMapFile, hashMap);

};


/**
 * 读取依赖表文件
 *
 * @return {Object}
 */
exports.readDependencyMapFile = function () {

    var dependencyMap = exports.readJSON(config.dependencyMapFile) || { };

    var absolutePath;

    for (var key in dependencyMap) {

        absolutePath = exports.projectToAbsolute(key);

        // 过滤 output 目录下的文件
        if (absolutePath.indexOf(config.outputDir) !== 0) {
            dependencyMap[ absolutePath ] = dependencyMap[ key ].map(
                function (filePath) {
                    return exports.projectToAbsolute(filePath);
                }
            );
        }

        delete dependencyMap[ key ];

    }

    return dependencyMap;

};

/**
 * 写入依赖表文件
 *
 * @param {Object} data
 * @return {Object}
 */
exports.writeDependencyMapFile = function (dependencyMap) {

    for (var key in dependencyMap) {
        dependencyMap[ exports.absoluteToProject(key) ] = dependencyMap[ key ].map(
            function (filePath) {
                return exports.absoluteToProject(filePath);
            }
        );
        delete dependencyMap[ key ];
    }

    exports.writeJSON(config.dependencyMapFile, dependencyMap);

};

/**
 * 文件绝对路径转为相对于项目目录
 *
 * @param filePath
 * @return {string}
 */
exports.absoluteToProject = function (filePath) {
    return path.relative(config.projectDir, filePath);
};

/**
 * 文件路径从相对项目目录转为绝对路径
 *
 * @param filePath
 * @return {string}
 */
exports.projectToAbsolute = function (filePath) {
    return path.join(config.projectDir, filePath);
};


/**
 * glob 匹配
 *
 * @param {string} filePath
 * @param {string} pattern
 * @return {boolean}
 */
exports.matchPath = function (filePath, pattern) {
    return minimatch(filePath, pattern, { matchBase: true });
};