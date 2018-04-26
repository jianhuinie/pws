/**
 * @file 资源树
 * @author musicode
 */

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
 * @property {Object} options.amdConfig AMD require.config 配置
 * @property {Function} options.processDependency 处理依赖的函数。方法签名是(dependency, file)
 */
exports.parse = function (options) {

    var files = options.files;

    var htmlRules = options.htmlRules;
    var cssRules = options.cssRules;
    var amdConfig = options.amdConfig;

    var processFile = function (file) {

        var node = exports.dependencyMap[ file ];
        if (node) {
            return node;
        }

        node = Node.create(file);
        exports.dependencyMap[ file ] = node;

        node.walk({
            htmlRules: htmlRules,
            cssRules: cssRules,
            amdConfig: amdConfig,
            processDependency: function (dependency, node) {

                if (options.processDependency(dependency, node)
                    && dependency.file !== node.file
                ) {
                    var file = dependency.file;

                    var child = processFile(file);
                    if (!child) {
                        return;
                    }

                    node.addChild(child, dependency.async);

                    var parents = exports.reverseDependencyMap[ file ];
                    if (!Array.isArray(parents)) {
                        parents = exports.reverseDependencyMap[ file ] = [ ];
                    }

                    if (parents.indexOf(node.file) < 0) {
                        parents.push(node.file);
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

/**
 * 持久化 json
 *
 * @param {string} file
 * @param {Object} map
 */
exports.writeJSON = function (file, map) {
    util.writeJSON(file, Node.toJSON(map));
};

