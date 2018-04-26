/**
 * Created by shubaiqiao on 16/9/01.
 */
define(function (require, exports) {

    'use strict';
    var LoginDialog = require('common/ui/LoginDialog/LoginDialog');
    var observer = require('common/mvc/observer');
    var appController = require('common/app');
    var clickFlag = false;

    exports.isWeixin = appController.isWeixin;
    // exports.isWeixin = function () {
    //     var ua = window.navigator.userAgent.toLowerCase();
    //     if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }
    // };
    // appController 里面有isWeixin，此处注释的为自己实现的函数

    exports.addWechatDialog = function (url, callback) {
        var container = $('.container');
        var hidediv = $('.wechat-hide');
        window.gsx_ready(function (config) {
            if (!config.user) {
                    container.show();
                    hidediv.show();
                    if (clickFlag === false) {
                        container.find('.mobile-phone').on('click', function (){
                            var loginDialog = new LoginDialog();
                            loginDialog.show();
                            container.hide();
                            hidediv.hide();
                            var listener1 = observer.addListener(loginDialog, 'success', function () {
                                //自动刷新一下
                                if ($.isFunction(callback)) {
                                    callback();
                                }
                                // window.location.reload();
                                // location.href = '/static/login\?next\=http%3A%2Ftest-m.genshuixue.com%2Fwh%2F';
                            });
                            var listener2 = observer.addListener(loginDialog, 'display_changed', function () {
                                var display = this.get('display');
                                if (!display) {
                                    hidediv.hide();
                                    observer.removeListener(listener1);
                                    observer.removeListener(listener2);
                                    loginDialog.destroy();
                                }
                            });
                        });
                        container.find('.we-chat').on('click', function () {
                            location.href = '/static/login?next=' + encodeURIComponent(url) + '&wechat_login=1';
                        });
                    }
                clickFlag = true;
            }
        });
    };
    var hidediv = $('.wechat-hide');
    var close = $('.container').find('.close-login');
    close.on('click', function () {
        var container = $('.container');
        hidediv.hide();
        container.hide();
    });
    hidediv.on('click', function () {
        var container = $('.container');
        hidediv.hide();
        container.hide();
    });

});
