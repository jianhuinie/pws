/**
 * [description] 处理IE8 tab 导航样式问题
 * @author  niejianhui
 */
define(function (require,exports) {
    'use strict';
    exports.init = function () {
        var tabNav = $('.tabNav');
        var len = tabNav.find('li').length;
        if (navigator.userAgent.indexOf("MSIE 8.0") > 0) {
            var widPercent = parseInt(100 / len) + '%';
            $('.tabNav li').css('width', widPercent);
        };
    };
});