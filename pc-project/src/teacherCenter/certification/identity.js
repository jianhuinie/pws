/**
 * @file 认证设置 - 身份认证
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var identityCard = require('./identityCard');
    var passport = require('./passport');
    var store = require('common/store');

    exports.init = function () {

        var container = $('#content');
        identityCard.init();
        passport.init();

        container
        .on('click', '.nav-item', function (e) {
            var target = $(e.currentTarget);
            var className = target.data('item');
            var tabNav = container.find('.tab-nav');
            var tabContent = container.find('.tab-content');

            if (target.hasClass('active')) {
                return;
            }

            tabNav
            .find('.nav-item')
            .each(function (index, item) {
                if ($(item).hasClass('active')) {
                    $(item).removeClass('active');
                }
                else {
                    $(item).addClass('active');
                }
            });

            tabContent
            .find('.tab-panel')
            .each(function (index, item) {
                if ($(item).hasClass(className)) {
                    $(item).show();
                }
                else {
                    $(item).hide();
                }
            });

        });

    };


});
