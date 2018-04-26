/* *
*Create By huangshiming on 16/11/21
*吸顶的控件 （只含一级TAB）
* */

define(function (require, exports) {
    'use strict';
    require('css-loader!./index.styl');
    var $ = require('zepto');
    var quartFix;
    var tabSpace;
    var deviceRatio;

    function fixTab(element, hasAds, fixedCallBack, noFixedCallBack) {

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
                toTopHeight = navBarTop + 50 * deviceRatio;
            }
            var fixNoTab = $('.fix-no-tab');
            if(isFixed && (scrollTop) > toTopHeight) {
                fixNoTab
                    .show()
                    .css('visibility', 'hidden');
                quartFix.addClass('fix-tab');
                if(fixedCallBack) {
                    fixedCallBack();
                }
            } else if (scrollTop < (navBarHeight + navBarTop)) {
                fixNoTab.hide();
                quartFix.removeClass('fix-tab');
                if (noFixedCallBack) {
                    noFixedCallBack();
                }
            }

        }
        document.addEventListener('touchmove', update, false);
        $(window).on('scroll.fixTab', update);
    }

    return function (element, hasAds, fixedCallBack, noFixedCallBack) {
        var ratio = $('#viewport').attr('ratio');
        deviceRatio = (+ratio < 1) ? window.devicePixelRatio : 1;
        fixTab(element, hasAds, fixedCallBack, noFixedCallBack);
    };
});