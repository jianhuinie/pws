/**
 * @file 视频课常量
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    /**
     * 免费视频课
     *
     * @type {number}
     */
    exports.COURSE_SECTION_PAY_STATUS_FREE = 1;

    /**
     * 付费视频课
     *
     * @type {number}
     */
    exports.COURSE_SECTION_PAY_STATUS_CHARGE = 2;

    /**
     * 试听视频课
     *
     * @type {number}
     */
    exports.COURSE_SECTION_PAY_STATUS_TRIAL = 3;

    /**
     * 课节操作 - 新增
     *
     * @type {number}
     */
    exports.COURSE_SECTION_ACTION_CREATE = 1;

    /**
     * 课节操作 - 修改
     *
     * @type {number}
     */
    exports.COURSE_SECTION_ACTION_EDIT = 2;

    /**
     * 课节操作 - 删除
     *
     * @type {number}
     */
    exports.COURSE_SECTION_ACTION_DELETE = 3;

    /**
     * 视频课状态 - 发布课程
     *
     * @type {number}
     */
    exports.COURSE_STATUS_PUBLISH = 1;

    /**
     * 视频课状态 - 发布至待发布列表
     *
     * @type {number}
     */
    exports.COURSE_STATUS_WAITING_PUBLISH = 2;

    /**
     * 视频检查失败
     *
     * @type {number}
     */
    exports.VIDEO_STATUS_CHECK_FAILURE = 2;

    /**
     * 视频审核失败
     *
     * @type {number}
     */
    exports.VIDEO_STATUS_AUDIT_FAILURE = 4;

});