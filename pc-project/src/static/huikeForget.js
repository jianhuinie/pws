/**
 * @file 汇课间忘记密码的页面的js 登录密码找回 支付密码找回
 * @author niejianhui
 */


define (function (require) {

    'use strict';

    var Placeholder = require('cobble/helper/Placeholder');
    var CodeButton = require('common/component/CodeButton');
    var service = require('common/service');

    var form = require('common/form');
    var Validator = require('cobble/form/Validator');
    var SaveButton = require('common/component/SaveButton');
    var store = require('common/store');
    var container = $('#main');
    var Captcha = require('common/component/Captcha');
    var captcha;
    var MobileInput = require('common/component/MobileInput');
    var mobileInput;
    var hasLogin;

    var element;
    var mobileNumber, captchaCode, voiceCode, codeButton;
    var currentStatus;

    /**
     * 初始化表单校验器
     *
     * @return {Object} 各个字段的校验器
     *
     */
    function initValidator() {

        var validator = new Validator({
            realtime: true,
            element: $('#main'),
            fields: {
                password: {
                    errors: {
                        required: '请输入密码',
                        minlength: '最小长度长为 6 个',
                        maxlength: '最大长度长为 16 个',
                        pattern: '请输入格式正确的密码'
                    }
                },
                mobile: {
                    errors: {
                        required: '请输入手机号',
                        pattern: '请输入正确的手机号'
                    }
                },
                verify_code: {
                    errors: {
                        required: '请输入校验码',
                        pattern: '请输入正确的校验码'
                    }
                },
                password_confirm: {
                    errors: {
                        required: '请输入密码',
                        minlength: '最小长度长为 6 个',
                        maxlength: '最大长度长为 16 个',
                        equals: '确认密码与新密码不一致',
                        pattern: '请输入格式正确的密码'
                    }
                },
                card: {
                    errors: {
                        required: '请输入身份证/护照号码'
                    }
                }
            }
        });

        return validator;
    };

    var validator = initValidator();

    var RESET_PASSWORD_URL = '/user/reset_password';

    /**
     * 绑定表单的提交事件
     * @return
     */
    function resetPassword() {
        var result = validator.validate();

        if (result) {
            var formData = form.parse(validator.element);
            var next = formData.next ? decodeURIComponent(formData.next) : '/';
            if (!hasLogin) {
                formData.mobile = mobileInput.getMobile();
            }

            if (captcha) {
                formData.captcha = captcha.getValue();
                formData.captcha_name = captcha.captchaName;
            }

            return service
            .resetPassword(
                formData
            )
            .done( function (response)  {
                if (response && !response.code && response.data) {
                    var resetUrl = response.data.url ?  response.data.url : null;
                    alert({
                        title: '温馨提示',
                        content: '恭喜你，密码重置成功',
                        buttons: [{
                            text: '返回',
                            type: 'primary',
                            handler: function () {
                                // var data = {
                                //     userType: formData.usertype,
                                //     mobile: formData.mobile,
                                //     next: next,
                                //     password: formData.password
                                // };

                                // service
                                // .loginByPassword(data)
                                // .done(function (response) {
                                //     var data = response.data;

                                //     if(data.url) {
                                //         location.href = data.url;
                                //     }
                                //     else if (resetUrl) {
                                //         location.href = resetUrl;
                                //     }
                                // })

                                location.href = '/static/new_login?user_type=' + formData.usertype;
                            }
                        }]
                    });
                }
            });
        }
    };

    /**
     * 修改支付密码
     */
    function resetPayPassword() {
        var result = validator.validate(['card', 'verify_code']);

        if (result) {
            var formData = form.parse(validator.element);
            var next = formData.next ? decodeURIComponent(formData.next) : '/';

            formData.check = true;
            if (!hasLogin){
                formData.mobile = mobileInput.getMobile();
            }

            if (captcha) {
                formData.captcha = captcha.getValue();
                formData.captchaName = captcha.captchaName;
            }

            return service
            .resetPayPassword(
                formData
            )
            .done(function (response) {
                if (response.code == 0) {
                    container.find('.step1').hide();
                    var element = container.find('.step2');
                    var submit = element.find('button[type="submit"]');
                    element.show();

                    new SaveButton({
                        element: submit,
                        form: element,
                        saveText: '正在重置密码',
                        save: function () {
                            if (validator.validate(['password', 'password_confirm'])) {
                                formData.check = false;
                                var password = form.parse(element);

                                $.extend(formData, password);

                                return service
                                .resetPayPassword(
                                    formData
                                )
                                .done(function (response) {
                                    if (response.code == 0) {
                                        var url = response.data.url;
                                        if (url) {
                                            location.href = url;
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
            })
        }
    }

    // 获取语音校验码
    function sendVoiceCode(flag) {
        if (hasLogin) {
            mobileNumber = $.trim(element.find('input[name="mobile"]').val());
            captchaCode = null;
        }
        else {
            mobileNumber = mobileInput.getMobile();
            captchaCode = captcha.getValue();
        }

        if (flag === true) {
            return service
                    .sendVoiceSMS({
                        mobile: mobileNumber,
                        captcha: captchaCode,
                        captchaName: (captcha ? captcha.captchaName : null)
                    });
        }

        if (!mobileNumber) {
            alert('请输入手机号');
        }
        else {
            currentStatus = 'voice';
            if (captcha && !captcha.hidden) {
                if (!captcha.validate()) {
                    return false;
                }
            }
            alert({
                title: '获取语音校验码',
                content: '校验码将以电话形式通知到你，请注意接听',
                buttons: [
                    {
                        text: '获取',
                        type: 'primary',
                        handler: function () {
                            this.hide();

                            service
                            .sendVoiceSMS({
                                mobile: mobileNumber,
                                captcha: captchaCode,
                                captchaName: (captcha ? captcha.captchaName : null)
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
                            });

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

    return {
        init: function () {
            var me = this;
            var resetType = store.get('resetType'); //1 登录密码 2 支付密码
            element = container.find('.step1');
            var submit = element.find('button[type="submit"]');
            var verifyCodeInput = container.find('input[name="verify_code"]');
            hasLogin = store.get('hasLogin');

            voiceCode = element.find('.voice-code-link span');
            voiceCode.on('click', sendVoiceCode);

            Placeholder.init(
                container.find('[placeholder]')
            );

            if (!hasLogin) {

                mobileInput = new MobileInput({
                    element: container.find('#forget-mobile'),
                    onChange: function () {
                        if (mobileInput.isInternational()) {
                            voiceCode.parent().hide();
                        }
                        else if (codeButton.isCounting){
                            voiceCode.parent().show();
                        }
                    },
                    onInputChange: function () {
                        if(validator.validate('mobile')) {
                            enableCodeBtn();
                        };
                    },
                    validator: validator
                });

                element
                .on('blur', 'input[name="mobile"]', function() {
                    if (validator.validate('mobile')) {
                        enableCodeBtn();
                    }
                    else {
                        disableCodeBtn();
                    }
                });
            }

            if (resetType == 1) {
                new SaveButton({
                    element: submit,
                    form: element,
                    saveText: '正在重置密码',
                    save: resetPassword
                });
            }
            else if (resetType == 2){
                new SaveButton({
                    element: submit,
                    form: element,
                    saveText: '正在验证身份',
                    save: resetPayPassword
                });
            }

            codeButton = new CodeButton({
                element: container.find('.form-get-smscode'),
                send: function () {

                    if (hasLogin) {
                        mobileNumber = element.find('input[name="mobile"]').val();
                        captchaCode = null;
                        if (mobileNumber.indexOf('00') != 0) {
                            voiceCode.parent().show();
                        }
                    }
                    else {
                        mobileNumber = mobileInput.getMobile();
                        captchaCode = captcha.getValue();
                        if (!mobileInput.isInternational()) {
                            voiceCode.parent().show();
                        }
                    }

                    if (hasLogin || validator.validate(['mobile'])) {
                        
                        return service
                        .getHuikeSMSCode({
                            mobile: mobileNumber,
                            captcha: captchaCode,
                            captcha_name: (captcha ? captcha.captchaName : null),
                            type: (captcha ? captcha.captchaName : 'forget')
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
                        });
                    }
                },
                onFinish: function () {

                }
            });

            captcha = new Captcha({
                element: container.find('#captcha'),
                captchaName: 'forget',
                skipAuth: false,
                autoValidate: true,
                onBeforeValidate: function () {
                    disableCodeBtn();
                },
                onValid: function () {
                    captcha.hide();
                    enableCodeBtn();
                    if (!currentStatus || currentStatus === 'sms') {
                        codeButton.sendCode();
                    } else {
                        sendVoiceCode(true);
                    }
                    verifyCodeInput.focus();
                    setTimeout(function () {
                        captcha.input.val('');
                    });
                },
                onInvalid: function () {
                    disableCodeBtn();
                },
                hidden: true
            });

            if (!hasLogin) {
                var isInternational = false;
                container
                .on('click', '.switch-international', function () {
                    if (isInternational) {
                        isInternational = false;
                        mobileInput.disableInternational();
                        $(this).text('非中国大陆手机号，请点此进入');
                    }
                    else {
                        voiceCode.parent().hide();
                        isInternational = true;
                        mobileInput.enableInternational();
                        $(this).text('中国大陆手机号，请点此进入');
                    }
                });
            }

            var enableCodeBtn = function() {
                if (!codeButton.isCounting) {
                    if (validator.validate('mobile') && (hasLogin || captcha.isValid || captcha.hidden)) {
                        codeButton.element.prop('disabled', false);
                    }
                }
            }
            var disableCodeBtn = function() {
                if (!codeButton.isCounting) {
                    codeButton.element.prop('disabled', true);
                }
            }
        }
    }


});