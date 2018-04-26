/**
 * @file 课程信息
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    return Ractive.extend({
        template: require('html!./CourseInfo.html'),
        data: function () {
            return {
                options: {
                    cover: '',
                    title: '',
                    price: '',
                    iosPrice: '',
                    expireDay: 0,
                    intro: '',
                    subjects: [],
                    language: '',
                    tags: [],
                    getAuditErrorMessage: $.noop
                }
            };
        }
    });

});