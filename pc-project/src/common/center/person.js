/**
 * @file  我的订单（我的老师、我的学生）
 * @author zhangjiayi
 */
define(function (require, exports) {

    'use strict';

    var CancelOrderDialog = require('common/component/CancelOrderDialog');
    var QuickLessonDialog = require('common/component/QuickLessonDialog');
    var EditOrderPriceDialog = require('common/component/EditOrderPriceDialog');
    var MakePhoneCallDialog = require('common/component/MakePhoneCallDialog');
    var store = require('common/store');
    var SaveButton = require('common/component/SaveButton');
    var service = require('common/service');

    exports.init = function () {

        var container = $('#content');
        var userType = store.get('user').type === 0
                     ? 'teacher'
                     : 'student';

        var pageStatus = store.get('status');
        if (!pageStatus) {
            pageStatus = 1;
        }

        container
        .on('click', '.cancel-order', function (e) {

            var target = $(e.currentTarget);
            var url = target.data('url');

            var options = {
                userType: userType,
                type: 'order',
                url: target.data('url')
            }

            if (userType === 'student') {
                $.extend(options, {price: target.data('price')});
            }

            new CancelOrderDialog(options);
        })

        .on('click', '.appeal-order', function (e) {

            var target = $(e.currentTarget);
            var url = target.data('url');

            new CancelOrderDialog({
                userType: userType,
                type: 'appeal',
                url: url
            });
        })

        .on('click', '.edit-price', function (e) {

            var target = $(e.currentTarget);
            var order = target.data('order');

            new EditOrderPriceDialog({
                editTotalPrice: target.data('isclasscourse') ? true : false,
                order: order
            });
        })

        .on('click', '.check-order', function (e) {

            var target = $(e.currentTarget);
            var personContainer = target.closest('.person');
            var listContainer = personContainer.find('.order-list');
            var status = listContainer.data('status');

            if (status == 'nodata') {

                var num = target.data('user-number');
                var price = target.data('price');

                var data = {
                    status: pageStatus
                };

                var method;

                if (userType === 'student') {
                    method = 'getTeacherOrderList';
                    data.number = target.data('user-number');
                }
                else {
                    method = 'getStudentOrderList';
                    data.number = target.data('user-number');
                }

                service[method](data)

                .done(function (response) {

                    if (response.code === 0) {
                        var tpl = response.data.tpl.order_list;
                        var listData = response.data.order_list;
                        listContainer.append(tpl);
                        listContainer.slideDown('fast');
                        target.html('收起订单<i class="icon icon-angle-up"></i>');
                        listContainer.data('status', 'opend');
                        container.find('.order-progress-bar').each(function (index) {
                            var target = $(this);
                            var percent = target.data('percent');
                            target.width(150);
                            target.find('.order-progress-persent').width(percent * 1.5);
                        });

                        // 加载模板的title
                        var Tooltip = require('cobble/ui/Tooltip');
                        Tooltip.init($('[data-title]'));

                    }

                });

            }
            else if (status == 'closed') {
                target.html('收起订单<i class="icon icon-angle-up"></i>');
                listContainer.slideDown('fast');
                listContainer.data('status', 'opend');

            }
            else if (status == 'opend') {
                target.html('查看订单<i class="icon icon-angle-down"></i>');
                listContainer.slideUp('fast');
                listContainer.data('status', 'closed');

            }
        })

        .on('click', '.more', function () {

            var page = store.get('page');
            page++;
            store.set('page', page);

            var method = userType === 'student'
                       ? 'getTeacherList'
                       : 'getStudentList';

            service[method]({
                page: page,
                status: pageStatus
            })
            .done(function (response) {
                if (response.code === 0) {

                    var html = response.data.tpl.person_list;
                    container.find('.person-list').append(html);

                    if (response.data.more == 0) {
                        container.find('.more').remove();
                    }

                }
            });
        })

        .on('click', ':checkbox', function (e) {

            var target = $(e.currentTarget);
            var qlessonBox = target.closest('.quick-lesson-box');

            if (target.prop('checked')) { // 开启

                // 闪电约课 - 弹窗不再提醒
                var remind = store.get('user').qreserve_remind;

                if (remind == 1) {
                    new QuickLessonDialog({
                        teacher_num: qlessonBox.data('user-number'),
                        closeDialog: function () {
                            target.prop('checked', false);
                        }

                    });
                }
                else if (remind == 0) {

                    service
                    .quickLesson({
                        qreserveSign: 1,
                        teacherNum: qlessonBox.data('user-number')
                    })
                    .done(function (response) {
                        if (response.code === 0) {
                            // 直接刷新吧
                            success('闪电约课开启', function () {
                                location.reload();
                            });
                        }
                    });

                }

            }
            else { // 取消

                confirm({
                    content: '关闭闪电约课后，该老师向你发起的约课以及时间修改需要手动确认，是否确定要关闭？',
                    title: '温馨提示',
                    width: 330
                })
                .done(function () {

                    // 取消闪电约课
                    service
                    .quickLesson({
                        qreserveSign: 0,
                        teacherNum: qlessonBox.data('user-number')
                    })
                    .done(function (response) {
                        if (response.code === 0) {
                            // 直接刷新吧
                            success('闪电约课关闭', function () {
                                location.reload();
                            });
                        }
                    });

                })
                .fail(function () {
                    target.prop('checked', true);
                });

            }
        })

        .on('click', '.person [data-mobile]', function () { // 拨打电话

            var from = store.get('user').number;
            var to  = $(this).data('number');
            var name = $(this).data('name');

            new MakePhoneCallDialog({
                from: from,
                to: to,
                mobile: store.get('user').mobile,
                name: name
            });
        })

        .on('click', '.confirm-pay', function (e) {
            if ($(this).data('video-course')) {
                var lessonType = $(this).data('lesson-type');
                if (lessonType == 1) {
                    alert({
                        title: '温馨提示',
                        content: '该课程已被发布者改为免费课程，请取消订单后直接观看该课程。'
                    });
                }
                else if (lessonType == 2) {
                    alert({
                        title: '温馨提示',
                        content: '该课程已被发布者下架，请取消订单。'
                    });
                }
                else {
                    window.open($(this).data('url'));
                }
            }
            else {
                window.open($(this).data('url'));
            }
        })

        .on('click', '.invite-reserve', function (e) {
            var target = $(e.currentTarget);
            var purchaseId = target.data('pid');

            service
            .inviteTeacherReserve({
                purchaseId: purchaseId
            })
            .done(function (response) {
                if (response && response.code === 0) {

                    var data = response.data;
                    if (data.times == 1) {
                        alert('已经提醒老师，请耐心等待老师为你排课');
                    }
                    else if (data.times >= 2) {
                        alert('已经提醒老师，请不用重复提交请求');
                    }

                }
            });
        });
    };

});