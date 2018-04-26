/**
 * @file SEM K12聚合页 - 大幻灯（二）
 * @author wangyujie
 */
define(function (require, exports) {

    var Slider = require('common/component/Slider');

    /**
     * 初始化轮播图
     *
     * @return
     */
    function initCarousel() {
        var items = $('.bottom-slider-container').find('.bottom-slideritem');

        return new Slider({
            element: $('.bottom-slider-container'),
            itemSelector: '.bottom-slideritem',
            iconSelector: '.bottom-slider-navitem',
            prevSelector: '.bottom-slider-left',
            nextSelector: '.bottom-slider-right',
            duration: 150
        });

    };


    exports.init = function () {
        initCarousel();
    }












});