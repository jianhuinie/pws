define(function(require) {
    'use strict';

    var $ = require('zepto');

    var wrapperFooter = $('#wrapper-footer');
    var url = require('util/url');
    var service = require('common/service');
    var ui_new = require('common/ui');
    var app = require('common/app');
    var observer = require('common/mvc/observer');
    var fullPageDialog = require('common/ui/FullPageDialog/FullPageDialog');
    var isTeacherApp;
    var phoneFlag = true;
    var joinFlag = true;

    /**
     * 三方通话界面
     * @param url 打电话url
     */
    function callPage(url) {
        var dialog = new fullPageDialog({
            'content': '<iframe width="100%" height="100%" src="'
                + url
                + '"></iframe>',
            'animateType': 2,
            'position': 'fixed'
        });
        dialog.show();
        var listener = observer.addListener(dialog, 'display_changed', function() {
            var display = this.get('display');
            phoneFlag = true;
            if (!display) {
                observer.removeListener(listener);
                listener = null;
                dialog.destroy();
                dialog = null;
            }
        });
    }

    //一些操作包括立即报名和立即联系
    var doSomething = function() {

        wrapperFooter.on('click', '.call', function() {
            var that = $(this);
            var recordNumber = that.data('number');

            if (phoneFlag) {
                phoneFlag = false;

                service.post(
                    '/tcenter/hall/do',
                    {
                        'number': recordNumber,
                        'action': 'contact'
                    },
                    function(res) {
                        if (res.code === 0) {
                            var callUrl = res.data;
                            callPage(callUrl);
                        }
                    }
                );
            }

        });
    };

    return function() {
        isTeacherApp = app.isTeacherApp();
        doSomething();
    };
});