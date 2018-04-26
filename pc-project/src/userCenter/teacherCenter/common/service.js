/**
 * @file 接口 - 顶导左导数据
 * @author wangyujie
 */
define(function (require, exports, module) {

    'use strict';

    var service = require('../../common/service');

    /**
     * 左导，审核状态
     *
     * @return {Promise}
     */
    exports.overviewAudit = function (data) {
        return service.post(
            '/teacher_center/overview',
            data
        );
    };

    /**
     * 获取用户基本信息，
     *
     * 如果传 userId 和 userType 表示获取指定用户的信息
     *
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

    /**老师个人中心－课程设置－获取课程列表数据
     *
     *
     *
     *@param lesson_way int 2直播课   4线下班课
     *@param keyword 搜索关键字 string（课程名或编号）
     *@param state 搜索班课状态 string 
     *@param page int 请求页面
     *@param order_by_pattern string asc/desc
     *@param order_by_column string price/total_pay/begin_time
     * 接口名 /tcenter/courses/class-courses/list
     * /mock/userCenter/teacherCenter/getCourseListAjax.php
     */
    exports.getCourseList = function (data) {
        return service.post(
            '/tcenter/courses/class-courses/list',
            data
        );
    };

    /**老师个人中心－课程设置－课程操作
     *
     *
     *
     *@param number int 课程编号
     *@param action  string 操作名称
     *     'toEdit'         编辑
     *     'submitVerify'   提交审核
     *     'revokeVerify'   撤回审核
     *     'stopEnroll'     停止招生
     *     'startEnroll'    开始/继续招生
     *     'closeCourse'    关闭课程
     *     'deleteCourse'   删除课程
     *     'changeTemplate' 修改课程模板
     *     'copyCourse'     再开一班
     *   接口名  /tcenter/courses/class-courses/do
     */
    exports.doCourseActions = function (data) {
        return service.post(
            '/tcenter/courses/class-courses/do',
            data
        );
    };


});