/**
 * @file 校园招聘
 * @author jixiaohui
 */
define(function(require, exports) {

    'use strict';

    var OfferDialog = require('common/component/OfferDialog');
    var Carousel = require('cobble/ui/Carousel');
    var Slider = require('common/component/Slider');
    var container = $('.recruit');
    var nav = container.find('.nav');
    var content = container.find('.content');

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

    function showMore() {
        content.find('li').each(function(i ,item){
            var inner = $(item).find('.inner-detail');
            if (inner.height() > 190) {
                $(item).find('.more').show();
            }
        });
    }

    exports.init = function() {

        var carousel = initCarousel();
        showMore();

        nav
        .on('mouseenter', 'li', function(e){
            var element = $(this);
            nav.find('li').removeClass('active');
            element.addClass('active');

            var info = element.data('info');

            content.find('.item').hide();
            content.find('.'+info).show();
            showMore();
        })

        content
        .on('click', '.btn-primary', function(e){
            var element = $(this);
            var addr = element.data('addr');
            var type = element.data('type');
            var job = element.data('job');
            var arealist = element.data('arealist');

            new OfferDialog({
                arealist: arealist,
                addr_id: addr,
                type_id: type,
                job_id: job
            });
        })
        .on('click', '.more', function(e){
            var element = $(this);
            var parent = element.parent().parent();
            var icon = element.find('.icon');
            if (icon.hasClass('icon-angle-down')) {
                icon.removeClass('icon-angle-down')
                    .addClass('icon-angle-up');
                parent.find('.detail').addClass('toggle');
            } else {
                icon.removeClass('icon-angle-up')
                    .addClass('icon-angle-down');
                parent.find('.detail').removeClass('toggle');
            }
        })

    };




});