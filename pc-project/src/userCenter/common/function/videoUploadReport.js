/**
 * @file 视频上传上报（在 pc 网页运行，手机、客户端勿用）
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var browser = require('cc/util/browser');

    /**
     * @param {Object} data
     * @property {boolean} data.isSuccess
     * @property {number} data.fid
     * @property {number} data.videoSize 视频大小
     * @property {number} data.uploadTime 上传耗时
     */
    return function (data) {
        WAT.send(
            WAT.toUrl('pb0.genshuixue.com', '/gs.gif'),
            {
                type: 'video_upload',
                stype: data.isSuccess ? 'success' : 'failure',
                user_number: userData.number,
                user_role: userData.type,
                guid: WAT.getCookie('__guid__'),
                fid: data.fid,
                video_name: data.videoName,
                video_size: data.videoSize,
                cdn_host: data.cdnHost,
                upload_time: data.uploadTime,
                browser: browser.name,
                _timestamp: $.now()
            }
        );
    };

});