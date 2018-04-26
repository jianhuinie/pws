/**
 * Created by hsm
 */
define(function(require) {

    'use strict';

    var $ = require('zepto');
    var slideImageControl = require('common/ui/slideImageControl/slideImageControl');
    var lazyLoadImage = require('common/lazyLoadImage');
    var openAppWindow = require('common/openAppWindow');
    var app = require('common/app');
    var setShare = require('common/share/initialize');
    var url = require('util/url');
    var cookie = require('util/cookie');
    var container = $('#page_main');
    var env = require('util/env');
    var pageData;
    var courseSwiper = require('../component/dailySelection/index')


    var params = url().params;
    var Iscroll = require('iscroll');

    //common
    function clickLog(ops) {
        require(['common/liudanClickLog/liudanClickLog'], function (log) {
            log.send($.extend({
                type: "",
                detail_url: location.href,
                stype: 1
            }, ops));
        });
    };

    //init slider
    function initSlider() {
        var cContain = $('.myslider');
        var bullets = [];
        var curimage = [];
        // 判断图片是否已经加载，并执行加载
        // 设置当前active的dot效果
        function lazyloadSlideImg(index) {
            var length = cContain.length;
            for (var i = 0; i < length; i++) {
                if (curimage[i]) {
                    var dom = curimage[i].slides[index];
                    if (!dom.imageLoaded) {
                        lazyLoadImage.init(dom);
                        dom.imageLoaded = true;
                    }
                }
                if (bullets[i] && bullets[i].length != 0) {
                    bullets[i].removeClass('on');
                    bullets[i].eq(index).addClass('on');
                }
            }
        }
        for (var i = 0; i < cContain.length; i++) {
            bullets[i] = $($(cContain[i]).find('.slide_position li'));
            curimage[i] = new slideImageControl(cContain[i], {
                auto: 3000,
                continuous: true,
                callback: lazyloadSlideImg
            });
            lazyloadSlideImg(curimage[i].get('index'));
        }
    }

    //clickComment
    function clickComment() {
        $('.logClick').click(function() {
            var cType = $(this).data('ctype');
            var sName = $(this).data('cname');

            clickLog({
                stype: cType,
                type: sName
            });
        });
    };

    //添加app搜索功能
    function addSearchShow() {
        if (app.isApp()) {
            app.send('setSearchInfo');
        }
    }

    //获取用户经纬度存Cookie
    var getLocation = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPostion);
        }
    }
    var showPostion = function (position) {
        cookie.set(pageData.grade + 'Lat', position.coords.latitude, {
            expires: 0.5
        });
        cookie.set(pageData.grade + 'Lng', position.coords.longitude, {
            expires: 0.5
        });

    }

    var showPostionInApp = function (position) {
        cookie.set(pageData.grade + 'Lat', position.lat, {
            expires: 0.5
        });
        cookie.set(pageData.grade + 'Lng', position.lng, {
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
    var goIntoCourseList = function () {

        container.on('click', '.course-item-card', function() {
            var that = $(this);
            var courseNumber = that.data('number');
            var url = that.data('url');

            if (app.isApp()) {
                if (that.data('type') == 3) {
                    var param = {};
                    // 注意：视频课的number必须转化成字符串，否则app不支持
                    param['number'] = courseNumber + '';
                    param['index'] = '';
                    app.send('toVideoCourseDetail', param);
                } else {
                    app.openNewWindow(url);
                }
            } else {
                location.href = url;
            }
        });
    }

    //频道更多机构
    var hasMoreOrgs = function () {
        if (app.isApp()) {
            var nearbyOrg = $('.nearby-org');
            var keyWord = nearbyOrg.data('keyWord');
            var hasMoreOrg = nearbyOrg.find('.has-more');
            hasMoreOrg.show();
            nearbyOrg.on('click', '.has-more', function() {
                var schema = 'bjhlstudent://o.c?a=lbs_organization&q=' + encodeURIComponent(keyWord);;
                Jockey.send('urlSchemeRoute', {
                    url: schema
                });
            });

        }
    }

    //判断tab点击的时候走的是搜索还是其他
    var Tabs = function () {
        container.on('click', '.tab-item', function() {
            var that = $(this);
            var isSearch = that.data('isSearch');
            var webUrl = that.data('url');
            var tabName = that.data('name');
            if (app.isApp()) {
                if (isSearch == 1 && tabName) {
                    var schema = 'bjhlstudent://o.c?a=course_search&q=' + encodeURIComponent(tabName);
                    Jockey.send('urlSchemeRoute', {
                        url: schema
                    });
                } else {
                    app.openNewWindow(webUrl);
                }
            } else {
                location.href = webUrl;
            }
        }).on('click', '.btn-search-more', function() {
            var there = $(this);
            var toNextUrl = there.data('url');
            var schema = there.data('jockey');
            var query = there.data('query');
            schema = schema + '&q=' + encodeURIComponent(query);
            if (app.isApp()) {
                Jockey.send('urlSchemeRoute', {
                    url: schema
                });
            } else {
                location.href = toNextUrl;
            }
        }).on('click', '.class-card', function() {
            var there = $(this);
            var nextUrl = there.data('url');
            var keyWord = there.data('keyWord');
            if(keyWord.length > 0) {
                if(app.isApp()) {
                    Jockey.send('urlSchemeRoute', {
                        url: 'bjhlstudent://o.c?a=course_search&q=' + encodeURIComponent(keyWord)
                    });
                } else {
                    location.href = '/' + there.data('area') + '/sc-' + keyWord + '.html';
                }
            } else {
                if(app.isApp()) {
                    app.openNewWindow(nextUrl);
                } else {
                    location.href = nextUrl;
                }
            }
        });
    }


    //有的时候元素找不到，没有查询具体原因，定时执行，3次之后取消此次操作
    function listScroll () {

        var source = 0;

        function init() {
            if ($(".list-container")[0]) {
                new IScroll(
                    '.list-container', {
                        probeType: 1,
                        useTransition: true,
                        tap: true,
                        click: true,
                        scrollX: true,
                        scrollY: false,
                        eventPassthrough: true
                    }
                );
            } else {
                if (source < 3) {
                    setTimeout(function() {
                        ++source;

                        init();
                    }, 2000);
                }
            }
        }
        init();

    }

    var addQQ = function () {
        container.on('click', '.add-qq-now', function() {
            var that = $(this);
            var Akey = that.data('andriodKey');
            var joinUrl = that.data('url');
            if (app.isApp()) {
                if (app.isStudentApp() && env.os.isAndroid) {
                    Jockey.send('joinQQGroup', {
                        key: Akey
                    });
                } else {
                    app.openNewWindow(joinUrl);
                }
            } else {
                location.href = joinUrl;
            }
        });
    }

    var toShare = function () {
        var shareInfo = {
            title: pageData.share_title,
            content: pageData.share_content,
            img: pageData.share_img
        };
        setShare(shareInfo);
    }

    //滑到底部气球图片隐藏
    var bubbleToBottom = function () {
        var bubble = $('.bubble');
        var qqBox = $('.search-more');
        var lastScrollHeight = qqBox.position().top;
        if (window.scrollY + window.innerHeight >= lastScrollHeight) {
            bubble.hide();
        } else {
            bubble.show();
        }
    }

    // 三个卡片的模块，大图比例
    function initBigImg() {
        var bigImg = $('.there-big-img');
        var bWidth = bigImg.width();
        bigImg.css({
            height: bWidth * 0.56 + 'px'
        });
    }



    return function(page_data) {

        pageData = page_data;
        initBigImg();
        openAppWindow.init();
        //lazy load image
        lazyLoadImage.init();

        hasMoreOrgs();
        //获取地理位置
        getLocationInArea();

        goIntoCourseList();

        $(window).on('scroll', bubbleToBottom);
        bubbleToBottom();

        Tabs();

        addQQ();

        courseSwiper();

        listScroll();

        toShare();
        //
        addSearchShow();
        //
        clickComment();
        //init slider
        initSlider();
    }
});