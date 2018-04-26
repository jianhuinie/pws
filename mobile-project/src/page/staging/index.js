define(function (require) {

    'use stric';

    var $ = require('zepto');
    var container = $('#page_main');
    var service = require('common/service');
    var env = require('util/env');
    var pageData;
    var period;
    var total;
    var needPay;
    var fee;
    var ajaxFlag = false;
    var isWeixin = env.thirdapp && env.thirdapp.isWeixin;

    return function (page_data) {
        pageData = page_data;
        period = pageData.chosed_fenqi_type.periods;
        total = pageData.chosed_fenqi_type.fenqi_total_money;
        needPay = pageData.chosed_fenqi_type.fenqi_need_all_money;
        fee = pageData.chosed_fenqi_type.fenqi_need_all_rate_fee;

        var mask = $('.mask');

        $('.staging-item').on('click', function() {
            var box = $('.stagingBox');
            var that = $(this);
            that.siblings('.staging-item').removeClass('active');
            that.addClass('active');
            period = that.data('periods');
            total = that.data('total');
            needPay = that.data('needMoney');
            fee = that.data('fee');

            $('.main-container').find('.box .first-nav .fenqi-total-money').text('分期金额: ￥' + total + '(含手续费)');
            $('.main-container').find('.box .second-nav .title .title-box .fenqi-need-all-money').text('应还总额: ￥' + needPay + '(含利息￥' + fee + ')');
        });

        //点击分期支付按钮
        $('.main-container .button').on('click', function () {
            if(isWeixin) {
                mask.show();
            } else {
                service.post('/pay/thirdPartyPay',
                    {
                        purchase_id: pageData.purchase_id,
                        pay_type: pageData.fenqi_pay_list.huabai.pay_type + ':' + total,
                        fenqi_flag: 1,
                        periods: period
                    }, function (res) {
                        if(res.code == 0) {
                            //支付成功进行跳转
                            location.href = res.data.pay_url;
                        }
                });
            }
        });

        mask.on('click', function () {
            mask.hide();
        });

        $('.main-container .other-button').on('click', function () {
            location.href = '/pay/payProductPurchase?purchase_id=' + pageData.purchase_id;
        });
    }
});