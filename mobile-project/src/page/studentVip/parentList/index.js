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
    var user = require('common/user');
    var setShare = require('common/share/initialize');
    var template = require('artTemplate');
    var liRender = template.compile(require('text!./li.tpl'));
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


    //是否还有更多进行加载
  /*  var hasMore = function() {
        var currentPage;
        var hasMore;
        var url;
        var _params;
        container.on('click', '.has-more', function() {
            var that = $(this);
            $('.list').find('.list-item').each(function() {
                var there = $(this);
                if (there.hasClass('on')) {
                    url = there.data('url');
                    hasMore = there.data('hasMore');
                    currentPage = there.data('page');
                    if (hasMore) {
                        _params = {
                            'current_page': currentPage + 1,
                            'render': 'json'
                        };
                        service.post(url, _params, function(res) {
                            var data = res.data;
                            if (res.code == 0) {
                                if (data.course_list) {
                                    var html = liRender({
                                        list: data.course_list,
                                        screenWidth: screenWidth
                                    });
                                    $('.main-list').append(html);
                                    lazyLoadImage.init();
                                }
                                var hasMoreClass = $('.has-more');
                                if (data.pager.has_more) {
                                    hasMoreClass.show();
                                } else {
                                    hasMoreClass.hide();
                                }

                                if (data.pager.has_more) {
                                    there.attr('data-has-more', 1);
                                } else {
                                    there.attr('data-has-more', 0);
                                }
                                there.attr('data-page', data.pager.current_page);
                            }
                        });
                    }
                }
            });
        });
    }*/

    //自动加载还有更多
    var getNextPage = function() {
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
                    if(data.course_list){
                        getCourseIntoTpl(data.course_list);
                    }
                    updataMoreDom(data.pager.has_more, parseInt(data.pager.current_page) + 1);
                    setTimeout(function() {
                        isLoading = false;
                        if(!data.pager.has_more) {
                            lastScroHeight = 100000000000;
                        } else {
                            lastScroHeight = hDom.position().top;
                            initDom();
                        }
                    },100);
                }
            });
        }

        function initDom() {
            if(window.scrollY + window.innerHeight >= lastScroHeight) {
                getNextPageContent();
            }
        }
        $(window).on('scroll', initDom);
        initDom();
    }



    //切Tab的Ajax
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
                    if (res.code == 0) {
                        console.log(data.course_list);
                        if (data.course_list) {
                            var html = liRender({
                                list: data.course_list,
                                screenWidth: screenWidth
                            });
                            $('.main-list').html(html);
                            lazyLoadImage.init();
                        }
                        var hasMoreClass = $('.has-more');
                        if (data.pager.has_more) {
                            getNextPage();
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

    //在未登陆下的情况或者是登陆下为非会员的情况下
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
            title: '亲子课堂，和孩子一同成长！',
            content: '跟谁学为你精心挑选，适合0-12岁孩子爸妈',
            img: 'https://imgs.genshuixue.com/0cms/d/file/content/2016/07/577e136a2272e.png'
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

        if (pageData.pager.has_more == 1) {
            $('.has-more').show();
            getNextPage();
        }
        showBottomNav();
        listScroll();
        QTab();
        //getNextPage();
        doShare();
        openAppWindow.init();
    }

});