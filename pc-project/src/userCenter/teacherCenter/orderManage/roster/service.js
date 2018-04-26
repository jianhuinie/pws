/**
 * @file 接口层
 * @author wangyujie
 */
define(function (require, exports, module) {

    'use strict';

    var service = require('../../../common/service');

    /**
     * 筛选课程
     *
     * 返回数据：
     * {
     *     code: 0,
     *     data: {
               has_roster: true, // 是否有权限查看花名册
               shizi_login: false, // 从师资系统来的－师资系统无权限
     *         roster_list: [
                    pager: {
                        count: 72,
                        page: 1,
                        page_size: 10
                    }
                    list: [
                        {
                            name:
                            price:
                            course_number:
                            create_time:
                            cover: 课程封面
                            course_type:
                            succ_pay: 实际付款的学生数
                            max_student:
                            roster_url:
                        }
                    ]

     *         ],
     *     }
     * }
     *
     * @param {Object} data
     * @property {string} data.beginTime 上课时间年，如2016；为空，全部
     * @property {string} data.priceType 课程付费 1free, 2pay；为空，全部
     * @property {string} data.courseType 课程类型 1一对一,2线下班课,3视频课,8直播课；为空，全部
     * @property {number} data.page 页码 默认为1
     * @return {Promise}
     */
    exports.getRosterListAjax = function (data) {
        return service.post(
            '/teacher_center/roster_list_ajax',
            {
                begin_time: data.beginTime,
                price_type: data.priceType,
                course_type: data.courseType,
                page: data.page
            }
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




});