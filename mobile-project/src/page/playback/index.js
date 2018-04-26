define(function (require) {
    'use stirct'

    var $ = require('zepto');
    var artTemplate = require('artTemplate');
    var ui_new = require('common/ui');
    var app = require('common/app');
    var weixinMask = require('common/component/weixinMask');
    var user = require('common/user');
    var openApp = require('common/app_wakeup');
    var env = require('util/env');
    var url = require('util/url');
    var habo = require('common/component/analysis/habo/index');
    var navBar = require('common/navBar');
    var lazyLoadImage = require('common/lazyLoadImage');
    var talkTab = $('.talk');
    var listTab = $('.list');
    var listContent = $('.content');
    var talkContent = $('.talk-content');
    var header = $('.header');
    var bottom = $('.bottom');
    var videoContent = $('.videoContent');
    var body = $('body');
    var render = artTemplate.compile(require('text!page/course/component/liveTab/liveRoomTopTab.tpl'));
    
    var initVideoStatus;
    var isApp;
    var isWeixin;
    var isQQ;
    var userInfo;
    var pageDate;
    var height = window.screen.availWidth * 0.75 + 30;
    var liveRoomNav;
    var t;

    // 初始化bar
    var initBar = function () {
        var bar = render({
            type: 'playback_room'
        });
        body.append(bar);
        liveRoomNav = $('.live-room-nav');
        liveRoomNav.addClass('animate');
    };

    // 初始化视频
    var initVideo = function (number) {
        talkContent.show();
        listContent.hide();
        talkTab.find('div').addClass('active');
        listTab.find('div').removeClass('active');
        header.hide();

        window.initBjVideoReplay({
            videoAreaId: 'videoContent',
            messageAreaId: 'talk',
            env: pageDate.env,
            appVersion: '',
            classId: number,
            isBrowser: true
        });
        $('.nav').css('top', height + 'px');
        // 直播那边的聊天时间还会有个padding 所以需要多加20
        //$('.talk-content').css('padding-top', height + 60 + 'px');
        videoContent.attr('data-status', '1');
    }

    var setCheckInfo = function (roomNum) {
        $('.content').find('.item').each(function () {
            var there = $(this);
            if(there.data('roomno') == roomNum) {
                there.find('.index').addClass('active');
                there.find('.title').addClass('active');
                there.find('.time').addClass('active');
            } else {
                there.find('.index').removeClass('active');
                there.find('.title').removeClass('active');
                there.find('.time').removeClass('active');
            }
        });
    }

    // 获取点击视频回放的按钮
    var getVideoAndTalkPanel = function () {
        var roomBut = $('.playBackButton');
        roomBut.on('click', function () {
            var that = $(this);
            var roomNum = that.data('roomno');
            var hasVideoFlag = hasLoadVideoContent();
            if(!hasVideoFlag || (pageDate.pre_item.room_no == roomNum)) {
                initVideo(roomNum);
                setCheckInfo(roomNum);
            } else {
                location.href = that.data('url');
            }
        });
        var headerRoomButton = $('.playBackMainButton');
        headerRoomButton.on('click', function () {
            var that = $(this);
            var roomNum = that.data('roomno');
            setCheckInfo(roomNum);
            initVideo(roomNum);
        });

        if((pageDate.is_finish == true) || (url().params.type == 1)) {
            var roomNum = pageDate.pre_item.room_no;
            setCheckInfo(roomNum);
            initVideo(roomNum);
            var hasVideoFlag = hasLoadVideoContent();
            if(hasVideoFlag && pageDate.is_finish == true) {
                ui_new.remind('课程已结束，可以观看回放');
            }
        }
    }

    //判断视频有没有加载进来
    var hasLoadVideoContent =  function () {
        var loadStatus = false;
        if(videoContent.find('div').hasClass('bj-video-class-container') && videoContent.data('status') == 1) {
            loadStatus = true;
        }
        return loadStatus;
    }

    //点击聊天的tab要看视频有没有加载进去
    var clickTalkTab = function () {
        talkTab.on('click', function () {
            var loadStatus = hasLoadVideoContent();
            talkTab.find('div').addClass('active');
            listTab.find('div').removeClass('active');
            if(loadStatus === true) {
                listContent.hide();
                talkContent.show();
            } else {
                if(header.data('status') == 1) {
                    ui_new.remind('聊天还在加载中，请稍后再试');
                } else {
                    ui_new.remind('请选择观看回放');
                }
            }
        });
    }

    //底部操作(调起APP的操作)
    var bottomAction = function () {
        var thisUrl = location.href;

        bottom.on('click', function (e) {
            var dom = e.target;
            dom = $(dom);
            if(!dom.hasClass('close')) {
                if(isWeixin) {
                    weixinMask.openMask('open');
                } else {
                    if (!userInfo) {
                        //没登录的话跳直播课页面
                        location.href = pageDate.detail_url;
                    } else {
                        var schemaUrl = 'bjhlstudent://o.c?a=url&url=' + encodeURIComponent(thisUrl);
                        openApp({
                            type: 'internal',
                            url: schemaUrl
                        }, function (isSuccess) {
                            if(!isSuccess) {
                                location.href = 'https://m.genshuixue.com/app/dw?t=s&ct=';
                            }
                        });
                    }
                }
            }
        });
        bottom.find('.close').on('click', function () {
            bottom.hide();
        });
    }

    //点击未开始的课提示toast
    var unstartRoom = function () {
        var unstartItem = $('.unstart-room');
        unstartItem.on('click', function () {
            ui_new.remind('该课程还未开始');
        });
    }

    //点击转码中的课提示用户
    var getIntoCourse = function () {
        var encodeItem = $('.encoding-room');
        encodeItem.on('click', function () {
            ui_new.remind('回放正在生成中，请观看其他课节吧');
        });
    }

    //上报函数
    var getWATData = function () {
        $('.clickWat').on('click', function () {
            var stype = $(this).data('stype');
            habo.send({
                type: 'Replay_Click',
                stype: stype
            });
        });
    };
    // 打开app
    var wakeUpApp =  function () {

        if (isWeixin || isQQ) {
            // 直接引用遮罩控件
            weixinMask.openMask('open');
        } else {
            var schemaUrl = 'bjhlstudent://o.c?a=url&url=' + encodeURIComponent(location.href);
            openApp({
                type: 'internal',
                url: schemaUrl
            }, function (isSuccess) {
                if (!isSuccess) {
                    location.href = 'http://m.genshuixue.com/app/dw?t=s&ct=';
                }
            });
        }
    };

    var scrollToTab = function () {
        //var liveRoomNav = $('.live-room-nav');
        function update () {
            liveRoomNav.removeClass('animate');
            liveRoomNav.css('display', 'flex');
            t = setTimeout(function() {
                liveRoomNav.hide();
            }, 8000);
            clearTimeout(t);
            
        }

        function disapear () {
            t = setTimeout(function() {
                liveRoomNav.hide();
            }, 8000);
        }

        document.addEventListener('touchmove', update, false);
        document.addEventListener('touchend', disapear, false);
        $(window).scroll(update);
        body
            .on('click', function () {
                update();
            });
        /*$(window).on('touchend', function () {
            disapear();
        });*/
    };

    // 点击详情
    function clickDetail () {
        liveRoomNav.find('.item')
                .unbind('click')
                .on('click', function () {
                    var that = $(this);
                    if (that.data('flag') === 'detail') {
                        that
                            .siblings('.item').removeClass('active');
                        that
                            .addClass('active');
                        location.href = pageDate.detail_url + '&source=playback';
                    }
                });
    }

    return function (page_data) {

        isApp = app.isApp();
        isQQ = env.thirdapp.isQQ;
        pageDate = page_data;
        userInfo = user.getUserInfo();
         $('.content-box').css('top', height + 40 + 'px');
         $('.header').css('height', height);
         $('.cover-mask').css('height', height);
         $('.nav').css('top', height);
         if (window.screen.availWidth < 330) {
            $('.playBackMainButton').css({
                'margin-top': 0
            });
         }
        isWeixin = env.thirdapp && env.thirdapp.isWeixin;
        lazyLoadImage.init();
        if ((userInfo && !pageDate.has_buy) || !userInfo) {
            if (isApp) {
                app.openNewWindow(pageDate.detail_url);
            } else {
                location.href = pageDate.detail_url;
            }
        }

        listTab.on('click', function () {
            listTab.find('div').addClass('active');
            talkTab.find('div').removeClass('active');
            talkContent.hide();
            listContent.show();
        });

        if (!isApp) {
            bottom.show();
        }

        unstartRoom();
        getIntoCourse();
        getVideoAndTalkPanel();
        clickTalkTab();
        bottomAction();
        getWATData();

        if (url().params.source) {
            initBar();
            navBar.init();
            $('.open-app').on('click', function () {
                wakeUpApp();
            });
            scrollToTab();
            clickDetail();
        }
    }


});