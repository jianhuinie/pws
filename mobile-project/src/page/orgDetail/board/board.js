define(function (require) {

    'use strict';

    var $ = require('zepto');
    var Swiper = require('swiper');

    return function () {

        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            slidesPerView: 4.5,
            paginationClickable: true,
            spaceBetween: 0,
            freeMode: true
        });
    }
});