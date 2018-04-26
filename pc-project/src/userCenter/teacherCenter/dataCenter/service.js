/**
 * @file 数据中心接口
 * @author wangtianhua
 */
define(function (require, exports, module) {
    'use strict';

    var service = require('../../common/service');

    /**
     * 扣分申述
     * @param {Obejct} data
     * @property {number} data.deduct_id 申述id
     * @property {string} data.reason 申诉原因
     * @property {string} data.attach_photos 照片id1,id2,id3
     * @return {Promise}
    */

    exports.deductAppeal = function (data) {
        return service.post(
            '/teacher/deductAppeal',
            {
                deduct_id: data.deduct_id,
                reason: data.reason,
                attach_photos: data.photoList
            }
        );
    }

    /**
     * 扣分申述中 成功 失败
     * @param {Obejct} data
     * @property {number} data.deduct_id 申述id
     * @return {Promise}
    */

    exports.deductDetail = function (data) {
        return service.post(
            '/teacher/deductAppealDetail',
            {
                deduct_id: data.deduct_id
            }
        );
    }

    /**
     * 数据中心
     * @param {Obejct} data
     * @property {number} data.range 请求相应的时间段的数据
     * @return {Promise}
    */

    exports.getVistdate = function (data) {
        return service.post(
            '/teacher_center/visit_data_ajax',
            {
                range: data.range
            }
        );
    }

    exports.getUserBasicInfo = function (data) {

        var params;

        if (data && data.userId != null && data.userType != null) {
            params = {
                user_id: data.userId,
                user_type: data.userType
            };
        }

        return service.post(
            '/user/basicInfo',
            params
        );
    };
})