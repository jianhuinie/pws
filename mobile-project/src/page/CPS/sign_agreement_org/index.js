/**
 * Created by hanzhaohang on 16/5/16.
 * cps簽約
 */
define(function(require) {
    "use strict";
    var ui = require('common/ui'),
        $ = require('zepto'),
        isLocked = false;
    var service = require('common/service');
    var ImageCode = require("common/getImgCode");
    var CodeButton = require("common/ui/CodeButton");
    var $button = $('#sms_vcode');
    var $mobile = $('#mobile');
    var $smsCode = $('.input_text');
    var $loginBtn = $('.login-button');

    var t_smscode, t_mobile;



    //发送验证码文案修改
    function startKeep() {
        var isLocking = true;
        var cDom = $button;
        var count = 60;
        cDom.html('重新发送(' + count + ')');
        var cCount = setInterval(function(argument) {
            count--;
            if (count <= -1) {
                isLocking = false;
                cDom.html('重新发送');
                clearInterval(cCount);
            } else {
                cDom.html('重新发送(' + count + ')');
            }
        }, 1000);
    }
    var validate = {
        smsCode: function(showErrMsg) {
            var sv = $.trim($smsCode.val());
            if (!sv) {
                if (showErrMsg) {
                    $smsCode.closest('.input-c').addClass('err');
                    ui.remind('请输入手机验证码');
                }
                return false;
            } else {
                $smsCode.closest('.input-c').removeClass('err');
                return true;
            }
        },
        mobile: function(showErrMsg) {
            var mobile = $mobile;
            var reg = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|19[0-9])\d{8}$/ig;

            if (reg.test($(mobile).val())) {
                if (!vcode_countdown) {
                    $mobile.parent().removeClass('err');
                }
                return true;
            } else {
                if (showErrMsg) {
                    $mobile.parent().addClass('err');
                    ui.remind('请输入您机构注册的手机号码');
                }
                return false;
            }
        }
    };
    var vcode_countdown = false;

    function getCodeMss(param) {
        var btnText = {
            wating: "请稍候",

        }

        //调用获取验证码接口
        var codeButton = new CodeButton({
            element: $button,
            text: '重新发送($time$)',
            send: function() {
                if (!validate.mobile(true)) {
                    return false;
                }
                //ajax获取短信验证码
                var deferred = ImageCode.getCode({
                    'mobile': $("#mobile").val(),
                    'type': 'common'
                });

                deferred.always(function(response) {
                    var response = response || {};

                    if (response.code == 0) {
                        vcode_countdown = true;
                        $button.addClass("disabled");

                        ui.remind("获取成功，请稍等");
                    } else {
                        response.msg && ui.remind(response.msg);
                        vcode_countdown = false;
                        $button.removeClass("disabled");
                    }
                });

                return deferred;
            },
            onFinish: function() {
                $button.html('重新发送');
                $button.removeClass("disabled");
                vcode_countdown = false;
            }
        });
    }

    //发送验证码
    function addCode(argument) {
        var inputDom = $mobile;
        var codeBtn = $button;
        codeBtn.on('touchend', function(argument) {
            var celNum = $.trim(inputDom.val());
            if (valiCelDom(true)) {
                getCodeMss({
                    mobile: celNum,
                    type: 'common'
                })
            }
        });

        keyUpAction();
    }

    //手机号键盘事件
    function keyUpAction() {
        var celDom = $mobile;
        celDom.on('keyup', function() {
            var actBtn = $button;
            if (valiCelDom()) {
                actBtn.addClass('on');
            } else {
                actBtn.removeClass('on');
            }
        });
    }

    //验证手机号
    function valiCelDom() {
        var celNum = $mobile.val();
        var relFlag = true;
        var errMsg = "";
        if (celNum == '') {
            errMsg = '请输入您的手机号码';
            relFlag = false;
        } else if (!/^1[3-9]\d{9}$/.test(celNum)) {
            errMsg = '请输入正确的手机号码'
            relFlag = false;
        };
        return relFlag;
    }

    var currRate;

    function bindLoginAction() {
        var loginAvailable = true;
        $loginBtn.on('touchend', function() {
            var smsCode = $smsCode.val();
            var mobile = $mobile.val();

            if (validate.mobile(true) && validate.smsCode(true)) {
                if (!loginAvailable) {
                    return;
                }
                loginAvailable = false;

                //todo 发送登录指令
                $loginBtn.html("提交中...");
                setTimeout(function() {
                    service.post('/activity/cps_org_login', {
                        mobile: mobile,
                        smscode: smsCode
                    }, function(res) {
                        if (res.code == 0) {
                            $loginBtn.html("登录成功");
                            $('.agreement').show();
                            $('.login').hide();

                            var cData = res.data;
                            $('.start_time').html(cData.start_time);
                            $('.end_time').html(cData.end_time);
                            $('.display_name').html(cData.display_name);
                            $('.id_number').html(cData.id_number);
                            $('.sign_name').html(cData.sign_name);

                            t_smscode = smsCode;
                            t_mobile = mobile;
                            if (cData.status == 1) {
                                $('.button').html('已签约').addClass('grey');
                            } else {
                                $('.button').html('确认签约').removeClass('grey');
                            }
                        } else {
                            $loginBtn.html("登录");
                            loginAvailable = true;
                        }
                    })
                }, 250);
            }
        });
    }



    return function(page_data) {
        bindLoginAction();
        currRate = page_data.data.rate_info.rate_type;

        $('.button').click(function() {
            var me = $(this);
            if (+page_data.data.status === 1 || isLocked || me.hasClass('grey')) {
                return;
            }
            var cConfirm = ui.confirm({
                    content: '我确认与跟谁学签订“课程收入分成合作协议”',
                    title: '课程收入分成合作协议',
                    button_ok: '确认',
                    button_cancel: '取消',
                    forceShow: true
                });

            cConfirm.done(function() {
                me.html('提交中..');
                isLocked = true;
                $.ajax({
                    url: '/activity/cps_org_confirm',
                    data: {
                        mobile: t_mobile,
                        smscode: t_smscode,
                        rate_type: currRate
                    },
                    type: 'post',
                    success: function(res) {
                        if (res.code) {
                            ui.remind(res.msg);
                            me.html("确认签约");
                        } else {
                            var c2 = ui.confirm({
                                content: '恭喜你签约成功',
                                title: '课程收入分成合作协议',
                                button_ok: '好的',
                                button_cancel: '关闭',
                                forceShow: true
                            });
                            me.html("已签约").addClass('grey');
                        }
                    }
                }).always(function() {
                    isLocked = false;
                });

            });
        });

        addCode();

    };
});