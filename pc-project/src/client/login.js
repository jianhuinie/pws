/**
 * @file 客户端右侧课程hover
 * @author zhangliyuan
 */
define(function (require, exports) {

    var service = require('common/service');

    var Validator = require('cobble/form/Validator');

    var screenWidth = window.screen.width;
    var screenHeight = window.screen.height;

    exports.init = function () {

        $('.form-container').css('width', screenWidth);
        $('.form-container').css('height', screenHeight);

        var container = $('.client-login-form');

        var roleInput = container.find('[name="role"]');

        var loginText = container.find('.btn-login');

        var toggleText = container.find('.toggle-role');

        var validator = new Validator({
            element: container,
            fields: {
                mobile: {
                    errors: {
                        required: '请输入用户名',
                        pattern: '请输入正确的手机号'
                    }
                },
                password: {
                    errors: {
                        required: '请输入密码'
                    }
                }
            },
            onAfterValidate: function (e, data) {
                if (data.errors.length > 0) {
                    error(data.errors[0].error);
                }
            }
        });

        container
        .on('click', '.btn-login', function (e) {

            var phoneNo = container.find('[name="mobile"]').val();
            var password = container.find('[name="password"]').val();

            if (validator.validate()) {
                service
                .clientLogin({
                    phoneNo: $.trim(phoneNo),
                    password: $.trim(password),
                    usertype: roleInput.val()
                })
                .done(function (response) {

                    if (response.code === 0) {
                        location.href = response.data.url;
                    }
                    else {
                        container.find('.text-error').text(
                            response.data.message
                        );
                    }
                });
            }

        })
        .on('click', '.toggle-role', function (e) {

            if (roleInput.val() == ROLE_TEACHER) {
                roleInput.val(ROLE_STUDENT);
                loginText.text('学生登录');
                toggleText.text('老师登录');
            }
            else {
                roleInput.val(ROLE_TEACHER);
                loginText.text('老师登录');
                toggleText.text('学生登录');
            }

        });

    };

    var ROLE_TEACHER = 0;
    var ROLE_STUDENT = 2;

});