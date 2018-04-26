/**
 * @file 压缩图片
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var compressImage = require('../function/compressImage');

    return function (url, width, height) {
        return compressImage({
            url: url,
            width: width,
            height: height
        });
    };

});