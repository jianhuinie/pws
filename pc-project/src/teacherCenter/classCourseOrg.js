/**
 * @file 机构系统，某科目下某班课展示
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var service = require('common/service');
    var classList = require('./course/classList');

    exports.init = function () {

        classList.init();

        var container = $('.class-course');

        container
        .on('click', '.open', function (e) {
            // 关闭其他
            container.find('.close').each(function () {
                $(this).click();
            });

            // 打开该项
            var target = $(e.currentTarget);
            var subjectId = target.data('subjectid');
            var trigger = target.closest('.list-trigger');
            var courseList = trigger.next('.course-list');

            target.hide();
            target.next('.close').show();

            // 请求该科目下班课列表
            service
            .getClassCourseList({
                subject_id: subjectId
            })
            .done(function (response) {
                if (response.code === 0) {
                    courseList.html(response.data.tpl.class_list);
                    courseList.show();

                    var Tooltip = require('cobble/ui/Tooltip');
                    Tooltip.init($('[data-title]'));
                }
            });
        })

        .on('click', '.close', function (e) {
            var target = $(e.currentTarget);
            var trigger = target.closest('.list-trigger');
            var courseList = trigger.next('.course-list');

            target.hide();
            target.prev('.open').show();
            courseList.hide();
        });

        // 默认展开班课信息
        // container.find('.course-list').show();

    };

});