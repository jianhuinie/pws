/**
 * Created by gsx on 16/9/01.
 */
define(function (require, exports) {
    'use strict';

    var LoginDialog = require('../LoginDialog/LoginDialog');
    var observer = require('../../util/mvc/observer');
    var clickFlag = false;

    // 这个属于去掉的，替换时需要注意同步去掉
    // exports.isWeixin = appController.isWeixin;

    exports.addWechatDialog = function (url, callback) {
        var container = $('.container');
        var hidediv = $('.wechat-hide');
        window.gsx_ready(function (config) {
            if (!config.user) {
                    container.show();
                    hidediv.show();
                    if (clickFlag === false) {
                        container.find('.mobile-phone').on('click', function () {
                            var loginDialog = new LoginDialog();
                            loginDialog.show();
                            container.hide();
                            var listener1 = observer.addListener(loginDialog, 'success', function () {
                                // 自动刷新一下
                                if ($.isFunction(callback)) {
                                    callback();
                                }
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
