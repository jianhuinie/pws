/**
 * @file 活动报名页
 * @author caoying
 */

define(function (require) {
    "use strict";
    var lazyLoadImage = require('common/loader/lazyLoadImage');
    var CodeButton = require('common/component/CodeButton');
    var setShare = require('common/function/setShare');
    var ui = require('common/ui');
    var service = require('common/service');
    var store = require('common/store');
    var tianxiaoLog = require('common/tianxiaoLog');
    var observer = require('common/mvc/observer');
    var imageCode = require('common/getImgCode');
    //var ImageCheckCodeDialog = require('common/mvc-component/ImageCheckCodeDialog/ImageCheckCodeDialog');


    var container = $("#main");

    /**
     * 获取验证码*/
    var identifyCode = function () {

        var code = container.find('.code-text');
        var $button = container.find('.gain-code');
        var $mobile = container.find('.mobile-text');

        // 调用获取验证码接口
        var codebutton = new CodeButton({
            element: $button,
            text: '重新发送($time$)',
            send: function () {
                if ($mobile.val() == "" || $mobile.val() == "请输入手机号") {
                    ui.remind('black', "请输入手机号码");
                    return false;
                }
                else {
                    $button.addClass('send-code');
                }
                //ajax获取短信验证码
                var strMobile = $mobile.val();
                var deferred = imageCode.getCode({
                    'mobile': strMobile,
                    'type': 'common'
                });
                deferred.done(function (response) {
                    if (response.code != 0) {
                        $button.removeClass('send-code');
                    }
                });
                return deferred;

            },
            onFinish: function () {
                $button.html('重新发送');
                $button.removeClass('send-code');
            }
        });

        code.focus(function () {
            window.scrollTo(0, 700);
            $(this).val('');
            $(this).addClass('filled');
            $(this).attr('type', 'number');
        });

    };

    // function getCode(param) {
    //     var deferred = $.Deferred();
    //     var doSend = function (imageCode) {
    //         if (imageCode) {
    //             param['captcha'] = imageCode + '';
    //             param['captcha_name'] = param.type;
    //         }
    //         service.getVerifyCode(param).done(function (response) {
    //             if (response.code == '1000111' || response.code == '110056') {
    //                 var imageCodeDialog = new ImageCheckCodeDialog({
    //                     'title': '请输入图形验证码',
    //                     'type': param.type,
    //                     'errorText': response.code == '110056' ? '验证码错误，请重新输入' : ''
    //                 });
    //                 observer.addListenerOnce(imageCodeDialog, 'success', function (code) {
    //                     imageCodeDialog.hide();
    //                     imageCodeDialog.destroy();
    //                     doSend(code);
    //                 });
    //                 observer.addListenerOnce(imageCodeDialog, 'cancel', function () {
    //                     deferred.resolve({
    //                         code: -1
    //                     });
    //                 });
    //                 imageCodeDialog.show();
    //             } else {
    //                 deferred.resolve(response);
    //                 if (response.code != 0) {
    //                     ui.remind('black', response.msg);
    //                 }
    //             }
    //         });
    //     };
    //     doSend();

    //     return deferred;
    // }

    // 提交报名
    var sign = function () {
        container
            .on('click', '.commit ', function () {
                var content = container.find('.content');
                var arrInfo = content.find('.content-info');
                var smscode = content.find('.code-text').val();
                var param = {};

                for (var i = 0; i < arrInfo.length; i++) {
                    var require = $(arrInfo[i]).attr('data-required');
                    var keyName = $(arrInfo[i]).attr('data-name');
                    var keyValue = $(arrInfo[i]).find('input').val();
                    var hint = $(arrInfo[i]).attr('data-hint');
                    var label = $(arrInfo[i]).attr('data-label');
                    param[keyName] = keyValue;

                    if (require == "1" && (keyValue == "" || keyValue == hint)) {
                        ui.remind('black', "请填写" + $(arrInfo[i]).attr('data-label'));
                        return false;
                    }

                    // 判断邮箱输入是否合法
                    if (label == "邮箱" && require == "1") {
                        var email = $(arrInfo[i]).find('input').val();
                        var result = fChkMail(email);

                        if (!result) {
                            ui.remind('black', "邮箱输入不合法");
                            return false;
                        }
                    }
                }
                // 未登录用户需要填写验证码
                if (store.get('user_name') == "" && smscode == "") {
                    ui.remind('black', "请填写验证码");
                    return false;
                }

                // 调用后端接口进行报名
                service.signActivity({
                    signInfo: param,
                    board_id: store.get('board_id'),
                    smscode: smscode
                }).done(function (response) {
                    if (response.code == 0) {
                        ui.remind('black', '报名成功');

                        // 报名成功后，隐藏报名信息
                        setTimeout(function () {
                            container.find('.sign-info').hide();
                        }, 2000);
                    }
                    else {
                        ui.remind('black', response.msg);
                        if (response.code == 110003) {
                            // 将提交报名按钮改为以报满
                            var signInfo = container.find('.sign-info');
                            signInfo.find('.commit').addClass('unable');
                            signInfo.find('.commit').removeClass('commit');
                        }
                    }
                });
            })
    };

    // 点赞接口
    var thump = function () {

        var spanThump = $('.thump');
        var selfThump = spanThump.data('thump');
        var thumpCount = spanThump.data('count');
        var action;
        if (selfThump) {
            spanThump.find('i').addClass('self-thump');
            action = 'unlike';
        }
        else {
            spanThump.find('i').removeClass('self-thump');
            action = 'like';
        }

        $('.thump').click(function () {

            // service 调用黑板报点赞接口
            service.supportBlackBoard({
                board_id: store.get('board_id'),
                action: action
            }).done(function (response) {
                if (response.code == 0) {
                    // 点赞成功
                    if (action == "like") {
                        thumpCount = parseInt(thumpCount) + 1;
                        spanThump.find('i').addClass('self-thump');
                        spanThump.find('.thump-count').text(thumpCount);
                        action = 'unlike';

                    }
                    else {
                        thumpCount = parseInt(thumpCount) - 1;
                        spanThump.find('i').removeClass('self-thump');
                        spanThump.find('.thump-count').text(thumpCount);
                        action = 'like';
                    }
                }
            });

        });
    };

    // 设置手机号和姓名(针对已注册用户)
    var setNamePhone = function () {
        var userName = store.get('user_name');
        var mobile = store.get('mobile');
        var nameTxt = container.find('.name-text');
        var phoneTxt = container.find('.mobile-text');
        var userCode = container.find('.user-code');

        if (userName != undefined && userName != "") {
            nameTxt.val(userName);
            phoneTxt.val(mobile);
            nameTxt.attr('disabled', true);
            phoneTxt.attr('disabled', true);

            userCode.hide();
            userCode.attr('data-required', 1);
        }
    };

    // 报名信息获得焦点
    var inputFocus = function () {
        var content = container.find('.content');
        var inputEle = content.find('input');
        inputEle.focus(function () {
            $(this).removeClass('warning');
            var name = $(this).closest('.content-info').attr('data-name');
            $(this).val('');
            $(this).addClass('fill');
            if (name == "mobile") {
                $(this).attr('type', 'number');
            }

        });

        inputEle.blur(function () {
            var content = $(this).closest('.content-info');
            var label = content.attr('data-label');
            var required = content.attr('data-required');

            // 邮件邮箱是否合法
            if (label == "邮箱" && required == "1") {
                var email = content.find('input').val();
                var result = fChkMail(email);
                if (!result) {
                    $(this).addClass('warning');
                    ui.remind('black', "邮箱输入不合法");
                    return false;
                }
            }
        });
    };

    // 判断邮箱输入是否正确
    var fChkMail = function (szMail) {
        var szReg = /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/;
        var bChk = szReg.test(szMail);
        return bChk;
    };


    return {
        init: function () {
            service.setErrorHandler(function (errorMsg) {

            });
            identifyCode();
            sign();
            thump();
            setNamePhone();
            inputFocus();

            tianxiaoLog.send(store.get('number'), 'blackboard', store.get('board_id'));

            var shareInfo = store.get('share_info');

            var shareContent = shareInfo.content.slice(0, 50);
            shareContent = shareContent.replace(/&nbsp;/g, '');
            setShare({
                content: shareContent,
                url: location.href,
                img: shareInfo.img,
                title: shareInfo.title
            });


        }
    }

});