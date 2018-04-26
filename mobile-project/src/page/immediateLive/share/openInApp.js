define(function (require) {
    'use strict';

    var $ = require('zepto');
    var env = require('util/env');
    var main = $('#main');
    var isQQ = env.thirdapp && env.thirdapp.isQQ;
    var observer = require('common/mvc/observer');
    var isWeixin = env.thirdapp && env.thirdapp.isWeixin;
    var openApp = require('common/app_wakeup');
    var topBanner = $('.page-banner-wrap');


    var ele = $('.open-in-app');

    //H5详情页吊起APP
    var wakeUpApp =  function (url) {
        if(isWeixin || isQQ) {
            var downloadMask = $('.download-mask').show();
            downloadMask.on('click', function () {
                downloadMask.hide();
            });
        }
        else {
            var schemaUrl = 'bjhlstudent://o.c?a=url&url=' + encodeURIComponent(url);
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

    return function (){

        ele.on('click', function () {
            wakeUpApp(location.href);
        });

    }

});