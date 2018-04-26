/**
 * @file 账户设置 - 登录密码
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var Validator = require('cobble/form/Validator');
    var CodeButton = require('common/component/CodeButton');
    var SaveButton = require('common/component/SaveButton');
    var service = require('common/service');

    // 登录密码错误信息配置
    var passwordFields = {
        old_password: {
            errors: {
                required: '请输入当前登录密码'
            }
        },
        password: {
            errors: {
                required: '请输入新密码',
                minlength: '请输入6-20位密码',
                maxlength: '请输入6-20位密码'
            },
            custom: function (field) {
                var value = field.val();

                // 必须满足两类
                var numberExpr = /\d/;
                var letterExpr = /[a-z]/i;
                var symbolExpr = /[~!@#$%^&*()_+-=[]{}';:",.<>]/;

                if (!numberExpr.test(value) && !letterExpr.test(value)
                    || !numberExpr.test(value) && !symbolExpr.test(value)
                    || !letterExpr.test(value) && !symbolExpr.test(value)
                ) {
                    return '密码必须包含字母数字或符号，至少两种字符';
                }

                return '';
            }
        },
        password_confirm: {
            errors: {
                required: '请再次确认密码',
                equals: '两次输入的密码不相同'
            }
        }
    };

    exports.init = function () {

        var container = $('#content .item-password');
        var passwordForm = container.find('#form-password');

        // 表单验证
        var passwordValidator = new Validator({
            element: passwordForm,
            fields: passwordFields
        });

        // 发送验证码按钮
        var passwordCodeBtn = new CodeButton({

            element: passwordForm.find('#password-send'),
            send: function () {

                var name = 'mobile';

                if (passwordValidator.validate(name)) {

                    var mobile = $.trim(passwordForm.find('[name="' + name + '"]').val());

                    // 验证手机号是否属于当前用户
                    return service
                    .validateMobile({
                        mobile: mobile
                    })
                    .done(function (response) {
                        if (response.code === 0) {
                            // 发送验证码
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

                }
            }
        });

        // 表单提交
        var passwordSaveBtn = new SaveButton({
            element: passwordForm.find('#password-submit'),
            save: function () {

                var target = this.element;
                var itemBody = target.closest('.item-body');

                if (passwordValidator.validate()) {

                    var old_password = passwordForm.find('input[name="old_password"]').val();
                    var password = passwordForm.find('input[name="password"]').val();
                    var password_confirm = passwordForm.find('input[name="password_confirm"]').val();

                    return service
                    .saveNewpwd({
                        old_password: old_password,
                        password: password,
                        password_confirm: password_confirm
                    })
                    .done(function (response) {
                        if (response.code === 0) {
                            success('登录密码修改成功');
                            itemBody.hide();
                            passwordForm[0].reset();
                        }

                    });

                }

            }
        });















    }















});