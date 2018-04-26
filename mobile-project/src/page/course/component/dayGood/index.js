
define(function (require) {

    var $ = require('zepto');
    //var swiper = require("common/swiper/swiper");
    var Swiper = require('swiper');

    return function () {

        var swiperInfo = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
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
                }
            });

    }

});