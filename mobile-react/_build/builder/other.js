/**
 * Created by bjhl on 16/1/14.
 */
const dependencyMap = require('../tool/feTree').dependencyMap;
const util = require('../tool/util');
const fs = require('fs');
const biz = require('../tool/biz');
const writeTask = require('../tasks/write');

exports.build = function () {
    util.each(dependencyMap, function (dps, pathName) {
        if (util.isOther(pathName)) {
            // 读取HTML文件，替换内容
            var content = fs.readFileSync(pathName);

            var fileName = biz.getReleaseMd5Name(biz.getReleaseName(pathName), content);

            writeTask.write(fileName, content);
        }
    });
};
