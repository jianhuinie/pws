define(function(require) {
    'use strict';
    var $ = require('zepto');
    var lazyLoadImage = require('common/lazyLoadImage');
    var service = require('common/service');
    var openAppWindow = require('common/openAppWindow');
    var IScroll = require('iscroll');
    var template = require('artTemplate');
    var Loading = require('common/ui/Loading/index');
    var liRender = template.compile(require("text!./list.tpl"));
    var emptyRender = template.compile(require("text!./empty.tpl"));
    var boxList = $('.list-box');
    var wrapper = $('#wrapper');
    var app = require('common/app');
    var otherList = require('../_part/list');
    var lastTime = require('../_part/lastTime');

    var isApp;
    var pageData;
    var myScroll;
    var update = false;
    var hasMorePage = 0;
    var currPage = 1; //当前页
    var nextPageUrl = '/hall-teacher/list?type=all';
    var ajaxFlag = true;
    var qtabIndex = 1;

    var fullHeight = function() {
        //计算wrpper和scroller高度，高度不够就进行填充
        var wHeight = wrapper.height();
        var sHeight = boxList.height();
        var offHeight = wHeight - sHeight;
        var fullBox = $('.full-box');
        if (offHeight > 0) {
            fullBox.css('height', offHeight + 30 + 'px');
        } else {
            fullBox.css('height', '20px');
        }
    };

    var getContentIntoTpl = function(courseInfo, type) {
        var html = liRender({
            list: courseInfo
        });

        if (type === 'refresh') {
            boxList.html(html);
        } else if (type === 'hasMore') {
            boxList.append(html);
        }
    };

    var listScroll = function() {
        myScroll = new IScroll('#wrapper', { probeType: 2, interactiveScrollbars: true, startY: -40, click: true });
        var pullToRefresh = $('.pull-to-refresh .pull-text');
        var pullIndicator = $('.pull-to-refresh .pull-indicator');
        var pullSpinner = $('.pull-to-refresh .pull-spinner');
        var pullRefresh = $('.pull-to-refresh');

        /*滑动的时候*/
        myScroll.on('scroll', function() {
            pullRefresh.css('display', 'inline-block');
            boxList.css('margin-top', '0px');
            //console.log(this.y);
            //if ((this.y >> 0) > 10 && update == false) {
            if (this.y > 10 && update === false) {
                update = true;
                pullToRefresh.html('释放更新');
                pullIndicator.addClass('arrow-rotate-180');
            }

            /*当手指划出屏幕的时候会有没反应，所以滑到最下时就应该自动弹回去*/
            if (update === true) {
                if (window.innerHeight - this.pointY < 1) {
                    myScroll.scrollTo(0, -40, 300);
                }
            }
        });

        /*手指松开的时候*/
        myScroll.on('scrollEnd', function() {
            //console.log(this.maxScrollY);
            //下拉刷新
            if (this.y > -40) {
                if (update === false && this.y <= 0) {
                    myScroll.scrollTo(0, -40, 1000);
                } else {
                    //console.log(this.y);
                    pullIndicator.css('display', 'none');
                    pullToRefresh.css('display', 'none');
                    pullSpinner.css('display', 'block');
                    if (ajaxFlag === true) {
                        ajaxFlag = false;
                        service.post(nextPageUrl, {
                                page: 1,
                                render: 'json'
                            },
                            function(res) {
                                var data = res.data;
                                update = false;
                                myScroll.scrollTo(0, -40, 1000);
                                pullToRefresh.html('下拉刷新');
                                pullIndicator.removeClass('arrow-rotate-180');
                                pullSpinner.css('display', 'none');
                                pullIndicator.css('display', 'inline-block');
                                pullToRefresh.css('display', 'inline-block');
                                if (res.code === 0) {
                                    if (data.items.length > 0) {
                                        getContentIntoTpl(data, 'refresh');
                                        lastTime();
                                        if (data.pager.has_more == true) {
                                            hasMorePage = 1;
                                            currPage = 2;
                                        } else {
                                            hasMorePage = 0;
                                            currPage = 2;
                                        }
                                    } else {
                                        getEmptyContent(qtabIndex);
                                    }
                                    showStatus();
                                }
                                ajaxFlag = true;
                            });
                    }
                }
            }

            //上拉加载更多 (因为都是负值，要加上还有更多的值)
            if (hasMorePage == 1) {
                if ((this.y <= this.maxScrollY) && ajaxFlag === true) {
                    ajaxFlag = false;
                    service.post(nextPageUrl, {
                            page: currPage,
                            render: 'json'
                        },
                        function(res) {
                            var data = res.data;
                            if (res.code === 0 && hasMorePage === 1) {
                                $('.has-more').hide();
                                getContentIntoTpl(data, 'hasMore');
                                myScroll.refresh();
                                lastTime();
                                currPage = parseInt(data.pager.next_page);
                                if (data.pager.has_more) {
                                    hasMorePage = 1;
                                } else {
                                    hasMorePage = 0;
                                }
                            }
                            ajaxFlag = true;
                        });
                }
            }
            fullHeight();
            myScroll.refresh();
        });
    };

    var getIntoNextContent = function() {
        wrapper.on('click', '.box', function(e) {
            var that = $(this);
            var dom = e.target;
            dom = $(dom);
            var url = that.data('href');
            if (!dom.hasClass('avatar-box')) {
                if (isApp) {
                    openAppWindow.open(url);
                } else {
                    location.href = url;
                }
            }
        });
    };

    var getEmptyContent = function (index) {
        var text = '暂无相关结果';
        if(index == 2) {
            text = '这个科目还没有生源哦';
        } else if (index == 3) {
            text = '您还没有报名过，加油哦';
        }

        var html = emptyRender({
            text: text
        });
        boxList.html(html);
    }

    var qTab = function() {
        var tabItems = $('.teacher-nav');
        tabItems.on('click', '.qtab', function() {
                myScroll.scrollTo(0, -40, 1000);
                //切换tab走Ajax
                var that = $(this);
                nextPageUrl = that.data('url');

                that
                    .addClass('tab-active')
                    .removeClass('tab')
                    .siblings().removeClass('tab-active')
                    .siblings().addClass('tab');

                qtabIndex = that.data('index');

                if (ajaxFlag === true) {
                    var loading = new Loading();
                    loading.show();
                    ajaxFlag = false;
                    service
                        .post(nextPageUrl, {
                            page: 1,
                            render: 'json'
                        },
                        function(res) {
                            var data = res.data;
                            if (res.code === 0) {
                                $('.has-more').hide();
                                if (data.items.length > 0) {
                                    getContentIntoTpl(data, 'refresh');
                                    //myScroll.refresh();
                                    currPage = parseInt(data.pager.next_page);
                                    if (data.pager.has_more) {
                                        hasMorePage = 1;
                                    } else {
                                        hasMorePage = 0;
                                    }
                                    fullHeight();
                                    getIntoNextContent();
                                    lastTime();
                                } else {
                                    getEmptyContent(qtabIndex);
                                }
                                showStatus();
                            }
                            ajaxFlag = true;
                            loading.hide();
                        });
                    }
                });
    };

    var addToRule = function() {
        var jokeyUrl = location.origin + '/recommend/studentsHallRule';
        Jockey.send('studentsHallRule', {
            url: jokeyUrl
        });
    };

    var showStatus = function () {
        var activeUrl = $('.tab-active').data('url');
        var type = activeUrl.slice(activeUrl.indexOf('?') + 6);
        if (type === 'my_published') {
            $('.vip-icon').hide();
            $('.course-title').show();
            $('.add-icon').show();
        } else {
            $('.course-title').hide();
            $('.vip-icon').show();
            $('.add-icon').hide();
        }
    };

    return function(page_data) {
        pageData = page_data;
        isApp = app.isApp();
        wrapper.css('top', '40px');
        // if (isApp) {
        //     wrapper.css('top', '40px');
        // } else {
        //     wrapper.css('top', '85px');
        // }
        fullHeight();
        openAppWindow.init();
        lazyLoadImage.init();
        listScroll();
        getIntoNextContent();
        lastTime();
        otherList();
        qTab();
        addToRule();
        showStatus();

        boxList.css('margin-top', '50px');
        if (pageData.pager.has_more == true) {
            hasMorePage = 1;
            currPage = 2;
        }
        wrapper
            .on('click', '.has-more', function() {
                if (ajaxFlag === true) {
                    ajaxFlag = false;
                    service
                        .post(nextPageUrl, {
                                page: currPage,
                                render: 'json'
                            },
                            function(res) {
                                var data = res.data;
                                if (res.code === 0 && hasMorePage === 1) {
                                    $('.has-more').hide();
                                    getContentIntoTpl(data, 'hasMore');
                                    myScroll.refresh();
                                    currPage = parseInt(data.pager.next_page);
                                    if (data.pager.has_more) {
                                        hasMorePage = 1;
                                    } else {
                                        hasMorePage = 0;
                                    }
                                }
                                ajaxFlag = true;
                            });
                }
            });
        document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
    };
});