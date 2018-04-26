/**
 * @file 高考志愿
 * @author tangrongyan
 */



define(function(require, exports) {

    'use strict';
    var Dialog = require('cobble/ui/Dialog');
    var Tab = require('cobble/ui/Tab');
    var LoginDialog = require('common/component/LoginDialog');
    var store = require('common/store');
    var baiduShare = require('common/component/baiduShare');
    var Popup = require('cobble/helper/Popup');
    var pageScrollTop = require('cobble/function/pageScrollTop');
    var Slider = require('common/component/Slider');
    var VideoDialog = require('common/component/VideoDialog');

    /**
     * 定位当前可视区域为招办模块或者学长学姐模块
     * @param  {string} id 模块id
     */
    var resetView = function (id) {
        var item3 = $('#' + id).offset().top;
        $('html,body').animate(
                {
                    scrollTop: item3
                },
                100,
                'easeOutCirc'
            );
    };

    /**
     * 启动自动滚动
     * @param {jQuery} ele 滚动的对象
     * @param {string|number} index 当前索引
     */
    var autoScroll = function (ele, index) {
        //小于一页不滚动
        if ($('.list-wrapper .promotion-slideritem', ele).length <= 1) {
            return false;
        }

        var timer;
        var currentStr = 'current';
        var pagerList = $('.org-info-pager', ele.parent());
        var pages = $('.org-page', pagerList).length;

        //轮播函数
        var slide = function() {
            var current = +ele.data(currentStr);
            ele.animate({'scrollLeft': current * 990}, 2000, function () {
                $('.org-page', pagerList).removeClass('active');
                $('.org-page:eq(' + current + ')', pagerList).addClass('active');
                ele.data(currentStr, (++current) % pages);
                clearScroll(ele);
                timer = setTimeout(slide, 8000);
                ele.data('timer', timer);
            });
        };

        if (!index) {
            $('.org-page', pagerList).removeClass('active');
            $('.org-page:eq(0)', pagerList).addClass('active');
            ele.scrollLeft(0);
            ele.data(currentStr, 0);
        }
        if (ele.length) {
            slide();
        }
    };


    /**
     * 清楚滚动
     * @param  {jQuery} ele 滚动对象
     * @return {[type]}     [description]
     */
    var clearScroll = function (ele) {
        ele.stop(true);
        var timer = ele.data('timer');
        if (timer) {
            clearTimeout(timer);
        }
    };



    exports.init = function(pageSize) {
        //分页
        $('.expert .float-left').delegate('button', 'click', function(){

            var video = $(this).data('video');
            var img_link = $(this).data('herf');

            if(video){
                new VideoDialog({
                    url: img_link
                });
                return;
            }
            window.open(img_link, '_blank');

        });

        // 招办主任播放视频
        $('.director').delegate('.school-video','click', function(){

            var video = $(this).data('video');
            var img_link = $(this).data('herf');

//            if(video == 2 || video == 3 ){
                new VideoDialog({
                    url: img_link
                });
                return;
//            }

        });
        // 招办主任点击按钮
        $('.director').delegate('.button-college','click', function(){
            var video = $(this).data('video');
            var img_link = $(this).data('herf');

            if(video == 3 ){
                new VideoDialog({
                    url: img_link
                });
                return;
            }
            window.open(img_link, '_blank');

        });

        // 学长学姐点击按钮
        $('.boutique-teacher').delegate('.button-student','click', function(){
            var video = $(this).data('video');
            var img_link = $(this).data('herf');

            if(video == 2 || video == 3 ){
                new VideoDialog({
                    url: img_link
                });
                return;
            }
            window.open(img_link, '_blank');

        });

        //school-video
        $('.upperclassman .school-video').click(function() {
            var video = $(this).data('video');
            var img_link = $(this).data('herf');

            if(video == 2 || video == 3 ){
                new VideoDialog({
                    url: img_link
                });
                return;
            }
            window.open(img_link, '_blank');


        });

        //基本
        var con = $('#main');
        con.
            on('mouseenter', ' .left-small .top', function() {
                $(this).find('.mask').fadeIn();
                $(this).find('.detail').fadeIn();
            })
            .on('mouseleave', '.left-small .top', function() {
                $(this).find('.mask').fadeOut();
                $(this).find('.detail').fadeOut();
            });


        //招办主任分类切换
        con.each(
            function() {
                new Tab({
                    trigger: 'click',
                    navActiveClass: 'active',
                    navSelector: '.director .tab-nav',
                    contentSelector: '.director .tab-panel',
                    element: $(this),
                    index: 0,
                    onChange: function (event,data) {
                        var viewWrapper = $('.director .tab-panel:eq(' + data.to + ') .view-wrapper');
                        autoScroll(viewWrapper);
                        if (data.from >= 0) {
                            clearScroll($('.director .tab-panel:eq(' + data.from + ') .view-wrapper'));
                        }
                    }
                });
            }
        );

        //招办主任分页切换
        $('.director .tab-panel').each(
            function() {
                new Tab({
                    trigger: 'click',
                    navActiveClass: 'active',
                    navSelector: '.org-info-pager .org-page',
                    contentSelector: '.promotion-slideritem',
                    element: $(this),
                    index: 0,
                    animation: function (data){
                        var from = data.from;
                        var to = data.to;
                        var panel = $('.director .tab-panel .view-wrapper');
                        if (data.from >= 0) {
                            panel.animate({'scrollLeft': to * 990}, 2000);
                            panel.data('current', data.to);
                        }
                    }
                });
            }
        );


        // 学长学姐分类切换
        $('.upperclassman').each(
                function() {
                    new Tab({
                        trigger: 'click',
                        navActiveClass: 'active',
                        navSelector: '.tab-nav',
                        contentSelector: '.tab-panel',
                        element: $(this),
                        index: 0,
                        onChange: function (event, data) {
                            var viewWrapper = $('.upperclassman .tab-panel:eq(' + data.to + ') .view-wrapper');
                            autoScroll(viewWrapper);
                            if (data.from >= 0) {
                                clearScroll($('.director .tab-panel:eq(' + data.from + ') .view-wrapper'));
                            }
                        }
                    });
                }
        );

        //学长学姐分页切换
        $('.upperclassman .tab-panel').each(
            function() {
                new Tab({
                    trigger: 'click',
                    navActiveClass: 'active',
                    navSelector: '.org-info-pager .org-page',
                    contentSelector: '.promotion-slideritem',
                    element: $(this),
                    index: 0,
                    animation: function (data){
                        var from = data.from;
                        var to = data.to;
                        var panel = $('.upperclassman .tab-panel .view-wrapper');
                        if (data.from >= 0) {
                            panel.animate({'scrollLeft': to * 990}, 2000);
                            panel.data('current', data.to);
                        }
                    }
                });
            }
        );


        //hover暂停
        $('.boutique-teacher .view-wrapper').each(function () {
            $(this).hover(function () {
                clearScroll($(this));
            }, function () {
                autoScroll($(this), $(this).data('current'));
            });
        });



        var share_two = '2016高考志愿填报';
        baiduShare.init({'text': share_two, 'image': 'http://img.gsxservice.com/0cms/d/file/content/2015/06/557d3489a0498.jpg', 'element': $('#share')});


        var container = $(document);

        new Popup({
            element: container.find('.share'),
            layer: container.find('.share .baidu-share'),
            show: {
                trigger: 'over',
                delay: 100
            },
            hide: {
                trigger: 'out',
                delay: 200
            }
        });



        var nav = container.find('.fixed-nav');
        var expert = container.find('.expert');
        var height = nav.height();
        var navTop = nav.offset().top;
        var navTop = $('.nav-box').offset().top + $('.nav-box').height();
        function apply() {

            if (pageScrollTop() > navTop) {
                nav.show();
                nav.addClass('fixed').show();
            } else {
                nav.hide();
                nav.removeClass('fixed');
            }
        }

        apply();

        $(window).scroll(apply);


        //nav滚动
        var container = $('#main');
        var topMap = [
            {id: 'item1', top: container.find('#item1').offset().top},
            {id: 'item2', top: container.find('#item2').offset().top},
            {id: 'item3', top: container.find('#item3').offset().top}
        ];

        var baseTop = topMap[0].top;


        var side = container.find('.fixed-nav');
        var item1 = container.find('#item1');


        var sideTop = $('.nav-box').offset().top + $('.nav-box').height();

        side
            .on('click', 'a', function() {
                var element = $(this);
                var id = element.data('nav-id');
                var top;

                $.each(topMap, function(index, object) {

                    if (object.id == id) {
                        top = object.top;
                        return false;
                    }
                });

                if (top !== undefined) {
                    side.find('.active').removeClass('active');
                    element.addClass('active');

                    $(window).unbind('scroll', scrollHanlder);

                    $('html,body').animate(
                            {
                                scrollTop: top-40
                            },
                    200,
                            'easeOutCirc',
                            function() {

                                $(window).on('scroll', scrollHanlder);
                            }
                    );

                }

            });

        $('.nav-box .wrapper') .on('click', 'a', function() {

            var iid =  $(this).attr('id');
            var iitop = $('.'+iid+'').offset().top;

            $('html,body').animate(
                    {
                        scrollTop: iitop-40
                    },
            1000,
                    'easeOutCirc'
                    );
        });



        var scrollHanlder = function() {

            var top = pageScrollTop();

            $.each(topMap, function(index, object) {


                if (topMap.length == 7) {

                    if (index >= 5) {
                        index = (index - 2);
                        return;
                    }
                    topMap.length = topMap.length;
                }

                if ((index == topMap.length - 1 || top <= topMap[index + 1].top - 200)
                        && (top >= object.top - 200)) {

                    side.find('.active').removeClass('active');
                    side.find('[data-nav-id=' + object.id + ']').addClass('active');

                    return false;


                }
            });


            var fixedHeader = function() {
                side.addClass('fixed');
            };
            var staticHeader = function() {
                side.removeClass('fixed');
            };
            var apply = function() {
                if (pageScrollTop() > sideTop) {
                    fixedHeader();
                }
                else {
                    staticHeader();
                }
            };


            apply();


            $(window).scroll(apply);


        };

        side
            .on('click', '.back-to-top', function() {

                $('html,body').animate(
                        {
                            scrollTop: 0
                        },
                1000,
                        'easeOutCirc'
                        );
            });
        $(window).on('scroll', scrollHanlder);

        $('.expert .item-o').click(function(){

            var video = $(this).data('video');
            var img_link = $(this).data('herf');

            if(video){
                new VideoDialog({
                    url: img_link
                });
                return;
            }
            window.open(img_link, '_blank');

        });

    };
});