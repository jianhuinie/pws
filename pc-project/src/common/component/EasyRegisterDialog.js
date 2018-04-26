/**
 * @file 浅注册／登录弹出层
 * @author wangyujie
 */
define(function (require) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var Validator = require('cobble/form/Validator');
    var service = require('common/service');
    var SaveButton = require('common/component/SaveButton');
    var CodeButton = require('common/component/CodeButton');

    /**
     * 登录弹窗类
     *
     * @param {Object} options 配置信息
     * @property {string=} options.mobile 手机号
     * @property {string=} options.next 登录成功后的跳转页面
     * @property {Function=} options.onSuccess 登录成功后得回调
     * @property {string=} options.failNext 登录失败后的跳转url
     * @property {number=}  options.zIndex 对话框的z-Index层级默认为5
     * @property {boolean=} options.activityVoiceRegister 有些活动的登录框需要在跳转注册时强制用语音验证码注册
     * @property {string=} options.registerPrefix 自定义的注册url前缀，用于统计
     */
    function EasyRegisterDialog(options) {
        $.extend(this, EasyRegisterDialog.defaultOptions, options);
        this.init();
    }

    EasyRegisterDialog.prototype = {

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

            var smsGroup = element.find('.form-sms');
            var codeInput = smsGroup.find('.form-text');
            var codeBtn = element.find('.form-get-smscode');
            var codeInputWidth = codeInput.width();

            var codeButton = new CodeButton({
                element: codeBtn,
                send: function () {
                    // voiceCode.show();
                    var mobile = $.trim(element.find('input[name="mobile"]').val());

                    return service
                    .getSMSCode({
                        mobile: mobile,
                        type: "signin" // @FIXME: make a better name, signin_or_register
                    })
                    .done(function () {
                        codeInput.focus();
                    });
                },
                onTextChange: function () {
                    codeInput.outerWidth(
                        // 计算太烦了，减 2 比较保险不换行
                        smsGroup.width() - codeBtn.outerWidth(true) - 2
                    );
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

                        service
                        .easyRegister({
                            mobile: mobile,
                            smscode: smscode
                        })
                        .done(function (response) {

                            if (response.code === 0) {
                                me.dialog.hide();
                                me.onSuccess(response.data.number);
                            }

                        });
                    }
                }
            });

            element
            .on('blur', 'input[type="mobile"]', function (e) {
                validateMobile(me.validator, codeButton);
            });

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

    EasyRegisterDialog.defaultOptions = {
        title: '登录',
        width: 509,
        onSuccess: $.noop,
        skinClass: 'login-dialog'
    };


    return EasyRegisterDialog;

});