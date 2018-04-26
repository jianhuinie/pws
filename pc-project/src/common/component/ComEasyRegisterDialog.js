/**
 * @file 浅注册表单内容 - 班课，预约试听
 * @author wangyujie
 */
define(function (require) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var Validator = require('cobble/form/Validator');
    var service = require('common/service');
    var SaveButton = require('common/component/SaveButton');
    var MobileInput = require('common/component/MobileInput');
    var Editor = require('common/component/Editor');
    var CodeButton = require('common/component/CodeButton');
    var Captcha = require('common/component/Captcha');

    var mobileInput;
    var captcha, loginMobileCaptcha, currentStatus;

    var captchaTpl = ''
        +   '<div class="form-block captcha form-captcha">'
        +       '<div class="form-group">'
        +           '<label class="form-label">验证码：</label>'
        +           '<div class="form-controls">'
        +               '<span class="input-group">'
        +                   '<input class="form-text" type="text" name="captcha" '
        +                       'required minlength="4" maxlength="4" placeholder="请输入图中的文字">'
        +                   '<span class="input-group-addon">'
        +                       '<img class="captcha-image" src="/captcha?captcha_name=exceed_count&' + $.now() + '" />'
        +                   '</span>'
        +               '</span>'
        +               '<span class="error"></span>'
        +           '</div>'
        +           '<div class="form-hint">'
        +               '<span class="btn-link btn-change-captcha">换一张</span>'
        +           '</div>'
        +       '</div>'
        +   '</div>';

    /**
     * 浅注册类
     *
     * @param {Object} options 配置信息
     * @property {Function=} options.onSuccess 登录成功后得回调
     */
    function ComEasyRegisterDialog(options) {
        $.extend(this, ComEasyRegisterDialog.defaultOptions, options);
        this.init();
    }

    // 获取语音校验码
    function sendVoiceCode(flag) {
        if (flag === true) {
            return service
                    .getSMSCode({
                        mobile: mobileInput.getMobile(),
                        captcha: (loginMobileCaptcha && loginMobileCaptcha.getValue()) || '',
                        captcha_name: 'common',
                        type: 'voice'
                    });
        }
        if (!mobileInput.getMobile()) {
            alert('请输入手机号');
        }
        else {
            currentStatus = 'voice';
            if (loginMobileCaptcha && !loginMobileCaptcha.hidden) {
                if (!loginMobileCaptcha.validate()) {
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
                            .getSMSCode({
                                mobile: mobileInput.getMobile(),
                                captcha: (loginMobileCaptcha && loginMobileCaptcha.getValue()) || '',
                                captcha_name: 'common',
                                type: 'voice'
                            }, {
                                errorHandler: {
                                    1000111: function () {
                                       loginMobileCaptcha.show();
                                       loginMobileCaptcha.change();
                                       setTimeout(function() {
                                            loginMobileCaptcha.validate();
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

    ComEasyRegisterDialog.prototype = {

        init: function () {

            var me = this;
            var failNext = me.failNext;

            me.dialog = new Dialog({
                //默认为5
                zIndex: me.zIndex || 5,
                title: me.title,
                // 必须在这里读取，不然可能会因为 DOM 没加载完而拿不到模板
                content: $('#easy-register-dialog-form').html(),
                width: me.width,
                skinClass: me.skinClass
            });

            var element = me.dialog.element;

            if (me.next) {
                element
                .find('input[name="next"]')
                .val(
                    encodeURIComponent(me.next)
                );
            }

            var smsGroup = element.find('.form-sms'); // 验证码
            var codeInput = element.find('.sms'); // 验证码输入框
            var codeBtn = smsGroup.find('.form-get-smscode'); // 获取校验码按钮
            var codeInputWidth = codeInput.width();

            // 手机号
            mobileInput = me.mobileInput = new MobileInput({
                element: element.find('#mobile'),
                validator: me.validator,
                onInputChange: function (e) {
                    if (captcha) {
                        captcha.hide();
                    }
                }
            });

            // 语音验证码
            var voiceCode = element.find('.voice-code-link');
            voiceCode.on('click', '.btn-link', sendVoiceCode);

            // 留言
            me.editor = new Editor({
                element: element.find('.form-editor'),
                maxLength: 50
            });

            /*
             * 获取验证码
             */
            var codeButton = new CodeButton({
                element: codeBtn,
                send: function () {
                    voiceCode.show();
                    var mobile = mobileInput.getMobile();
                    var type = 'signin'; // @FIXME: make a better name, signin_or_register
                    currentStatus = 'sms';

                    return service
                    .getSMSCode({
                        mobile: mobile,
                        type: type,
                        captcha: (loginMobileCaptcha && loginMobileCaptcha.getValue()) || ''
                    }, {
                        errorHandler: {
                            1000111: function () {
                                if (!loginMobileCaptcha) {
                                    $(captchaTpl.replace('exceed_count', type)).insertBefore('.form-group.form-sms');
                                    loginMobileCaptcha = new Captcha({
                                        element: element.find('.form-block.captcha'),
                                        captchaName: type,
                                        skipAuth: false,
                                        autoValidate: true,
                                        onValid: function () {
                                            loginMobileCaptcha.hide();
                                            if (!currentStatus || currentStatus === 'sms') {
                                                codeBtn.prop('disabled', false);
                                                codeButton.sendCode();
                                            } else {
                                                sendVoiceCode(true);
                                            }
                                            codeInput.focus();
                                            setTimeout(function () {
                                                loginMobileCaptcha.input.val('');
                                            });
                                        },
                                        onInvalid: function () {
                                            codeBtn.prop('disabled', true);
                                        }
                                    });
                                } else {
                                    loginMobileCaptcha.change();
                                }
                                loginMobileCaptcha.show();
                                setTimeout(function () {
                                    loginMobileCaptcha.validate();
                                }, 0);
                            }
                        }
                    })
                    .done(function (response) {
                        if (response.code == 0) {
                            codeInput.focus();
                        }
                    });
                }
            });

            me.validator = new Validator({
                realtime: true,
                element: element,
                fields: {
                    mobile: {
                        errors: {
                            required: '请输入手机号',
                            pattern: '请输入正确的手机号'
                        }
                    },
                    verifycode: {
                        errors: {
                            required: '请输入验证码',
                            pattern: '请输入正确的验证码'
                        }
                    },
                    info: {
                        errors: {
                            maxlength: '最多 50 字哦～'
                        }
                    }

                }
            });

            new SaveButton({
                element: element.find('.btn-save'),
                form: element,
                saveText: '请稍等...',
                save: function () {
                    if (me.validator.validate()) {
                        var mobile = $.trim(element.find('input[name="mobile"]').val());
                        var smscode = $.trim(element.find('input[name="verifycode"]').val());
                        var info = $.trim(element.find('textarea[name="info"]').val());

                        service
                        .easyRegister({
                            mobile: mobile,
                            smscode: smscode
                        })
                        .done(function (response) {

                            if (response.code === 0) {
                                me.dialog.hide();
                                // 将新注册的用户number 与 之前填写的留言信息抛出去
                                me.onSuccess(response.data.number, info);
                            }

                        });
                    }
                }
            });

            element
            .on('blur', 'input[type="mobile"]', function (e) {
                validateMobile(me.validator, codeButton);
            });

            /*
             * 获取校验码按钮 开启与关闭
             */
            function validateMobile(validator, codeBtn) {
                if (validator.validate('mobile') && !codeBtn.isCounting) {
                    codeBtn.element.prop('disabled', false);
                }
                else {
                    codeBtn.element.prop('disabled', true);
                }
            }

        },

        show: function () {
            this.dialog.show();
        },

        hide: function () {
            this.dialog.hide();
        }
    };

    ComEasyRegisterDialog.defaultOptions = {
        title: '预约试听',
        width: 510,
        onSuccess: $.noop,
        skinClass: 'login-dialog'
    };


    return ComEasyRegisterDialog;

});