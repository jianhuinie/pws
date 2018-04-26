define (function (require) {
    'use strict';

    var $ = require('zepto');
    var IScroll = require('iscroll');
    var observer = require('common/mvc/observer');
    var SelectBox = require('page/studentRoom/orderList/_part/select');
    var waitForSignFunc = require('page/studentRoom/orderList/_part/waitForSign');
    var listItem = require('page/studentRoom/orderList/_part/listItem');
    var Loading = require('common/ui/Loading/index');
    var app = require('common/app');
    var pageData;
    var container = $('#page_main');
    var listBox = container.find('.list-box');
    var maskContent = container.find('.content-mask');
    var loading = new Loading();
    var myScroll;
    var quitType = -1; // tab映射表 [0=>已报名 1=> 已成单 2=> 全部 -1=> 待响应]
    var ajaxFlag = true;// 是否在发ajax
    var hasMorePage = false; // 是否有下一页
    var deviceRatio = window.devicePixelRatio;
    var query = {
        tab: 0,
        sort: 0,
        page: 1,
        filter: ''
    };

    var createIScroll = function () {
        myScroll = new IScroll('#wrapper', { probeType: 2, interactiveScrollbars: true, startY: 0, click: true });
        var update = false;
        var pullToRefresh = $('.pull-to-refresh .pull-text');
        var pullIndicator = $('.pull-to-refresh .pull-indicator');
        var pullSpinner = $('.pull-to-refresh .pull-spinner');
        var pullRefresh = $('.pull-to-refresh');

        /*滑动的时候*/
        myScroll.on('scroll', function() {
            pullRefresh.css('display', 'inline-block');
            //boxList.css('margin-top', '0px');
            if (this.y > 10 && update === false) {
                update = true;
                pullToRefresh.html('释放更新');
                pullIndicator.addClass('arrow-rotate-180');
            }

            /*当手指划出屏幕的时候会有没反应，所以滑到最下时就应该自动弹回去*/
            if (update === true) {
                if(window.innerHeight - this.pointY < 1) {
                    myScroll.scrollTo(0, -40, 300);
                }
            }
        });

        /*手指松开的时候*/
        myScroll.on('scrollEnd', function() {
            //下拉刷新
            if (this.y > -(70 * deviceRatio)) {
                if (update === false && this.y <= 0) {
                    myScroll.scrollTo(0, -(40 * deviceRatio), 600);
                } else {
                    pullIndicator.css('display', 'none');
                    pullToRefresh.css('display', 'none');
                    pullSpinner.css('display', 'block');
                    if (quitType === -1) {
                        waitForSignFunc.waitForSign(function () {
                            update = false;
                            myScroll.scrollTo(0, -(40 * deviceRatio), 600);
                            pullToRefresh.html('下拉刷新');
                            pullIndicator.removeClass('arrow-rotate-180');
                            pullSpinner.css('display', 'none');
                            pullIndicator.css('display', 'inline-block');
                            pullToRefresh.css('display', 'inline-block');
                        });
                    } else {
                        query.page = 1;
                        listItem(query, 'refresh', function () {
                            update = false;
                            myScroll.scrollTo(0, -(40 * deviceRatio), 600);
                            pullToRefresh.html('下拉刷新');
                            pullIndicator.removeClass('arrow-rotate-180');
                            pullSpinner.css('display', 'none');
                            pullIndicator.css('display', 'inline-block');
                            pullToRefresh.css('display', 'inline-block');
                        });
                    }
                }
            }   
            var hasMorePage = +listBox.attr('data-has-more');
            if (hasMorePage && quitType >= 0) {
                if ((this.y < this.maxScrollY + 50) && ajaxFlag === true) {
                    ajaxFlag = false;
                    query.page = listBox.attr('data-next-page');
                    var promise = listItem(query, 'append');
                    if (promise) {
                        promise.done(function () {
                            myScroll.refresh();
                        });
                    }
                    ajaxFlag = true;
                }
            }

            
            myScroll.refresh();
        });
    };

    function quitTab () {
        container
            .unbind('click', '.list-bar .item')
            .on('click', '.list-bar .item', function () {
                maskContent.addClass('hide');
                container.find('.sort-box').addClass('hide');
                container.find('.choose-box').addClass('hide');
                loading.show();
                var that = $(this);
                quitType = that.data('index');
                query.tab = +quitType;
                query.page = 1;
                if (!that.hasClass('active')) {
                    that.siblings('.item')
                        .removeClass('active')
                        .addClass('normal');
                    that
                        .addClass('active')
                        .removeClass('normal');
                }

                if (quitType === -1) {
                    // 待响应
                    container.find('.selected').addClass('hide');
                    waitForSignFunc.waitForSign(function () {
                        if (myScroll) {
                            if (myScroll.scrollerHeight > window.innerHeight + 121 * deviceRatio) {
                                myScroll.scrollTo(0, -(40 * deviceRatio), 600);
                            }
                        }
                    });
                    loading.hide();
                } else {
                    // 另外的
                    listBox.html('');
                    container.find('.blank-content').html('');
                    container.find('.selected').removeClass('hide');
                    var promise = listItem(query, 'refresh');
                    if (promise) {
                        promise.done(function () {
                            if (myScroll) {
                                if (myScroll.scrollerHeight > window.innerHeight + 121 * deviceRatio) {
                                    myScroll.scrollTo(0, -(40 * deviceRatio), 600);
                                }
                            }
                            loading.hide();
                        });
                    }
                }
        });
    }

    function getJockey () {
        Jockey.send('setRightButton', {
            url: location.origin + '/source-hall/getOrderSet',
            title: '接单设置'
        });

        // 规则暂时是假的
        Jockey.send('setTitleHelp', {
            url: 'https://m.genshuixue.com/forum/postBrowse/61250',
        });

    }


    return function (page_data) {
        pageData = page_data;
        var chooseBox = container.find('.choose-box');
        // var maskContent = container.find('.content-mask');
        var sortBox = container.find('.sort-box');

        var selectBox = new SelectBox();
        selectBox.chooseBox();
        selectBox.chooseSort();
        selectBox.chooseChoose();
        waitForSignFunc.waitForSign();
        quitTab();
        createIScroll();
        getJockey();

        container.find('.selected').css('top', 40 * deviceRatio + 'px');
        // if(app.isApp()) {
        //     container.find('.selected').css('top', '40px');
        // }
        // 点击确认
        observer.addListener(selectBox, 'choose-confirm', function () {
            var there = this;
            loading.show();
            var keyString = {
                class_time: there.time ? true : false,
                lesson_way: there.lessonWay,
                status: there.compare
            };
            chooseBox.addClass('hide');
            maskContent.addClass('hide');

            if (there.lessonWay === 0) {
                keyString.lesson_way = 14;
            } 
            // 获取query字段
            query = {
                tab: quitType,
                sort: there.sortIndex,
                page: 1,
                filter: JSON.stringify(keyString)
            };

            var promise = listItem(query, 'refresh');
            if (promise) {
                promise.done(function () {
                    if (myScroll) {
                        if (myScroll.scrollerHeight > window.innerHeight + 121 * deviceRatio) {
                            myScroll.scrollTo(0, -(40 * deviceRatio), 600);
                        }
                    }
                    loading.hide();
                });
            }
        });

        // 点击排序
        observer.addListener(selectBox, 'choose-sort', function () {
            var there = this;
            sortBox.addClass('hide');
            maskContent.addClass('hide');
            loading.show();
            var keyString = {
                class_time: there.time ? true : false,
                lesson_way: there.lessonWay,
                status: there.compare
            };
            if (there.lessonWay === 0) {
                keyString.lesson_way = 14;
            } 
            query = {
                tab: quitType,
                sort: there.sortIndex,
                page: 1,
                filter: JSON.stringify(keyString)
            };
            var promise = listItem(query, 'refresh');
            if (promise) {
                promise.done(function () {
                    if (myScroll) {
                        if (myScroll.scrollerHeight > window.innerHeight + 121 * deviceRatio) {
                            myScroll.scrollTo(0, -(40 * deviceRatio), 600);
                        }
                    }
                    loading.hide();
                });
            }
        });

        document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
    };
});