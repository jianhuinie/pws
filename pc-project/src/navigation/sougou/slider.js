/**
 * @file 校园招聘
 * @author jixiaohui
 */
define(function(require, exports) {

    'use strict';

    var Carousel = require('cobble/ui/Carousel');
    var Slider = require('common/component/Slider');

    /**
     * 初始化轮播图
     *
     * @return
     */
    function initCarousel() {

        var items = $('.promotion-slider-container').find('.promotion-slideritem');

        return new Slider({
            element: $('.promotion-slider-container'),
            itemSelector: '.promotion-slideritem',
            iconSelector: '.promotion-slider-navitem',
            prevSelector: '.promotion-slider-left',
            nextSelector: '.promotion-slider-right',
            duration: 150,
            onChange: function (e, data) {


            }
        });

    };


    exports.init = function() {

        var carousel = initCarousel();

    };




});