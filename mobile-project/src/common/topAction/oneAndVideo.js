/*
*一对一无广告位
*/

define(function (require) {
    var openApp = require('common/app_wakeup');
    var appController = require('common/app');
    var browserType = require('util/env');
    var isWeixin = appController.isWeixin();
    var topTitle = $('.topTitle');
    var isQQ;
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
            var schemaUrl = '';
            if(options.type === 'one2one'){
                schemaUrl = 'bjhlstudent://o.c?a=url&url=' + decodeURIComponent(options.url);
            } else if (options.type === 'video') {
                schemaUrl = 'bjhlstudent://o.c?a=video_course&number=' + options.video_number;
            }
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

    return function (options) {
        var ratio = $('#viewport').attr('ratio');
        deviceRatio = 1;
        if (ratio < 1) {
            deviceRatio = window.devicePixelRatio;
        }
        isQQ = browserType.thirdapp.isQQ;
        var goBack = document.referrer;
        topTitle.on('click', '.downloadApp', function () {
            wakeUpApp(options);
        });

        topTitle.show();
        $('#container').css('margin-top', 50 * deviceRatio + 'px');
        //没有上一页
        if(goBack === '') {
            topTitle.find('.gxs-icon').css('display', 'inline-block');
        } else {
            topTitle.find('.nav-button-back').show();
        }
    }

});