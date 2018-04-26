/**
 * @file  订单详情
 * @author zhangjiayi
 */
define(function (require, exports) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var Tooltip = require('cobble/ui/Tooltip');

    var baiduMap = require('common/map/baidu');
    var CancelOrderDialog = require('common/component/CancelOrderDialog');
    var CancelOrderPromptDialog = require('common/component/CancelOrderPromptDialog');
    var EditReservedLessonDialog = require('common/component/EditReservedLessonDialog');
    var EditOrderPriceDialog = require('common/component/EditOrderPriceDialog');
    var QuickLessonDialog = require('common/component/QuickLessonDialog');
    var MakePhoneCallDialog = require('common/component/MakePhoneCallDialog');
    var CallingDialog = require('common/component/CallingDialog');

    var store = require('common/store');
    var schedule = require('common/center/schedule');
    var service = require('common/service');

    exports.init = function () {

        var container = $('#main');
        var profileMap = null;

        var userType = store.get('user').type === 0
                     ? 'teacher'
                     : 'student';

        container
        .on('click', '.search-map', function() {
            if (profileMap) {
                profileMap.show();
            } else {
                var offline = $(this).data('offline');
                // console.log(offline);
                var map = '<div id="map" style="height:400px;"></div>';
                profileMap = new Dialog({
                    title: '上课地址',
                    content: map,
                    disposeOnHide: false,
                    width: 600,
                    onBeforeShow: function(){
                        baiduMap.modifiedAddress('map', offline.lng, offline.lat);
                    }
                });
            }
        })

        .on('click', '.cancel-order', function (e) {

            var target = $(this);

            var data = {
                userType: userType,
                type: 'order',
                pageType: 'orderDetail',
                url: target.data('url')
            };

            if (userType === 'student') {
                data.price = store.get('restPrice');
                new CancelOrderDialog(data);
            }
            else {
                service
                    .getRefundMoney({
                        purchaseId: +store.get('purchaseId')
                    })
                    .then(function (response) {
                        data.price = response.data.money;
                        new CancelOrderDialog(data);
                    });
            }

            
        })

        .on('click', '.appeal-order', function (e) {

            var target = $(this);
            var data = {
                userType: userType,
                type: 'appeal',
                pageType: 'orderDetail',
                url: target.data('url')
            }

            if (userType === 'student') {

                data.cancelType = "order";
                data.status = "other";

                new CancelOrderPromptDialog(data);

            }
            else {
                new CancelOrderDialog(data);
            }
        })

        .on('click', '.comment-order', function () {
            var params = {
                type: 'PC_Myorder',
                stype: 'commentbutton_click',
                user_number: store.get('user').number
            };
            WAT.send('http://click.genshuixue.com/gs.gif', params);
        })

        .on('click', '.edit-price', function (e) {

            var data = $(this).data();

            new EditOrderPriceDialog({
                editTotalPrice: data.isClassCourse ? true : false,
                order: {
                    purchase_id: store.get('purchaseId'),
                    hours: store.get('hours'),
                    create_time: store.get('createTime'),
                    pay_money: store.get('payMoney'),
                    price: store.get('price'),
                    display_name: store.get('studentName'),
                    course_name: store.get('courseNameCut')
                }
            });
        })

        .on('click', '.toggle', function (e) {

            var target = $(this);
            var wrapper = target.prev('.wrapper');

            var icon = target.find('.icon');
            var html = '<i class="icon icon-angle-';

            if (icon.hasClass('icon-angle-up')) {
                html += 'down"></i>展开';
                wrapper.hide();
            }
            else {
                html += 'up"></i>收起';
                wrapper.show();
            }

            target.html(html);
        })

        .on('click', '.confirm-pay', function (e) {

            var target = $(this);

            confirm('确认支付该订单吗？', '温馨提示')
            .done(function () {
                service
                .post(target.data(url))
                .done(function (response) {
                    if (response.code === 0) {
                        success('支付成功', function () {
                            location.reload();
                        });
                    }
                })
            });
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

        .on('click', '.action-modify_time', function (e) {

            var target = $(this);
            new EditReservedLessonDialog({
                lessonInfo: target.data().json
            });
        })

        .on('click', '[name="quick-lesson"]', function (e) {

            var target = $(e.currentTarget);
            var qlessonBox = target.closest('.quick-lesson-box');

            if (target.prop('checked')) { // 开启

                // 闪电约课 - 弹窗不再提醒
                var remind = store.get('user').qreserve_remind;

                if (remind == 1) {
                    new QuickLessonDialog({
                        teacher_num: qlessonBox.data('user-num'),
                        closeDialog: function () {
                            target.prop('checked', false);
                        }

                    });
                }
                else if (remind == 0) {

                    service
                    .quickLesson({
                        qreserveSign: 1,
                        teacherNum: qlessonBox.data('user-num')
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
                        teacherNum: qlessonBox.data('user-num')
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

        .on('click', '.user-item .mobile .icon-call', function () {
            var from = store.get('user').number;
            var to  = $(this).parent().data('number');
            var name = $(this).parent().data('name');
            var role = $(this).parent().data('role');

            new MakePhoneCallDialog({
                from: from,
                to: to,
                mobile: store.get('user').mobile,
                name: name,
                role: role
            });
        })

        .on('click', '.org-item .mobile .icon-call', function () {
            var orgNumber  = $(this).parent().data('orgNumber');
            var name = $(this).parent().data('name');

            new CallingDialog({
                name: name,
                orgNumber: orgNumber
            });
        })

        .on('click', '.fire-record .confirm-fire', function () { // 确认消课
            var td = $(this).closest('td');
            var serialNumber = td.data('number');

            service
            .confirmClassFire({
                serialNumber: serialNumber,
                type: 1
            })
            .done(function (response) {
                if (response.code === 0) {
                    td.html('已确认');
                }
            });
        })

        .on('click', '.fire-record .refuse-fire', function () { // 拒绝消课
            var td = $(this).closest('td');
            var serialNumber = td.data('number');

            service
            .confirmClassFire({
                serialNumber: serialNumber,
                type: 2
            })
            .done(function (response) {
                if (response.code === 0) {
                    td.html('已拒绝');
                    alert({
                        title: '温馨提示',
                        content: '您已拒绝了该课消申请，如有疑问可与机构进行沟通。'
                    });
                }
            });
        });

        Tooltip.init(
            $('[data-ios-tip]'),
            {
                template: '<div class="tooltip"></div>',
                updateContent: function () {

                    var layer = this.layer;

                    layer.html(
                        this.getSourceElement().attr('data-ios-tip')
                    );

                }
            }
        );

        schedule.bindConfirmOrder(container);
        schedule.bindCancelOrAppealDialog(container);
        schedule.bindConfirmPay(container);
        schedule.bindEnterClassroom(container);

    };

});