/**
 * @file 懂行落地页
 * @author wangtianhua
 *
 */
define(function (require, exports) {

    var Slider = require('common/component/Slider');
    var viewportWidth = require('cobble/function/viewportWidth');
    var backTop = require('../social/common/backTop');
    var store = require('common/store');
    var cookie = require('cobble/util/cookie');
    var pageScrollTop = require('cobble/function/pageScrollTop');
    var container = $('#know');
    /**
     * 初始化轮播图
     *
     * @return
     */
    function initBanner(modHolder) {

        // var imageRatio = 192 / 45;
        // var slideHeight = sliderWidth / imageRatio;

        var element = $('.promotion-slider-container', modHolder);

        // element.css('height',slideHeight);

        return new Slider({
            element: element,
            itemSelector: '.promotion-slider-item',
            iconSelector: '.promotion-slider-navitem',
            prevSelector: '.promotion-slider-left',
            nextSelector: '.promotion-slider-right',
            duration: 1500
       });

    }

    var changewidth = function () {
        var sliderWidth = viewportWidth();
        var item = container.find('.slider-img');
        var marginleft = 0;
        if(sliderWidth < 1920){
            var marginleft = -(1920-sliderWidth) + 'px';
        }
        item.css({
            marginLeft: marginleft
        });
    }

    exports.init = function () {

        var floatbox = $('.float-consult');

        changewidth();
        $(window).resize(changewidth);

        backTop.init();
        modHolder = $(this);
        var banner = modHolder.find('#banner');
        // 初始化轮播
        initBanner(banner);


        //判断价格是否免费
        var price = container.find('.price');
        for (var i = 0; i < 5; i++) {
        if( price.eq(i).html() == '免费'){
                price.eq(i).addClass('free');
            }
        };

        // 出现描述语
        container
        .on('mouseover','.pic',function(){
            var element = $(this);
            var hidedesc = element.find('.hidedesc');
            var mode = element.find('.hide-mode');
            mode.show();
            hidedesc.show();

        })
        .on('mouseout','.pic',function(){
            var element = $(this);
            var hidedesc = element.find('.hidedesc');
            var mode = element.find('.hide-mode');
            mode.hide();
            hidedesc.hide();
        });

        $('body')
        .on('mouseenter', '.back-top', function() {
            var element = $(this);
            element.addClass("back");
            var img = element.find('.back-img');
            img.show();
        })
        .on('mouseleave', '.back-top', function() {
            var element = $(this);
            element.removeClass("back");
            var img = element.find('.back-img');
            img.hide();
        });

        //吸顶
        var side = $('.nav-wrapper');

        var sideTop = side.offset().top;
        var top = pageScrollTop();

        var fixedHeader = function() {
            side.addClass('fixed');
            container.css('marginTop','70px');
        };
        var staticHeader = function() {
            side.removeClass('fixed');
            container.css('marginTop','0');
        };
        var  begin = 30;
        var apply = function() {
            if (pageScrollTop() > begin ) {
                fixedHeader();
            }
            else {
                staticHeader();
            }
        };
        apply();
        $(window).scroll(apply);

    };
});