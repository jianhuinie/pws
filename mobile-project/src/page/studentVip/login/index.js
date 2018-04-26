/**
 * Created by wangtianhua
 */
define(function (require, exports){

    var $ = require('zepto');
    var ui = require('common/ui');
    var env = require('util/env');
    var app = require('common/app');
    var observer = require('common/mvc/observer');
    var lazyLoadImage = require('common/lazyLoadImage');
    var ImageCheckCodeDialog = require('common/ui/ImageCheckCodeDialog/ImageCheckCodeDialog');

    var isWeixin;

    function isMobile(mobile) {
        if (!mobile) {
            ui.alert('请输入手机号');
        }
        else if (!/^1\d{10}$/.test(mobile)) {
            ui.alert('请输入正确手机号');
        }
        else {
           return true;
        }
    }

    function isVerifyCode(code) {
        if (!code) {
            ui.alert('请输入验证码');
        }
        else if (!/^\d{6}$/.test(code)) {
            ui.alert('请输入正确的验证码');
        }
        else {
            return true;
        }
    }

    function isInviteCode(code) {
        if (!code) {
            ui.alert('请输入激活码');
        }
        else {
            return true;
        }
    }

    return function (data) {

        lazyLoadImage.init();

        // 更换手机号
        if (data.isLogin) {
            $('.isLogin').show();
            $('.isNoLogin').hide();
        }
        else {
            $('.isLogin').hide();
            $('.isNoLogin').show();
        }

        // 在微信中上面的nav就不需要了
        isWeixin = env.thirdapp && env.thirdapp.isWeixin;

        if(!isWeixin) {
            $('.nav-bar').show();
        }

        if (app.isApp()) {
            $('.button-download').hide();
        }
        var formElement = $('.login-form');
        var mobileInput = formElement.find('.input-mobile');
        var verifyCodeInput = formElement.find('.input-verifycode');
        var inviteCodeInput = formElement.find('.input-invitecode');
        var sendVerifyCodeButton = formElement.find('.button-verifycode');
        var activateButton = formElement.find('.button-activate');
        var changeButton = formElement.find('.change-mobile');
        var vipLoginButton = formElement.find('.vip-login');

        var verifyCodeWaiting;
        var verifyCodeTimer;

        sendVerifyCodeButton.on('click', function () {
            function sendSms(code) {

                var mobile = mobileInput.val().trim();

                if (isMobile(mobile)) {

                    sendVerifyCodeButton.prop('disabled', true);

                    var updateCountdown = function () {
                        sendVerifyCodeButton.html(
                            '剩余' + verifyCodeWaiting + '秒'
                        );
                    };

                    verifyCodeTimer = setInterval(
                        function () {
                            verifyCodeWaiting--;
                            if (!verifyCodeWaiting) {
                                clearInterval(verifyCodeTimer);
                                sendVerifyCodeButton
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
                        if (response.code == '1000111') {
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
                    });

                }

            }
            sendSms();
        });

        activateButton.on('click', function () {

            var mobile = data && data.mobile;
            var inviteCode = inviteCodeInput.val().trim();

            if (mobile) {
                if (isInviteCode(inviteCode)) {
                    $.ajax({
                        url: 'vip/bind',
                        type: 'post',
                        data: {
                            mobile: mobile,
                            card_code: inviteCode
                        },
                        success: function (response) {
                            if (response.code != 0) {
                                ui.alert(response.msg);
                            }
                            else {
                                location.href = '/student/vip/card';
                            }
                        }
                    })
                }
            }
            else {
                mobile = mobileInput.val().trim();
                var verifyCode = verifyCodeInput.val().trim();

                if (isMobile(mobile)
                    && isVerifyCode(verifyCode)
                    && isInviteCode(inviteCode)
                ) {
                    $.ajax({
                        url: 'vip/bind',
                        type: 'post',
                        data: {
                            mobile: mobile,
                            smscode: verifyCode,
                            card_code: inviteCode
                        },
                        success: function (response) {
                            if (response.code != 0) {
                                ui.alert(response.msg);
                            }
                            else {
                                location.href = '/student/vip/card';
                            }
                        }
                    });
                }
            }

        });

        changeButton.on('click', function () {
            location.href = "/auth/exit?next=" + encodeURIComponent(location.href);
        });

        vipLoginButton.on('click', function () {
            location.href = "/static/login?next=" + encodeURIComponent(location.href);
        });

    };

});