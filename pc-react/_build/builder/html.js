/**
 * @file 处理入口文件
 */
const feTree = require('../tool/feTree');
const util = require('../tool/util');
const biz = require('../tool/biz');
const writeTask = require('../tasks/write');
const htmlRenameTask = require('../tasks/htmlRename');

const dependencyMap = feTree.dependencyMap;
const reverseDependencyMap = feTree.reverseDependencyMap;

// 入口文件没有反向依赖
const isExports = function (pathName) {
    const rdeps = reverseDependencyMap[pathName] && reverseDependencyMap[pathName].join();
    if (!rdeps || rdeps.indexOf('.html') > -1 || rdeps.indexOf('.tpl') > -1) {
        return true;
    }
    return false;
};

exports.build = function (changeFiles) {
    util.each(dependencyMap, function (deps, pathName) {
        if (changeFiles && changeFiles.uptFiles.indexOf(pathName) === -1) {
            return;
        }
        if (util.isHtml(pathName) && isExports(pathName)) {
            // 读取HTML文件，替换内容
            const content = biz.readFileSync(pathName);
            // console.log(content);
            const newContent = htmlRenameTask.htmlRename(pathName, content);
            writeTask.write(biz.getReleaseName(pathName), newContent);
        }
    });
};