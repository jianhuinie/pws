define(function (require) {
    'use strict';
    var $ = require('zepto');
    var template = require('artTemplate');
    var IScroll = require('iscroll');
    var lazyLoadImage = require('common/lazyLoadImage');
    var initStars = require('common/comment/initStars');
    var service = require('common/service');
    var Loading = require('common/ui/Loading/index');
    var formatTime = require('common/time/formatTime');
    var teacherTime = require('page/studentRoom/_part/initTeacherTime');
    var liRender = template.compile(require("text!./_part/teacherItemAjax.tpl"));
    var openAppWindow = require('common/openAppWindow');
    var ui = require('common/ui');
    var container = $('#page_main');
    var boxList = $('.list-box');
    var url = require('util/url');
    var number;
    var loading;
    var pageData;
    var orderStatus = ['待响应', '暂不报名', '已报名', '已成单', '取消报名', '已结束报名'];
    var deviceRatio = window.devicePixelRatio;

    function initTimeTable () {
        var arr = pageData.teacher_self.timetable;
        container.find('.time-item').each(function () {
            var that = $(this);
            if (!that.hasClass('time-item-name')) {
                if (+arr[that.data('index')] === 1) {
                    // 学生有时间
                    that.find('.icon')
                        .removeClass('icon-ic_noselect')
                        .removeClass('icon-focus')
                        .addClass('icon-ic_unselect');
                } else if (+arr[that.data('index')] === 2) {
                    // 都有时间 
                    that.find('.icon')
                        .removeClass('icon-ic_noselect')
                        .removeClass('icon-ic_unselect')
                        .addClass('icon-focus');
                }
            }
        });
    }

    function initStar () {
        container.find('.stars').each(function () {
            var that = $(this);
            initStars.initStars(that);
        });
    }

    function refreshPage (callback) {
        loading.show();
        service.get(
            '/source-hall/studentOrderDetail', 
            {number: number}, 
            function (response) {
                if (+response.code === 0) {
                    if (callback) {
                        callback();
                    }
                    var data = response.data;
                    var status = orderStatus[data.teacher_self.display_status];
                    container.find('.list-box .header .status').text(status);
                    var allTeacherNum = 0;
                    var string = '';
                    var recommend = data.sign_teacher.recommend_teacher;
                    if (recommend) {
                        allTeacherNum = 1;
                        var itemString = liRender({
                            item: recommend,
                            type: 'recommend'
                        });
                        string += itemString;
                    }
                    
                    var noRecommend = data.sign_teacher.no_recommend_teacher;
                    if (noRecommend) {
                        var noRLength = noRecommend.length;
                        allTeacherNum += noRLength;
                        for (var it = 0; it < noRLength; it ++) {
                            var itString = liRender({
                                item: noRecommend[it],
                                type: 'noRecommend'
                            });
                            string += itString;
                        }
                    }

                    var allString = allTeacherNum ? 
                                    '<div class="title">已有' 
                                    + allTeacherNum 
                                    + '位老师报名</div>' + string 
                                    : string;
                    container.find('.sign-teacher').html(allString);
                    initStar();

                }
                loading.hide();
        }); 
    }

    var createIScroll = function (options) {
        var myScroll = new IScroll('#wrapper', { probeType: 2, interactiveScrollbars: true, startY: 0, click: true });
        var update = false;
        var pullToRefresh = $('.pull-to-refresh .pull-text');
        var pullIndicator = $('.pull-to-refresh .pull-indicator');
        var pullSpinner = $('.pull-to-refresh .pull-spinner');
        var pullRefresh = $('.pull-to-refresh');

        /*滑动的时候*/
        myScroll.on('scroll', function() {
            pullRefresh.css('display', 'inline-block');
            //boxList.css('margin-top', '0px');
            if (this.y > (10 * deviceRatio) && update === false) {
                update = true;
                pullToRefresh.html('释放更新');
                pullIndicator.addClass('arrow-rotate-180');
            }

            /*当手指划出屏幕的时候会有没反应，所以滑到最下时就应该自动弹回去*/
            if (update === true) {
                if(window.innerHeight - this.pointY < (1 * deviceRatio)) {
                    myScroll.scrollTo(0, -(40 * deviceRatio), 300);
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
                    refreshPage(function () {   
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
            myScroll.refresh();
        });
    };

    // 报名与非报名
    function pay () {
        //var number = url().params.number;
        container
            .unbind('click', '.pay-button .pay')
            .on('click', '.pay-button .pay', function () {
                var that = $(this);
                if (that.hasClass('do-pay')) {
                    openAppWindow.open('/source-hall/signDetail?number=' + number);
                } else if (that.hasClass('cancel-pay')) {
                    var warnTips = ui.confirm({
                        content:'确定要取消报名吗',
                        title:'温馨提示',
                        button_ok:'确定',
                        button_cancel:'取消',
                        forceShow:true
                    });

                    warnTips.done(function () {
                        loading.show();
                        service.post('/source-hall/cancelSign', {
                            number: number
                        }, function (responese) {
                            if (+responese.code === 0) {
                                if (responese.data.is_success) {
                                    that
                                        .removeClass('cancel-pay')
                                        .addClass('do-pay')
                                        .text('我要报名');
                                    container.find('.status').text('取消报名');
                                    loading.hide();
                                }
                            }
                        });
                    });
                } else if (that.hasClass('tempary-no-pay')) {
                    loading.show();
                    service.post('/source-hall/temporarilyNoSign', {
                        number: number
                    }, function (responese) {
                        if (+responese.code === 0) {
                            if (responese.data.is_success) {
                                that.hide();
                                loading.hide();
                            }
                        }
                    });
                }
            });
    }

    return function (page_data) {
        number = url().params.number;
        lazyLoadImage.init();
        pageData = page_data;
        loading = new Loading();
        teacherTime.initTeacherTime(pageData.order.class_time_array);
        var lineTime = $('.time');
        lineTime.text(formatTime(lineTime.data('time')));
        initTimeTable();
        initStar();
        createIScroll();
        pay();
        document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
    };
});