/**
 * @file 账户设置 - 邮箱绑定
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var Validator = require('cobble/form/Validator');
    var CodeButton = require('common/component/CodeButton');
    var SaveButton = require('common/component/SaveButton');
    var service = require('common/service');

    // 邮箱绑定错误信息配置
    var emailFields = {
        new_email: {
            errors: {
                required: '请输入邮箱地址',
                pattern: '请输入正确的邮箱'
            }
        },
        password: {
            errors: {
                required: '请输入登陆密码',
                minlength: '请输入6-20位密码',
                maxlength: '请输入6-20位密码'
            }
        },
        verify_code: {
            errors: {
                required: '请输入邮箱验证码'
            }
        }
    };

    // 邮箱修改绑定错误信息配置
    var newemailFields = {
        password: {
            errors: {
                required: '请输入登陆密码',
                minlength: '请输入6-20位密码',
                maxlength: '请输入6-20位密码'
            }
        },
        new_email: {
            errors: {
                required: '请输入新邮箱地址',
                pattern: '请输入正确的邮箱'
            }
        },
        verify_code: {
            errors: {
                required: '请输入邮箱验证码'
            }
        }
    };

    exports.init = function () {

        var container = $('#content .item-email');

        // 表单验证
        var emailForm = container.find('#form-email');
        var emailValidator = new Validator({
            element: emailForm,
            fields: emailFields
        });

        // 表单验证
        var newemailValidator = new Validator({
            element: emailForm,
            fields: newemailFields
        });

        // 发送验证码按钮
        var emailCodeBtn = new CodeButton({
            element: container.find('#email-send'),
            send:function () {

                var name = 'new_email';

                if (emailValidator.validate(name)) {

                    var newEmail = emailForm.find('[name="' + name + '"]').val();
                    if (newEmail) { // 新邮箱

                        service
                        .checkEmailAuth({
                            email: newEmail
                        })
                        .done(function (response) {
                            if (response.code === 0) {
                                service
                                .sendEmailCode({
                                    email: newEmail
                                })
                                .done(function (response) {
                                    if (response.code === 0) {
                                        success('校验码发送成功，请注意查收');
                                    }
                                });
                            }
                            else {
                                alert('该邮箱已存在，请更换新邮箱');
                            }
                        });
                    }
                    else {
                        var email = emailForm.find('[name="email"]').val();

                        service
                        .sendEmailCode({
                            email: email
                        })
                        .done(function (response) {
                            if (response.code === 0) {
                                success('校验码发送成功，请注意查收');
                            }
                        });
                    }

                }
            }
        });

        // 表单提交
        var emailSubmit = container.find('#email-submit');
        if (emailSubmit.length != 0) {
            var emailSaveBtn = new SaveButton({
                element: emailSubmit,
                save: function () {

                    var target = this.element;
                    var formElement = target.closest('form');
                    var itemBody = target.closest('.item-body');
                    var itemHeader = itemBody.prev('.item-header');

                    // 邮箱临时反显
                    var email = formElement.find('input[name="new_email"]').val();
                    var position = email.indexOf('@') - 2;
                    var starEmail = email.substr(0, 2) + '*****' + email.substr(position);

                    if (emailValidator.validate()) {

                        var new_email = emailForm.find('input[name="new_email"]').val();
                        var password = emailForm.find('input[name="password"]').val();
                        var verify_code = emailForm.find('input[name="verify_code"]').val();

                        if (new_email == '') { // 如果没有新邮箱取旧邮箱填充
                            new_email = emailForm.find('input[name="email"]').val();
                        }

                        return service
                        .saveNewemail({
                            new_email: new_email,
                            password: password,
                            verify_code: verify_code
                        })
                        .done(function (response) {
                            if (response.code === 0) {
                                success('邮箱绑定成功', function () {
                                    location.reload();
                                });
                                /*
                                container.find('#form-email')[0].reset();
                                // 反显数据
                                itemHeader.find('.icon')
                                            .removeClass('icon-info-circle')
                                            .addClass('icon-check-circle');

                                itemHeader.find('button').text('修改');
                                itemBody.find('.star-email').text(starEmail);
                                itemBody.hide();
                                */
                            }
                        });

                    }
                }
            });
        }

        var newEmailSubmit = container.find('#newemail-submit');
        if (newEmailSubmit.length != 0) {
            var newemailSaveBtn = new SaveButton({
                element: newEmailSubmit,
                save: function () {

                    var target = this.element;
                    var formElement = target.closest('form');
                    var itemBody = target.closest('.item-body');
                    var itemHeader = itemBody.prev('.item-header');

                    // 邮箱临时反显
                    var email = formElement.find('input[name="new_email"]').val();
                    var position = email.indexOf('@') - 2;
                    var starEmail = email.substr(0, 2) + '*****' + email.substr(position);

                    if (newemailValidator.validate()) {

                        var password = emailForm.find('input[name="password"]').val();
                        var new_email = emailForm.find('input[name="new_email"]').val();
                        var verify_code = emailForm.find('input[name="verify_code"]').val();

                        if (new_email == '') { // 如果没有新邮箱取旧邮箱填充
                            new_email = emailForm.find('input[name="email"]').val();
                        }

                        return service
                        .saveEmail({
                            password: password,
                            new_email: new_email,
                            verify_code: verify_code
                        })
                        .done(function (response) {
                            if (response.code === 0) {
                                success('邮箱绑定成功', function () {
                                    location.reload();
                                });
                                /*formElement.hide();
                                itemBody.hide();
                                container.find('#form-email')[0].reset();
                                // 反显数据
                                itemHeader.find('.icon')
                                            .removeClass('icon-info-circle')
                                            .addClass('icon-check-circle');

                                itemHeader.find('button').text('修改');
                                itemBody.find('.star-email').text(starEmail);
                                */
                            }

                        });

                    }
                }
            });
        }

        container
        // 展示已绑定信息，再更改（邮箱）
        .on('click', '.btn-edit', function (e) {

            var target = $(e.currentTarget);
            var item = target.closest('.item');

            item.find('.form-result').hide();
            item.find('.form').show();
        })

        .on('click', '.to-new-email', function (e) {
            var target = $(e.currentTarget);
            var emailGroup = target.closest('.form-group');
            var newEmailGroup = container.find('.new-email-group');

            emailGroup.hide();
            newEmailGroup.show();

        });


















    }

});