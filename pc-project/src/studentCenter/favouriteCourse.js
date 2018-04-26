/**
 * @file 我的收藏 - 课程收藏
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var service = require('common/service');

    var container = $('#content');
    var dataContainer = container.find('.data-container');
    var pageContainer = container.find('.page-container');

    /*
     * 加载分页数据
     * @param  {number}   page      页数
     * @param  {string}   type      类型 course  class_course  video_course
     * @param  {Function=} callback 成功后的回调
     */
    function loadData (page, type, callback) {

        var data = {};
        dataContainer.html('');
        pageContainer.html('');

        data = {
            type: type,
            page: page
        };

        service
        .getFavorList(data)
        .done(function (response) {
            if (response.code == 0) {

                // 后端返回的数据列表
                var items = response.data.tpl.collections;
                var list = $(items).find('ul.course-list');
                var pager = $(items).find('.pager-block');
                var noData = $(items).find('.no-data');

                if (list.length) {
                    dataContainer.html(list);
                    pageContainer.html(pager);
                }
                else {
                    dataContainer.html(noData);
                }

                if ($.isFunction(callback)) {
                    callback();
                }

            }
        });

    }

    exports.init = function () {

        // 初始加载全部课程
        loadData(1, 'course');

        container
        .on('mouseover', '.course-list li', function (e) { // 出现删除icon
            var target = $(e.currentTarget);
            var batchConfirm = target.find('.batch-confirm'); // 与批量操作不同时出现
            var actionDel = target.find('.action-del');
            if (batchConfirm.is(':hidden')) {
                actionDel.show();
            }
        })

        .on('mouseleave', '.course-list li', function (e) { // 隐藏删除icon
            var target = $(e.currentTarget);
            var actionDel = target.find('.action-del');
            actionDel.hide();
        })

        .on('click', '.action-del', function (e) { // 取消收藏
            var target = $(e.currentTarget);
            var currLi = target.closest('li');
            currLi.find('.del-confirm').show();
            target.hide();
        })

        .on('click', '.del-confirm .btn-primary', function (e) { // 取消收藏 - 确认
            var target = $(e.currentTarget);
            var currConfirm = target.closest('.del-confirm');
            var currLi = target.closest('li');

            currConfirm.hide();

            service
            .deleteFavor({
                type: currLi.data('type'),
                number: currLi.data('number')
            })
            .done(function (response) {
                if (response.code === 0) {
                    success('取消收藏成功', function () {
                        location.reload();
                    });
                }
            });
        })

        .on('click', '.del-confirm .btn-default', function (e) { // 取消收藏 - 取消
            var target = $(e.currentTarget);
            var currConfirm = target.closest('.del-confirm');
            var currLi = target.closest('li');

            currConfirm.hide();
        })

        .on('click', '.batch-option', function (e) { // 批量管理
            var target = $(e.currentTarget);
            var batch = target.next('.batch');

            target.hide();
            batch.show();
            // 批量操作界面出现
            container
            .find('.batch-confirm')
            .each(function (index, item) {
                $(item).show();
            });
        })

        .on('click', '.batch-confirm', function (e) { // 批量确认
            var target = $(e.currentTarget);
            var currLi = target.closest('li');

            currLi.data('checked', '1');
            target.find('.icon-check-o').toggle();
            target.find('.icon-check-circle').toggle();
        })

        .on('click', 'input[id="select-all"]', function (e) { // 全选
            var target = $(e.currentTarget);

            if (target.prop('checked')) {
                container
                .find('.course-item')
                .each(function (index, item) {
                    $(item).data('checked', '1');
                    $(item).find('.batch-confirm .icon-check-o').hide();
                    $(item).find('.batch-confirm .icon-check-circle').show();
                });
            }
            else {
                container
                .find('.course-item')
                .each(function (index, item) {
                    $(item).data('checked', '0');
                    $(item).find('.batch-confirm .icon-check-o').show();
                    $(item).find('.batch-confirm .icon-check-circle').hide();
                });
            }
        })

        .on('click', '.delete-all', function (e) { // 批量删除

            var count = 0;
            var classCourse = [];
            var videoCourse = [];

            container
            .find('.course-item')
            .each(function (index, item) {

                if ($(item).data('checked') == 1) {

                    count++;
                    if ($(item).data('type') == 'class_course') {
                        classCourse.push($(item).data('number'));
                    }
                    else if ($(item).data('type') == 'video_course') {
                        videoCourse.push($(item).data('number'));
                    }
                }
            });

            if (count == 0) {
                alert('亲，请先选择要删除的课程！');
                return false;
            }

            confirm({
                content: '确认删除？',
                title: '温馨提示',
                width: 335
            })
            .done(function () {

                service
                .deleteFavor({
                    type: 'course',
                    classCourse: classCourse.join(','),
                    videoCourse: videoCourse.join(','),
                })
                .done(function (response) {
                    if (response.code === 0) {
                        success('取消收藏成功', function () {
                            location.reload();
                        });
                    }
                });
            });
        })

        .on('click', '.cancel-batch-option', function (e) { // 取消批量管理option
            var target = $(e.currentTarget);
            var batch = target.closest('.batch');
            var batchOption = batch.prev('.batch-option');

            batch.hide();
            batchOption.show();
            // 批量操作界面消失
            container
            .find('.batch-confirm')
            .each(function (index, item) {
                $(item).hide();
            });
        })

        .on('click', '#all-course', function (e) { // 全部课程
            var target = $(e.currentTarget);

            if (target.hasClass('active')) {
                return false;
            }

            service
            .getFavorList({
                type: 'course',
                page: 1
            })
            .done(function (response) {
                if (response.code === 0) {
                    // 后端返回的数据列表
                    var items = response.data.tpl.collections;
                    var list = $(items).find('ul.course-list');
                    var pager = $(items).find('.pager-block');
                    var noData = $(items).find('.no-data');

                    target.addClass('active');
                    container.find('#nav-class-course').removeClass('active');
                    container.find('#nav-video-course').removeClass('active');

                    if (list.length) {
                        dataContainer.html(list);
                        pageContainer.html(pager);
                    }
                    else {
                        dataContainer.html(noData);
                    }
                }
            });
        })

        .on('click', '#nav-class-course', function (e) { // 班课
            var target = $(e.currentTarget);

            if (target.hasClass('active')) {
                return false;
            }

            service
            .getFavorList({
                type: 'class_course',
                page: 1
            })
            .done(function (response) {
                if (response.code === 0) {
                    // 后端返回的数据列表
                    var items = response.data.tpl.collections;
                    var list = $(items).find('ul.course-list');
                    var pager = $(items).find('.pager-block');
                    var noData = $(items).find('.no-data');

                    target.addClass('active');
                    container.find('#all-course').removeClass('active');
                    container.find('#nav-video-course').removeClass('active');

                    if (list.length) {
                        dataContainer.html(list);
                        pageContainer.html(pager);
                    }
                    else {
                        dataContainer.html(noData);
                    }
                }
            });
        })

        .on('click', '#nav-video-course', function (e) { // 视频课
            var target = $(e.currentTarget);

            if (target.hasClass('active')) {
                return false;
            }

            service
            .getFavorList({
                type: 'video_course',
                page: 1
            })
            .done(function (response) {
                if (response.code === 0) {
                    // 后端返回的数据列表
                    var items = response.data.tpl.collections;
                    var list = $(items).find('ul.course-list');
                    var pager = $(items).find('.pager-block');
                    var noData = $(items).find('.no-data');

                    target.addClass('active');
                    container.find('#nav-class-course').removeClass('active');
                    container.find('#all-course').removeClass('active');

                    if (list.length) {
                        dataContainer.html(list);
                        pageContainer.html(pager);
                    }
                    else {
                        dataContainer.html(noData);
                    }
                }
            });
        })

        .on('click', '.pager [data-page]', function () { // 点击分页

            var curPage = $(this).data('page');
            var type;

            container
            .find('.tab-nav .nav-item')
            .each(function (index, item) {
                if ($(item).hasClass('active')) {
                    type = $(item).data('type');
                }
            });

            loadData(curPage, type);
            return false;
        });

    };


});