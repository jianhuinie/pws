/**
 * @file 视频课
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var constant = require('../constant');

    return Ractive.extend({
        template: require('html!./CourseSection.html'),
        data: function () {
            return {

                // 第几课节
                sectionIndex: 1,

                COURSE_SECTION_PAY_STATUS_FREE: constant.COURSE_SECTION_PAY_STATUS_FREE,
                COURSE_SECTION_PAY_STATUS_TRIAL: constant.COURSE_SECTION_PAY_STATUS_TRIAL,
                COURSE_SECTION_PAY_STATUS_CHARGE: constant.COURSE_SECTION_PAY_STATUS_CHARGE,

                options: {

                    // 课节 id
                    sectionId: '',

                    // 课节名称
                    sectionName: '',

                    // 视频 id
                    videoId: '',

                    // 视频名称
                    videoName: '',

                    // 支付方式
                    payStatus: '',

                    hasError: false,
                    error: ''

                }
            };
        }
    });

});