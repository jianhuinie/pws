define(function(require) {
    'use strict';
    var $ = require('zepto');
    var lazyLoadImage = require('common/lazyLoadImage');
    var service = require('common/service');
    var openAppWindow = require('common/openAppWindow');
    var IScroll = require('iscroll');
    var template = require('artTemplate');
    var lastTime = require('../../teacher/_part/lastTime');
    var Loading = require('common/ui/Loading/index');
    var liRender = template.compile(require("text!./list.tpl"));
    var emptyRender = template.compile(require("text!./empty.tpl"));
    var boxList = $('.list-box');
    var wrapper = $('#wrapper');
    var app = require('common/app');
    var user = require('common/user');
    var isApp;
    var pageData;
    var myScroll;
    var update = false;
    var hasMorePage = false;
    var currPage = 1; //当前页
    var nextPageUrl = '/hall-student/list';
    var ajaxFlag = true;
    var qtabIndex;
    var deviceRatio = window.devicePixelRatio;

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
        var html = '';
        if (courseInfo.length === 0 || courseInfo.items.length === 0) {
            html = emptyRender({});
            $('.add-icon').hide();
        } else {
            html = liRender({
                list: courseInfo
            });
            $('.add-icon').show();
        }

        if (type === 'refresh') {
            boxList.html(html);
        }
        else if (type === 'hasMore') {
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
            boxList.css('margin-top', 50 * deviceRatio + 'px');
            if ((this.y >> 0) > (10 * deviceRatio) && update === false) {
                update = true;
                pullToRefresh.html('释放更新');
                pullIndicator.addClass('arrow-rotate-180');
            }

            /*当手指划出屏幕的时候会有没反应，所以滑到最下时就应该自动弹回去*/
            if (update === true) {
                if (window.innerHeight - this.pointY < (1 * deviceRatio)) {
                    myScroll.scrollTo(0, -(40 * deviceRatio), 300);
                }
            }
        });

        /*手指松开的时候*/
        myScroll.on('scrollEnd', function() {
            //下拉刷新
            if (this.y > -(40 * deviceRatio)) {
                if (update === false && this.y <= 0) {
                    myScroll.scrollTo(0, -(40 * deviceRatio), 1000);
                } else {

                    pullIndicator.css('display', 'none');
                    pullToRefresh.css('display', 'none');
                    pullSpinner.css('display', 'block');
                    if (ajaxFlag === true) {
                        ajaxFlag = false;
                        service.post(nextPageUrl, {
                                // page: 1,
                                render: 'json'
                            },
                            function(res) {
                                var data = res.data;
                                update = false;
                                myScroll.scrollTo(0, -(40 * deviceRatio), 1000);
                                pullToRefresh.html('下拉刷新');
                                pullIndicator.removeClass('arrow-rotate-180');
                                pullSpinner.css('display', 'none');
                                pullIndicator.css('display', 'inline-block');
                                pullToRefresh.css('display', 'inline-block');
                                if (res.code === 0) {
                                    getContentIntoTpl(data, 'refresh');
                                    if (data.pager && data.pager.has_more) {
                                        hasMorePage = true;
                                        currPage = 2;
                                    } else {
                                        hasMorePage = false;
                                        currPage = 2;
                                    }
                                    showStatus();
                                }
                                ajaxFlag = true;
                            });
                    }
                }
            }

            // 上拉加载更多 (因为都是负值，要加上还有更多的值)
            if (hasMorePage) {

                if ((this.y < this.maxScrollY + (50 * deviceRatio)) && ajaxFlag === true) {
                    ajaxFlag = false;
                    service.post(nextPageUrl, {
                            page: currPage,
                            render: 'json'

                        },
                        function(res) {
                            var data = res.data;
                            if (res.code === 0 && hasMorePage) {
                                $('.has-more').hide();
                                getContentIntoTpl(data, 'hasMore');
                                myScroll.refresh();
                                currPage = parseInt(data.pager.current_page) + 1;
                                if (data.pager && data.pager.has_more) {
                                    hasMorePage = true;
                                } else {
                                    hasMorePage = false;
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

    var qTab = function() {
        var tabItems = $('.teacher-nav');
        tabItems.on('click', '.qtab', function() {
            if (currPage > 1) {
                myScroll.scrollTo(0, -(40 * deviceRatio), 1000);
            }
            //切换tab走Ajax
            var that = $(this);
            nextPageUrl = that.data('url');

            that
                .addClass('tab-active')
                .siblings().removeClass('tab-active')

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
                            getContentIntoTpl(data, 'refresh');
                        }
                        ajaxFlag = true;
                        loading.hide();
                        showStatus();
                        if (data.pager) {
                            hasMorePage = data.pager.has_more;
                        }
                    });
                }
            });
    };

    var getIntoNextContent = function() {
        // wrapper.on('click', '.last-nav-avatar', function() {
        //     var that = $(this);
        //     var url = that.data('href');
        //     if (isApp) {
        //         openAppWindow.open(url);
        //     } else {
        //         location.href = url;
        //     }
        // });

        wrapper.on('click', '.box-url', function() {
            var that = $(this);
            var url = that.data('href');
            if (isApp) {
                openAppWindow.open(url);
            } else {
                location.href = url;
            }
        });
    };

    var addFillInfo = function() {
        var jockUrl = location.origin + '/recommend/fill_info?source=genshuixue&page_type=index-index&type=list';
        Jockey.send('setToFillInfo', {
            url: jockUrl
        });
    };

    var showStatus =  function() {
        var activeUrl = $('.tab-active').data('url');
        var type = activeUrl.slice(activeUrl.indexOf('?') + 6);
        if (type === 'all') {
            $('.course-title').hide();
            $('.vip-icon').show();
        } else {
            $('.course-title').show();
            $('.vip-icon').hide();
        }
        if ($('.empty').length !== 0) {
            $('.add-icon').hide();
        }
    };

    return function(page_data) {
        pageData = page_data;
        isApp = app.isApp();
        if (page_data.pager) {
            hasMorePage = page_data.pager.has_more;
        }
        //wrapper.css('top', '0');
        if (isApp) {
            wrapper.css('top', '0');
        } else {
            wrapper.css('top', 40 * deviceRatio + 'px');
        }

        fullHeight();
        lazyLoadImage.init();
        listScroll();
        // addFillInfo();

        getIntoNextContent();
        var marginH = $('.nav-bar').height() + $('.teacher-nav').height() - 40 * deviceRatio + 40 + 5 * deviceRatio;
        boxList.css('margin-top', marginH + 'px');
        qTab();
        openAppWindow.init();
        showStatus();
        // if (pageData.page.has_more) {
        //     hasMorePage = 1;
        //     currPage = 2;
        // }

        // if (ajaxFlag === true) {
        //     wrapper
        //     .on('click', '.has-more', function() {

        //         ajaxFlag = false;

        //         service
        //         .post(
        //             nextPageUrl,
        //             {
        //                 page: currPage,
        //                 render: 'json'
        //             },
        //             function(res) {
        //                 var data = res.data;
        //                 if (res.code === 0 && hasMorePage === 1) {
        //                     $('.has-more').hide();
        //                     getContentIntoTpl(data, 'hasMore');
        //                     currPage = parseInt(data.page.curr_page) + 1;
        //                     myScroll.refresh();
        //                     if (data.page.has_more == 1) {
        //                         hasMorePage = 1;
        //                     } else {
        //                         hasMorePage = 0;
        //                     }
        //                 }
        //                 ajaxFlag = true;
        //             }
        //         );
        //     });
        // }
        document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
    };
});