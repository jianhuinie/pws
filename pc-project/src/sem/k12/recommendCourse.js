/**
 * @file SEM K12聚合页 - 推荐课程
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var service = require('common/service');
    var store = require('common/store');
    var Tooltip = require('cobble/ui/Tooltip');

    var container, middleSearchBox, highSearchBox, middleCourseBox, highCourseBox;
    var cat = 'middle'; // 初中/高中

    exports.init = function () {

        container = $('.recommend-course');
        middleSearchBox = container.find('.middle .search-box');
        highSearchBox = container.find('.high .search-box');
        middleCourseBox = container.find('.middle .course-list');
        highCourseBox = container.find('.high .course-list');

        // url中带的参数
        var source = store.get('source');
        var plan = store.get('plan');
        var group = store.get('group');
        var keyword = store.get('keyword');
        var query = store.get('query');
        var city = store.get('city');

        container
        .on('click', '.tab-nav', function (e) {
            var target = $(e.currentTarget);
            if (!target.hasClass('active')) {

                container
                .find('.tab-nav')
                .each(function (index, item) {
                    $(item).removeClass('active');
                });

                target.addClass('active');
                cat = target.data('cat');
                container.find('.recommend-course-box').toggle();
            }
        })

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
        })

        .on('click', '.more .btn-default', function (e) { // 更多课程
            var target = $(e.currentTarget);
            var param = getMoreUrl(cat);
            var url = '/sc/' + param + '.html?';

            if (source) {
                url += 'source=' + source;
            }
            if (plan) {
                url += '&plan=' + plan;
            }
            if (group) {
                url += '&group=' + group;
            }
            if (keyword) {
                url += '&keyword=' + keyword;
            }
            if (query) {
                url += '&q=' + query;
            }
            if (city) {
                url += '&city=' + city;
            }

            target.attr('href', url);
        });

    }

    /*
     * ajax获取课程列表
     */
    function getCourseList () {

        var categoryId, subjectId, areaId;

        if (cat == 'middle') {
            categoryId = "161,237";
            subjectId = middleSearchBox.find('.subject .selected').data('id') || '';
            areaId = middleSearchBox.find('.areas .selected').data('id') || '';
        }
        else if (cat == 'high') {
            categoryId = "266,342";
            subjectId = highSearchBox.find('.subject .selected').data('id') || '';
            areaId = highSearchBox.find('.areas .selected').data('id') || '';
        }

        service
        .semInfoList({
            type: 'course',
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
                if (cat == 'middle') {
                    middleCourseBox.html(list);
                }
                else if (cat == 'high') {
                    highCourseBox.html(list);
                }
                Tooltip.init(container.find('[data-title]'));
            }
        });
    }

    /*
     * 拼接更多课程URL
     * @param cate 种类middle\high
     */
    function getMoreUrl (cate) {

        var url = '', subject, catId, areaId;

        // 科目 subject
        container.find('.' + cate)
        .find('.subject .small')
        .each(function (index, item) {
            if ($(item).hasClass("selected") && $(item).text() != '全部') {
                subject = $(item).text();
                url += subject;
            }
        });

        // 类别 catId
        if (cate == 'middle') {
            catId = "161,237";
        }
        else if (cate == 'high') {
            catId = "266,342";
        }
        url += '-' + catId;

        // 区域 areaId
        container.find('.' + cate)
        .find('.areas .small')
        .each(function (index, item) {
            if ($(item).hasClass("selected") && $(item).text() != '全部') {
                areaId = $(item).data('id');
                url += '-' + areaId;
            }
        });

        return url;

    }

});