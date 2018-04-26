/**
 * Created by shubaiqiao on 16/12/6.
 *  处理app中a标签的跳转
 */
define(function (require) {
    'use strict';

    var appController = require('common/app');

    return function () {
        $(document.body).on('click', 'a', function (e) {
            var url = $(this).attr('href');
            if (url == '') {
                return false;
            }
            var isPage = $(this).attr('href').indexOf('javascript');
            if (url.indexOf('http') == -1) {
                url = location.origin + url;
            }
            if(appController.isApp() && isPage == -1) {
                appController.openNewWindow(url);
                e.preventDefault();
                return false;
            }
        });
    };
});