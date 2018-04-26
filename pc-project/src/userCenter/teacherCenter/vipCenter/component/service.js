/**
 * @file 各种接口
 * @author wangyujie
 */
define(function (require, exports, module) {

    'use strict';

    var service = require('../../../common/service');

    /**
     * 获取当前老师信息ajax
     *
     * @return {Promise}
     * {
            province: "澳门",
            province_id: "553648128",
            city: "澳门",
            city_id: "553910272",
            mobile: "19900001111",
            teacher_name: "何宣朗老师的昵称显示"
     * }
     */
    exports.getTeacherLocationAjax = function () {
        return service.post(
            '/teacher_center/teacher_location_ajax'
        );
    };

    /**
     * 老师会员咨询 - 立即咨询
     * @param {Object} data
     * @param {number} data.city_id    当前用户选择数据库中市级ID
     * @param {number} data.mobile    手机号
     * @param {string=} data.info    留言
     * @return {Promise}
     *
     */
    exports.vipTeacherRecord = function (data) {
        return service.post(
            '/teacher_center/vip_teacher_record',
            {
                city_id: data.cityId,
                mobile: data.mobile,
                info: data.info
            }
        );
    };

});