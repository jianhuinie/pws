/**
 * @file 编辑器接口
 * @author wangtianhua
 */
define(function (require, exports, module) {

    'use strict';

    var service = require('../../../common/service');

    function post(url, data) {
        return service.post(url, data)
        .then(null, function (response) {
            if (response.msg) {
                alert({
                    title: '温馨提示',
                    content: response.msg
                });
            }
            return response;
        });
    }

    /**
     * 获取视频课视频上传地址
     *
     * 返回数据：
     * {
     *     code: 0,
     *     data: {
     *         upload_url: '',
     *         id: ''
     *     }
     * }
     *
     * @param {Object} data
     * @property {string} data.fileName 文件名，如 abc.mp4
     * @property {number} data.fileSize 文件大小
     * @return {Promise}
     */
    exports.getVideoUploadUrl = function (data) {
        // hurry: 多次提示
        return service.post(
            '/tcenter/foundation/storage/get-upload-video-url',
            {
                filename: data.fileName,
                total_size: data.fileSize,
                cdn_host: data.cdnHost,
                // 后端定义字段，班课为7
                from_type: 7,
                priority: 1
            }
        );
        // return service.post(
        //     '/video_course/getuploadurl',
        //     {
        //         user_number: userData.number,
        //         title: data.fileName,
        //         total_size: data.fileSize,
        //         uploadtype: 1
        //     }
        // );
    };

    /**
     * 获取视频课视频上传地址
     *
     * 返回数据：
     * {
     *     code: 0,
     *     data: {
     *         upload_url: '',
     *         id: ''
     *     }
     * }
     *
     * @param {Object} data
     * @property {string} data.fileName 文件名，如 abc.mp4
     * @property {number} data.fileSize 文件大小
     * @return {Promise}
     */
    exports.uploadSuccCallback = function (data) {
        // hurry: 多次提示
        return post(
            '/tcenter/foundation/storage/upload-video-callback',
            {
                id: data.id
            }
        );
        // return service.post(
        //     '/video_course/getuploadurl',
        //     {
        //         user_number: userData.number,
        //         title: data.fileName,
        //         total_size: data.fileSize,
        //         uploadtype: 1
        //     }
        // );
    };

    /**
     * 获取视频课视频续传地址
     *
     * 返回数据：
     * {
     *     code: 0,
     *     data: {
     *         upload_size: 10, // 已上传的大小
     *         upload_url: '',
     *         id: ''
     *     }
     * }
     *
     * @param {Object} data
     * @property {string} data.videoId
     * @return {Promise}
     */
    exports.getVideoResumeUploadUrl = function (data) {
        return post(
            '/video_course/getresumeuploadurl',
            {
                user_number: userData.number,
                video_id: data.videoId
            }
        );
    };

});