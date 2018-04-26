/**
 * @file 老师用户中心 优惠券列表
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var service = require('common/service');
    var store = require('common/store');
    var Dialog = require('cobble/ui/Dialog');
    var AddCouponsDialog = require('common/component/AddCouponsDialog');

    exports.init = function () {

        var container = $('#content');

        container
        .on('click', '.btn-add', function () { // 添加优惠券
            if (store.get('todayCount') >= 10) {
                confirm({
                    content: '今天10次新增优惠券的额度已经用完，明天再新增吧~',
                    title: '温馨提示',
                    width: 385,
                    buttons: [
                        {
                            text: '明天再来',
                            type: 'primary',
                            handler: function () {
                                this.hide();
                            }
                        }
                    ]
                });
            }
            else {
                location.href = '/teacher_center/addCoupon';
            }
        })

        .on('click', '.btn-more', function (e) { // 增发

            var target = $(e.currentTarget);
            var serialNum = target.closest('tr').data('serial');

            new AddCouponsDialog({
                serialNum: serialNum
            });
/*
            confirm({
                content: '下线之后优惠券不可再被继续领取，<br />但不影响已领取优惠券的使用',
                title: '温馨提示',
                width: 320,
                buttons: [
                    {
                        text: '确定',
                        type: 'primary',
                        handler: function () {
                            // 下线
                            service
                            .offCoupon({
                                serialNum: serialNum
                            })
                            .done(function (response) {
                                if (response.code === 0) {
                                    success('下线优惠券成功', function () {
                                        location.reload();
                                    });
                                }
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
*/
        })

        .on('click', '.btn-cancel', function (e) { // 不发了

            var target = $(e.currentTarget);
            var serialNum = target.closest('tr').data('serial');

            confirm({
                content: '下线之后优惠券不可再被继续领取，<br />但不影响已领取优惠券的使用',
                title: '温馨提示',
                width: 320,
                buttons: [
                    {
                        text: '确定',
                        type: 'primary',
                        handler: function () {
                            // 下线
                            service
                            .offCoupon({
                                serialNum: serialNum
                            })
                            .done(function (response) {
                                if (response.code === 0) {
                                    success('下线优惠券成功', function () {
                                        location.reload();
                                    });
                                }
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

        })

        .on('click', 'input[name="sync"]', function (e) { // 放置到主页

            var target = $(e.currentTarget);
            var serialNum = target.closest('tr').data('serial');

            if (target.prop('checked') && store.get('hasSync') >= 3) {
                alert('个人主页最多只可放置3张优惠券哦~！');
                target.prop('checked', false);
                return;
            }

            service
            .syncCoupon({
                serialNum: serialNum
            })
            .done(function (response) {
                if (response.code === 0) {
                    if (target.prop('checked')) {
                        success('该优惠券已成功放置到个人主页展示', function () {
                            location.reload();
                        });
                    }
                    else {
                        success('该优惠券已成功从首页隐藏', function () {
                            location.reload();
                        });
                    }
                }
            });

        })

        .on('click', '.coupon-direction', function() {

            var dialog = new Dialog({
                content: $('#coupon-direction-template').html(),
                width: 710
            });

            dialog.element.on('click', '.close-direction', function() {
                dialog.hide();
            });

        });

    };


});