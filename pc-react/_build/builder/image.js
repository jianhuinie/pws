/**
 * Created by bjhl on 16/1/14.
 */
const util = require('../tool/util');
const biz = require('../tool/biz');
const writeTask = require('../tasks/write');
const config = require('../config');
const path = require('path');

exports.build = function (cb) {
    if (!util.isLocal()) {
        const iObject = biz.loadImage.getImages();
        // 上传图片
        if (iObject && iObject.images.length) {
            const imagePath = biz.getReleaseName(config.loadImagePath);
            writeTask.write(imagePath, JSON.stringify(iObject), function () {
                // 上传图片
                biz.loadImage.load(path.join(config['public'], imagePath), cb);
            });
        } else {
            cb && cb();
        }
    } else {
        cb && cb();
    }
};