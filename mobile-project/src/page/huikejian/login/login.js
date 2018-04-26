/**
 * @file 机构详情页的脚本文件
 * @author caoying
 */
define(function(require) {

    "use strict";

    var ui = require('common/ui')

    function mobileIsLegal (mobile) {
        console.log(mobile);
        var legal = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;

        return legal.test(mobile);
    }

    function passwordIsLegal (password) {
        console.log(password);
        return password.length > 0;
    }

    function bindEvent () {
        var $mobile = $('#j_mobile');
        var $password = $('#j_password');
        var $submit = $('#j_submit');

        $mobile.on('blur', function () {
            var mobile = this.value;

            if (!mobileIsLegal(mobile)) {
                ui.alert('请输入正确的手机号');
            }
        });

        $submit.on('click', function () {
            var mobile = $mobile.val();
            var password = $password.val();

            if (!mobileIsLegal(mobile)) {
                ui.alert('请输入正确的手机号');
            }

            if (!passwordIsLegal(password)) {
                ui.alert('请输入密码');
            }

            $.ajax({
                url: '/auth/new_login_ajax',
                data: {
                    user_type: 2,
                    user_name: mobile,
                    password: password
                },
                type: 'get',
                dataType: 'json',
                async: true,
                success: function (res) {
                    if (!res.code) {
                        location.href = res.data.url;
                    } else {
                        ui.alert(res.msg);
                    }
                },
                error: function () {
                    ui.alert('网络原因，提交失败，请检查网络~');
                }
            });
        });
    }

    return {
        init: function() {
            bindEvent();
        }
    };
});
