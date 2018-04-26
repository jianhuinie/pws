/**
 * @file css统一处理入口
 * Created by bjhl on 16/1/14.
 */
const util = require('../tool/util');
const cssTask = require('../tasks/cssResolve');
const reverseDependencyMap = require('../tool/feTree').reverseDependencyMap;

exports.build = function (changeFiles, cb) {
    var source = 0;
    // console.log(changeFiles.uptFiles);
    // console.log(JSON.stringify(reverseDependencyMap));
    util.each(reverseDependencyMap, function (deps, rootPath) {
        if (util.isCss(rootPath)) {
            if (changeFiles && changeFiles.uptFiles) {
                var uptFiles = changeFiles.uptFiles;
                var flag = true;
                if (uptFiles.indexOf(rootPath) === -1) {
                    flag = false;
                    // if (deps && deps.length) {
                    //     var len = deps.length;
                    //     for (var i = 0, dep; dep = deps[i++];) {
                    //         // 依赖的入口文件有变化，也需要处理，涉及path替换
                    //         if (uptFiles.indexOf(dep) > -1 && biz.isExports(dep)) {
                    //             // console.log(dep);
                    //             // console.log(deps);
                    //             flag = true;
                    //             break;
                    //         }
                    //     }
                    // }
                }
                if (!flag) {
                    return;
                }
                // styl有修改，同时需要替换对应的deps， 所以deps同时也变化
                changeFiles.uptFiles = uptFiles.concat(deps);
            }
            // console.log('css file:' + rootPath);
            source++;
            cssTask.cssResolve(deps, rootPath, cb);
        }
    });
    if (!source && cb) {
         cb();
    }
};