/**
 * @file 资源树
 * @author musicode
 */

var path = require('path');

var Node = require('./lib/Node');
var util = require('./lib/util');

/**
 * 依赖表（一个资源依赖哪些资源）
 *
 * @inner
 * @type {Object}
 */
exports.dependencyMap = { };

/**
 * 反向依赖表（一个资源被哪些资源依赖）
 *
 * @inner
 * @type {Object}
 */
exports.reverseDependencyMap = { };

/**
 * 分析入口文件，生成正反两棵依赖树
 *
 * @param {Object} options
 * @property {Array} options.files 入口文件
 * @property {Array=} options.htmlRules 分析 html 文件的扩展规则
 * @property {Array=} options.cssRules 分析 css 文件的扩展规则
 * @property {Array=} options.amdExcludes 不是 amd 的文件
 * @property {Object} options.amdConfig AMD require.config 配置
 * @property {Function} options.processDependency 处理依赖的函数。方法签名是(dependency, node)
 */
exports.parse = function (options) {

    var files = options.files;

    var htmlRules = options.htmlRules;
    var cssRules = options.cssRules;
    var amdExcludes = options.amdExcludes;
    var amdConfig = options.amdConfig;

    var processFile = function (file, level) {

        var node;

        if (file instanceof Node) {
            node = file;
            file = node.file;
        }
        if (level == null) {
            level = 0;
        }
        level++;

        var logPrefix = new Array(level - 1).join('----');

        var exists = exports.dependencyMap[ file ];
        if (exports.debug) {
            console.log(logPrefix, 1, file, exists ? 1 : 0);
        }
        if (exists) {
            return exists;
        }

        if (!node) {
            node = Node.create(file);
        }
        exports.dependencyMap[ file ] = node;

        if (exports.debug) {
            console.log(logPrefix, 2, file);
        }
        node.walk({
            htmlRules: htmlRules,
            cssRules: cssRules,
            amdExcludes: amdExcludes,
            amdConfig: amdConfig,
            processDependency: function (dependency, node) {
                if (exports.debug) {
                    console.log(logPrefix, 3, node.file, dependency.raw);
                }
                dependency = options.processDependency(dependency, node);
                if (dependency) {
                    if (exports.debug) {
                        console.log(logPrefix, 4, node.file, dependency);
                    }
                    var file = dependency.file;
                    var child = processFile(file, level);
                    if (child) {
                        exports.addChild(node, child, dependency.async);
                    }
                }

            }
        });

        return node;

    };

    if (!Array.isArray(files)) {
        files = [ files ];
    }

    files.forEach(processFile);

};

exports.addChild = function (node, child, async) {

    var file = child.file;
    if (node.file === file) {
        return;
    }

    node.addChild(child, async);

    var parents = exports.reverseDependencyMap[ file ];
    if (!Array.isArray(parents)) {
        parents = exports.reverseDependencyMap[ file ] = [ ];
    }

    if (parents.indexOf(node.file) < 0) {
        parents.push(node.file);
    }
};

/**
 * 更新依赖表的文件引用路径
 *
 * @param {string} newFile
 * @param {string} oldFile
 */
exports.updateFile = function (newFile, oldFile) {

    var dependencyMap = exports.dependencyMap;
    var reverseDependencyMap = exports.reverseDependencyMap;

    for (var key in dependencyMap) {
        var node = dependencyMap[key];
        if (key === oldFile) {
            node.file = newFile;
            dependencyMap[newFile] = node;
            delete dependencyMap[oldFile];
        }
    }

    for (var key in reverseDependencyMap) {
        var files = reverseDependencyMap[key];
        if (key === oldFile) {
            reverseDependencyMap[newFile] = files;
            delete reverseDependencyMap[oldFile];
        }
        var index = files.indexOf(oldFile);
        if (index >= 0) {
            files[index] = newFile;
        }
    }

}

/**
 * 持久化 json
 *
 * @param {string} file
 * @param {Object} map
 */
exports.writeJSON = function (file, map) {
    util.writeJSON(file, Node.toJSON(map));
};

