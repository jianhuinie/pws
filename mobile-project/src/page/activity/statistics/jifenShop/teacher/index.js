/**
*create by huangshiming 16/5/12
**/

define(function(require,exports){
    'use strict';
    var $ = require("zepto");
    var lazyLoadImage = require('common/lazyLoadImage');
    var openAppWindow = require("common/openAppWindow");

    var showRules = function () {
        var firstNav = $('.nav-first');
        var textBoxs = $('.text-box');
        var tabItem = $('.tab-item');
        var num;

        tabItem.on('click',function() {
            $(this).siblings('.tab-item').removeClass('on');
            $(this).addClass('on');
            num = $(this).index();
            textBoxs.each(function() {
                $(this).addClass('hide');
            });
            textBoxs.eq(num).removeClass('hide');
        });
    }

    return function(page_data) {
        lazyLoadImage.init();
        showRules();
    }
});