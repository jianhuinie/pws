/**
 * @file 账户设置 - 手机绑定
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var CodeButton = require('common/component/CodeButton');
    var CaptchaAuth = require('common/component/Captcha');
    var Validator = require('cobble/form/Validator');
    var SaveButton = require('common/component/SaveButton');
    var MobileInput = require('common/component/MobileInput');
    var service = require('common/service');
    var store = require('common/store');

    var mobileForm, newMobileForm;
    var bindingMobileInput; // 手机绑定 - 国际手机号
    var voiceCode, newVoiceCode, captchaAuth, mobileNumber, captchaCode; // 语音验证码

    // 手机绑定错误信息配置
    var mobileFields = {
        verify_code: {
            errors: {
                required: '请输入校验码'
            }
        }
    };

    var newMobileFields = {
        mobile: {
            errors: {
                required: '请输入新的手机号码',
                pattern: '请输入正确的手机号码'
            }
        },
        captcha: {
            errors: {
                required: '请输入验证码',
                minlength: '请输入 4 位验证码',
                maxlength: '请输入 4 位验证码'
            }
        },
        verify_code: {
            errors: {
                required: '请输入校验码'
            }
        }
    };

    // 获取语音校验码
    function sendVoiceCode() {

        if (mobileForm.is(':visible')) {
            mobileNumber = $.trim(mobileForm.find('[name="old_mobile"]').val());
        }
        else if (newMobileForm.is(':visible')) {
            mobileNumber = $.trim(newMobileForm.find('[name="mobile"]').val());
        }

        if (!mobileNumber) {
            alert('请输入手机号');
        }
        else {
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
                                mobile: mobileNumber
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

    exports.init = function () {

        var container = $('#content .item-mobile');
        var isbindingInternational = false;
        var nextUrl = 'http://www.genshuixue.com/auth/logout?next=';

        if (store.get('userType') === 2) {
            nextUrl += '/lesson/studentLessons';
        }
        else {
            nextUrl += '/teacher_center/index';
        }

        // 手机号不再使用
        var href = 'https://passport.genshuixue.com/view/pc/resetMobile.html'
                 + '?user_id=' + store.get('userNumber')
                 + '&user_role=' + store.get('userType')
                 + '&next_url=' + encodeURIComponent(nextUrl);
        container.find('.passport').attr('href', href);

        // 新手机号绑定
        var newMobileCodeBtn = new CodeButton({ // 新手机号
            element: container.find('#new-mobile-send'),
            send: function () {

                var name = 'mobile';

                if (newMobileValidator.validate(name)) {

                    var mobile = $.trim(bindingMobileInput.getMobile());

                    // 验证手机号是否已被使用
                    var deferred = $.Deferred();
                    service
                    .checkMobileRegister({
                        mobile: mobile
                    })
                    .done(function (response) {
                        if (response.code === 0) {

                            if (response.data.exist == 1) {
                                alert('该号码已绑定其他账号');
                                container.find('#new-mobile-send').prop('disabled', false);
                            }
                            else {

                                // 非国际手机号可发语音验证码
                                if (mobile.indexOf('00') != 0) {
                                    newVoiceCode.parent().show();
                                }

                                // 发送验证码
                                return service
                                .getSMSCode({
                                    mobile: $.trim(bindingMobileInput.getMobile())
                                })
                                .done(function (response) {
                                    if (response.code === 0) {
                                        deferred.resolve(response);
                                        success('校验码发送成功，请注意查收');
                                    } else {
                                        container.find('#new-mobile-send').prop('disabled', false);
                                    }
                                });
                            }
                        }
                    });
                    return deferred.promise();
                }

            }
        });

        // 手机绑定，图形验证码
        captchaAuth = new CaptchaAuth({
            element: container.find('.captcha-auth'),
            captchaName: 'wyj',
            onBeforeValidate: function () {
                if (!newMobileCodeBtn.isCounting) {
                    container.find('#new-mobile-send').prop('disabled', true);
                }
            },
            onValid: function () {
                if (!newMobileCodeBtn.isCounting && captchaAuth.isValid) {
                    container.find('#new-mobile-send').prop('disabled', false);
                }
            },
            onInvalid: function () {
                if (!newMobileCodeBtn.isCounting) {
                    container.find('#new-mobile-send').prop('disabled', true);
                }
            }
        });

        // 表单验证
        mobileForm = container.find('#form-mobile');
        var mobileValidator = new Validator({
            element: mobileForm,
            fields: mobileFields
        });

        // 语音验证码
        voiceCode = mobileForm.find('.voice-code-link span');
        voiceCode.on('click', sendVoiceCode);

        // 表单验证
        newMobileForm = container.find('#form-newMobile');
        var newMobileValidator = new Validator({
            realtime: true,
            element: newMobileForm,
            fields: newMobileFields
        });

        // 语音验证码
        newVoiceCode = newMobileForm.find('.voice-code-link span');
        newVoiceCode.on('click', sendVoiceCode);

        // 发送验证码按钮 - 当前手机号
        var mobileCodeBtn = new CodeButton({
            element: container.find('#mobile-send'),
            send:function () {

                var name = 'old_mobile';
                var mobile = $.trim(mobileForm.find('[name="' + name + '"]').val());

                // 非国际手机号可发语音验证码
                if (mobile.indexOf('00') != 0) {
                    voiceCode.parent().show();
                }

                return service
                .getSMSCode({
                    mobile: mobile
                })
                .done(function (response) {
                    if (response.code === 0) {
                        success('校验码发送成功，请注意查收');
                    }
                });

            }
        });

        // 表单提交
        var mobileSaveBtn = new SaveButton({ // 下一步
            element: container.find('#mobile-submit'),
            save: function () {

                var target = this.element;
                var formElement = target.closest('.old-form');
                var newFormElement = formElement.next('.new-form');

                if (mobileValidator.validate()) {

                    var oldMobile = $.trim(mobileForm.find('input[name="old_mobile"]').val());
                    var verifyCode = mobileForm.find('input[name="verify_code"]').val();

                    return service
                    .checkNormalSMSCode({ // 下一步，验证验证码
                        mobile: oldMobile,
                        code: verifyCode
                    })
                    .done(function (response) {
                        if (response.code === 0) {

                            container.find('#form-mobile')[0].reset();
                            formElement.hide();

                            newFormElement.show();
                            newFormElement.find('input[name="old_mobile"]').val(oldMobile);
                            newFormElement.find('input[name="old_code"]').val(verifyCode);

                            /*
                             * 手机绑定 - 国际手机号
                             */
                            bindingMobileInput = new MobileInput({
                                element: container.find('#binding-mobile'),
                            });

                        }
                    });

                }
            }
        });

        var newMobileSaveBtn = new SaveButton({ // 绑定手机
            element: container.find('#new-mobile-submit'),
            save: function () {

                var target = this.element;
                var formElement = target.closest('.new-form');
                var itemBody = formElement.closest('.item-body');

                if (newMobileValidator.validate()) {

                    var oldMobile = $.trim(formElement.find('input[name="old_mobile"]').val());
                    var oldVerifyCode = formElement.find('input[name="old_code"]').val();
                    var newMobile = $.trim(bindingMobileInput.getMobile());
                    var captcha = formElement.find('input[name="captcha"]').val();
                    var newVerifyCode = formElement.find('input[name="verify_code"]').val();
                    // 手机号临时反显
                    var starMobile = newMobile.substr(0, 3) + '****' + newMobile.substr(7, 4);

                    return service
                    .savePhone({
                        oldMobile: oldMobile,
                        oldVerifyCode: oldVerifyCode,
                        newMobile: newMobile,
                        captcha: captcha,
                        newVerifyCode: newVerifyCode
                    })
                    .done(function (response) {
                        if (response.code === 0) {
                            success('手机绑定成功', function () {
                                location.reload();
                            });
                        }
                    });

                }
            }
        });

        container
        .on('click', '.btn-change-captcha', function () {// 图形验证码
            $('.captcha-image').prop(
                'src',
                '/captcha?captcha_name=wyj&' + $.now()
            );
        })
        .on('click', '#binding-mobile .switch-international', function () {// 国际手机号
            if (isbindingInternational) {
                isbindingInternational = false;
                bindingMobileInput.disableInternational();
                $(this).text('非中国大陆手机号，请点此进入');
            }
            else {
                newVoiceCode.parent().hide();
                isbindingInternational = true;
                bindingMobileInput.enableInternational();
                $(this).text('中国大陆手机号，请点此进入');
            }
        })
        .on('click', '.btn-change', function (e) {// 展示已绑定信息，再更改（手机）

            var target = $(e.currentTarget);
            var item = target.closest('.item');

            item.find('.form-result').hide();
            item.find('.old-form').show();
        });

    }


});