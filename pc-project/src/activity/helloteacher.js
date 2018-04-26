/**
 * @file Hello Teacher页面
 * @author jiahuayan
 */
define(function(require, exports) {

    'use strict';

    exports.init = function() {


        var container = $('.content');
        container.on('click', '.banner', function(e) {
            var me = $(this);
            var showbox = me.next('.banner_con');
            if (showbox.is(':visible')) {
                showbox.slideUp(500);
            } else {
                container.find('.banner_con').hide();
                var top = me.offset().top + 400;
                $(window).scrollTop(top);
                showbox.slideDown(500);
            }
            e.preventDefault();
        });
    };


});