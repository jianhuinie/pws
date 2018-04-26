/**
*huangshiming
*/

define(function(require){
    'use strict';
    var $ = require('zepto');
    var lazyLoadImage = require('common/lazyLoadImage');
    var setShare = require('common/share/initialize');
    var service = require('common/service');
    var doShare = require('common/share/doShare');  // 分享
    var container = $("#page_main");
    var env = require('util/env');
    var app = require('common/app');
    var openAppWindow = require("common/openAppWindow");

    //返回
    var bactTo = function(){
        $('.back-icon').on('click',function(){
            location.href = history.go(-1);
        });
    }

    // 分享
    var shareFriend = function() {
        container
            .on('click', '.share-button', function(){
                $('.share-mask').show();
            });

        container
            .on('click', '.share-mask', function(){
                $('.share-mask').hide();
            });
    };

    return function(page_data){
        lazyLoadImage.init();
        //bactTo();
        var phoneEnv = env.os;
        var isWeixin = env.thirdapp && env.thirdapp.isWeixin;
        var isQQ = env.thirdapp && env.thirdapp.isQQ;
        var isWeibo = env.thirdapp && env.thirdapp.isWeibo;
        var isApp = app.isApp();
        if(isApp || isWeibo || isQQ || isWeixin){
            shareFriend();
            $('.last-one').css('margin-bottom','0px');
            $('.share-infos').css('margin-bottom','90px');
        }else{
            $('.share-infos').hide();
        }

        var shareInfo = {
            title : '高考择校最全排行榜',
            content : '高考择校排行榜，专业排名、薪资排名、颜值排名……各大排行榜一览无余，高校选择更有方向！',
            img : 'https://imgs.genshuixue.com/0cms/d/file/content/2016/05/574562dd307b6.png'
        };
        setShare(shareInfo);
        openAppWindow.init();
        if(isApp){
            $('.last-one').css('margin-bottom','2px');
            $('.share-infos').css('margin-bottom','5px');
        }

        $('.cancel-banner').on('click',function(){
            $('.bottom-nav').hide();
            $('.last-one').css('margin-bottom','2px');
            $('.share-infos').css('margin-bottom','5px');
        });


    }
});