/**
 * Created by chenmo on 16/2/17.
 * 进入教室
 */
define(function(require) {

    'use strict';

    var ui = require('common/ui');
    var app = require('common/app');
    var service = require('common/service');
    var LoginDialog = require('common/ui/LoginDialog/LoginDialog');
    var observer = require('common/mvc/observer');
    var openApp = require('common/app_wakeup');
    var USER = require('common/user');

    /**
     * 支持手机观看显示进入教室提示弹层
     * @param {Function} 点击确认函数
     */
    function showMobileDialog(onOk) {
        return ui.alert({
            skinClass: 'dialog-alert',
            content: '请下载新版APP观看更流畅',
            width: '16rem',
            height: '8rem',
            buttons: [{
                text: '我知道了',
                type: 'default',
                handler: onOk
            }]
        });
    }

    /**
     * 支持手机APP观看显示进入教室提示弹层
     * @param {Function} 点击确认函数
     */
    function showDialog(onOk) {
        return ui.alert({
            skinClass: 'dialog-alert',
            content: '请下载新版APP或去电脑观看',
            width: '16rem',
            height: '8rem',
            buttons: [{
                text: '我知道了',
                type: 'default',
                handler: onOk
            }]
        });
    }

    /**
     * 点击进入教室还未支付订单的提示碳层
     * @param {Function} 点击确认函数
     */
    function showPayDialog(onOk) {
        return ui.alert({
            skinClass: 'dialog-alert',
            content: '您还未支付订单，前往订单支付页',
            width: '16rem',
            height: '8rem',
            buttons: [{
                text: '我知道了',
                type: 'default',
                handler: onOk
            }]
        });
    }

    /**
     * 点击进入教室，还购买课程的提示碳层
     * @param {Function} 点击确认函数
     */
    function showBuyDialog(onOk) {
        return ui.alert({
            skinClass: 'dialog-alert',
            content: '您还未购买该课程，前往购买页',
            width: '16rem',
            height: '8rem',
            buttons: [{
                text: '我知道了',
                type: 'default',
                handler: onOk
            }]
        });
    }

    /**
     * 点击进入教室，其他提示
     * @param {Function} 点击确认函数
     */
    function showOtherDialog(onOk, content) {
        return ui.alert({
            skinClass: 'dialog-alert',
            content: content,
            width: '16rem',
            height: '8rem',
            buttons: [{
                text: '我知道了',
                type: 'default',
                handler: onOk
            }]
        });
    }

    var openNewOnlineWindow = (function() {
        var lastTime = +new Date;
        return function(url) {
            if (app.support('toNewOnlineWindow')) {
                var now = +new Date;
                if (now - lastTime > 2000) {
                    lastTime = now;
                    app.send('toNewOnlineWindow', {
                        url: url,
                        web_url: url
                    });
                }
            }
        };
    })();

    /**
     * 进入教室
     * @param {Object} param 请参数
     * @property {number} param.lesson_id 课程id
     * @property {number} param.class_course_number 班课id
     * @property {number} param.mobile 是否支持手机观看
     */
    function enterClassroom(param) {
        var mobile = param.mobile;
        var isApp = app.isApp();

        service.post('/lesson/checkLive', param, function(response) {
            var data = response.data;

            var dialog;

            var url;
            var user = USER.getUserInfo();
            if (!user && window.page_data && window.page_data.user) {
                user = window.page_data.user;
            }

            if (response.code === 0) {

                // app2.6.0之后的版本，调用openNewOnlineWindow方法
                var appVersion;
                appVersion = (app.appVersion() >= '2.6.0');
                if (data.action == "live") {
                    url = data.live_url;
                    // 若是App调用
                    if (isApp) {
                        // hurry: 打开直播native
                        if (data.live_scheme_url) {
                            app.send('urlSchemeRoute', {
                                url: data.live_scheme_url
                            });
                            return;
                        }
                        if (data.total_price == 0 || (data.is_login && data.total_price != 0)) {
                            if (appVersion) {
                                openNewOnlineWindow(url);
                            } else {
                                app.openNewWindow(url);
                            }
                        } else {
                            user.loginStudent();
                        }

                        // app里需要登录之后才能观看0元直播课
                        /*if (data.is_login && data.total_price == 0) {

                            // app0元课需要调用自动下单接口
                            service.post('/live/autoPay', {
                                course_num: param.class_course_number,
                                user_number: user.number
                            }, function(response) {
                                if (response.code == 0) {
                                    if (appVersion) {
                                        openNewOnlineWindow(url);
                                    } else {
                                        app.openNewWindow(url);
                                    }
                                }
                            });
                        } else if (data.is_login && data.total_price != 0) {
                            if (appVersion) {
                                openNewOnlineWindow(url);
                            } else {
                                app.openNewWindow(url);
                            }
                        } else {
                            user.loginStudent();
                        }*/
                    }
                    // m站统一支持直播课的观看（无论是否支持手机观看），且无需弹框提示
                    else {
                        window.location.href = url;
                    }
                    //else if (mobile) {
                    //    dialog = showMobileDialog(function () {
                    //        if (dialog) {
                    //            dialog.dispose();
                    //        }
                    //        window.location.href = url;
                    //
                    //    });
                    //}
                    //else {
                    //    window.location.href = url;
                    //    //dialog = showDialog(function () {
                    //    //    if (dialog) {
                    //    //        dialog.dispose();
                    //    //        openApp({
                    //    //            code:210,
                    //    //            url:url
                    //    //        });
                    //    //    }
                    //    //});
                    //}
                } else if (data.action == "pay") {
                    url = data.pay_url;
                    // 若是App调用
                    if (isApp) {
                        if (appVersion) {
                            openNewOnlineWindow(url);
                        } else {
                            app.openNewWindow(url);
                        }
                    } else {
                        dialog = showPayDialog(function() {
                            if (dialog) {
                                dialog.dispose();
                            }
                            window.location.href = url;

                        });
                    }

                } else if (data.action == "buy") {

                    url = data.buy_url;
                    // 若是App调用
                    if (isApp) {
                        if (appVersion) {
                            openNewOnlineWindow(url);
                        } else {
                            app.openNewWindow(url);
                        }
                    } else {
                        dialog = showBuyDialog(function() {
                            if (dialog) {
                                dialog.dispose();
                            }
                            window.location.href = url;

                        });
                    }

                }

            } else if (response.code === 401) {

                //if (isApp) {
                //    user.loginStudent();
                //} else {
                //    var loginDialog = new LoginDialog();
                //    loginDialog.show();
                //    var listener1 = observer.addListener(loginDialog, 'success', function () {
                //        enterClassroom(param);
                //    });
                //    var listener2 = observer.addListener(loginDialog, 'display_changed', function () {
                //        var display = this.get('display');
                //        if (!display) {
                //            observer.removeListener(listener1);
                //            observer.removeListener(listener2);
                //            loginDialog.destroy();
                //        }
                //    });
                //    //location.href = '/static/login?next=' + location.pathname + window.location.search;
                //}
                user.loginStudent(function() {
                    enterClassroom(param);
                });
            }
            // hurry: service.post有异常处理函数
            // else {
            //     dialog = showOtherDialog(function() {
            //         if (dialog) {
            //             dialog.dispose();
            //         }

            //     }, response.msg);
            // }
        });
    }

    return enterClassroom;
});
