/**
 * @file 网站首页
 * @author tangrongyan
 */
define(function(require, exports) {

    'use strict';

    exports.init = function() {

        $('.tab-nav-index li').mouseenter(
                function() {

                    var target = $(this);
                    target.siblings().removeClass('active');

                    target.addClass('active');
                    var index = target.index();
                    var content = $('.tab-content > div');
                    content.addClass('tab-item');
                    content.eq(index).removeClass('tab-item');
                }
        );

        var btnLi = $(".index-banner-btn li");
        function changeBanner(num) {

            var source = $(".index-img span:visible");
            var element = $(".index-img span");
            var currentIndex = element.index(source);
            if (currentIndex == num)
                return true;

            source.fadeOut(1000);

            element.eq(num).fadeIn(1000);

            btnLi.eq(num).addClass('active').siblings().removeClass('active');
        }

        btnLi.on({
            click: function() {
                var currentIndex = btnLi.index($(this));
                changeBanner(currentIndex);
            }
        });


        var slider = function() {
            var active = $(".index-banner-btn li[class='active']");
            var activeIndex = btnLi.index(active);
            changeBanner((activeIndex + 1) % 3);
        };


        var myTimeId = window.setInterval(slider, 3000);


        $('.index-title').on({
            mouseover: function() {
                window.clearInterval(myTimeId);
            },
            mouseout: function() {

                myTimeId = window.setInterval(slider, 2000);
            }
        });


    };

});