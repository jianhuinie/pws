/**
 * Created by caoying on 15/11/26.
 * 预约试听公共接口(供课程详情页、机构主页、3810课程详情页调用)
 */

define(function (require, exports) {
    'use strict';
    var $ = require('zepto');
    var observer = require('common/mvc/observer');
    var service = require('common/service');
    var object = require('util/object');
    var ui = require('common/ui');
    var fullPageDialog = require('common/ui/FullPageDialog/FullPageDialog');
    var SlideInDialog = require('common/mvc-tools/SlideInDialog/SlideInDialog');
    var app = require('common/app');
    var ImageCheckCodeDialog = require('common/ui/ImageCheckCodeDialog/ImageCheckCodeDialog');
    var pageMask = require('common/ui/PageMask/PageMask');
    var user = require('common/user');
    var env = require('util/env');
    var autoVertifyFlag = require('common/config');
    // 当前用户的number 头像和角色
    var number;
    var avatar;
    var type;
    var userMobile;

    var slideDialog = null;
    var phoneValue;

    /**
     * 全屏新界面的内容及交互
     */
    var createNewPage = function (number, options) {
        var remindMsg = '';
        var actionName = '';
        var color = '';
        var actionAble = 'action-able';
        var listenColor = 'listen-action';

        var courseType = options.courseType;
        var title = options.title;
        var objectId = options.objectId;
        var objectType = options.objectType;
        if (options.color) {
            color = options.color;
            listenColor = listenColor + '-' + color;
        }

        if (courseType == 'offline' || courseType == 'org') {
            actionName = '预约试听';
            if (number) {
                remindMsg = '老师将与您预留的手机号联系，确定试听时间';
            }
            else {
                remindMsg = '留下联系方式，老师将直接与您联系，确定试听时间';
            }
        }
        else {
            actionName = '预约咨询';
            if (number) {
                remindMsg = '老师将与您预留的手机号联系，回复您的咨询';
            }
            else {
                remindMsg = '留下联系方式，老师将直接与您联系，回复您的咨询';
            }
        }
        var content = $('<div class="listen-content"></div>');
        var dialogTitle = $('<div class="listen-title"><span class="title-info">' + title + '</span><div class="close-icon"><i class="icon icon-close"></i></div></div>');
        var message = "<div class='remind-msg'>" + remindMsg + "<i class='icon icon-info-circle'></i></div>";
        var mobile = $('<div class="mobile"></div>');
        var loginMobile = "<div class='mobile-login'><span>手机号</span><input type='text' class='phone-number' maxlength='11' value='" + userMobile + "'></div>";
        var inputMobile = "<div class='mobile-input'><input type='text' class='phone-number' maxlength='11' placeholder='请输入手机号'></div>";
        var words = "<div class='listen-words'><div class='words-input'><span>留言</span><textarea rows='3' class='words-info' maxlength='50' placeholder='简单介绍学习意愿或想要咨询的问题'></textarea></div></div>";
        var tip = "<div class='limit-remind'></div>";
        var listenAction = "<div class='listen-action action-able'>" + actionName + "</div>";
        //var phoneValue;
        content.append(dialogTitle);
        content.append(message);
        var remind = $('.limit-remind');
        if (number) {
            mobile.append(loginMobile);
        }
        else {
            mobile.append(inputMobile);
        }
        content.append(mobile);
        content.append(words);
        content.append(tip);
        content.append(listenAction);

        if (!slideDialog) {
            slideDialog = new SlideInDialog({content: content[0].outerHTML});
            //slideDialog = new SlideInDialog({
            //    'content': content,
            //    'animateType': 2,
            //    'position': 'fixed',
            //    'closeButton': false,
            //    'backgroundColor': 'transparent',
            //    'zIndex': 800
            //});
            //var mask = new pageMask({
            //    'backgroundColor': 'rgba(0,0,0,0.8)'
            //});
            //mask.bindTo('display', slideDialog);
            //observer.addListener(slideDialog, 'display_changed', function () {
            //    var display = slideDialog.get('display');
            //    if (display) {
            //        $('#main').css({
            //            position: 'relative',
            //            height: 300,
            //            overflow: 'hidden'
            //        });
            //
            //    } else {
            //        $('#main').css({
            //            height: 'auto',
            //            overflow: 'auto'
            //        });
            //    }
            //});
            ////点击蒙版关闭弹框
            //var dialogElement = slideDialog.getElement();
            //$(dialogElement).click(function (e) {
            //    var target = $(e.target);
            //    var main = content;
            //    if (target.closest(main).length == 0) {
            //        slideDialog.hide();
            //    }
            //});
            ////$('.close-icon').click(function () {
            ////    slideDialog.hide();
            ////});

            listenWords();
        }
        else {
            remind.hide();
            // 暂时只点击的时候校验
            //$('.listen-action').removeClass(actionAble);
            $('.words-info').val('');
        }
        if (options.color) {
            $('.listen-action').addClass(listenColor);
        }

        var dialog = slideDialog;
        dialog.show();
        if (userMobile) {
            phoneValue = userMobile;
            //$('.listen-action').addClass(actionAble);
        }
        else {
            $('.phone-number').val('');
        }
        $('.close-icon').click(function () {
            dialog.hide();
        });

        // 监听手机输入框的输入事件
        if (autoVertifyFlag.INPUT_AUTO_VERTIFY) {
            observer.addDomListener($('.phone-number'), 'input', function () {
            //$('.phone-number').bind('input', function () {
                phoneValue = $(this).val();
                alert(phoneValue);
                if (phoneValue.length == 11) {
                    $('.listen-action').addClass(actionAble);
                }
                else {
                    $('.listen-action').removeClass(actionAble);
                }
            });
            // 监听留言输入框的输入事件
            observer.addDomListener($('.words-info'), 'input', function () {
                $('.listen-action').addClass(actionAble);
                // 最大字数50，字数超过40则给出提示
                if ($(this).val().length >= 40) {
                    var limitNum = 50 - parseInt($(this).val().length) + '';
                    remind.text("您还可以输入" + limitNum + "字");
                    remind.show();
                }
                else {
                    remind.hide();
                }
            });
        }

        function savePhonetoAndriodApp () {
            //在安卓的学生版的APP里面要用户授权判断要不要写入通信录
            if (app.isStudentApp() && env.os.isAndroid) {
                var phoneKey = 'androidAppPhoneKey';
                var localStorages = window.localStorage;
                var hasKey = localStorages.getItem(phoneKey);
                if (hasKey == 'true') {
                    return;
                } else {
                    localStorages.setItem(phoneKey, 'true');
                    Jockey.send('setContactList');
                }
            }
        }

        // 点击预约试听/点击留言
        function listenWords() {
            $('.listen-content')
                .on('click', '.listen-action', function () {
                    var pattern = /^1[34578]\d{9}$/;
                    var deferred = $.Deferred();
                    var wordInfo = $('.words-info');
                    phoneValue = $('.phone-number').val();
                    if(wordInfo.val().length < 6) {
                        ui.remind("请输入大于5个字的内容");
                        return false;
                    }
                    if (phoneValue == "") {
                        ui.remind("请输入手机号码");
                        return false;
                    }
                    else if (!pattern.test(phoneValue)) {
                        ui.remind("请输入正确的手机号码");
                        return false;
                    }
                    else {
                        var doSend = function (imageCode) {
                            var param = {};
                            if (imageCode) {
                                param['captcha_code'] = imageCode + '';
                                param['captcha_name'] = 'signin';
                            }
                            param['mobile'] = phoneValue;
                            param['object_number'] = objectId;
                            param['content_type'] = objectType;
                            param['words'] = $('.words-info').val();

                            // 调用预约试听接口
                            //课程编号，班课/机构班课/机构，留言内容
                            service.post('/student_advisory/create', param, function (response) {
                                if (response.code == 1000070) {
                                    // 弹出图形验证码
                                    var imageCodeDialog = new ImageCheckCodeDialog({
                                        'title': '请输入图形验证码',
                                        'type': 'common',
                                        'errorText': response.code == '110056' ? '验证码错误，请重新输入' : ''
                                    });
                                    observer.addListenerOnce(imageCodeDialog, 'success', function (code) {
                                        imageCodeDialog.hide();
                                        imageCodeDialog.destroy();
                                        doSend(code);
                                    });
                                    observer.addListenerOnce(imageCodeDialog, 'cancel', function () {
                                        deferred.resolve({
                                            code: -1
                                        });
                                    });
                                    imageCodeDialog.show();
                                } else {
                                    deferred.resolve(response);
                                    if (response.code == 0) {
                                        var title;
                                        var info = "请确保电话畅通并耐心等待";
                                        if (courseType == 'online' || courseType == 'org') {
                                            title = "预约试听成功,";
                                        }
                                        else {
                                            title = "咨询提交成功,";
                                        }
                                        ui.remind(title + info);
                                        dialog.hide();
                                        savePhonetoAndriodApp();
                                    }
                                    else {
                                        ui.remind(response.msg);
                                    }
                                }
                                return false;
                            });
                        };
                        doSend();

                    }
                });
        }

    };

    /*
     * @param options 对象：包含如下参数
     * @param [string] courseType 课程类型（线下班课/直播课/机构）
     * @param [string] title 弹窗标题
     * @param [string] objectId 课程id/机构Id/
     * @param [string] objectType 班课(teacher_class_course)/机构班课(org_course)/机构(org_account)
     * @param [string] tel400 400电话号码
     * @param [string] orgumber 机构编号*/
    exports.appoint = function (options) {
        var userInfo = user.getUserInfo();
        if (userInfo) {
            number = userInfo.number;
            avatar = userInfo.avatar;
            type = userInfo.type;
            userMobile = userInfo.mobile;
        }


        createNewPage(number, options);
    };


});
