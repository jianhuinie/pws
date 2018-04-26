/**
 * @file 账户设置 - 支付密码
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var Validator = require('cobble/form/Validator');
    var CodeButton = require('common/component/CodeButton');
    var SaveButton = require('common/component/SaveButton');
    var form = require('common/form');
    var service = require('common/service');

    var payMobileInput, voiceCode, mobileNumber; // 支付密码 - 国际手机号 - 这里可能有问题哦~！

    // 支付密码错误信息配置
    var payPasswordFields = {
        verify_code: {
            errors: {
                required: '请输入校验码'
            }
        },
        old_password: {
            errors: {
                required: '请输入当前支付密码',
                pattern: '支付密码必须是 6 位数字'
            }
        },
        pay_password: {
            errors: {
                required: '请输入新的支付密码',
                pattern: '支付密码必须是 6 位数字'
            }
        },
        pay_password_confirm: {
            errors: {
                required: '请再次确认支付密码',
                equals: '两次输入的密码不相同'
            }
        }
    };

    // 获取语音校验码
    function sendVoiceCode() {
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

        var container = $('#content .item-pay-password');
        var ispayInternational = false;

        // 语音验证码
        voiceCode = container.find('.voice-code-link span');
        voiceCode.on('click', sendVoiceCode);

        // 表单验证
        var payPasswordForm = container.find('#form-paypassword');
        var payPasswordValidator = new Validator({
            element: payPasswordForm,
            fields: payPasswordFields
        });

        // 发送验证码按钮
        var payPasswordCodeBtn = new CodeButton({
            element: container.find('#pay-password-send'),
            send:function () {

                var name = 'mobile';
                mobileNumber = $.trim(payPasswordForm.find('[name="' + name + '"]').val());

                if (mobileNumber.indexOf('00') != 0) {
                    voiceCode.parent().show();
                }

                return service
                .sendPayMobileCode({
                    mobile: mobileNumber
                })
                .done(function (response) {
                    if (response.code === 0) {
                        success('校验码发送成功，请注意查收');
                    }
                });

            }
        });

        // 表单提交
        var payPasswordSaveBtn = new SaveButton({
            element: container.find('#pay-password-submit'),
            save: function () {

                var target = this.element;
                var itemBody = target.closest('.item-body');
                var itemHeader = itemBody.prev('.item-header');

                // 先验证手机验证码
                // 发送数据
                if (payPasswordValidator.validate()) {

                    var formData = form.parse(itemBody);

                    service
                    .setPayPassword({
                        mobile: formData.mobile,
                        verifyCode: formData.verify_code,
                        currentPayPassword: formData.old_password,
                        payPassword: formData.pay_password,
                        payPasswordConfirm: formData.pay_password_confirm
                    })
                    .done(function (response) {
                        if (response.code === 0) {
                            success('保存成功', function () {
                                location.reload();
                            });

                        }
                    });

                }
            }
        });

        /*
        container
        // 国际手机号
        .on('click', '#pay-mobile .switch-international', function () {
            if (ispayInternational) {
                ispayInternational = false;
                payMobileInput.disableInternational();
                $(this).text('非中国大陆手机号，请点此进入');
            }
            else {
                ispayInternational = true;
                payMobileInput.enableInternational();
                $(this).text('中国大陆手机号，请点此进入');
            }
        });
        */

    }

});