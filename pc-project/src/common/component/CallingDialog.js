/**
 * @file 拨打电话对话框
 * @author zhangshaolong
 */
define(function (require, exports) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var service = require('common/service');
    var store = require('common/store');
    var etpl = require('cobble/util/etpl');
    var Validator = require('cobble/form/Validator');
    var Placeholder = require('cobble/helper/Placeholder');
    var MobileInput = require('common/component/MobileInput');
    var CodeButton = require('common/component/CodeButton');
    var Captcha = require('common/component/Captcha');
    var entrance = require('im/entrance');
    var mobileInput;
    var codeButton, captcha;
    var currentStatus;

    /**
     * @constructor
     * @param {Object} options
     * @property {string} options.name
     * @property {string} options.orgNumber
     */
    function CallingDialog(options) {
        $.extend(this, options);
        this.init();
    };

    function validateMobile(validator, codeBtn) {
        if (validator.validate('mobile') && !codeBtn.isCounting) {
            codeBtn.element.prop('disabled', false);
        } else {
            codeBtn.element.prop('disabled', true);
        }
    }

    function sendVoiceCode() {
        if (!mobileInput.getMobile()) {
            alert('\u8BF7\u8F93\u5165\u624B\u673A\u53F7');
        } else {
            currentStatus = 'voice';
            if (captcha && !captcha.hidden) {
                if (!captcha.validate()) {
                    return false;
                }
            }
            alert({
                title: '\u83B7\u53D6\u8BED\u97F3\u6821\u9A8C\u7801',
                content: '\u6821\u9A8C\u7801\u5C06\u4EE5\u7535\u8BDD\u5F62\u5F0F\u901A\u77E5\u5230\u4F60\uFF0C\u8BF7\u6CE8\u610F\u63A5\u542C',
                buttons: [
                    {
                        text: '\u83B7\u53D6',
                        type: 'primary',
                        handler: function () {
                            this.hide();
                            service.sendVoiceSMS({
                                mobile: mobileInput.getMobile(),
                                captchaName: captcha.getValue()
                            },  {
                                errorHandler: {
                                    1000111: function () {
                                       captcha.show();
                                       captcha.change();
                                       setTimeout(function() {
                                            captcha.validate();
                                       });
                                    }
                                }
                            });
                        }
                    },
                    {
                        text: '\u53D6\u6D88',
                        handler: function () {
                            this.hide();
                        }
                    }
                ]
            });
        }
    }

    var getValidator = function (element) {
        return new Validator({
            realtime: true,
            element: element,
            fields: {
                mobile: {
                    errors: {
                        required: '请输入手机号',
                        pattern: '请输入正确的手机号'
                    }
                },
                smscode: {
                    errors: {
                        required: '请输入校验码',
                        pattern: '请输入正确的校验码'
                    }
                }
            }
        });
    };

    CallingDialog.prototype = {

        init: function () {
            var me = this ;
            var isLogin = !!store.get('user').id;
            var render = etpl.compile($('#calling-template-nologin').html());
            if (isLogin) {
                me.mobile = store.get('user').mobile;
                render = etpl.compile($('#calling-template').html());
            }

            var parentDialog = new Dialog({
                title: '免费电话',
                skinClass: 'calling-dialog',
                content: render(me),
                disposeOnHide: true,
                width: 500
            });

            var element = parentDialog.element;

            var smscodeBtnNode = element.find('.smscode-btn');

            var mobileInputNode = element.find('[name="mobile"]');

            var codeInput = element.find('[name="smscode"]');

            var smsGroup = element.find('.smscode-container');

            var validator = getValidator(element);

            var dealError = function (tplId, title, useIm) {
                parentDialog.hide();
                var render = etpl.compile($('#' + tplId).html());
                var dialog = new Dialog({
                    content: render(me),
                    title: title,
                    disposeOnHide: true,
                    skinClass: 'calling-error-dialog',
                    width: 440
                });
                if (useIm) {
                    dialog.element.on('click', '[data-action="im"]', function () {
                        dialog.hide();
                        entrance.chatTo({
                            userNumber: me.orgNumber,
                            userType: 'institution'
                        });
                    });
                }
                return dialog;
            };

            var enableCodeBtn = function() {
                if (!codeButton.isCounting) {
                    if (validator.validate('mobile') && (captcha.hidden || captcha.isValid)) {
                        codeButton.element.prop('disabled', false);
                    }
                }
            };

            var disableCodeBtn = function () {
                if (!codeButton.isCounting) {
                    codeButton.element.prop('disabled', true);
                }
            };

            var calling = function () {
                var callingArgs = {
                    to_number: me.orgNumber,
                    call_type: 2
                };
                if (!isLogin) {
                    callingArgs.smscode = codeInput.val();
                    callingArgs.mobile = mobileInput.getMobile();
                }
                service.makePhoneCall(
                    callingArgs,
                    {
                        errorHandler: {
                            '1002': function () { /** 对方正在拨打电话 */
                                dealError('calling-template-buzy-time-alert', '免费电话', true);
                            },
                            '10006': function (response) { /** 对方国际号 */
                                me.orgMobile = response.data.mobile;
                                dealError('calling-template-pay-alert', '付费电话');
                            },
                            '10007': function (response) { /** 非工作时间 */
                                me.workTime = response.data.work_time;
                                dealError('calling-template-no-work-alert', '免费电话', true);
                            },
                            '1104': function () { /** 超出限额 */
                                dealError('calling-template-over-limit-alert', '免费电话', true);
                            },
                            '1102': function () { /** 通话异常 */
                                var dialog = dealError('calling-template-calling-warning-alert', '免费电话');
                                $('.calling-error-dialog').one('click', '.warning-btn', function () {
                                    dialog.hide();
                                });
                            }
                        }
                    }
                ).done(function (response) {
                    if (response.code === 0) {
                        parentDialog.hide();
                    }
                });
            }

            element.on('click', '.btn-confirm', function (e) {
                if (isLogin) {
                    calling();
                } else if (validator.validate()) {
                    calling();
                }

            }).on('click', '.btn-cancel', function () {
                parentDialog.hide();
            });

            if (!isLogin) {
                var voiceCode = element.find('.voice-code-link');
                voiceCode.on('click', '.btn-link', sendVoiceCode);

                Placeholder.init(
                    element.find('[placeholder]')
                );

                mobileInput = me.mobileInput = new MobileInput({
                    element: element,
                    validator: validator
                });

                element.on('input', function () {
                    validateMobile(validator, codeButton);
                });

                element.on('propertychange', function () {
                    validateMobile(validator, codeButton);
                });

                codeButton = new CodeButton({
                    element: smscodeBtnNode,
                    send: function () {
                        voiceCode.show();
                        currentStatus = 'sms';
                        var mobile = mobileInput.getMobile();
                        return service.getSMSCode({
                                    mobile: mobile,
                                    type: "signin", // @FIXME: make a better name, signin_or_register
                                    captcha: captcha.getValue()
                                }, {
                                    errorHandler: {
                                        1000111: function () {
                                           captcha.show();
                                           captcha.change();
                                           setTimeout(function() {
                                                captcha.validate();
                                           });
                                        }
                                    }
                                }).done(function (response) {
                                    if (!response.code) {
                                        codeInput.focus();
                                    }
                                });
                    },
                    onTextChange: function () {
                        codeInput.width(smsGroup.width() - smscodeBtnNode.outerWidth(true) - 91);
                    }
                });
                captcha = new Captcha({
                    element: element.find('.captcha'),
                    captchaName: 'common',
                    autoValidate: true,
                    skipAuth: false,
                    onBeforeValidate: function () {
                        disableCodeBtn();
                    },
                    onValid: function () {
                        captcha.hide();
                        enableCodeBtn();
                        if (!currentStatus || currentStatus === 'sms') {
                            codeButton.sendCode();
                        } else {
                            service
                                .getSMSCode({
                                    mobile: mobileInput.getMobile(),
                                    type: "signin", // @FIXME: make a better name, signin_or_register
                                    is_voice: 1,
                                    captcha: captcha.getValue(),
                                    captcha_name: captcha.captchaName
                                })
                                .done(function (response) {
                                    if (response.code == 0) {
                                        alert({
                                            title: '获取语音校验码',
                                            content: '校验码将以电话形式通知到你，请注意接听'
                                        });
                                    }
                                });
                        }
                        codeInput.focus();
                        setTimeout(function () {
                            captcha.input.val('');
                        }, 0);
                    },
                    onInvalid: function () {
                        disableCodeBtn();
                    },
                    hidden: true
                });
            }
        }
    }

    return CallingDialog;

});