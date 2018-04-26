/**
 * @file 视频课水印接口
 * @author wangtianhua
 */
define(function (require, exports, module) {
    'use strict';

    var service = require('../../common/service');

    /**
     * 扣分申述
     * @param {Obejct} data
     * @property {number} data.watermark_id 图片id
     * @property {string} data.enable_watermark 是否需要
     * @return {Promise}
    */

    exports.waterMark = function (data) {
        return service.post(
            '/video_course/setwatermark',
            {
                enable_watermark: data.switchmark,
                watermark_id: data.imageId
            }
        );
    }
})