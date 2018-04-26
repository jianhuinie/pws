/**
 * Created by chenmo on 16/4/20.
 *
 * 短信充值弹框
 */
define(function (require, exports) {

    'use strict';

    var ractiveDialog = require('../../../common/function/ractiveDialog');
    var Validator = require('custom/form/Validator');
    var SpinBox = require('custom/ui/SpinBox');
    var multiply = require('cc/function/multiply');
    var service = require('../service');
    var toNumber = require('cc/function/toNumber');

    var VALUE_MIN = 1;
    var VALUE_MAX = 999999;


    /**
     * @param {Object} options
     * @property {Function=} options.onsave
     * @property {Function=} options.oncancel
     */
    return function (options) {
        options = options || {};

        var dialog = ractiveDialog({
            template: require('html!./smsRecharge.html'),
            data: {
                style: require('text!./smsRecharge.styl'),
                numInputOptions: {
                    name: 'sms_num',
                    value: 0,
                    className: 'sms_num',
                    lazy: true,
                    direction: 'top'
                }
            },
            computed: {
                totalPrice: function () {
                    var value = $.trim(this.get('numInputOptions.value'));

                    return isNaN(value) ? '0' : multiply(0.1, +value);
                }
            },
            components: {
                Input: require('../../../common/component/Input')
            },
            oncomplete: function () {
                var me = this;
                var container = $('.recharge-dialog');

                var step = 100;
                me.spinBox = new SpinBox({
                    mainElement: container,
                    value: 100,
                    step: step,
                    timeout: 200,
                    upSelector: '.icon-angle-up',
                    downSelector: '.icon-angle-down',
                    watch: {
                        value: function (newValue, oldValue, options) {

                            /**
                             * 短信充值可以由用户自行输入数量，也可以通过加减按钮进行。
                             * 加减按钮以100递增，自动以百取整，如当前为99时，用户选择加，则为100。
                             * 默认条数为100。数量最小允许为1，最大为999999.
                             *
                             */

                            if (!options || options.action == 'press') {
                                var value = newValue;
                                if (newValue % step !== 0
                                    && (newValue - oldValue) % step === 0
                                    && newValue != oldValue
                                ) {
                                    var isUp = newValue > oldValue;
                                    var isDown = newValue < oldValue;
                                    var num = Math.floor(oldValue / step);

                                    if (isUp) {
                                        num++;
                                    }
                                    else if (isDown) {

                                        newValue % step == 0 ? num-- : '';
                                    }

                                    newValue = num * step;
                                }

                                if (newValue < VALUE_MIN) {

                                    newValue = VALUE_MIN;

                                }
                                else if (newValue > VALUE_MAX) {

                                    newValue = VALUE_MAX;

                                }

                                if (newValue !== value) {
                                    me.spinBox.set(
                                        'value',
                                        newValue,
                                        {
                                            sync: true
                                        }
                                    );
                                }

                            }


                            me.set('numInputOptions.value', newValue);
                        }

                    }
                });

                me.validator = new Validator({
                    mainElement: container,
                    validateOnBlur: true,
                    fields: {
                        sms_num: {
                            rules: {
                                required: true,
                                integer: function (data) {
                                    if(parseInt(data.value) != data.value ) {
                                        return false;
                                    }
                                    return true;
                                },
                                max: VALUE_MAX,
                                min: 1
                            },
                            errors: {
                                required: '请输入短信条数',
                                integer: '请输入1~999999之间的正整数',
                                max: '不能超过' + VALUE_MAX + '条',
                                min: '不能小于1条'
                            }
                        }
                    }
                });
            },
            onteardown: function () {
                this.spinBox.dispose();
                this.validator.dispose();
            },
            submit: function () {
                if (!this.validator.validate()) {
                    return;
                }

                var account = this.get('numInputOptions.value');

                service
                .charge(
                    {
                        account: account
                    },
                    {
                        sync: true
                    }
                )
                .then(function (response) {
                    var purchaseId = response.data.purchase_id;
                    window.open(
                        '/pay/payProductPurchase?purchase_id=' + purchaseId
                    );
                    dialog.dispose();
                    if ($.isFunction(options.onPay)) {
                        options.onPay();
                    }
                });

            }
        });

        return dialog;

    };
});