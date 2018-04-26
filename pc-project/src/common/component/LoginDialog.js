/**
 * @file 通用登录弹出层
 * @author peilonghui
 */
define(function (require) {

    'use strict';

    var Dialog = require('cobble/ui/Dialog');
    var LoginForm = require('./LoginForm');

    /**
     * 登录弹窗类
     *
     * @param {Object} options 配置信息
     * @property {string=} options.mobile 手机号
     * @property {string=} options.next 登录成功后的跳转页面
     * @property {Function=} options.onSuccess 登录成功后得回调
     * @property {string=} options.failNext 登录失败后的跳转url
     * @property {number=}  options.zIndex 对话框的z-Index层级默认为5
     * @property {boolean=} options.activityVoiceRegister 有些活动的登录框需要在跳转注册时强制用语音验证码注册
     * @property {string=} options.registerPrefix 自定义的注册url前缀，用于统计
     */
    function LoginDialog(options) {
        $.extend(this, LoginDialog.defaultOptions, options);
        this.init();
    }

    LoginDialog.prototype = {

        init: function () {

            var me = this;
            var failNext = me.failNext;

            me.dialog = new Dialog({
                //默认为5
                zIndex: me.zIndex || 5,
                title: me.title,
                // 必须在这里读取，不然可能会因为 DOM 没加载完而拿不到模板
                content: $('#login-dialog-form').html(),
                width: me.width,
                skinClass: me.skinClass
            });

            var element = me.dialog.element;

            if (me.next) {
                element
                .find('input[name="next"]')
                .val(
                    encodeURIComponent(me.next)
                );
            }

            new LoginForm({
                element: element,
                mobile: me.mobile,
                showKefu: me.showKefu,
                wrongRoleText: me.wrongRoleText,
                failNext: failNext,
                activityVoiceRegister: me.activityVoiceRegister,
                registerPrefix: me.registerPrefix,
                onSuccess: function (data) {

                    me.hide();

                    if ($.isFunction(me.onSuccess)) {
                        me.onSuccess(data);
                    }

                    //location.href = data.url;
                }
            })

        },

        show: function () {
            this.dialog.show();
        },

        hide: function () {
            this.dialog.hide();
        }
    };

    LoginDialog.defaultOptions = {
        title: '登录',
        width: 383,
        onSuccess: $.noop,
        skinClass: 'login-dialog'
    };


    return LoginDialog;

});