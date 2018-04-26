/**
 * 内链展开收起功能
 * @author zengcheng
 */
define(function (require, exports) {

    'use strict';
    var innerLink = $('#inner-link');

    exports.init = function () {

        // 展开收起
        $('.inner-action', innerLink).click(function(){

            var that = $(this);
            that.toggleClass('close');
            if (!that.hasClass('search-list')) {
                $('.inner-link-list', innerLink).toggleClass('open');
            } else {
                $('.inner-link:gt(1)', innerLink).toggleClass('open');
                window.scrollTo(0, 99999);
                return false;
            }
        });

        // 字母列表
        $('.letter-list .letter', innerLink).hover(function(){
            var that = $(this);
            if (!that.hasClass('active')) {
                that.addClass('active').siblings('.active').removeClass('active');
                $('[data-list="' + that.data('target') + '"]').addClass('active').siblings('.active').removeClass('active');
                window.scrollTo(0, 99999);
                return false;
            }
        });

    };
});