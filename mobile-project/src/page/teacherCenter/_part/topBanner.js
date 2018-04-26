define(function (require) {
    'use strict';

    var $ = require('zepto');
    var openApp = require('common/app_wakeup');
    var observer = require('common/mvc/observer');
    var topBanner = $('.page-banner-wrap');
    var topTitle = $('.topTitle');
    var header = $('#page_nav_bar');
    var main = $('#main');
    var otherInfo;
    var goBack = document.referrer;
    var env = require('util/env');
    var isWeixin = env.thirdapp && env.thirdapp.isWeixin;
    var isQQ = env.thirdapp && env.thirdapp.isQQ;
    var deviceRatio;
    //var divs = $("div[name='control_top']");

    //H5详情页吊起APP
    var wakeUpApp =  function (url) {
        if(isWeixin || isQQ) {
            var downloadMask = $('.download-mask').show();
            downloadMask.on('click', function () {
                downloadMask.hide();
            });

        } else {
            var schemaUrl = 'bjhlstudent://o.c?a=url&url=' + decodeURIComponent(url);
            openApp({
                type: 'internal',
                url: decodeURIComponent(schemaUrl)
            }, function (isSuccess) {
                if(!isSuccess) {
                    location.href = 'https://m.genshuixue.com/app/dw?t=s&ct=';
                }
            });
        }
    }
    var setScrollUI = function () {
        var cTop = $(window).scrollTop();
        var bannerHeight = topBanner.height();
        var otherHeight = otherInfo.offset().top - $(window).scrollTop();
        if (cTop >= $('.page-banner-wrap').height()) {
            topBanner.hide();
            //topTitle.show();
            topTitle.css({
                opacity: 1
            });
            if(goBack === '') {
                topTitle.find('.gsx-icon').css('display', 'inline');
            } else {
                topTitle.find('.nav-button-back').css('display', 'inline-block');
            }
            if (otherHeight <= 50 * deviceRatio) {
                //topTitle.hide();
                topTitle.css({
                    opacity: 0
                });
            } else {
                //topTitle.show();
                topTitle.css({
                    opacity: 1
                });
            }
            if ($('.page-banner-wrap').height() == null) {
                main.css('margin-top', 50 * deviceRatio + 'px');
            }
        } else {
            topBanner.show();
            //topTitle.hide();
            topTitle.css({
                opacity: 0
            });
        }
    };

    return function () {
        var ratio = $('#viewport').attr('ratio');
        deviceRatio = 1;
        if (ratio < 1) {
            deviceRatio = window.devicePixelRatio;
        }
        otherInfo = $('.change-tab');
        if (+otherInfo.length === 0) {
            otherInfo = $('.nav');
        }
        topTitle.on('click', '.downloadApp', function () {
            wakeUpApp(location.href);
        });

        window.gsx_ready(function (config) {
            var ads = config.page_data.ads.top;
            if(ads.length > 0) {

                $(document.body).on('click', '.page-banner-close', function () {

                    topBanner.hide();
                    //topTitle.show();
                    topTitle.css({
                        opacity: 1
                    });

                    if(goBack === '') {
                        topTitle.find('.gsx-icon').css('display', 'inline');
                    } else {
                        topTitle.find('.nav-button-back').css('display', 'inline-block');
                    }
                    main.css('margin-top', 50 * deviceRatio + 'px');

                });


                document.addEventListener('touchmove', setScrollUI, false);
                $(window).scroll(setScrollUI);
            } else {

                //topTitle.show();
                topTitle.css({
                    opacity: 1
                });
                //没有上一页
                if(goBack === '') {
                    topTitle.find('.gsx-icon').css('display', 'inline');
                } else {
                    topTitle.find('.nav-button-back').css('display', 'inline-block');
                }
            }

        });
    }

});