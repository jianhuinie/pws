/*
*一对一无广告位
*/

define(function (require) {
    var openApp = require('common/app_wakeup');
    var appController = require('common/app');
    var browserType = require('util/env');
    var topBanner = $('.page_ad_banner');
    var topTitle = $('.topTitle');
    var main = $('#main');
    var isWeixin = appController.isWeixin();
    var isQQ;
    var goBack = document.referrer;
    var deviceRatio;

    //视频课吊起APP功能
    var wakeUpApp =  function (options) {

        if(isWeixin || isQQ) {
            var downMask = $('.download-app-mask');
            downMask.show();
            downMask.on('click', function () {
                downMask.hide();
            });
        } else {
            var schemaUrl = 'bjhlstudent://o.c?a=url&url=' + decodeURIComponent(options.url.split('?')[0]);
            openApp({
                type: 'internal',
                url: decodeURIComponent(schemaUrl)
            }, function (isSuccess) {
                if(!isSuccess) {
                    location.href = 'http://m.genshuixue.com/app/dw?t=s&ct=';
                }
            });
        }
    }

    var setScrollUI = function () {
        var cTop = $(window).scrollTop();
        var bannerHeight = topBanner.height();
        if(cTop > bannerHeight) {

            topBanner.hide();
            topTitle.show();
            if(goBack === '') {
                topTitle.find('.gxs-icon').css('display', 'inline-block');
            } else {
                topTitle.find('.nav-button-back').css('display', 'inline-block');
            }
        } else {
            if($("div[name='control_top']").height() > 0) {
                topBanner.show();
                topTitle.hide();
                main.css('margin-top', '0');
            } else {
                topTitle.show();
                main.css('margin-top', 50 * deviceRatio + 'px');
            }
        }
    }

    return function (options) {
        var ratio = $('#viewport').attr('ratio');
        deviceRatio = 1;
        if (ratio < 1) {
            deviceRatio = window.devicePixelRatio;
        }
        //deviceRatio = options.scale ? options.scale : window.devicePixelRatio;
        isQQ = browserType.thirdapp.isQQ;

        topTitle.on('click', '.downloadApp', function () {
            wakeUpApp(options);
        });

        window.gsx_ready(function (config) {
            var page_data = config.page_data;
            var ads = page_data.ads && page_data.ads.top;
            if(ads && ads.length) {

                $(document.body).on('click', '.page_ads_close', function () {

                    topBanner.hide();
                    topTitle.show();
                    //没有上一页
                    if(goBack === '') {
                        topTitle.find('.gxs-icon').css('display', 'inline-block');
                    } else {
                        topTitle.find('.nav-button-back').css('display', 'inline-block');
                    }
                    main.css('margin-top', 50 * deviceRatio + 'px');
                });

                document.addEventListener('touchmove', setScrollUI, false);
                $(window).scroll(setScrollUI);
            } else {

                topBanner.hide();
                topTitle.show();
                if(goBack === '') {
                    topTitle.find('.gxs-icon').css('display', 'inline-block');
                } else {
                    topTitle.find('.nav-button-back').css('display', 'inline-block');
                }
                main.css('margin-top', 50 * deviceRatio + 'px');
            }
        });
    }

});