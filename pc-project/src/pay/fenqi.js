/**
 * @file 支付 - 花呗分期
 * @author niuxiaojing
 */
define(function (require, exports) {

    'use strict';

    // 支付等待对话框
    var WaitPayDialog = require('./component/WaitPayDialog');

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
                payTypeNumber: options.payTypeNumber,
                fenqiFlag: options.fenqiFlag,
                periods: options.periods,
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

        container
        .on('click', '.type-item', function (e) {
            if (e.target.tagName === 'INPUT') {
                return;
            }
            var index = $(this).find(':radio').val();
            var list = store.get('fenqiList');
            var item = list[index];
            var fenqiMoney = item.fenqi_total_money;
            var totalMoney = item.fenqi_need_all_money;
            var totalFee = item.fenqi_need_all_rate_fee;
            container.find('#fenqi-money').text(fenqiMoney);
            container.find('#total-money').text(totalMoney);
            container.find('#total-fee').text(totalFee);

            store.set({
                totalMoney: totalMoney,
                periods: item.periods
            });
        })
        .on('click', '.btn-fenqi-pay', function (e) {
            if (e.target.tagName === 'INPUT') {
                return;
            }
            pay({
                purchaseId: store.get('purchaseId'),
                approach: 'fenqi',
                payTypeNumber: store.get('payTypeNumber'),
                fenqiFlag: 1,
                periods:store.get('periods'),
                money: store.get('totalMoney')
            });
        })
        .on('click', '.btn-other-pay', function (e) {
            if (e.target.tagName === 'INPUT') {
                return;
            }
            location.href = '/pay/payProductPurchase?purchase_id='
                          + store.get('purchaseId');
        });




    };

});