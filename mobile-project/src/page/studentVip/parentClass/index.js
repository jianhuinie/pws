/**
 *huangshiming
 **/

define(function(require) {
    'use strict';

    var $ = require('zepto');
    var SlideImageControl = require('common/ui/slideImageControl/slideImageControl');
    var lazyLoadImage = require('common/lazyLoadImage');
    var service = require('common/service');
    var openAppWindow = require('common/openAppWindow');
    var user = require("common/user");
    var setShare = require('common/share/initialize');
    var template = require('artTemplate');
    var liRender = template.compile(require('text!./li.tpl'));
    var ImgRender = template.compile(require('text!./img.tpl'));
    var container = $('#page_main');
    var env = require('util/env');
    var Iscroll = require('iscroll');
    var pageData;
    var isWeixin;
    var screenWidth;

    var listScroll = function() {
        new Iscroll(
            '.list-container', {
                probeType: 1,
                useTransition: true,
                tap: true,
                click: true,
                scrollX: true,
                scrollY: false
            }
        );
    }

    // 轮播图初始化
    function initSlider() {
        var cContain = $("#myslider");
        var bullets = cContain.find(".slide_position li");
        var curimage = new SlideImageControl(cContain[0], {
            auto: 3000,
            continuous: true,
            callback: lazyloadSlideImg
        });
        // 判断图片是否已经加载，并执行加载
        // 设置当前active的dot效果
        function lazyloadSlideImg(index) {
            var dom = curimage.slides[index];
            if (!dom.imageLoaded) {
                lazyLoadImage.init(dom);
                dom.imageLoaded = true;
            }
            bullets.removeClass('on');
            bullets.eq(index).addClass('on');
        }

        lazyloadSlideImg(curimage.get('index'));
    }


    //自动加载还有更多
    var getNextPage = function () {
        var hDom = $('.has-more');
        if (!hDom.length) {
            return;
        }

        var lastScroHeight = hDom.position().top;

        function updataMoreDom(hasMore, nextCursor) {
            if (hasMore && nextCursor) {
                hDom.attr('data-next-cursor', nextCursor);
                hDom.show();
            } else {
                hDom.hide();
            }
        }

        if (hDom.length) {
            updataMoreDom(1, 2);
        }

        var lastIndex = 0;
        var isLoading = false;

        function getUrl() {
            var parseUrl;
            $('.list').find('.list-item').each(function() {
                var there = $(this);
                if (there.hasClass('on')) {
                    parseUrl = there.data('url');

                }
            });
            return parseUrl;
        }

        function getCourseIntoTpl(courseInfo) {
            var html = liRender({
                list: courseInfo,
                //screenWidth: screenWidth
            });
            $('.main-list').append(html);
            lazyLoadImage.init();
        }

        function getNextPageContent() {
            if (isLoading) {
                return;
            }
            isLoading = true;
            var nextPage = hDom.data('nextCursor');
            var nextPageUrl = getUrl();
            var _params = {
                'current_page': nextPage,
                'render': 'json'
            };
            hDom.addClass('loading');
            service.post(nextPageUrl, _params, function(res) {
                var data = res.data;
                if (res.code == 0) {
                    hDom.removeClass('loading');
                    if (data.course_list) {
                        getCourseIntoTpl(data.course_list);
                    }
                    updataMoreDom(data.pager.has_more, parseInt(data.pager.current_page) + 1);
                    setTimeout(function() {
                        isLoading = false;
                        if (!data.pager.has_more) {
                            lastScroHeight = 100000000000;
                        } else {
                            lastScroHeight = hDom.position().top;
                            initDom();
                        }
                    }, 100);
                }
            });
        }

        function initDom() {
            if (window.scrollY + window.innerHeight >= lastScroHeight) {
                getNextPageContent();
            }
        }
        $(window).on('scroll', initDom);
        initDom();
    }

    // 切Tab的Ajax
    var QTab = function() {
        var currentPage = 1;
        container.on('click', '.list-item', function() {
            var that = $(this);
            var url = that.data('url');
            that
                .addClass('on')
                .siblings().removeClass('on');
            var _params = {
                'current_page': currentPage,
                'render': 'json',
            };
            service.post(url,
                _params,
                function(res) {
                    var data = res.data;
                    var lunbo = $('.lunbo');
                    var mainList = $('.main-list');
                    var hasMoreClass = $('.has-more');
                    if (res.code == 0) {
                        var hasPics = 0;
                        console.log(data.course_list);
                        if (data.banner && data.banner.length) {
                            hasPics = 1;
                            var imgHtml = ImgRender({
                                imgList: data.banner
                            });
                            lunbo.html(imgHtml);
                            lazyLoadImage.init();
                            initSlider();
                        } else {
                            lunbo.html('');
                        }

                        if (data.course_list) {
                            var html = liRender({
                                list: data.course_list,
                                hasPics: hasPics
                            });
                            mainList.html(html);
                            lazyLoadImage.init();
                        } else {
                            mainList.html('');
                        }

                        if (data.pager.has_more) {
                            getNextPage();
                            //hasMoreClass.show();
                        } else {
                            hasMoreClass.hide();
                        }
                        /*if (data.pager.has_more) {
                            that.attr('data-has-more', 1);
                        } else {
                            that.attr('data-has-more', 0);
                        }
                        that.attr('data-page', data.pager.current_page);*/
                    }
                });
        });
    }

    // 在未登陆下的情况或者是登陆下为非会员的情况下
    var showBottomNav = function() {
        var isLogin = user.isLogin();
        var bottomNav = $('.bottom-nav');
        var showMarginBottom = $('.show-margin-bottom');
        if (!isLogin || (isLogin && !pageData.is_vip)) {
            showMarginBottom.show();
            bottomNav.show();
            container.on('click', '.bottom-close', function() {
                bottomNav.hide();
                showMarginBottom.hide();
            });
        }
    }

    //分享
    var doShare = function() {
        var shareInfo = {
            title: '武汉亲子活动集锦，让这个夏天丰富多彩！',
            content: '5大培养主题供你选择：小勇士、小绅士淑女、小领袖、小学霸、小梦想家，让你的孩子与众不同',
            img: 'https://imgs.genshuixue.com/0cms/d/file/content/2016/07/577e1361621b0.png'
        }
        setShare(shareInfo);
    }

    return function(page_data) {
        isWeixin = env.thirdapp && env.thirdapp.isWeixin;
        screenWidth = window.screen.width;
        if (!isWeixin) {
            // 在微信中上面的nav就不需要了
            $('.nav-bar').show();
        }
        lazyLoadImage.init();
        pageData = page_data;
        if (pageData.pager.has_more) {
            $('.has-more').show();
            getNextPage();
        }
        initSlider();
        showBottomNav();
        listScroll();
        QTab();
        //getNextPage();
        doShare();
        openAppWindow.init();
    }

});