/**
 * 社区首页banner轮播图
 * @author zengcheng
 */
define(function (require, exports) {

    var Slider = require('common/component/Slider');

    function initBanner(modHolder) {
        var element = $('.promotion-slider-container', modHolder);
        return new Slider({
                    element: element,
                    itemSelector: '.promotion-slideritem',
                    iconSelector: '.promotion-slider-navitem',
                    prevSelector: '.promotion-slider-left',
                    nextSelector: '.promotion-slider-right',
                    duration: 2000
               });
    }

    exports.init = function () {

        var modHolder = this;

        initBanner(modHolder);
    };
});