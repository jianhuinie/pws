/**
 * @file 银行下拉列表
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    /**
     * 银行下拉列表和 输入验证码的表单一般同时出现
     * 暂时就不拆了，这样方便开发，等以后要拆再拆
     */

    var Select = require('cobble/form/Select');
    var Validator = require('cobble/form/Validator');
    var BindCardDialog = require('./BindCardDialog');
    var SetPasswordDialog = require('../common/component/SetPasswordDialog');

    var CodeButton = require('common/component/CodeButton');
    var SaveButton = require('common/component/SaveButton');
    var UnbindCardDialog = require('common/component/UnbindCardDialog');
    var service = require('common/service');
    var store = require('common/store');
    var bankInfoMap = require('../common/bankInfoMap');
    var quickPayCodeMap = bankInfoMap.quickPay;
    var code2Name = bankInfoMap.code2Name;
    var type2Name = bankInfoMap.type2Name;

    var PAY_BY_KUAIJIE = 0;
    var PAY_BY_BALANCE = 1;

    var PAY_FLAG_KUAIJIE = 0;
    var PAY_FLAG_YIJIAN = 1;

    var PAY_WAY_BALANCE = 'balance';
    var PAY_WAY_DEFAULT = 'moto';

    exports.init = function (options) {

        var container = options.element;
        var isCreditCard;
        var data = {};

        var bankCode;
        var hasPassword = store.get('hasPasswd');
        var bankInfoList = store.get('bankInfoList');

        var money = store.get('money') || 0;


        var payByBalance = store.get('payByBalanceDefault');
        var payFlag;
        var usePasswd;

        var setPayWay = function (payWay) {
            if (payWay != null) {
                payByBalance = payWay == PAY_BY_BALANCE;
                params.payWay = payByBalance
                    ? PAY_WAY_BALANCE
                    : PAY_WAY_DEFAULT;
            }
            if (payByBalance) {
                container
                    .find('input[name="payWay"]')
                    .filter('[value="' + PAY_BY_BALANCE + '"]')
                    .prop('checked', true);
                container.find('.balance-pay-container').show();
                container.find('.one-key-pay-container').hide();
                container.find('.quick-pay-container').hide();
            }
            else {
                container
                    .find('input[name="payWay"]')
                    .filter('[value="' + PAY_BY_KUAIJIE + '"]')
                    .prop('checked', true);
                container.find('.balance-pay-container').hide();

                if (payFlag == PAY_FLAG_YIJIAN) {
                    container.find('.one-key-pay-container').show();
                    container.find('.quick-pay-container').hide();
                    if (usePasswd) {
                        container.find('.one-key-pay-container .nouse-password-tip').hide();
                        if (hasPassword) {
                            container.find('.one-key-pay-container .platform-password-container').show();
                            container.find('.one-key-pay-container .no-setting-password-container').hide();

                            container.find('.one-key-pay-container .over-max-fee').show();
                            container.find('.one-key-pay-container .use-password-pay').hide();
                        }
                        else {
                            container.find('.one-key-pay-container .platform-password-container').hide();
                            container.find('.one-key-pay-container .no-setting-password-container').show();
                        }
                    }
                    else {
                        container.find('.one-key-pay-container .nouse-password-tip').show();
                        container.find('.one-key-pay-container .platform-password-container').hide();
                        container.find('.one-key-pay-container .no-setting-password-container').hide();
                    }
                }
                else {
                    container.find('.one-key-pay-container').hide();
                    container.find('.quick-pay-container').show();
                }
            }
        };

        setPayWay();

        var dropdownElement = container.find('.dropdown');
        if (dropdownElement.length) {
            var isFirstChange = true;
            var select = new Select({
                element: container.find('.dropdown'),
                name: 'bank',
                buttonSelector: '.bank-active',
                defaultText: '',
                setText: function (text) {
                    var btn = this.element.find(this.buttonSelector);
                    btn.find('.bank-info').remove();
                    btn.prepend(text);
                },
                onChange: function (e, params) {

                    data = params;

                    isCreditCard = data.type === 'C';

                    var group = container.find('.group-cvv');
                    var mobile = container.find('.mobile');

                    mobile.html(
                        String(data.mobile).replace(
                            /^(\d{3})\d{4}(\d{4})$/,
                            '$1****$2'
                        )
                    );

                    if (isCreditCard) {
                        group.show();
                    }
                    else {
                        group.hide();
                    }

                    // 0:快捷支付，1:一键支付
                    payFlag = data.payFlag;

                    // 0:免密，1:需要密码
                    usePasswd = data.usePasswd;

                    bankCode = data.bank + '_' + data.type;

                    // 强制清空下密码框记住的值
                    $('[name="pswd"]').val('');

                    if (!isFirstChange) {
                        setPayWay(
                            PAY_BY_KUAIJIE
                        );
                    }
                    else {
                        isFirstChange = false;
                        setPayWay();
                    }

                }
            });

            select.setValue(
                select.element.find('li:eq(0)').data('value')
            );
        }

        var form = container.find('.pay-form');

        var validator = new Validator({
            element: form,
            fields: {
                code: {
                    errors: {
                        required: '请输入短信验证码'
                    }
                },
                cvv: {
                    errors: {
                        required: '请输入卡号后三位数字',
                        pattern: '请输入卡号后三位数字'
                    }
                },
                pswd: {
                    errors: {
                        required: '请输入平台支付密码',
                        pattern: '请输入至少六位密码'
                    }
                }
            }
        });

        var params = {
            purchaseId: store.get('purchaseId'),
            money: store.get('money'),
            payWay: payByBalance ? PAY_WAY_BALANCE : PAY_WAY_DEFAULT
        };

        var paramsForPay = {};

        var codeBtn = new CodeButton({
            element: form.find('.btn-send-code'),
            send: function () {
                return service
                .sendPaySms(
                    $.extend(
                        {
                            bankName: data.bank,
                            cardId: data.id,
                            cardType: data.type,
                            cashType: data.type === 'C' ? 4 : 5
                        },
                        params
                    )
                )
                .done(function (response) {
                    if (response.code === 0) {
                        paramsForPay.token = response.data.token;
                        paramsForPay.third_type = response.data.third_type;
                    }
                });
            }
        });

        var isBindedSameBankCard = function (data) {
            if (bankInfoList) {
                var bankName = data.bankName;
                var cardType = data.cardType;
                var cardId = data.cardId;
                for (var i = 0, len = bankInfoList.length; i < len; i++) {
                    var bankInfo = bankInfoList[i];
                    if (bankInfo.card_type === cardType && bankInfo.card_name === bankName && bankInfo.unique_id !== cardId) {
                        return true;
                    }
                }
            }
            return false;
        };

        var saveButtonElement = form.find('.btn-pay');
        if (saveButtonElement.length) {
            var saveBtn = new SaveButton({
                element: saveButtonElement,
                saveText: '正在支付...',
                save: function () {
                    if (validator.validate()) {
                        var args = $.extend(
                            {
                                bankName: data.bank,
                                cardId: data.id,
                                cardType: data.type,
                                cashType: data.type === 'C' ? 4 : 5,
                                code: $.trim(form.find('[name="code"]').val()),
                                cvv: $.trim(form.find('[name="cvv"]').val()),
                                token: paramsForPay.token,
                                third_type: paramsForPay.third_type
                            },
                            params
                        );
                        var bankName = args.bankName;
                        var cardType = args.cardType;
                        var appendAlertText = '';
                        if (isBindedSameBankCard(args)) {
                            appendAlertText = '，其他' + code2Name[bankName] + type2Name[cardType] + '的一键支付服务已关闭';
                        }

                        if (hasPassword) {
                            var selector;
                            if (payByBalance) {
                                selector = '.balance-pay-container';
                            }
                            else if (usePasswd && payFlag === PAY_FLAG_YIJIAN) {
                                selector = '.one-key-pay-container';
                            }
                            if (selector) {
                                args.password = $.trim(
                                    form.find(selector + ' [name="pswd"]').val()
                                );
                            }
                        }

                        return service.payPurchase(
                            args
                        )
                        .done(function (response) {

                            if (response.code === 0) {
                                store.set('paySuccess', true);
                                store.fireChange();
                                success(
                                    '支付成功，正在跳转...',
                                    function () {
                                        location.href = '/pay/result?purchase_id=' + params.purchaseId;
                                    }
                                );
                            } else if (response.code === 1000069 && !payFlag) {
                                codeBtn.reset();
                                form.find('[name="code"]').val('');
                            }
                        });
                    }
                }
            });
        }

        container
        .on('click', '.pay-radio', function () {
            var radioElement = $(this).find(':radio');
            if (!radioElement.prop('disabled')) {
                setPayWay(
                    radioElement.val()
                );
            }
        })
        .on('click', '.add-card', function () {

            new BindCardDialog({
                purchaseId: store.get('purchaseId'),
                money: store.get('money')
            });

        })
        .on('click', '.icon-info-circle', function () {

            var content = null;
            if ($(this).parent().hasClass('use-password-pay')) {
                content = $('#free-secret-template').html();
            } else {
                content = $('#one-key-pay-template').html();
            }
            alert({
                width: 600,
                content: content,
                skinClass: 'pay-dialog-for-tip',
                buttons: [
                    {
                        text: '关闭',
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