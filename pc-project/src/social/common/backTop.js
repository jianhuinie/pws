define(function (require, exports) {

    var bindScroll = require('common/bindScroll');
    var pageScrollTop = require('cobble/function/pageScrollTop');

    exports.init = function (backTop){

        var autoScrolling = false;

        backTop = backTop || $('.back-top');

        if (!backTop || !backTop.length) {
            return false;
        }

        backTop.click(function () {
            var target = backTop;
            autoScrolling = true;
            target.animate({
                bottom: '1000px',
            }, 700, function (){
                target.hide();
                target.css('bottom', '');
            });
            $('html, body').animate({
                scrollTop: '0px'
            }, 550, function() {
                autoScrolling = false;
            });
        });

        bindScroll(window, function() {
            if (autoScrolling) {
                return false;
            }
            var scrollTop = pageScrollTop();
            if (scrollTop > 500) {
                backTop.show();
            } else {
                backTop.hide();
            }
        });
    };
})