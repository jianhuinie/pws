/**
 * @file 资料分享接口
 * @author wangtianhua
 */
define(function (require, exports, module) {

    'use strict';

    var service = require('../../common/service');

    /**
     * 获取资料库的资料
     * @return {Promise}
     * @param {string} data.path 资料库目录
     */
    exports.getDataFromNetdisk = function (data) {
        return service.post(
            '/tcenter/courses/files/netdisk',
            {
                path: data.path,
                course_number: data.courseNumber,
                course_type: data.courseType
            }
        );
    };
    /**
     * 修改资料信息
     * @return {Promise}
     * @param {string} data.fids 资料的 fid // 1,2,3
     * @param {int} data.courseNumber 课程number
     * @param {int} data.courseType 课程类型
     * @param {int} data.canDownload 是否可以下载
     * @param {int} data.isOpen 是否公开
     */
    exports.updateDataStatus = function (data) {
        return service.post(
            '/tcenter/courses/files/update-status',
            {
                course_number: data.courseNumber,
                course_type: data.courseType,
                can_download: data.canDownload,
                is_open: data.isOpen,
                fids: data.fids
            }
        );
    };

    /**
     * 资料移除
     * @return {Promise}
     * @param {string} data.fids 资料的 fid // 1,2,3
     * @param {int} data.courseNumber 课程number
     * @param {int} data.courseType 课程类型
     */
    exports.removeData = function (data) {
        return service.post(
            '/tcenter/courses/files/remove',
            {
                course_number: data.courseNumber,
                course_type: data.courseType,
                fids: data.fids
            }
        );
    };
});