/**
 * @file 课程排序接口
 * @author wangyujie
 */
define(function (require, exports, module) {

    'use strict';

    var service = require('../../common/service');


    /**
     * 保存排序
     * @param {Object} data
     * @param {number} data[0].number 课程编号
     * @param {number} data[0].type 课程类型
     * @return {Promise}
     *
     */
    exports.sortSave = function (data) {
        return service.post(
            '/tcenter/courses/all-courses/sort', data
        );
    };



});