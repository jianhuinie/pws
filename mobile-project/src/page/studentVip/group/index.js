/**
 * @author hurry
 * @date 2016/07/02
 */

define(function(require) {
    'use strict';
    var $ = require('zepto');
    var app = require('common/app');
    var env = require('util/env');

    function redirect(url) {
        if (app.isApp()) {
            app.openNewWindow(url);
        } else {
            window.open(url);
        }
    }

    function bindEvent() {
        $('.button').on('click', function (e) {
            var target = $(e.target);
            var isQQ = target.attr('is-qq');
            if (isQQ === '1') {
                if (app.isStudentApp() && env.os.isAndroid) {
                    Jockey.send('joinQQGroup', {
                        key: target.attr('android-key')
                    });
                } else {
                    window.open(target.attr('data-url'));
                }
            } else {
                redirect(target.attr('data-url'));
            }
        });
    }

    return function(page_data) {
        bindEvent();
    };
});