/**
 * @author hurry
 * @date 2016/07/02
 */

define(function(require) {
    'use strict';
    var lazyLoadImage = require('common/lazyLoadImage');
    var $ = require('zepto');
    var app = require('common/app');

    function bindEvent() {
        $('section').on('click', function (e) {
            var target = $(e.currentTarget);
            var url = target.attr('data-url') || target.parents('section').attr('data-url');
            if (url) {
                if (app.isApp()) {
                    app.openNewWindow(url);
                } else {
                    window.open(url);
                }
            }
            e.stopPropagation();
        });
    }

    return function(page_data) {
        lazyLoadImage.init();
        bindEvent();
    };
});