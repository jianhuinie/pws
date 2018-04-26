/**
 * @file 懂行活动
 * @author zengcheng
 *
 */
define(function (require, exports) {

    var Slider = require('common/component/Slider');
    var Popup = require('cobble/helper/Popup');

    /**
     * 初始化轮播图
     *
     * @return
     */
    function initCarousel() {

        var innerCarousel;

        var slider = new Slider({
            element: $('.course-list'),
            itemSelector: '.promotion-slideritem',
            iconSelector: '.promotion-slider-navitem',
            prevSelector: '.promotion-slider-left',
            nextSelector: '.promotion-slider-right',
            duration: 150,
            onChange: function (event, data) {
                var miniList = $('.mini-list .mini-img');
                miniList.removeClass('active')
                miniList.filter('[data-index="' + data.to + '"]').addClass('active');
                innerCarousel = this;
            }
        });

        $('.mini-list-wrapper').on('click', '.mini-img', function () {
            var index = $(this).data('index');
            innerCarousel && innerCarousel.to(index);
        });
    }

    exports.init = function () {

        //  分享按钮
        var shareBtn = $('#share-btn');
        shareBtn.hover(function(){
            shareBtn.css('background-image', 'url(' + $(this).data('btn-hover') + ')');
        }, function(){
            shareBtn.css('background-image', 'url(' + $(this).data('btn') + ')');
        });

        // 初始化轮播
        initCarousel();

        // 初始化分享
        //百度分享
        new Popup({
            element: $('#share-btn'),
            layer: $('#share-btn').find('.baidu-share'),
            show: {
                trigger: 'over',
                delay: 20
            },
            hide: {
                trigger: 'out',
                delay: 200
            }
        });

    };
});