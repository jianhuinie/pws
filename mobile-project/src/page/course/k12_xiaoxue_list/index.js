/**
 *huangshiming
 **/

define(function(require) {
    'use strict';

    var $ = require("zepto");
    var slideImageControl = require("common/ui/slideImageControl/slideImageControl");
    var lazyLoadImage = require("common/lazyLoadImage");
    var service = require("common/service");
    var openAppWindow = require("common/openAppWindow");
    var user = require("common/user");
    var setShare = require("common/share/initialize");
    var template = require('artTemplate');
    var container = $('#page_main');
    var cookie = require("util/cookie");
    var liRender = template.compile(require("text!./li.tpl"));
    var emptyRender = template.compile(require("text!./empty.tpl"));
    var env = require('util/env');
    var Iscroll = require("iscroll");
    var app = require('common/app');
    var Loading = require('common/ui/Loading/index');
    var loading = new Loading();
    var pageData;
    var isWeixin;
    var screenWidth;
    var isApp;
    var mainList = $('.main-list');
    var hasMore = $('.has-more');
    var TabFlag = hasMore.data('firstPage');
    var url;

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
        new Iscroll(
            '.list-container-child', {
                probeType: 1,
                useTransition: true,
                tap: true,
                click: true,
                scrollX: true,
                scrollY: false
            }
        );
    }

    var getIntoNextPage = function(urlTo) {
        url = urlTo;
        if (!hasMore.length) {
            return;
        }

        var lastScrollHeight = hasMore.position().top;

        var updataMoreDom = function(hasNext, nextCursor) {
            if (hasNext && nextCursor) {
                hasMore.attr('data-next-cursor', nextCursor);
                hasMore.show();
            } else {
                hasMore.hide();
            }
        }

        if (hasMore.length) {
            updataMoreDom(true, 2);
        }

        var lastIndex = 0;
        var isLoading = false;
        var canScroll = true;

        var getIntoContent = function(list) {
            var html = liRender({
                list: list
            });
            mainList.append(html);
            //goIntoCourseList();
            lazyLoadImage.init();
        }

        var getNextContent = function() {
            if (isLoading) {
                return;
            }
            isLoading = true;
            var nextPage = hasMore.data('nextCursor');
            var params = {
                'curr_page': nextPage,
                'render': 'json'
            }
            hasMore.addClass('loading');
            service.post(url, params, function(res) {
                var data = res.data;
                if (res.code == 0) {
                    hasMore.removeClass('loading');
                    if (data.courses) {
                        getIntoContent(data.courses);
                    }

                    updataMoreDom(data.page.has_more, parseInt(data.page.curr_page) + 1);
                    setTimeout(function() {
                        isLoading = false;
                        if (!data.page.has_more) {
                            lastScrollHeight = 10000000000;
                        } else {
                            lastScrollHeight = hasMore.position().top;
                            initDom();
                        }
                        canScroll = true;
                    }, 100);
                }
            });
        }

        var initDom = function() {
            if (window.scrollY + window.innerHeight >= lastScrollHeight && url!=null && canScroll == true) {
                canScroll = false;
                getNextContent();
            }
        }

        $(window).on('scroll', initDom);
        initDom();
    }


    var getShowChildNav = function() {

        var childNav = $('.child-list');
        container
            .on('click', '.course-type', function() {
                var that = $(this);
                var show = that.data('show');
                if (show == 0) {
                    childNav.show();
                    listScroll();
                    that.attr('data-show', '1');
                } else {
                    childNav.hide();
                    that.attr('data-show', '0');
                    childNav.find('.list-item').removeClass('on');
                    childNav.find('.list-item:eq(0)').addClass('on');

                }
            });
    }

    var Qtab = function() {
        var currentPage = 1;
        var url = null;
        var getIntoContent = function(list) {
            var html = liRender({
                list: list
            });
            mainList.html(html);
            //goIntoCourseList();
            lazyLoadImage.init();
        }
        var getAjaxInfo = function(url, params) {
            var emptyhtml = emptyRender({});
            loading.show();
            service.post(url, params, function(res) {
                var data = res.data;
                if (res.code == 0) {
                    if (data.courses.length) {
                        getIntoContent(data.courses);
                    } else {
                        mainList.html(emptyhtml);
                    }

                    if (data.page.has_more == false) {
                        hasMore.hide();
                    } else {
                        getIntoNextPage(url);
                    }
                    loading.hide();
                }
            });
        }

        container.on('click', '.list-item', function() {
            var that = $(this);
            url = that.data('url');
            hasMore.attr('data-first-page', 0);

            var childNav = $('.child-list');
            var mainNav = $('.land-list');
            if (that.hasClass('subject-tag')) {
                var courseType = 'all';
                childNav.find('.list-item ').each(function() {
                    var there = $(this);
                    if (there.hasClass('on')) {
                        courseType = there.data('name');
                    }
                });
                url = url + '&course_type=' + courseType;
            }

            if (that.hasClass('course-tag')) {
                var subjectName = '全部';
                var catid = 'all';
                mainNav.find('.list-item ').each(function() {
                    var there = $(this);
                    if (there.hasClass('on')) {
                        subjectName = there.data('subject');
                        catid = there.data('catid');
                    }
                });
                url = url + '&subject_name=' + subjectName + '&catid=' + catid;
            }

            that
                .addClass('on')
                .siblings().removeClass('on');
            var params = {
                'curr_page': currentPage,
                'render': 'json'
            }
            getAjaxInfo(url, params);
        });
    }

    //获取用户经纬度存Cookie
    var getLocation = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPostion);
        }
    }
    var showPostion = function(position) {
        cookie.set('k12XiaoxueLat', position.coords.latitude, {
            expires: 0.5
        });
        cookie.set('k12XiaoxueLng', position.coords.longitude, {
            expires: 0.5
        });

    }

    var showPostionInApp = function (position) {
        cookie.set('k12XiaoxueLat', position.lat, {
            expires: 0.5
        });
        cookie.set('k12XiaoxueLng', position.lng, {
            expires: 0.5
        });
    }

    var getLocationInArea = function () {
        if(app.isApp()) {
            Jockey.on('setLocation', function (response) {
                showPostionInApp(response);
                Jockey.off('setLocation');
            });
            Jockey.send('getLocation');
        } else {
            getLocation();
        }
    }

    //点击课程列表页进行跳转
    var goIntoCourseList = function() {
        container.on('click', '.list-item-it', function() {
            var that = $(this);
            var courseNumber = that.data('number');
            var courseUrl = that.data('url');
            if (isApp) {
                if (that.data('type') == 'video') {
                    var param = {};
                    // 注意：视频课的number必须转化成字符串，否则app不支持
                    param['number'] = courseNumber + '';
                    param['index'] = '';
                    app.send('toVideoCourseDetail', param);
                } else {
                    app.openNewWindow(courseUrl);
                }
            } else {
                location.href = courseUrl;
            }
        });
    }

    return function(page_data) {
        pageData = page_data;
        isApp = app.isApp();
        if(pageData.catnames.length > 2) {
            listScroll();
        }
        lazyLoadImage.init();
        Qtab();
        getLocationInArea();
        goIntoCourseList();
        url = location.href;
        var childNav = $('.child-list');
        getShowChildNav();
        if (pageData.page.has_more == true) {
            $('.has-more').show();
            //getIntoNextPage('/k12/getClassifyCourses?grade=xiaoxue');
            getIntoNextPage(url);
        }

    }

});