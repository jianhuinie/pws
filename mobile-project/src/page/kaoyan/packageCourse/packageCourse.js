/**
 * Created by chenmo on 16/2/22.
 */
define(function (require) {
    'use strict';
    var $ = require('zepto');
    var lazyLoadImage = require('common/lazyLoadImage');
    var service = require('common/service');
    var util_function = require('util/function');
    var navPanel = require('common/navPanel');

    var scriptData;

    /**
     * 加载图文详情
     */
    function loadImgText() {
        var bottomTxt = $('.load-tip');

        bottomTxt.on('click', function () {
            bottomTxt.html('加载中,请稍后');
            setTimeout(function () {
                bottomTxt.hide();
                $('.hide-content').show();
            }, 1000);
        });
    }

    return function (page_data) {

        lazyLoadImage.init();
        scriptData = page_data;
        $('.nav-button').tap(function () {
            // require(['common/ui/NavPanel/NavPanel'], function (NavPanel) {
                navPanel.show();
            // });
        });
        loadImgText();
    };

});