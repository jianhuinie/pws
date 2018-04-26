/**
 * @file 接口 - 老师个人主页
 * @author wangyujie
 */
define(function (require, exports, module) {

    'use strict';

    var service = require('../../common/service');

    /**
     * 获取当前签到状态及签到日历
     * @param  {Object} data
     * @param  {string} data.month 月份，如果为空默认是当月
     * @return {Promise}
     */
    exports.getCheckinCalendar = function (data) {
        return service.post(
            '/teacher_center/getCheckinCalendar',
            {
                month: data.month
            }
        );
    };

    /**
     * 老师签到
     * @param  {Object} data
     * @param  {number} data.mood 图片表情
     * @param  {string} data.text 一句话心情
     * @return {Promise}
     */
    exports.checkin = function (data) {
        return service.post(
            '/teacher_center/checkin',
            {
                mood: data.mood,
                text: data.text
            }
        );
    };

    /**
     * 快速排课 - 获取一对一学生列表
     * @param {Object} data
     * @property {string} data.keyword 搜索关键词
     * @return {Promise}
     */
    exports.getCourseStudentList = function (data) {
        return service.post(
            '/teacher_center/courseList',
            {
                keyword: data.keyword
            }
        );
    };

    /**
     * 快速排课 - 获取某学生一对一订单列表
     * @param {Object} data
     * @property {string} data.userNumber 学生number
     * @property {string} data.displayName 订单展示姓名
     * @return {Promise}
     */
    exports.getStudentVIPOrderList = function (data) {
        return service.post(
            '/teacher_center/orderForm',
            {
                user_num: data.userNumber,
                display_name: data.displayName
            }
        );
    };

    /**
     * 首次开通会员提示 － 不再提示
     * @return {Promise}
     */
    exports.ajaxVipRemind = function () {
        return service.post(
            '/teacher_center/ajaxVipRemind'
        );
    };

    /**
     * 检测主页完善度
     * @return {Promise}
     */
    exports.ajaxTaskList = function () {
        return service.post(
            '/teacher_center/ajaxTaskList'
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


    /**
     * 不再提醒
     * @param {Object} data
     * @property {string} data.key 指定弹窗
     * @return {Promise}
     */
    exports.closeRemind = function (data) {
        return service.post(
            '/dialog_reminding/close_remind',
            {
                key: data.key
            }
        );
    };

    /**
     * 获取待办事项
     * @param {Object} data
     * @return {Promise}
     */
    exports.getBacklog = function (data) {
        return service.post(
            '/teacher_center/indexCountAjax'
        );
    };

});