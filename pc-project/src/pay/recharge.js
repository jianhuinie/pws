/**
 * @file 绑定银行卡
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var payApproach = require('./common/payApproach');
    var WaitPayDialog = require('./component/WaitPayDialog');
    var redirect = require('cobble/util/redirect');
    var service = require('common/service');

    /**
     * 充值成功切换到成功提示页
     *
     * @inner
     * @param {number} money 充值金额
     */
    function success(money) {

        $('.recharge-form').hide();

        var element = $('.recharge-success');
        element.find('strong').html(money);
        element.show();
    }

    /**
     * 验证金额是否正确
     *
     * @inner
     * @param {string} money
     * @returns {boolean}
     */
    function validateMoney(money) {
        if (money && $.isNumeric(money)) {
            // 只能有 2 位小数
            var parts = money.split('.');
            if (parts.length === 2) {
                if (parts[1].length > 2) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }

    exports.init = function () {

        payApproach.init();

        $('.btn-pay').click(
            function () {

                var money = $.trim(
                                $('.recharge-money :text').val()
                            );

                if (validateMoney(money)) {

                    var payData = payApproach.getData();

                    service
                    .createRecharge({
                        money: money,
                        payWay: payData.approach,
                        bankNo: payData.bankNum
                    })
                    .done(function (response) {

                        if (response.code === 0) {

                            var data = response.data;

                            if (data.pay_url) {
                                redirect.openLink(data.pay_url);
                                new WaitPayDialog();
                            }

                        }

                    });
                }
                else {
                    alert('请输入正确的金额');
                }

            }
        );
    };
});