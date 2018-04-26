/**
 * Created by gsx on 15/6/19.
 */
define(function (require) {
    'use strict';

    var MVCObject = require('../../util/mvc/MVCObject');
    var observer = require('../../util/mvc/observer');
    var utilBase = require('../../util/base');
    var utilFunction = require('../../util/function');
    var Dialog = require('../../component/Dialog/Dialog');

    var url = '/static/login2?next=' + encodeURIComponent(window.location.href) + '&callback=onLoginMessage.{id}';
    var iframeHTML = '<iframe width="100%" height="100%" style="border:0 none;display:block;" src="' + url + '"></iframe>';
    var callbacks = {};
    window.onLoginMessage = {};


    /**
     *  快速登陆Dialog
     *
     *  @extends {MVCObject}
     *
     *  attr:
     *      display {boolean} 显示/隐藏
     *      autoReload {boolean} 登陆成功后自动刷新页面
     *
     *  event:
     *      success 登陆成功时触发
     * */
    function LoginDialog(options) {
        this.setOptions(options);
    }

    utilBase.inherits(LoginDialog, MVCObject);

    var p = LoginDialog.prototype;
    p.show = function () {
        this.set('display', true);
    };
    p.hide = function () {
        this.set('display', false);
    };
    p.destroy = function () {
        this.unbindAll();
        observer.clearInstanceListeners(this);
        var dialog = getDialog(this);
        if (dialog) {
            destroyDialog(this);
        }
        var cb = getCallbackName(this);
        if (window.onLoginMessage[cb]) {
            delete window.onLoginMessage[cb];
        }
    };

    p.display_changed = function () {
        var display = this.get('display');
        var dialog = this._dialog;
        if (display && !dialog) {
            dialog = getDialog(this);
            if ($(window).scrollTop() === 0) {
                $(window).scrollTop(2);
            }
        }
    };
    p.frameHeight_changed = function () {
        var dialog = this._dialog;

        if (!dialog || !dialog.getContent()) {
            return;
        }
        var content = dialog.getContent();
        var $iframe = $(content).find('iframe');
        var height = this.get('frameHeight');
        if (height > 0) {
            $iframe.css('height', height);
        } else {
            $iframe.css('height', 'auto');
        }
        dialog.set('height', height);
    };
    LoginDialog.getInstance = function (options) {
        var instance = utilFunction.singleton(LoginDialog);
        instance.setOptions(options);
        return instance;
    };

    function getCallbackName(instance) {
        return 'cb' + utilBase.getUid(instance);
    }

    function loginCallback(info, instance) {
        switch (info.action) {
            // 登陆成功
            case 'success':
                observer.trigger(instance, 'success');
                if (instance.get('autoReload')) {
                    window.location.reload();
                }
                instance.hide();
                break;
            case 'resize':
                instance.set('frameHeight', info.height);
                break;
            case 'close':
                instance.set('display', false);
                break;
            case 'focus':
                if (instance._dialog) {
                    instance._dialog.set('enableAutoCenter', false);
                }
                break;
            case 'blur':
                if (instance._dialog) {
                    instance._dialog.set('enableAutoCenter', true);
                }
                break;
        }
    }

    function bindEvent(instance) {
        // hurry: iframe嵌套页面无法使用imagePlayer，因为fixed定位基于当前页面
        window.addEventListener('message', function (e) {
            loginCallback(JSON.parse(e.data), instance);
        });
        callbacks[getCallbackName(instance)] = function (info) {
            loginCallback(info, instance);
        };
    }

    function destroyDialog(instance) {
        if (instance._dialog) {
            instance._dialog.destroy();
            instance._dialog = null;
        }
    }

    function getDialog(instance) {
        var dialog = instance._dialog;
        if (!dialog) {
            dialog = new Dialog({
                position: 'absolute',
                height: '300',
                display: false,
                skin: 'login-mini'
            });
            instance._dialog = dialog;
            $(dialog._element).css({
                'background-color': '#ffffff',
                border: '1px solid #cccccc',
                overflow: 'hidden',
                'box-shadow': '#999999 0 0 15px;'
            });
            dialog.bindTo('display', instance);
            var content = $('<div></div>').css({
                position: 'relative',
                width: '100%',
                height: '100%'
            }).html(iframeHTML.replace('{id}', getCallbackName(instance)));
            bindEvent(instance);
            dialog.set('content', content);
        }
        return dialog;
    }


    return LoginDialog;
});