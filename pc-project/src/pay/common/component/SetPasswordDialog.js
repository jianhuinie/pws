/**
 * @file 设置支付密码对话框
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var Validator = require('cobble/form/Validator');
    var form = require('common/form');
    var CodeButton = require('common/component/CodeButton');
    var SaveButton = require('common/component/SaveButton');
    var service = require('common/service');

    var voiceCode, element;

    /**
     * 设置支付密码对话框
     *
     * @constructor
     * @param {Object} options
     * @property {string} options.mobile  用户当前手机号
     * @property {string} options.mobile_mask  用户当前手机号（已加星处理）
     * @property {Function=} options.onSuccess
     * @argument {Object} options.onSuccess.data
     */
    function SetPasswordDialog(options) {
        $.extend(this, options);
        this.init();
    }

    // 获取语音校验码
    function sendVoiceCode() {

        var mobileNum = $.trim(element.find('input[name="mobile"]').val());
        if (!mobileNum) {
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
                                mobile: mobileNum
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

    SetPasswordDialog.prototype = {

        init: function () {

            var me = this;

            var tpl =
              '<div class="form">'

            +     '<div class="form-group mobile-input">'
            +         '<label class="form-label">当前手机号：</label>'
            +         '<div class="form-controls">'
            +             '<div class="form-static">'
            +                 me.mobile_mask
            +                 '<input type="hidden" name="mobile" value="' + me.mobile + '" />'
            +             '</div>'
            +         '</div>'
            +     '</div>'


            +     '<div class="form-group">'
            +         '<label class="form-label">校验码：</label>'
            +         '<div class="form-controls">'
            +             '<input class="form-text" type="text" name="verify_code" required />'
            +             '<button type="button" id="pay-password-send" class="btn btn-info">获取校验码</button>'
            +             '<span class="error"></span>'
            +             '<div class="form-block">'
            +                 '<div class="voice-code-link hidden">'
            +                     '<span class="btn-link text-info">没有收到校验码？</span>'
            +                 '</div>'
            +             '</div>'
            +         '</div>'
            +     '</div>'



            +     '<div class="form-group">'
            +         '<label class="form-label">支付密码：</label>'
            +         '<div class="form-controls">'
            +             '<input class="form-text" type="password" name="pay_password" required minlength="6" maxlength="6" pattern="^\\s*\\d{6}\\s*$" />'
            +             '<div class="form-static"><span class="form-hint"><i class="icon icon-info-circle"></i>支付密码由6位数字组成</span></div>'
            +             '<span class="error"></span>'
            +         '</div>'
            +     '</div>'
            +     '<div class="form-group">'
            +         '<label class="form-label">确认支付密码：</label>'
            +         '<div class="form-controls">'
            +             '<input class="form-text" type="password" name="pay_password_confirm" required equals="pay_password" minlength="6" maxlength="6" />'
            +             '<span class="error"></span>'
            +         '</div>'
            +     '</div>'
            +     '<div class="form-action">'
            +         '<button class="btn-primary btn-save" id="pay-password-submit">保存</button>'
            +         '<button class="btn-default btn-cancel">取消</button>'
            +     '</div>'
            + '</div>';

            var dialog = new Dialog({
                title: '设置支付密码',
                content: tpl,
                width: 565,
                onBeforeHide: function () {
                    this.element.off();
                }
            });

            element = dialog.element;

            voiceCode = element.find('.voice-code-link span');
            voiceCode.on('click', sendVoiceCode);

            // 验证
            var validator = new Validator({
                element: element.find('.form'),
                fields: {
                    verify_code: {
                        errors: {
                            required: '请输入校验码'
                        }
                    },
                    pay_password: {
                        errors: {
                            required: '请输入支付密码',
                            minlength: '支付密码要求是 6 位数字',
                            maxlength: '支付密码要求是 6 位数字',
                            pattern: '支付密码要求是 6 位数字'
                        }
                    },
                    pay_password_confirm: {
                        errors: {
                            required: '请输入确认密码',
                            minlength: '两次密码不一致',
                            maxlength: '两次密码不一致',
                            equals: '两次密码不一致'
                        }
                    }
                }
            });

            // 发送验证码按钮
            var payPasswordCodeBtn = new CodeButton({
                element: element.find('#pay-password-send'),
                send: function () {

                    var name = 'mobile';
                    var mobile = $.trim($('.dialog-body').find('input[name="mobile"]').val());

                    if (mobile.indexOf('00') != 0) {
                        voiceCode.parent().show();
                    }

                    // 发送验证码
                    return service
                    .sendPayMobileCode({
                        mobile: mobile
                    })
                    .done(function (response) {
                        if (response.code === 0) {
                            success('校验码发送成功，请注意查收');
                        }
                    });

                }
            });

            // 保存表单
            var payPasswordSaveBtn = new SaveButton({
                element: element.find('#pay-password-submit'),
                save: function () {

                    // 先验证手机验证码
                    // 发送数据
                    if (validator.validate()) {

                        var formData = form.parse(validator.element);

                        service
                        .setPayPassword({
                            mobile: formData.mobile,
                            verifyCode: formData.verify_code,
                            payPassword: formData.pay_password,
                            payPasswordConfirm: formData.pay_password_confirm
                        })
                        .done(function (response) {
                            if (response.code === 0) {
                                if ($.isFunction(me.onSuccess)) {
                                    me.onSuccess({
                                        password: formData.pay_password
                                    });
                                }
                                dialog.hide();
                            }
                        });

                    }
                }
            });


            var isInternational = false;
            element
            .on('click', '.btn-cancel', function () {
                dialog.hide();
            });
        }

    };


    return SetPasswordDialog;

});