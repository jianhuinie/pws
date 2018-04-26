/**
*@ file 老师详情页--直播教室相关的
*/
define(function (require, exports) {

    'use strict';
    var $ = require('zepto');
    var artTemplate = require('artTemplate');
    var render = artTemplate.compile(require('text!./liveRoomTopTab.tpl'));
    var iframeRender = artTemplate.compile(require('text!./iframeRender.tpl'));
    var container = $('#page_main');
    var service = require('common/service');
    var navBar = require('common/navBar');
    var openApp = require('common/app_wakeup');
    var appController = require('common/app');
    var browserType = require('util/env');
    var lazyLoadImage = require('common/lazyLoadImage');
    var weixinMask = require('common/component/weixinMask');
    var Loading = require('common/ui/Loading/index');
    var isWeixin = appController.isWeixin();
    var body = $('body');
    var bottomFlag;
    var liveRoomNav;
    var isQQ;
    var t;
    var loading = new Loading();

    // 初始化顶部的tab
    var initTopTab = function (options) {
        if($('.live-room-nav').length == 0) {
            var html = render({
                type: options.type
            });
            body.append(html);
            liveRoomNav = $('.live-room-nav');
            liveRoomNav.addClass('animate');
        } else {
            liveRoomNav.find('.nav-title .active').each(function () {
                var that = $(this);
                if(that.data('flag') === 'detail') {
                    that.removeClass('active');
                    that.siblings().addClass('active');
                }
                    //that.siblings().addClass('active');
                // } else if (that.data('flag') === 'detail'
                //     && options.type === 'playback_room' ) {
                //     that.removeClass('active');
                //     that.siblings().addClass('active');
                // }
            });
        }
    }

    // 滑动的时候顶部tab出来
    var scrollToTab = function () {
        //var liveRoomNav = $('.live-room-nav');
        function update () {
            liveRoomNav.removeClass('animate');
            liveRoomNav.css('display', 'flex');
            clearTimeout(t);
        }

        function disapear () {
            t = setTimeout(function() {
                liveRoomNav.hide();
            }, 8000);
        }

        //document.addEventListener('touchmove', update, false);
        document.addEventListener('touchend', disapear, false);
        $(window).scroll(update);
        /*$(window).on('touchend', function () {
            disapear();
        });*/
    }

    var getContentTpl = function (url, flag) {
        var html = iframeRender({
            url: url
        });
        if(body.find('div').hasClass('ifram-box') && (flag == bottomFlag)) {
            $('.ifram-box').show();
        } else {
            $('.ifram-box').remove();
            body.append(html);
            $('#page-iframe').css('height', window.innerHeight);
            $('.bottom').attr('data-live', flag);
            $('.live-room-nav').find('.nav-title .item').each(function () {
                var that = $(this);
                if (that.attr('data-flag') === 'live_room') {
                    that.attr('data-flag', 'playback_room');
                }
            });
        }
    }

    var changeFrameHeight = function (){
        var ifm = $('#page-iframe')[0];
        ifm.height=document.documentElement.clientHeight;
    }

    //加载iframe
    var loadIframe = function (options) {
        var url;
        //container.hide();
        loading.show();
        if(options.type ===  'live_room') {
            // 直播教室
            service.post('/lesson/checkLive', {
                'class_course_number': options.course_number,
                 'mobile': 1
            }, function (response) {
                if(response.code == 0) {
                    loading.hide();
                    liveRoomNav.find('.nav-title .item').each(function () {
                        var that = $(this);

                        /* 在某下浏览器中，例如UC，
                        * 返回页面的时候其实不刷新，其实这样就要造成回来的时候tab还定位在教室下
                        * 所以需要手动给定位到详情下
                        */
                        if (that.data('flag') === 'live_room') {
                            that.removeClass('active');
                        } else {
                            that.addClass('active');
                        }
                    });
                    url = response.data.live_url;
                    location.href = url;
                    // getContentTpl(url, options.type);
                    // window
                    // .onresize = function () {
                    //     changeFrameHeight();
                    // }
                    // .onorientationchange = function () {
                    //     changeFrameHeight();
                    // }
                    // // 直播那边loading会有一定的延时
                    // setTimeout(function () {
                    //     loading.hide();
                    // }, 1000);
                    // oniframClick();
                }
            });
        } else {
            // 回放，直接拿url
            container.hide();
            url = options.url
            getContentTpl(url, options.type);
            window
            .onresize = function () {
                changeFrameHeight();
            }
            .onorientationchange = function () {
                changeFrameHeight();
            }
            // 直播那边loading会有一定的延时
            setTimeout(function () {
                loading.hide();
            }, 1000);
            oniframClick();
        }

    }

    // 切tab
    var quitTab = function (options) {
        liveRoomNav.find('.nav-title .item').on('click', function () {
            var that = $(this);
            var flag = that.attr('data-flag');
            var iFrameBox = $('.ifram-box');
            if (options.type === 'playback_room') {
                that.siblings().removeClass('active');
                that.addClass('active');
            }
            if(flag == 'detail') {
                container.show();
                iFrameBox.hide();
                lazyLoadImage.init();
            } else if (flag == 'playback_room') {
                container.hide();
                iFrameBox.show();
            } else {
                //container.hide();
                loadIframe(options);
            }
        });
    }

    // 绑在iframe上的body
    var oniframClick = function () {
        //document.getElementById('page-iframe').onload = function () {
        $('#page-iframe')[0].onload = function () {
            $(window.frames["live"].document.body).on('click', function () {
                clearTimeout(t);
                if (liveRoomNav.css('display') === 'none') {
                    liveRoomNav.show();
                    liveRoomNav.removeClass('animate');
                    t = setTimeout(function () {
                        liveRoomNav.hide();
                    }, 8000);
                } else {
                    liveRoomNav.hide();
                }
            });
        }
    }

    // 打开app
    var wakeUpApp =  function () {

        if(isWeixin || isQQ) {
            // 直接引用遮罩控件
            weixinMask.openMask('open');
        } else {
            var schemaUrl = 'bjhlstudent://o.c?a=url&url=' + encodeURIComponent(location.href);
            openApp({
                type: 'internal',
                url: schemaUrl
            }, function (isSuccess) {
                if(!isSuccess) {
                    location.href = 'http://m.genshuixue.com/app/dw?t=s&ct=';
                }
            });
        }
    }



    return function (options) {
        isQQ = browserType.thirdapp.isQQ;

        //jquery的data有缓存所以这样写
        bottomFlag = $('.bottom')[0].getAttribute('data-live')
        initTopTab(options);
        scrollToTab();
        if ((options.type === 'playback_room')
            || (!options.from && options.type === 'live_room' )) {
            loadIframe(options);
        }
        $(liveRoomNav.find('.nav-title .item')[1]).attr('data-flag', options.type);
        quitTab(options);
        navBar.init();
        $('.open-app').on('click', function () {
            wakeUpApp();
        })
    }


});