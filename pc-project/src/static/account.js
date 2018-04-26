/**
 * @file 绑定第三方帐号
 * @author zhujialu, zhangshaolong
 */
define(function (require, exports, module) {

    'use strict';

    var Validator = require('cobble/form/Validator');
    var Placeholder = require('cobble/helper/Placeholder');

    var CodeButton = require('common/component/CodeButton');
    var SaveButton = require('common/component/SaveButton');

    var MobileInput = require('common/component/MobileInput');

    var Captcha = require('common/component/Captcha');

    var form = require('common/form');
    var store = require('common/store');
    var service = require('common/service');

    var mobileInput;

    var captcha, currentStatus;

    function sendVoiceCode(isActivityVoice, deferred) {
        if (!mobileInput.getMobile()) {
            alert('请输入手机号');
        }
        else {
            currentStatus = 'voice';
            alert({
                    title: '获取语音校验码',
                    content: '校验码将以电话形式通知到你，请注意接听',
                    buttons: [
                        {
                            text: '获取',
                            type: 'primary',
                            handler: function () {
                                this.hide();
                                if (captcha.hidden) {
                                    captcha.show();
                                    captcha.change();
                                    captcha.validate();
                                    return ;
                                }
                                if (isActivityVoice === true) { //第一个参数有可能是jquery e
                                    service
                                    .getSMSCode({
                                        mobile:mobileInput.getMobile(),
                                        captcha: captcha.getValue(),
                                        captcha_name: captcha.captchaName,
                                        type: 'activity-voice'
                                    })
                                    .done(function (response) {
                                        if (deferred.resolve) {
                                            deferred.resolve(response);
                                        }
                                    });
                                }
                                else {
                                    service
                                    .sendVoiceSMS({
                                        mobile: mobileInput.getMobile(),
                                        captcha: captcha.getValue(),
                                        captchaName: captcha.captchaName
                                    });
                                }
                            }
                        },
                        {
                            text: '取消',
                            handler: function () {
                                this.hide();
                            }
                        }

                    ]
            });
        }

    }

    exports.init = function () {

        var container = $('#main');

        var codeBtn;
        var voiceCode = container.find('.resend-tip b');
        var verifyCodeInput = container.find('input[name="code"]');

        captcha = new Captcha({
            element: $('#captcha'),
            captchaName: 'sms_account',
            autoValidate: true,
            skipAuth: false,
            onValid: function () {
                captcha.hide();
                enableCodeBtn();
                if (!currentStatus || currentStatus === 'sms') {
                    codeBtn.sendCode();
                } else {
                    service
                        .sendVoiceSMS({
                            mobile: mobileInput.getMobile(),
                            captcha: captcha.getValue(),
                            captchaName: captcha.captchaName
                        });
                }
                verifyCodeInput.focus();
                setTimeout(function () {
                    captcha.input.val('');
                }, 0);
            },
            onInvalid: function () {
                disableCodeBtn();
            }
        });

        voiceCode.on('click', sendVoiceCode);

        var validator = new Validator({
            element: container.find('.form'),
            fields: {
                mobile: {
                    errors: {
                        required: '请输入手机号',
                        pattern: '请输入正确的手机号'
                    }
                },
                code: {
                    errors: {
                        required: '请输入校验码',
                        pattern: '请输入正确的校验码'
                    }
                },
                password: {
                    custom: function (field, callback) {

                        var value = $.trim(field.val());
                        if (value.length < 7) {
                            return '请输入至少 7 位的密码';
                        }

                        var hasNumber = /\d/.test(value);
                        var hasLetter = /[a-z]/i.test(value);

                        if (!hasNumber || !hasLetter) {
                            return '密码需包含数字和字母';
                        }

                        return true;
                    }
                }
            }
        });

        mobileInput = new MobileInput({
            element: container.find('.mobile-input'),
            onChange: function () {
                if (mobileInput.isInternational()) {
                    voiceCode.parent().hide();
                }
                else if (codeBtn.isCounting){
                    voiceCode.parent().show();
                }
            },
            onInputChange: function () {
                if(validator.validate('mobile')) {
                    enableCodeBtn();
                }
                else {
                    disableCodeBtn();
                }
            },
            validator: validator
        });
        Placeholder.init(
            container.find('[placeholder]')
        );

        var hasRegister;

        var checkRegister = function (mobile) {
            service.checkMobileRegister({
                mobile: mobile
            })
            .done(function (response) {
                if (response.code === 0) {
                    hasRegister = response.data.exist;
                    if (!hasRegister) {
                        container.find('.password').show();
                    }
                }
            });
        };

        var enableCodeBtn = function() {
            if (!codeBtn.isCounting) {
                if (validator.validate('mobile') && captcha.isValid) {
                    codeBtn.element.prop('disabled', false);
                }
            }
        }

        var disableCodeBtn = function () {
            if (!codeBtn.isCounting) {
                codeBtn.element.prop('disabled', true);
            }
        }

        codeBtn = new CodeButton({
            element: container.find('.btn-send-code'),
            send: function () {

                var data = form.parse(container);
                var mobile = mobileInput.getMobile();

                checkRegister(mobile);

                if (!mobileInput.isInternational()) {
                    voiceCode.parent().show();
                }

                if (captcha.hidden && captcha.getValue() == '') {
                    captcha.show();
                    captcha.change();
                    captcha.validate();
                    return ;
                }

                return service
                .getSMSCode({
                    mobile: mobile,
                    captcha: data.captcha,
                    captcha_name: captcha.captchaName
                });
            }
        });

        disableCodeBtn();

        var redirect = function (response) {
            if (response.code === 0) {
                success(
                    '绑定成功',
                    function () {
                        location.href = response.data.redirect_url;
                    }
                );
            }
        };

        var submitBtn = new SaveButton({
            element: container.find('.btn-submit'),
            saveText: '正在提交...',
            save: function () {
                if (validator.validate()) {
                    var data = form.parse(container);
                    var args = {
                        type: store.get('type'),
                        mobile: mobileInput.getMobile(),
                        smscode: data.code,
                        usertype: store.get('user_type')
                    };
                    var actionName = 'thirdBinding';
                    if (!hasRegister) {
                        actionName = 'thirdSignup';
                        args.password = data.password;

                    }
                    return service[actionName](args).done(redirect);
                }
            }
        });

        var quitBtn = new SaveButton({
            element: container.find('.btn-quit'),
            saveText: '正在取消...',
            save: function () {
                return service
                .quitSignupBySns()
                .done(function (response) {
                    if (response.code === 0) {
                        location.href = response.data.redirect_url;
                    }
                });
            }
        });
    };

});