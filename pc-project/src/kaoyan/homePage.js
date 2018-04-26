/**
 * @file 考研--首页
 * @author caoying
 * @date 2016-02-18
 */

define(function(require) {
    var service = require('common/service');
    var store = require('common/store');
    var lazyImage = require('common/lazyImage');
    var Slider = require('common/component/Slider');
    var header = require('./component/header');
    var consult = require('./component/consult');

    var container = $("#main");

    // 点击底部名师团队，左右滑动按钮
    var sliderFamous = function(){
        var len = container.find('.famous-slider-container .slider-li').length;
        new Slider({
            element: $('.famous-slider-container'),
            itemSelector: '.slider-li',
            prevSelector: '.icon-chevron-left',
            nextSelector: '.icon-chevron-right',
            click: 'click',
            duration: 50,
            autoPlay: false,
            delay: 3000,
            onChange: function (e, data) {
                var from = data.form;
                var to = data.to;
                if (to == 0) {
                    container.find('.icon-chevron-left').addClass('disable');
                    container.find('.icon-chevron-right').removeClass('disable');
                } else if (to == len - 1) {
                    container.find('.icon-chevron-right').addClass('disable');
                    container.find('.icon-chevron-left').removeClass('disable');
                } else {
                    container.find('.icon-chevron-left').removeClass('disable');
                    container.find('.icon-chevron-right').removeClass('disable');
                }
            }
        });
    };

    // 考研客户端二维码选择事件
    var qrCodeChange = function() {
        var switchItem = container.find('.qrCode-switch');
        var activeCode;

        container
            .on('click', '.qrCode-switch', function() {
                var code = $(this).data('code');
                $(this).siblings('.qrCode-switch').removeClass('active');
                if(code != "iphone") {
                    $(this).addClass('active');
                    activeCode = $(this).data('code');
                }
            });

        switchItem.mouseover(function(){
            $(this).addClass('active');
            switchItem.removeClass('active');
        });
        switchItem.mouseout(function(){
            $(this).removeClass('active');
            if(activeCode) {
                $("#main .qrCode-switch[data-code='"+ activeCode+"']").addClass('active');
            }
        })
    };

    // 专业课标签筛选
    var professionChange = function() {
        var item = $('.profession-item');
        var ulList = $('.profession-lists');
        var activeCode = ulList.find('.active').data('code');
        var dataItems = container.find('.profession-class').find('.class-item');

        container
            .on('click', '.profession-item', function(){
                $(this).siblings('li').removeClass('active');
                $(this).addClass('active');
                activeCode = $(this).data('code');

                $.each(dataItems, function(){
                    if($(this).data('code') == activeCode ) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                })

            });

        item.mouseenter(function(){
            item.removeClass('active');
            $(this).addClass('active');
        });
        item.mouseover(function(){
            $(this).removeClass('active');

        });
        ulList.mouseout(function(){
            $(".profession-item[data-code='"+ activeCode+"']").addClass('active');
        });
    };


    // 专业课筛选
    var professionFilter = function(){
        var activeTitle = container.find('.profession-lists').find('.active');
        var dataItems = container.find('.profession-class').find('.class-item');
        var titleCode = activeTitle.data('code');

        $.each(dataItems, function(){
            if($(this).data('code') == titleCode ) {
                $(this).show();
            }
        })

    };

    // 显示课程简介
    var courseIntroShow = function() {
        container.find('.class-item-link').mouseover(function(){
            $(this).find('.teacher-info').css('height', '210px');
            $(this).find('.teacher-info').find('.course-intro').show();
        });
        container.find('.class-item-link').mouseout(function(){
            $(this).find('.teacher-info').css('height', '135px');
            $(this).find('.teacher-info').find('.course-intro').hide();
        });

        container.find('.class-item-link').find('.teacher-info').mouseover(function(){
            $(this).css('height', '190px');
            $(this).find('.course-intro').show();
        });
        container.find('.class-item-link').find('.teacher-info').mouseout(function(){
            $(this).css('height', '65px');
            $(this).find('.course-intro').hide();
        });
    };

    // 页面滚动，自动选中对应导航条tab
    var scrollSelect = function(){
        var politicalHeight = $('.political-type').offset().top;
        var englishHeight = $('.english-type').offset().top;
        var mathHeight = $('.math-type').offset().top;
        var professionHeight = $('.profession-type').offset().top;

        $(window).scroll(function(){
            var currentHeight = (document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop) + 200;

            if(currentHeight > politicalHeight && currentHeight < englishHeight ) {
                $("#header .subject-list [data-id]").find('.item').removeClass('active');
                $("#header .subject-list [data-id ='1']").find('.item').addClass('active');
            }
            else if(currentHeight > englishHeight && currentHeight < mathHeight ) {
                $("#header .subject-list [data-id]").find('.item').removeClass('active');
                $("#header .subject-list [data-id ='2']").find('.item').addClass('active');
            }
            else if(currentHeight > mathHeight && currentHeight < professionHeight ) {
                $("#header .subject-list [data-id]").find('.item').removeClass('active');
                $("#header .subject-list [data-id ='3']").find('.item').addClass('active');
            }
            else if(currentHeight > professionHeight ) {
                $("#header .subject-list [data-id]").find('.item').removeClass('active');
                $("#header .subject-list [data-id ='4']").find('.item').addClass('active');
            }
        })
    };

    // 解决底部轮播图尺寸问题，适应不同的屏幕宽度
    var bottomBanner = function(){
        // 当前屏幕宽度
        var width = document.body.offsetWidth;
        var liSliders = $('.bottom-banner-images').find('.li-slider');
        $.each(liSliders, function() {
            var imgSrc = $(this).find('.banner-img').attr('src');
            $(this).css('width',width);
            $(this).find('.banner-img').attr('src', imgSrc + '@1e_'+ width +'w_500h_1c_0i_1o_90Q_1x.jpg');
        })


    };

    return {
        init: function(){
            header.init();
            lazyImage.init();
            consult.init();

            professionChange();
            bottomBanner();
            new Slider({
                element: $('.banner-images'),
                itemSelector: '.li-slider',
                iconSelector: '.banner-slider-nav-item',
                click: 'click',
                duration: 50,
                autoPlay: true,
                delay: 3000,
                onChange: function (e, data) {
                }
            });

            new Slider({
                element: $('.bottom-banner-images'),
                itemSelector: '.li-slider',
                prevSelector: '.bottom-slider-left',
                nextSelector: '.bottom-slider-right',
                click: 'click',
                duration: 50,
                autoPlay: true,
                delay: 2000,
                onChange: function (e, data) {
                }
            });

            sliderFamous();

            qrCodeChange();

            professionFilter();

            courseIntroShow();

            scrollSelect();
        }
    }
});
