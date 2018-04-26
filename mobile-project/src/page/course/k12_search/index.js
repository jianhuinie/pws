/**
 * Created by lijun
 */
define(function(require) {

    'use strict';

    var $ = require('zepto');
    var slideImageControl = require('common/ui/slideImageControl/slideImageControl');
    var lazyLoadImage = require('common/lazyLoadImage');
    var openAppWindow = require('common/openAppWindow');
    var app = require('common/app');
    var share = require('common/share/initialize');
    var url = require('util/url');
    var env = require('util/env');
    var courseSwiper = require('../component/dayGood/index');
    var cookie = require('util/cookie');


    var params = url().params;
    var Iscroll = require('iscroll');

    //common
    function clickLog(ops){
        require(['common/liudanClickLog/liudanClickLog'], function (log) {
            log.send($.extend({
                type:"",
                detail_url: location.href,
                stype: 1
            },ops));
        });
    };

    //init slider
    function initSlider() {
        var cContain = $('#myslider');
        var bullets = cContain.find('.slide_position li');
        if (!bullets.length) {
            return;
        }
        var curimage = new slideImageControl(cContain[0], {
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

    //clickComment
    function clickComment(){
        $('.logClick').click(function(){
            var cType = $(this).data('ctype');
            var sName = $(this).data('cname');

            clickLog({
                stype: cType,
                type: sName
            });
        });
    };

    //添加app搜索功能
    function addSearchShow(){
        if (app.isApp()) {
            app.send('setSearchInfo');
        }
    }

    function toShare(){
        var shareUrl = params.grade == 'gaozhong'
            ? require.toUrl('./img/ic_gaozhong_share.png')
            : require.toUrl('./img/ic_chuzhong_share.png');
        //share
        share({
            title: '我在跟谁学' + page_data.grade + '频道学习呢~你也来看一下吧~',
            content: page_data.grade + '最优选的老师，最优质的课程都在这里，我在这里，你也来吧！',
            img: shareUrl,
            url: location.href + '&s=share'
        });
    }

    //有的时候元素找不到，没有查询具体原因，定时执行，3次之后取消此次操作
    function listScroll(){

        var source = 0;

        function init(){
            if ($('.list-container')[0]) {
                new IScroll(
                    '.list-container',
                    {
                        probeType: 1,
                        useTransition: true,
                        tap: true,
                        click: true,
                        scrollX: true,
                        scrollY: false,
                        eventPassthrough: true
                    }
                );
            }else {
                if (source < 3) {
                    setTimeout(function(){
                        ++source;

                        init();
                    },2000);
                }
            }
        }

        init();

    }

    //获取用户经纬度存Cookie
    var getLocation = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPostion);
        }
    }
    var showPostion = function (position) {
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
    var goIntoCourseList = function () {
        var dayGood = $('.day-good');
        var courseCard = $('.course-card');

        dayGood.on('click', '.course-item-card', function() {
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
        courseCard.on('click', '.course-item-card', function() {
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

    //小学频道更多机构
    var hasMoreOrgs = function () {
        if (app.isApp()) {
            var nearbyOrg = $('.nearby-org');
            var hasMoreOrg = nearbyOrg.find('.has-more');
            hasMoreOrg.show();
            nearbyOrg.on('click', '.has-more', function() {
                var schema = 'bjhlstudent://o.c?a=lbs_organization&q=' + encodeURIComponent('小学');
                Jockey.send('urlSchemeRoute', {
                    url: schema
                });
            });

        }
    }

    return function(page_data){

        //判断安卓版本
        var isStudentApp = app.isStudentApp();
        var isAndroid = env.os.isAndroid;
        var flag = false;
        var version = app.appVersion()

        if (version < '3.2.4') {
            flag = true;
        }
        if (isAndroid && isStudentApp && flag) {
            //弹窗
            $('.tanchuang-mask').removeClass('hide');
            setTimeout(function(){
                $('.tanchuang').removeClass('hide');
            },300);

            $('.close_button').on('click',function(){
                $('.tanchuang-mask').addClass('hide');
                $('.tanchuang').addC7lass('hide');
            });

            $('.tanchuang-mask').on('click',function(){
                $('.tanchuang-mask').addClass('hide');
                $('.tanchuang').addClass('hide');
            });
        }

        hasMoreOrgs();
        //获取地理位置
        getLocationInArea();

        goIntoCourseList();

        courseSwiper();

        listScroll();

        toShare();
        //
        addSearchShow();
        //
        clickComment();
        //app link
        openAppWindow.init();
        //lazy load image
        lazyLoadImage.init();
        //init slider
        initSlider();
    }
});