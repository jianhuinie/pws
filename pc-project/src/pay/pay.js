/**
 * @file 支付 - 支付
 * @author zhujialu, liucong
 */
define(function (require, exports) {

    'use strict';

    // 支付等待对话框
    var WaitPayDialog = require('./component/WaitPayDialog');
    var EbankDialog = require('./component/EbankDialog');

    var selectBank = require('./common/selectBank');
    var bankList = require('./component/bankList');
    var WechatPayDialog = require('./component/WechatPayDialog');
    // 设置支付密码对话框
    var SetPasswordDialog = require('./common/component/SetPasswordDialog');

    var store = require('common/store');
    var service = require('common/service');
    var redirect = require('cobble/util/redirect');
    var container = $('#main');

    /**
     * 支付
     *
     * @inner
     * @param {Object} options
     * @property {string} options.purchaseId 支付 ID
     * @property {string} options.approach 支付方式，可选值有 alipay wechat 和 bank
     * @property {string} options.bankNum 银行代号
     * @property {number} options.money 支付金额
     * @property {Function=} options.callback 覆盖默认流程的成功后回调
     */
    function pay(options) {

        service
        .payPurchase(
            {
                purchaseId: options.purchaseId,
                payWay: options.approach,
                bankName: options.bankNum,
                money: options.money
            },
            {
                errorHandler: {
                    '100054': function () {
                        alert({
                            title: '温馨提示',
                            content: '支付金额发生变化，请刷新页面',
                            buttons: [
                                {
                                    text: '确定',
                                    type: 'primary',
                                    handler: function () {
                                        dontConfirmOnLeave();
                                        location.reload();
                                    }
                                }
                            ]
                        });
                    }
                }
            }
        )
        .done(function (response) {
            if (response.code === 0) {

                if ($.isFunction(options.callback)) {
                    options.callback(response);

                    return;
                }

                store.set('paySuccess', true);
                store.fireChange();

                var data = response.data;

                if (data.pay_url) {

                    redirect.openLink(data.pay_url);

                    var refresh = function () {
                        dontConfirmOnLeave();
                        location.reload();
                    };

                    new WaitPayDialog({
                        onSuccess: refresh,
                        onError: refresh
                    });
                }
                else if (data.purchase_id) {

                    location.href = '/pay/result?purchase_id='
                                  + data.purchase_id;
                }
            }

        });

    }

    function confirmOnLeave() {
        $(window).on(
            'beforeunload',
            function () {
                if (store.get('purchaseType') == 22) {// 22是老师会员订单
                    return '您的订单还未支付，确认离开吗？';
                }
                else if (store.get('purchaseType') == 27) { // 27是购买空间订单
                    return '确定放弃支付么？';
                }
                else {
                    return '你可以在【我的订单 - 待支付】中找到订单';
                }
            }
        );
    }

    function dontConfirmOnLeave() {
        $(window).off('beforeunload');
    }



    exports.init = function () {

        var mobile = store.get('user').mobile;

        if (store.get('env') !== 'dev') {
            confirmOnLeave();
        }

        store.set('paySuccess', false);

        store.onChange(
            'paySuccess',
            function () {
                dontConfirmOnLeave();
            }
        );

        selectBank.init({
            element: container
        });

        bankList.init({
            element: container
        });

        container
        .on('click', '.alipay', function (e) { // 支付宝

            if (e.target.tagName === 'INPUT') {
                return;
            }

            pay({
                purchaseId: store.get('purchaseId'),
                approach: 'alipay',
                money: store.get('money')
            });

        })
        .on('click', '.ebank', function (e) { // 网上银行

            if (e.target.tagName === 'INPUT') {
                return;
            }

            var money = store.get('money');

            new EbankDialog({
                money: money,
                onSelect: function (data) {
                    pay({
                        purchaseId: store.get('purchaseId'),
                        approach: 'bank',
                        bankNum: data.bank,
                        money: money
                    });
                }
            });

        })
        .on('click', '.huabei', function (e) { // 花呗分期
            if (e.target.tagName === 'INPUT') {
                return;
            }
            dontConfirmOnLeave();
            location.href = '/pay/payFqProductPurchase?purchase_id='
                          + store.get('purchaseId');
        });

        var wechatPayDialog;

        container
        .on('click', '.wechat', function () { // 微信

            if (wechatPayDialog) {
                wechatPayDialog.show();
                return false;
            }

            pay({
                purchaseId: store.get('purchaseId'),
                approach: 'wechat',
                money: store.get('money'),
                callback: function (response) {
                    var data = response.data;

                    wechatPayDialog = new WechatPayDialog({
                        money: store.get('money'),
                        url: data.pay_url
                    });

                    var purchaseId = store.get('purchaseId');
                    var timer = setInterval(function () {
                        service
                        .checkPayPurchaseStatus(
                            {
                                purchaseId: purchaseId
                            },
                            {
                                errorHandler: {
                                    '100003': function (response) {
                                        clearInterval(timer);
                                        alert('请求参数错误');
                                    }
                                }
                            }
                        )
                        .done(function (response) {
                            if (response.code === 0) {
                                if (response.data.status != 0) {

                                    clearInterval(timer);
                                    dontConfirmOnLeave();
                                    location.href = '/pay/result?purchase_id='
                                    + purchaseId;
                                }
                            }
                        });
                    }, 5000);
                }
            });

            return false;
        })

        .on('click', '.set-password', function () {
            new SetPasswordDialog({
                mobile: mobile,
                mobile_mask: String(mobile).replace(
                    /^(\d{3})\d{4}(\d{4})$/,
                    '$1****$2'
                ),
                onSuccess: function (data) {
                    location.reload();
                }
            });
        });


    };

});