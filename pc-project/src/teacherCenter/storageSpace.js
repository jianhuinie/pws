/**
 * @file 存储空间
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var store = require('common/store');
    var Validator = require('cobble/form/Validator');
    var service = require('common/service');
    var SaveButton = require('common/component/SaveButton');

    var container = $('#content');
    var introCard = container.find('.intro-card');
    var purchaseCard = container.find('.purchase-card');

    /*
     * 离开前弹窗
     * @param flag {boolean} 离开页面是否需要二次弹窗
     */
    function confirmOnLeave() {
        $(window)
        .on('beforeunload', function () {
            return '确定要离开此页吗？';
        });
    }

    exports.init = function () {

        // 验证对象
        var validator = new Validator({
            element: purchaseCard.find('.form-purchase'),
            realtime: true,
            fields: {
                capacity: {
                    errors: {
                        min: '最少需购买 1GB',
                        max: '最多一次性可购买 99GB',
                        pattern: '请输入整数',
                        required: '请输入您所需购买的空间容量大小'
                    }
                }
            }
        });

        // 创建订单
        var saveButton = new SaveButton({
            element: purchaseCard.find('.to-pay'),
            save: function () {
                if (validator.validate()) {
                    service
                    .createStoragePurchase({
                        capacity: purchaseCard.find('input[name="capacity"]').val()
                    })
                    .done(function (response) {
                        if (response.code === 0) {
                            // 先解绑离开弹窗
                            $(window).off('beforeunload');
                            // 去支付
                            location.href = ('/pay/payProductPurchase?purchase_id=' + response.data.purchase_id);
                        }
                    });

                }
            }
        });

        introCard
        .on('click', '.purchase-show', function () { // 去购买

            if (store.get('isOrg')) { // 机构老师不可购买
                alert({
                    title: '温馨提示',
                    content: '联系您的机构购买或升级机构会员，马上可获得更多空间'
                });
            }
            else {
                introCard.hide();
                purchaseCard.show();

                confirmOnLeave();
            }

        });

        purchaseCard
        .on('click', '.subtract', function (e) { // 减
            var target = $(e.currentTarget);
            var control = target.closest('.form-controls');
            var input = control.find('input');
            var tempVal = input.val();

            if (tempVal > 1) {
                tempVal--;
                input.val(tempVal);
            }

            if (tempVal <= 1) {
                target.prop('disabled', true);
            }
            else {
                target.next('.plus').prop('disabled', false);
            }

            purchaseCard.find('input[name="capacity"]').blur();
        })

        .on('click', '.plus', function (e) { // 加
            var target = $(e.currentTarget);
            var control = target.closest('.form-controls');
            var input = control.find('input');
            var tempVal = input.val();

            if (tempVal < 99) {
                tempVal++;
                input.val(tempVal);
            }

            if (tempVal >= 99) {
                target.prop('disabled', true);
            }
            else {
                target.prev('.subtract').prop('disabled', false);
            }
            purchaseCard.find('input[name="capacity"]').blur();
        })

        .on('blur', 'input[name="capacity"]', function (e) { // 容量，直接计算应付金额
            var target = $(e.currentTarget);
            var capacity = target.val();
            var unitPrice = store.get('unitPrice');
            var priceDifference = store.get('priceDifference');

            if (validator.validate()) {
                var tempPrice = capacity * unitPrice;
                var totalPrice = tempPrice + priceDifference;

                purchaseCard.find('.temp-price').text(tempPrice.toFixed(2)); // 临时价
                purchaseCard.find('.total-price').text(totalPrice.toFixed(2)); // 临时价 ＋ 差价
            }
        })

        .on('click', '.price-intro', function () { // 差价介绍
            var content = '存储空间价格＝购买单价X购买容量大小X购买的年份数<br><br>'
                        + '若您之前购买过存储空间且尚未到期，为了保证您的正常使用，需补足将之前已购空间有效期延长至最新购买年份的差价。<br><br>'
                        + '例：<br>'
                        + '如果您在2015年5月1日，以普通会员的身份，购买过1GB的存储空间。当您在2015年11月1日，以超级会员的身份，追加购买1GB的存储空间时，需要补交 22（超级会员购买价格）x 0.5 (原有空间6个月的期限延长) ＝ 11元。'
            alert({
                content: content,
                title: '温馨提示',
                width: 386,
                buttons: [
                    {
                        text: '我知道了',
                        type: 'primary',
                        handler: function () {
                            this.hide();
                        }
                    }
                ]
            });
        });


















    };

});