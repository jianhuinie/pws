/**
 * 考研app的订单确认页
 * actually，只在了考研app里面用到了
 * Created by hanzh on 16/1/20.
 */
define(function(require, exports) {
    'use strict';
    var $ = require("zepto");
    var pageData = null;
    var ui = require("common/ui");
    var submitButton = $('#submitButton');
    var service = require('common/service');
    var app = require("common/app");
    var isApp = app.isApp();
    var util_function = require('util/function');
    var lazyLoadImage = require('common/lazyLoadImage');
    var smsDom = $('#switch-onoff');

    /**
     * 重置按钮状态
     */
    function reset() {
        submitButton.html('重新提交').removeClass('loading');
    }


    /**
     * 提交订单操作
     */
    function submitHandler() {

        if (submitButton.hasClass('loading')) {
            // 正在提交
            return;
        }
        var product = pageData.product;
        // type 为7表示组合订单
        var isComType = pageData.type == 7;
        var isSms = smsDom.find('.switch').hasClass('on') ? 1 : 0;
        var postUrl = '/pay/createProductPurchase';
        var targetData = {};
        if (isComType) {
            postUrl = '/pay/createUnionProductPurchase';
            targetData = {
                course_number: product.course_number,
                is_sms: isSms
            };
        } else {
            targetData = {
                is_self: 1,
                note: '',
                combo_id: '',
                course_id: product.course_id,
                subject_id: product.subject_id,
                hours: product.hours,
                lesson_way: product.lesson_way,
                type: product.course_type,
                student_name: pageData.studentName,
                location: '',
                course_number: product.course_number,
                is_sms: isSms
            };
        }

        submitButton.html('正在提交中').addClass('loading');
        var finalPayMoney = product.pay_money;
        service.post(postUrl, targetData, function(response) {
            if (response.code === 0) {
                var resData = response.data;
                var purchaseId = 0;
                if (resData.err_code == 66 && resData.order_id) {
                    purchaseId = resData.order_id;
                }
                if (!purchaseId) {
                    purchaseId = response.data.purchase_id;
                }
                submitButton.html('提交成功');
                if (finalPayMoney > 0) {
                    if (!isApp) {
                        location.href = '/pay/payProductPurchase?purchase_id=' +
                            purchaseId;
                    } else {
                        app.send('toKaoYanAppPay', {
                            purchaseId: '' + purchaseId,
                            course_number: '' + product.course_number,
                            isFree: false
                        });
                    }
                } else {
                    if (isApp) {
                        app.send('toKaoYanAppPay', {
                            purchaseId: '' + purchaseId,
                            course_number: '' + product.course_number,
                            isFree: true
                        });
                    };
                }
            } else {
                reset();
            }

        });
    }

    function bindEvents() {
        var coursePrice = pageData.price;
        submitButton.on('click', function () {

            /**
             * 付费课显示不可退弹窗，提示用户该课不可退
             */
            if (coursePrice == 0) {
                submitHandler();
            }
            else {
                ui.confirm({
                    content: '该课程报名后不提供线上退课服务，如需退课请与老师协商',
                    title: '温馨提示',
                    button_ok: '确认购买',
                    button_cancel: '再想想'

                }).done(function () {
                    submitHandler();
                });
            }

        });
        smsDom.on('click', function(e) {
            var me = $(this).find('.switch');
            if (me.hasClass('on')) {
                me.removeClass('on');
            }
            else {
                me.addClass('on');
            }
        });

    }
    return function(page_data) {
        lazyLoadImage.init();
        pageData = page_data;
        var itemCount = pageData.product.course_items_count;
        var finalPayMoney = pageData.product.pay_money;
        var courseType = pageData.product.course_type;

        /* 
        短信验证展示条件：
        1.组合课必显示
        2.视频课必不展示
        3.单课节均价小于1元不展示，大于1元展示
         */
        if (page_data.type == 7 || ((!itemCount && finalPayMoney >= 1) || (itemCount > 0 && finalPayMoney / itemCount >= 1)) && courseType != 3) {
            smsDom.show();
        }
        bindEvents();
    }

});