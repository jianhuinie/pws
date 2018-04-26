/**
 * @file 老师介绍页面
 * @author wangyujie
 */
define(function(require, exports) {

    'use strict';

    exports.init = function() {

        var container = $('#main');
        var tabNav = container.find('.tab-nav');
        var tabContent = container.find('.tab-content');

        tabNav
        .on('mouseenter', '.nav-item', function (e) {
            var target = $(e.currentTarget);
            var num = target.data('no');

            if (target.hasClass('active')) {
                return;
            }
            // tab-nav
            tabNav
            .find('.nav-item')
            .each(function (index, item) {
                $(item).removeClass('active');
            });

            target.addClass('active');

            // tab-content
            tabContent
            .find('.tab-panel')
            .each(function (index, item) {
                $(item).removeClass('active');
            });

            tabContent.find('#' + num).addClass('active');
        });

    };



});