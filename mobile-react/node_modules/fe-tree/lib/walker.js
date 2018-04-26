/**
 * @file 依赖遍历器
 * @author musicode
 */

var util = require('./util');
var parseFile = require('amd-deploy/lib/parseFile');
var resolveResourceId = require('amd-deploy/lib/resolveResourceId');
var resourceIdToFilePath = require('amd-deploy/lib/resourceIdToFilePath');
var parseFactoryResources = require('amd-deploy/lib/parseFactoryResources');
var generateFileCode = require('amd-deploy/lib/generateFileCode');

/**
 * 通过正则遍历依赖
 *
 * @param {Object} options
 * @property {Node} options.node
 * @property {Array} options.rules
 * @property {Object} options.amdConfig
 * @property {Function} options.processDependency
 */
function walkDependenciesByRules(options) {

    var node = options.node;

    var srcContent = node.content.toString();
    var destContent = srcContent;

    options.rules.forEach(function (parser, index) {

        var results = srcContent.match(parser.pattern);
        if (results) {
            results.forEach(function (result) {

                var dependencies = parser.match(
                    result,
                    node.file,
                    options.amdConfig
                );

                if (!dependencies) {
                    return;
                }

                if (!Array.isArray(dependencies)) {
                    dependencies = [ dependencies ];
                }

                dependencies.forEach(function (dependency, index) {

                    // 支持返回对象，必须包含 raw 属性
                    if (typeof dependency === 'string') {
                        dependency = {
                            raw: dependency
                        };
                    }

                    var raw = dependency.raw;
                    var file = dependency.file || '';

                    if (util.isAbsoluteUrl(raw)) {
                        file = '';
                    }

                    var extname = dependency.extname;
                    if (extname && extname.length > 1) {

                        var terms = file.split('.');
                        if (terms.length > 1) {
                            terms.pop();
                            file = terms.join('.');
                        }

                        file += extname;

                    }

                    dependency.raw = util.cleanQuery(raw);
                    dependency.file = util.cleanQuery(file);

                    var newDependency = options.processDependency(
                        dependency,
                        node
                    );

                    if (newDependency && newDependency.raw !== dependency.raw) {
                        destContent = util.replace(
                            destContent,
                            result,
                            function (result) {
                                return util.replace(
                                    result,
                                    dependency.raw,
                                    newDependency.raw
                                );
                            }
                        );
                    }

                });

            });

        }

    });

    if (srcContent !== destContent) {
        node.content = new Buffer(destContent);
    }

}

/**
 * 通过语法树进行遍历
 *
 * @param {Object} options
 * @property {Node} options.node
 * @property {Object} options.amdConfig
 * @property {Function} options.processDependency
 */
function walkDependenciesByAst(options) {

    var node = options.node;
    var amdConfig = options.amdConfig;

    var amd = node.amd;
    if (!amd) {
        amd = node.amd = parseFile(
            node.file,
            node.content.toString(),
            amdConfig
        );
    }

    var isChange = false;

    var processDependency = function (resource, moduleId) {

        var resourceId = resource.id;

        if (!resourceId) {
            return;
        }

        var dependency = {
            amd: true,
            // 资源所属模块
            module: moduleId,
            // 加载资源的插件
            plugin: resource.plugin,
            // 是否异步加载
            async: resource.async,

            raw: resourceId,
            file: resourceIdToFilePath(
                resolveResourceId(resourceId, moduleId),
                amdConfig
            )
        };

        var newDependency = options.processDependency(
            dependency,
            node
        );

        if (!newDependency) {
            return;
        }

        if (newDependency.raw !== dependency.raw
            || newDependency.plugin !== dependency.plugin
        ) {
            resource.id = newDependency.raw;
            resource.plugin = newDependency.plugin;
            isChange = true;
        }

    };

    amd.modules.forEach(
        function (module) {

            var moduleId = module.id;

            processDependency(module, moduleId);

            module.dependencies.forEach(
                function (dependency) {
                    processDependency(dependency, moduleId);
                }
            );

            var resources = parseFactoryResources(module.factory);

            [
                resources.sync,
                resources.async,
                resources.other
            ]
            .forEach(function (resources) {

                resources.forEach(
                    function (dependency) {
                        processDependency(dependency, moduleId);
                    }
                );

            });

        }
    );

    if (isChange) {
        node.content = new Buffer(
            generateFileCode(amd)
        );
    }

}


exports.walkDependenciesByRules = walkDependenciesByRules;
exports.walkDependenciesByAst = walkDependenciesByAst;

