/**
 * @file SEM K12聚合页 - 聚惠学特价课程
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var service = require('common/service');
    var store = require('common/store');
    var Tooltip = require('cobble/ui/Tooltip');

    var container, searchBox, courseListBox;

    exports.init = function () {

        container = $('.special-wrapper');
        searchBox = container.find('.search-box');
        courseListBox = container.find('.course-list');

        searchBox
        .on('click', 'em.small', function (e) {
            var target = $(e.currentTarget);
            var currentUL = target.closest('ul');

            if (!target.hasClass('selected')) {

                currentUL
                .find('em.small')
                .each(function (index, item) {
                    $(item).removeClass('selected');
                });

                target.addClass('selected');
                getCourseList();

            }
        });

    }

    /*
     * ajax获取课程列表
     */
    function getCourseList () {

        var categoryId = searchBox.find('.category .selected').data('id') || '';
        var subjectId = searchBox.find('.subject .selected').data('id') || '';
        var areaId = searchBox.find('.areas .selected').data('id') || '';

        service
        .semInfoList({
            type: 'juhuixue',
            category: categoryId,
            subject: subjectId,
            area: areaId,
            source: store.get('source'),
            plan: store.get('plan'),
            group: store.get('group'),
            keyword: store.get('keyword'),
            q: store.get('query')
        })
        .done(function (response) {
            if (response.code === 0) {
                var list = response.data.tpl.info;
                courseListBox.html(list);
                Tooltip.init(container.find('[data-title]'));
            }
        });
    }

});