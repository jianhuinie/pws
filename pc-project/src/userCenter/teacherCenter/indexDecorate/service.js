/**
 * @file 接口 - 主页装修
 * @author wangyujie
 */
define(function (require, exports, module) {

    'use strict';

    var service = require('../../common/service');

    /**
     * 发布
     * @param  {Object} data
     * @param  {string=} data.tempMName 选中的 M 模板名
     * @param  {string=} data.tempPcName 选中的 Pc 模板名
     * @return {Promise}
     */
    exports.updateTemplate = function (data) {
        return service.post(
            '/teacher_center/update_template',
            {
                template_m: data.tempMName,
                template_pc: data.tempPcName
            }
        );
    };

    /**
     * 获取用户基本信息
     *
     * 如果传 userId 和 userType 表示获取指定用户的信息
     * 如果不传，表示获取当前 session 用户的信息
     *
     * 返回数据：
     * {
     *     code: 0, 成功
     *     data: {
     *         mobile: "123",
     *         user_type: "2",
     *         user_id: "123",
     *         avatar: "url",
     *         user_name: "name",
     *         user_name_cut: "name",
     *         user_number: "123",
     *         org_id: "23" // 机构number 0为非机构
     *     }
     * }
     *
     * @param {?Object} data 可不传
     * @property {string} data.userId
     * @property {string} data.userType
     */
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





});