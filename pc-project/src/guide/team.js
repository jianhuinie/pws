/**
 * @file 老师介绍页面
 * @author tangrongyan
 */
define(function(require, exports) {

    'use strict';
    var Carousel = require('cobble/ui/Carousel');

    exports.init = function() {



        var controls = $('.banner');

//        自动轮播

        var carousel = new Carousel({
            element: $('.promotion-slider-nav'),
            itemSelector: 'span',
            iconSelector: 'span',
            activeClass: 'active',
            trigger: 'click',
            delay: 6000,
            animation: function(data) {


                var me = this;
                var elem = me.element.prev();
                var len = elem.children().length;

                var navLength = me.element.children().length;

                var toIndex = data.to;
                var fromIndex = data.from;

                if (fromIndex === toIndex || toIndex < 0) {
                    return;
                }

                if ((toIndex - fromIndex) === (navLength - 1)) {

                    if (fromIndex === 0) {
                        toIndex = -1;
                    }

                }
                else if ((fromIndex - toIndex) === (navLength - 1)) {

                    if (toIndex === 0) {
                        toIndex = len - 2;
                    }
                }


                elem
                        .animate(
                                {
                                    left: (-769 - toIndex * 769) + 'px'
                                },
                        800,
                                'easeOutQuad',
                                function() {
                                    if (toIndex === len - 2) {
                                        elem.css('left', '-769px');
                                        me.index = 0;
                                    }

                                    if (toIndex === -1) {
                                        elem.css('left', (-769 - (navLength - 1) * 769) + 'px')
                                        me.index = navLength - 1;
                                    }
                                }
                        );
            }
        });
        carousel.play();









    };

});