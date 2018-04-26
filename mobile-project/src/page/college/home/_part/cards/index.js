/**
 * @file 跟谁学大学首页3D卡片模板
 * @author hurry
 * @date 2016/10/10
 */

define(function (require) {
    'use strict';
    var Swiper = require('swiper');
    var lazyLoadImage = require('common/lazyLoadImage');

    return {
        init: function () {
            var swiper = new Swiper('.swiper-3d-container', {
                effect: 'coverflow',
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: 'auto',
                initialSlide: 0,
                loop: true,
                coverflow: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows : false
                },
                onTouchStart: function (swiper) {
                    lazyLoadImage.init();
                }
            });
        }
    };
});