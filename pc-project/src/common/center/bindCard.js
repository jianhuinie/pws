/**
 * @file 绑定银行卡
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var Select = require('cobble/form/Select');
    var Validator = require('cobble/form/Validator');
    var RegionSelect = require('common/component/RegionSelect');
    var form = require('common/form');
    var store = require('common/store');
    var service = require('common/service');
    var CodeButton = require('common/component/CodeButton');
    var Dialog = require('cobble/ui/Dialog');
    var SaveButton = require('common/component/SaveButton');

    var payService = require('pay/service');
    var payConstant = require('pay/constant');

    var container;
    var formElement;

    var validator;
    var cardData = { };

    function switchCard() {

        var formData = form.parse(formElement);

        return payService
        .changeWithdrawCard(
           formData
        )
        .done(function (response) {

            if (response.code === 0) {
                formElement.hide();
                container.find('.bind-success').show();
            }
        });

    }

    function initBindCard(container) {

        var bankIcon = store.get('bankIcon');

        var bindForced;
        var formData = { };
        var payData = { };

        var bankSelect = new Select({
            element: container.find('.bank-select .dropdown'),
            defaultText: '- 银行 -',
            name: 'bank_no',
            onChange: function (e, data) {
                cardData.bank_no = data.value;
                cardData.bank_name = data.text;
                cardData.card_type = payConstant.CARD_TYPE_DEPOSIT;
            },
            setText: function (text) {
                this.element.find('.bank-icon').html(
                    '<i class="icon ' + bankIcon[this.value] + '"></i>'
                );
            }
        });

        var sendSMS = function () {
            return payService.sendSMS({
                ownerId: formData.id_number,
                ownerName: formData.owner_name,
                ownerMobile: formData.mobile,
                bankNo: cardData.bank_no,
                cardNo: formData.card_num,
                cardType: cardData.card_type,
                bindType: 0,
                province: formData.province,
                city: formData.city,
                bank_name: cardData.bank_name,
                forced: bindForced
            },
            {
                timeout: 20 * 1000,
                errorHandler: {
                    '200001': function (response) {
                        confirm({
                            title: '温馨提示',
                            content: '您的银行卡没有通过银行验证，建议换一张银行卡绑定~如果您确认银行卡信息无误，可以选择仍然绑定此银行卡',
                            width: 400,
                            buttons: [
                                {
                                    text: '换一张银行卡',
                                    type: 'primary',
                                    handler: function () {
                                        this.hide();
                                        formElement.find('input[name="card_num"]').val('').focus();
                                    }
                                },
                                {
                                    text: '仍然绑定',
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
        var bindCard = function () {
            return payService.verifyCard({
                token: payData.token,
                code: formData.sms_code,
                bind_type: 0
            })
            .done(function (response) {
                if (response.code === 0) {
                    formElement.hide();
                    container.find('.bind-success').show();
                }
            });
        };

        var codeBtn = new CodeButton({
            element: container.find('#verifycodebutton'),
            send: function () {
                if (validator.validate(['owner_name', 'mobile', 'bank_no', 'card_num', 'id_number'])) {

                    formData = form.parse(formElement);

                    if (!formData.bank_no && cardData.bank_no) {
                        formData.bank_no = cardData.bank_no;
                    }

                    return sendSMS();
                }
            }
        });

        var saveButton = new SaveButton({
            element: container.find('.btn-save'),
            saveText: '正在绑定',
            save: function () {
                if (validator.validate()) {

                    formData = form.parse(formElement);

                    if (!formData.bank_no && cardData.bank_no) {
                        formData.bank_no = cardData.bank_no;
                    }

                    return bindCard();
                }
            }
        });

        var bankSelectElement = container.find('.bank-select');
        var cardNoInputElement = container.find('.card-input .input-wrapper');
        var cardFloatedElement = cardNoInputElement.find('.floated');

        container
        .on('change', 'input[name="card_num"]', function () {

            bankSelectElement.hide();
            cardFloatedElement.hide();

            if (validator.validate(['card_num'])) {

                var cardNo = $.trim(this.value);

                payService
                .suggestBank({
                    cardNo: cardNo
                })
                .then(function (response) {

                    if ($('input[name="card_num"]').length === 0) {
                        return;
                    }

                    var data;
                    if (response.code === 0) {
                        data = response.data;
                    }

                    cardData = data || { };

                    if (cardData.card_no) {

                        cardNoInputElement.find('.bank-logo').prop(
                            'src',
                            cardData.bank_logo
                        );

                        var cardType = '';

                        if (cardData.card_type === payConstant.CARD_TYPE_CREDIT) {
                            cardType = '信用卡';
                            alert('信用卡不能绑定到提现功能哦');
                        }
                        else if (cardData.card_type === payConstant.CARD_TYPE_DEPOSIT) {
                            cardType = '储蓄卡';
                        }

                        cardNoInputElement.find('.card-type').html(cardType);
                        cardFloatedElement.show();

                    }
                    else {
                        bankSelectElement.show();
                    }

                });

            }

        });

    }

    function initSwitchCard(container) {

        var selectContainer = container.find('.card-select .dropdown');
        var bankSelect = new Select({
            element: selectContainer,
            defaultText: '- 银行卡 -',
            name: 'cardId'
        });

        var activeItem = selectContainer.find('li.active');
        if (activeItem.length === 1) {
            var value = activeItem.data('value');
            bankSelect.setValue(value);
        }

        var saveButton = new SaveButton({
            element: container.find('.btn-save'),
            saveText: '正在绑定',
            save: function () {
                if (validator.validate()) {
                    return switchCard();
                }
            }
        });

    }

    exports.init = function () {

        container = $('#content');
        formElement = container.find('.form-bind-card');

        if (store.get('cardList').length > 0) {
            initSwitchCard(container);
        }
        else {
            initBindCard(container);
        }

        var regionSelect = new RegionSelect({
            element: container
        });

        validator = new Validator({
            element: formElement,
            fields: {
                owner_name: {
                    errors: {
                        required: '请输入姓名'
                    }
                },
                id_number: {
                    errors: {
                        required: '请输入身份证号'
                    }
                },
                bank_no: {
                    errors: {
                        required: '请选择所在银行'
                    }
                },
                province: {
                    errors: {
                        required: '请选择所在省份和城市'
                    }
                },
                city: {
                    errors: {
                        required: '请选择所在省份和城市'
                    }
                },
                card_num: {
                    errors: {
                        required: '请填写银行卡号',
                        pattern: '请填写正确格式的银行卡号',
                        maxlength: '银行卡号不能超过 20 位'
                    }
                },
                mobile: {
                    errors: {
                        required: '请填写手机号',
                        pattern: '请填写正确格式的手机号'
                    }
                },
                sms_code: {
                    errors: {
                        required: '请填写验证码',
                        pattern: '请填写格式正确的验证码'
                    }
                },
                password: {
                    errors: {
                        required: '请填写支付密码'
                    }
                },
                cardId: {
                    rules: {
                        required: true
                    },
                    errors: {
                        required: '请选择银行卡'
                    }
                }
            }
        });

    };

});