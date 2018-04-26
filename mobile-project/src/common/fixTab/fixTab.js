/* *
*Create By huangshiming on 16/11/21
*吸顶的控件 （只含一级TAB）
* */

define(function (require, exports) {
    'use strict';
    var $ = require('zepto');
    var quartFix;
    var tabSpace;

    function fixTab(element, hasAds) {

        var screenHeight = screen.availHeight;

        quartFix = $(element);
        var navBarHeight = $(element).height();
        tabSpace = $('<div class="fix-no-tab"></div>');

        tabSpace
            .css('height', navBarHeight)
            .css('width', '100%')
            .hide();

        quartFix.before(tabSpace[0].outerHTML);
        var navBarTop = quartFix.offset().top;
        var navBarHeight = quartFix.height();


        function update() {

            var bodyHeight = $(document.body).height();

            // 显示fix的必要条件是：
            // body的总高度 > nav的top偏移量 + 屏幕的高度

            var isFixed = bodyHeight > navBarTop + screenHeight;
            var scrollTop = $(window).scrollTop();

            //console.log('scrollTop: ' + scrollTop + 'navBarTop: ' + navBarTop);
            var toTopHeight = navBarTop;
            if(hasAds){
                toTopHeight = navBarTop + 50;
            }
            var fixNoTab = $('.fix-no-tab');
            if(isFixed && (scrollTop) > toTopHeight) {
                fixNoTab
                    .show()
                    .css('visibility', 'hidden');
                quartFix.addClass('fix-tab');
            } else if (scrollTop < (navBarHeight + navBarTop)) {
                fixNoTab.hide();
                quartFix.removeClass('fix-tab');
            }

        }
        document.addEventListener('touchmove', update, false);
        $(window).scroll(update);
    }

    return function (element, hasAds) {
        fixTab(element, hasAds);
    };
});