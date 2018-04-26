/**
 * @file 只处理ui控件的.tpl，目前只处理text!**.tpl模板
 * @author hurry
 * @date 2017/5/15
 */
const util = require('../tool/util');
const biz = require('../tool/biz');
const feTree = require('../tool/feTree');
const config = require('../config');
const dependencyMap = feTree.dependencyMap;

// TODO: 不能处理smarty模板中tpl
exports.build = function (changeFiles) {
    // 只修改tpl
    util.each(feTree.reverseDependencyMap, function (deps, filePath) {
        if (util.isHtml(filePath)) {
            if (changeFiles && changeFiles.uptFiles) {
                var uptFiles = changeFiles.uptFiles;
                if (uptFiles.indexOf(filePath) === -1) {
                    return;
                }
                // console.log(filePath);
                // tpl有修改，同时需要替换对应的deps， 所以deps同时也变化
                changeFiles.uptFiles = uptFiles.concat(deps);
            }
        }
    });
    // html模板变化，处理依赖文件，包括css/js
    util.each(dependencyMap, function (deps, filePath) {
        if (util.isHtml(filePath)) {
            if (changeFiles && changeFiles.uptFiles) {
                var uptFiles = changeFiles.uptFiles;
                if (uptFiles.indexOf(filePath) === -1) {
                    return;
                }
                deps = JSON.parse(JSON.stringify(deps));
                // console.log(deps);
                // console.log(JSON.stringify(deps));
                // console.log(JSON.stringify(deps.children));
                // util.each(deps, function (dep, filePath) {
                //     console.log(dep);
                //     console.log(filePath);
                // });
                if (deps && deps.children.length) {
                    if (biz.isExports(filePath)) {
                        // 入口文件只处理css，path依据文件名变化
                        deps.children.forEach(function (dep) {
                            if ((util.isCss(dep.file) || config.htmlMD5Js.indexOf(dep.file) > -1) && uptFiles.indexOf(dep.file) === -1) {
                                uptFiles.push(dep.file);
                            }
                        });
                    } else {
                        // 非入口文件处理css和js，path依据文件名变化
                        deps.children.forEach(function (dep) {
                            if ((util.isCss(dep.file) || util.isJs(dep.file)) && uptFiles.indexOf(dep.file) === -1) {
                                uptFiles.push(dep.file);
                            }
                        });
                    }
                }
                
                // console.log(filePath);
                // // tpl有修改，同时需要替换对应的deps， 所以deps同时也变化
                // changeFiles.uptFiles = uptFiles.concat(deps);
            }
        }
    });
};