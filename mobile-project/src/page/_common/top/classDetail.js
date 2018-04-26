/*
*一对一无广告位
*/

define(function (require) {
    var openApp = require('common/app_wakeup');
    var browserType = require('util/env');
    var topBanner = $('.page-banner-wrap');
    var topTitle = $('.topTitle');
    var main = $('#main');
    var isWeixin;
    var isQQ;
    var goBack = document.referrer;

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
                    location.href = 'https://m.genshuixue.com/app/dw?t=s&ct=';
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
                main.css('margin-top', '50px');
            }
        }
    }

    return function (options) {
        isWeixin = browserType.thirdapp.isWeixin;
        isQQ = browserType.thirdapp.isQQ;

        topTitle.on('click', '.downloadApp', function () {
            wakeUpApp(options);
        });

        window.gsx_ready(function (config) {
            var ads = config && config.page_data && config.page_data.ads && config.page_data.ads.top;

            if(ads && ads.length > 0) {

                $(document.body).on('click', '.page_ads_close', function () {

                    topBanner.hide();
                    topTitle.show();
                    //没有上一页
                    if(goBack === '') {
                        topTitle.find('.gxs-icon').css('display', 'inline-block');
                    } else {
                        topTitle.find('.nav-button-back').css('display', 'inline-block');
                    }
                    main.css('margin-top', '50px');
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
                main.css('margin-top', '50px');
            }
        });
    }

});
