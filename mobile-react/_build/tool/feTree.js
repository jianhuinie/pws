/**
 * Created by bjhl on 15/12/5.
 */
const feTree = require('fe-tree');
const path = require('path');
const argv = require('yargs').argv;

const util = require('./util');
const rule = require('fe-tree/lib/rule');
const config = require('../config');
const fileExports = require('./fileExports').getExportsFile();
const manifest = require('./manifestEdit').getManifest();
const dep = require('./isDep');


var amdConfig = {
    baseUrl: util.fixPath(manifest.baseUrl),
    paths: manifest.paths || {},
    packages: manifest.packages || []
};

var htmlRules = [
    {
        pattern: /require\.toUrl\(\s*['"][^'"]+['"]\s*\)/gi,
        match: function (result) {
            const terms = result.split(/['"]/);
            if (terms.length === 3) {
                return terms[1];
            }
            return false;
        }
    }, 
    {
        pattern: /file=['"][^'"]+['"]/gi,
        match: function (result) {
            const terms = result.split(/['"]/);
            if (terms.length === 3) {
                var fileName = terms[1];

                if (!fileName.match('/')) {
                    fileName = path.join(config.src, fileName);
                }
                return fileName;
            }
            return false;
        }
    }, 
    {
        pattern: /\$page_module\s*=\s*['"][^'"]+['"]/gi,
        match: function (result) {
            const terms = result.split(/['"]/);
            if (terms.length === 3) {
                if (dep.isDepExist(terms[1])) {
                    return rule.parseAmdDependencies(
                        result.replace(/\$page_module\s*\=/, ''),
                        amdConfig
                    );
                }
                return util.addRequireExtName(terms[1]);
            }
            return false;
        }
    }, 
    {
        pattern: /\$g_modules\[\]\s*=\s*['"][^'"]+['"]/gi,
        match: function (result) {
            const terms = result.split(/['"]/);
            if (terms.length === 3) {
                if (dep.isDepExist(terms[1])) {
                    return rule.parseAmdDependencies(
                        result.replace(/\$g_modules\[\]\s*\=/, ''),
                        amdConfig
                    );
                }
                return util.addRequireExtName(terms[1]);
            }
            return false;
        }
    }
];

// 非spa独立部署
if (argv.d === 1) {
    htmlRules.push({
        // TODO: 只处理compile_spa场景
        pattern: /require\(\[(['"](?:(compile_spa)(?:\S+)?)['"])\]/gi,
        match: function (result) {
            const terms = result.split(/[\[\]]/);
            if (terms.length === 3) {
                const filePath = terms[1].replace(/['"]/g, '');
                if (dep.isDepExist(filePath)) {
                    return rule.parseAmdDependencies(
                        filePath,
                        amdConfig
                    );
                }
                return util.addRequireExtName(filePath);
            }
            return false;
        }
    });
}

const node = (function () {
    try {
        feTree.parse({
            files: fileExports,
            amdConfig: amdConfig,
            htmlRules: htmlRules,
            processDependency: function (dependency, node) {
                var raw = dependency.raw;
                // 过滤依赖
                if (util.isFilterPath(raw) || /^{{\$jssdk_origin}}/ig.test(raw)) {
                    return;
                }

                // 纠正依赖路径 html,css
                if (!dependency.amd) {
                    var fixPathName = util.fixPath(raw, node.file);

                    if (fixPathName !== raw) {
                        dependency.file = fixPathName;
                    }

                    if (!dependency.file && /^(\.\/|[^./])/.test(raw)) {
                        dependency.file = path.join(node.file, '..', raw);
                    }
                }

                var moduleExclude = {
                    jquery: 1,
                    text: 1,
                    tpl: 1,
                    css: 1,
                    js: 1
                };

                var rawExclude = {
                    require: 1,
                    exports: 1,
                    module: 1
                };

                if (!moduleExclude[dependency.module] && !rawExclude[dependency.raw]) {
                    return dependency;
                }
            }
        });
    } catch (e) {
        util.errorHandler(e);
    }

    return feTree;
}());

exports.dependencyMap = node.dependencyMap;
exports.reverseDependencyMap = node.reverseDependencyMap;