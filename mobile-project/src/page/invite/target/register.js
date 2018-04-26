/**
 * Created by xuzheng on 15/6/18.
 */
define(function (require, exports) {

    'use strict';

    var ui = require('common/ui');
    var observer = require('common/mvc/observer');
    var ImageCheckCodeDialog = require('common/ui/ImageCheckCodeDialog/ImageCheckCodeDialog');
    var countrySelect = require('common/countrySelect/index');
    var habo = require("common/component/analysis/habo/index");
    var $vcodeForm = null;
    var role = 's';

    var remind = '';

    function doBind($form) {
        var mobile = $form.find('.country_select').val() + $form.find('.input_mobile').val();
        var smscode = $form.find('[name=verify_code]').val();
        var password = $form.find('[name=password]').val();

        if (!isMobile(mobile)) {
            ui.alert('请输入正确的手机号～');

            return;
        }

        if (smscode.length == 0) {
            ui.alert('验证码不能为空～');

            return;
        }

        if (role == 't') {
            if (!isPassword(password)) {
                ui.alert('请输入数字、字母组成的6-20位密码');

                return;
            }
        }

        habo.send({
            type: 'tm_inv',
            stype: 'tm_inv_con' + role
        });

        $.ajax( {
            url: '/auth/invite_signup_ajax',
            data: {
                 mobile: $form.find('.country_select').val() + $form.find('.input_mobile').val(),
                 invite_code: getUrlParam('invite_code'),
                 password: $form.find('[name=password]').val(),
                 smscode: $form.find('[name=verify_code]').val(),
                 usertype: getUrlParam('user_role')
            },
            type:'post',
            cache:false,
            dataType:'json',
            success:function(data) {
                if(data.code == 0 ){
                    location.href = '/tcenter/invite-register/result?' + 'user_role=' + getUrlParam('user_role') + '&invite_code=' + getUrlParam('invite_code');
                }else{
                    ui.alert(data.msg);
                }
            },
            error : function() {
                // view("异常！");
                ui.alert('网络原因，发送请求失败，请确认网络连接～');
            }
        });
    }

    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]); return null; //返回参数值
    }

    function isMobile(mobile) {
        if (!mobile) {
            return false;
        }
        else if (!/^[0-9]*$/.test(mobile)) {
            return false;
        }
        else {
           return true;
        }
    }

    function isPassword (pwd) {
        var patrn = /^[a-zA-Z0-9]{6,20}$/;

        return patrn.test(pwd);
    }

    exports.init = function(page_data) {
        role = page_data.user_role == 0 ? 't' : 's';

        var $form = $('#login_form_vcode');

        countrySelect.init('#countryCode');

        $form.find('.submit_button').on('click', function() {
            doBind($form);
        });

        $('.input_mobile').one('keydown',function() {
            var color = '#ff9100';

            if (page_data.user_role != 2) {
                color = '#37a4f5';
            }

            $('#sms_vcode').css('color', color);
        });

        $form.find('[name=verify_code]').on('keydown',function() {
            if (isMobile($form.find('.country_select').val() + $form.find('.input_mobile').val().trim()) && $(this).val() != '') {
                $form.find('.submit_button').removeClass('disable');
            }
        });

        var verifyCodeWaiting;
        var verifyCodeTimer;
        var sendVerifyCodeButton = $('#sms_vcode');
        sendVerifyCodeButton.on('click', function (e) {
            e.preventDefault();

            habo.send({
                type: 'tm_inv',
                stype: 'tm_inv_cap' + role
            });

            if (sendVerifyCodeButton.prop('disabled') == true) {
                return;
            }

            $(this).css('color', '#9d9d9e');

            function sendSms(code) {

                var mobile = $form.find('.country_select').val() + $form.find('.input_mobile').val().trim();

                if (isMobile(mobile)) {

                    sendVerifyCodeButton.prop('disabled', true);

                    var updateCountdown = function () {

                        sendVerifyCodeButton.html(verifyCodeWaiting
                            + '秒后重新获取'
                        );
                    };

                    verifyCodeTimer = setInterval(
                        function () {
                            verifyCodeWaiting--;
                            if (!verifyCodeWaiting) {
                                clearInterval(verifyCodeTimer);
                                sendVerifyCodeButton
                                .css('color', page_data.user_role != 2 ? '#37a4f5' : '#ff9100')
                                .html('获取验证码')
                                .prop('disabled', false);
                            }
                            else {
                                updateCountdown();
                            }
                        },
                        1000
                    );
                    verifyCodeWaiting = 60;
                    updateCountdown();

                    $.post(
                        '/sms/send',
                        {
                            mobile: mobile,
                            type: 'common',
                            captcha: code,
                            captcha_name: 'common'
                        }
                    )
                    .then(function (response) {
                        if (response.code == '1000111' || response.code == '110056') {
                            var imageCodeDialog = new ImageCheckCodeDialog({
                                'title': '请输入图形验证码',
                                'type': 'common',
                                'errorText': response.code == '110056' ? '验证码错误，请重新输入' : ''
                            });
                            observer.addListenerOnce(imageCodeDialog, 'success', function (code) {
                                imageCodeDialog.hide();
                                imageCodeDialog.destroy();
                                sendSms(code);
                            });
                            observer.addListenerOnce(imageCodeDialog, 'cancel', function () {
                                imageCodeDialog.hide();
                                imageCodeDialog.destroy();
                                clearInterval(verifyCodeTimer);
                                sendVerifyCodeButton
                                .html('获取验证码')
                                .prop('disabled', false);
                            });
                            imageCodeDialog.show();
                            clearInterval(verifyCodeTimer);
                        }
                        else if (response.code == '110000') {
                            ui.alert(response.msg);

                            verifyCodeWaiting = 1;
                        }
                    });

                }

            }

            sendSms();
        });
    };
});
