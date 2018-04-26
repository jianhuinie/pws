/**
 * @file 绑定银行卡表单
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var Select = require('cobble/form/Select');
    var Validator = require('cobble/form/Validator');
    var CodeButton = require('common/component/CodeButton');
    var SaveButton = require('common/component/SaveButton');

    var service = require('common/service');
    var form = require('common/form');
    var store = require('common/store');
    var bankInfoMap = require('../common/bankInfoMap');
    var SupportedBankListDialog = require('./SupportedBankListDialog');
    var quickPayCodeMap = bankInfoMap.quickPay;
    var code2Name = bankInfoMap.code2Name;
    var type2Name = bankInfoMap.type2Name;

    var payConstant = require('pay/constant');
    var payService = require('pay/service');

    var validatorConf = {
        cardId: {
            errors: {
                required: '请输入银行卡号',
                pattern: '请输入正确的银行卡号'
            }
        },
        expireYear: {
            type: 'int',
            rules: {
                required: true
            },
            errors: {
                required: '请输入有效期年份'
            }
        },
        expireMonth: {
            type: 'int',
            rules: {
                required: true
            },
            errors: {
                required: '请输入有效期月份'
            }
        },
        cvv: {
            errors: {
                required: '请输入卡验证码',
                pattern: '请输入卡后三位数字'
            }
        },
        ownerName: {
            errors: {
                required: '请输入户主的姓名'
            }
        },
        ownerId: {
            errors: {
                required: '请输入户主的身份证号码'
            }
        },
        ownerMobile: {
            errors: {
                required: '请输入户主的手机号码',
                pattern: '请输入正确的手机号码'
            }
        },
        code: {
            errors: {
                required: '请输入短信验证码'
            }
        }

    };

    var monthData = [
        { text: '1月', value: 1 },
        { text: '2月', value: 2 },
        { text: '3月', value: 3 },
        { text: '4月', value: 4 },
        { text: '5月', value: 5 },
        { text: '6月', value: 6 },
        { text: '7月', value: 7 },
        { text: '8月', value: 8 },
        { text: '9月', value: 9 },
        { text: '10月', value: 10 },
        { text: '11月', value: 11 },
        { text: '12月', value: 12 }
    ];

    var yearData = [
        { text: '2015年', value: 2015 },
        { text: '2016年', value: 2016 },
        { text: '2017年', value: 2017 },
        { text: '2018年', value: 2018 },
        { text: '2019年', value: 2019 },
        { text: '2020年', value: 2020 },
        { text: '2021年', value: 2021 },
        { text: '2022年', value: 2022 },
        { text: '2023年', value: 2023 },
        { text: '2024年', value: 2024 },
        { text: '2025年', value: 2025 },
        { text: '2026年', value: 2026 },
        { text: '2027年', value: 2027 },
        { text: '2028年', value: 2028 },
        { text: '2029年', value: 2029 },
        { text: '2030年', value: 2030 }
    ];

    /**
     *
     * @param {Object} options
     * @property {string} options.purchaseId 订单 ID
     * @property {number} options.money 订单需要支付的金额
     * @property {boolean} options.isPayCard 是否绑支付卡
     * @return {Object}
     */
    exports.init = function (options) {

        var container = options.element;
        var formElement = container.find('.form');

        var validator = new Validator({
            element: formElement,
            fields: validatorConf
        });

        var yearSelectElement = container.find('.year-select');
        var monthSelectElement = container.find('.month-select');

        if (yearSelectElement.length === 1
            && monthSelectElement.length === 1
        ) {

            var monthSelect = new Select({
                element: monthSelectElement,
                name: 'expireMonth',
                defaultText: '请选择',
                data: monthData
            });

            var yearSelect = new Select({
                element: yearSelectElement,
                name: 'expireYear',
                defaultText: '请选择',
                data: yearData
            });
        }


        var formData;
        var cardData = { };
        var payData = { };

        var validate = function (extra) {

            var fields = [
                'cardId', 'expireYear', 'expireMonth',
                'cvv', 'ownerName', 'ownerId', 'ownerMobile'
            ];

            if ($.isArray(extra)) {
                $.merge(fields, extra);
            }

            formData = form.parse(container);

            return validator.validate(fields);
        };

        var sendSMS;
        var bindCard;

        if (options.purchaseId) {
            sendSMS = function () {
                return service
                .sendPaySms(
                    $.extend(
                        formData,
                        {
                            bankName: cardData.bank_no,
                            cardType: cardData.card_type,
                            purchaseId: options.purchaseId,
                            money: options.money,
                            payWay: 'moto',
                            cashType: cardData.card_type === payConstant.CARD_TYPE_CREDIT ? 1 : 2
                        }
                    ),
                    {
                        timeout: 20 * 1000
                    }
                )
                .done(function (response) {
                    if (response.code === 0) {
                        payData.token = response.data.token;
                        payData.third_type = response.data.third_type;
                    }
                });
            };
            bindCard = function () {
                return service.payPurchase({
                    purchaseId: options.purchaseId,
                    money: options.money,
                    cashType: cardData.card_type === payConstant.CARD_TYPE_CREDIT ? 1 : 2,
                    payWay: 'moto',
                    bankName: cardData.bank_no,
                    cardId: formData.cardId,
                    cardType: cardData.card_type,
                    code: formData.code,
                    cvv: formData.cvv,
                    expireYear: formData.expireYear,
                    expireMonth: formData.expireMonth,
                    ownerId: formData.ownerId,
                    ownerName: formData.ownerName,
                    ownerMobile: formData.ownerMobile,
                    third_type: payData.third_type,
                    token: payData.token
                })
                .done(function (response) {
                    if (response.code === 0) {
                        store.set('paySuccess', true);
                        store.fireChange();
                        location.href = '/pay/result?purchase_id=' + options.purchaseId;
                    }
                });
            };
        }
        else {
            var bindForced;
            sendSMS = function () {
                return payService.sendSMS({
                    ownerId: formData.ownerId,
                    ownerName: formData.ownerName,
                    ownerMobile: formData.ownerMobile,
                    bankNo: cardData.bank_no,
                    cardNo: formData.cardId,
                    cardType: cardData.card_type,
                    cvv: formData.cvv,
                    expireYear: formData.expireYear,
                    expireMonth: formData.expireMonth,
                    bindType: options.isPayCard ? 2 : 0,
                    forced: bindForced
                },
                {
                    errorHandler: {
                        '200001': function (response) {
                            var msg = response.msg;
                            if (msg) {
                                confirm({
                                    title: '温馨提示',
                                    content: msg,
                                    width: 400,
                                    buttons: [
                                        {
                                            text: '仍然绑定',
                                            type: 'primary',
                                            handler: function () {
                                                this.hide();
                                                bindForced = true;
                                                var promise = codeBtn.sendCode();
                                                if (promise) {
                                                    promise.done(bindCard);
                                                }
                                            }
                                        }
                                    ]
                                });
                            }
                        },
                        '200002': function (response) {
                            var msg = response.msg;
                            if (msg) {
                                confirm({
                                    title: '温馨提示',
                                    content: msg,
                                    width: 400,
                                    buttons: [
                                        {
                                            text: '仍然绑定',
                                            type: 'primary',
                                            handler: function () {
                                                this.hide();
                                                bindForced = true;
                                                codeBtn.sendCode();
                                            }
                                        }
                                    ]
                                });
                            }
                        }
                    }
                })
                .done(function (response) {
                    if (response.code === 0) {
                        payData.token = response.data.token;
                        if (payData.token == null) {
                            alert('验证码获取失败，请重新获取');
                        }
                    }
                });
            };
            bindCard = function () {
                return payService.verifyCard({
                    token: payData.token,
                    code: formData.code,
                    bind_type: 0
                })
                .done(function (response) {
                    if (response.code === 0) {
                        success('绑定成功', function () {
                            location.reload();
                        });
                    }
                });
            };
        }

        var codeBtn = new CodeButton({
            element: container.find('.btn-send-code'),
            send: function () {
                if (validate()) {
                    return sendSMS();
                }
            }
        });

        var saveBtn = new SaveButton({
            element: container.find('.btn-submit'),
            saveText: '请稍候...',
            save: function () {
                if (validate(['code'])) {

                    if (!container.find('.agree-checkbox').prop('checked')) {
                        alert('请先同意《快捷支付服务协议》');
                        return;
                    }

                    return bindCard();
                }
            }
        });

        var refreshBankInfo = function () {

            cardIdInputElement.find('.bank-logo').prop(
                'src',
                cardData.bank_logo
            );

            var cardTypeText = '';
            var cardTypeValue = '';

            if (cardData.card_type === payConstant.CARD_TYPE_CREDIT) {
                cardTypeText = '信用卡';
                cardTypeValue = 'credit';
            }
            else if (cardData.card_type === payConstant.CARD_TYPE_DEPOSIT) {
                cardTypeText = '储蓄卡';
                cardTypeValue = 'deposit';
            }

            formElement.attr('data-card-type', cardTypeValue);

            cardIdInputElement.find('.card-type').html(cardTypeText);

            cardRemarkElement.find('.pay-each').html(cardData.pay_each);
            cardRemarkElement.find('.pay-day').html(cardData.pay_day);

            cardFloatedElement.show();
            cardRemarkElement.show();

        };

        var cardIdInputElement = container.find('.card-id');
        var cardFloatedElement = cardIdInputElement.find('.floated');
        var cardRemarkElement = container.find('.card-remark');
        var supportedBankListElement = container.find('.supported-bank-list');

        payService
        .getPayUserInfo()
        .then(function (response) {
            if (response.code === 0) {
                var data = response.data;
                formElement.find('[name="ownerName"]').val(data.user_name);
                formElement.find('[name="ownerId"]').val(data.user_id_no);
            }
        });

        container
        .on('click', '.supported-bank-list', function () {
            new SupportedBankListDialog({
                onSelect: function (card) {
                    if (!cardData.bank_no) {
                        cardData.bank_no = card.bankNo;
                        cardData.bank_logo = card.bankLogo;
                        cardData.card_type = card.cardType;
                        cardData.pay_each = card.payEach;
                        cardData.pay_day = card.payDay;
                        refreshBankInfo();
                    }
                }
            });
        })
        .on('change', 'input[name="cardId"]', function () {

            cardFloatedElement.hide();
            cardRemarkElement.hide();
            supportedBankListElement.hide();

            if (validator.validate(['cardId'])) {

                var cardNo = $.trim(this.value);

                payService
                .suggestBank({
                    cardNo: cardNo
                })
                .then(function (response) {

                    var data;
                    if (response.code === 0) {
                        data = response.data;
                    }

                    cardData = data || { };

                    if (cardData.card_no) {
                        refreshBankInfo();
                    }
                    else {
                        supportedBankListElement.show();
                    }

                });

            }

        });

    };

});