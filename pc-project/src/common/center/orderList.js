/**
 * @file 订单列表
 * @author zhangjiayi
 */
define(function (require, exports) {

    'use strict';

    var store = require('common/store');
    var CancelOrderDialog = require('common/component/CancelOrderDialog');
    var EditOrderPriceDialog = require('common/component/EditOrderPriceDialog');
    var QuickLessonDialog = require('common/component/QuickLessonDialog');
    var CancelOrderPromptDialog = require('common/component/CancelOrderPromptDialog');
    var MakePhoneCallDialog = require('common/component/MakePhoneCallDialog');

    var service = require('common/service');

    exports.init = function () {

        var container = $('#content');
        var userType = store.get('user').type === 0
                     ? 'teacher'
                     : 'student';
        var orderList = store.get('orderList');


        container
        .on('click', '.invite-reserve', function (e) { // 请老师排课
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

                        var orderItem = target.closest('.order-item');
                        var teacherNum = orderItem.data('teachernum');
                        var teacherName = orderItem.data('teachername');

                        confirm({
                            content: '请不要提醒过于频繁哦<br />老师长时间未回应可直接拨打电话',
                            title: '温馨提示',
                            width: 330,
                            buttons: [
                                {
                                    text: '拨打电话',
                                    type: 'primary',
                                    handler: function () {
                                        this.hide();
                                        // 调起三方通话
                                        var from = store.get('user').number;
                                        var name = $(this).parent().data('name');

                                        new MakePhoneCallDialog({
                                            from: from,
                                            to: teacherNum,
                                            mobile: store.get('user').mobile,
                                            name: teacherName
                                        });
                                    }
                                },
                                {
                                    text: '取消',
                                    handler: function () {
                                        this.hide();
                                    }
                                }
                            ]
                        });

                    }

                }
            });

        })

        .on('click', '.cancel-order', function (e) {

            var target = $(this);

            var options = {
                userType: userType,
                type: 'order',
                url: target.data('url')
            }

            if (userType === 'student') {
                $.extend(
                    options,
                    {
                        price: target.data('price')
                    }
                );
            }

            new CancelOrderDialog(options);

        })

        .on('click', '.comment-order', function () {
            var params = {
                type: 'PC_Myorder',
                stype: 'comment_click',
                user_number: store.get('user').number
            };
            WAT.send('http://click.genshuixue.com/gs.gif', params);
        })

        .on('click', '.appeal-order', function (e) {

            var target = $(this);
            var options = {
                userType: userType,
                type: 'appeal',
                url: target.data('url')
            }

            if (userType === 'student') {

                options.cancelType = 'order';
                options.status = 'other';
                new CancelOrderPromptDialog(options);
            }
            else {
                new CancelOrderDialog(options);
            }


        })

        .on('click', '.edit-price', function (e) {
            var id = $(e.currentTarget).data('purchase-id');
            var order;

            $.each(orderList, function (index, object) {
                if (object.purchase_id == id) {
                    order = object;
                    return false;
                }
            });

            new EditOrderPriceDialog({
                order: order
            });

        })

        .on('click', '.open-qreserve', function (e) {

            var target = $(e.currentTarget);

            // 闪电约课 - 弹窗不再提醒
            var remind = store.get('user').qreserve_remind;

            if (remind == 1) {
                new QuickLessonDialog({
                    teacher_num: target.data('user-num')
                });
            }
            else if (remind == 0) {

                service
                .quickLesson({
                    qreserveSign: 1,
                    teacherNum: target.data('user-num')
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

        })

        .on('click', '.close-qreserve', function (e) {

            var target = $(e.currentTarget);

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
                    teacherNum: target.data('user-num')
                })
                .done(function (response) {
                    if (response.code === 0) {
                        // 直接刷新吧
                        success('闪电约课关闭', function () {
                            location.reload();
                        });
                    }
                });

            });

        })

        .on('click', '.confirm-pay', function (e) {
            var url = $(this).data('url');
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
                    // window.open(url);
                    location.href = url;
                }
            }
            else {
                // window.open(url);
                location.href = url;
            }
        })

        .on('click', '.confirm-nosuccess-pay', function (e) {

            var target = $(e.currentTarget);

            service
            .hasSuccBuy({
                purchaseId: target.data('pid')
            })
            .done(function (response) {
                if (response.code === 0) {
                    // 该订单包含已购买课程
                    if (response.data.has_buy) {
                        alert('你已报名该课程，请勿重复支付订单');
                    } else { // 跳转至支付页面
                        location.href = target.data('url');
                    }
                }
            });
        })
        
        

        
        

    };

});