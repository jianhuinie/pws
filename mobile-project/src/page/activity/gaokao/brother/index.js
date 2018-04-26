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

    //点击查看更多时，将全部课程加载出来
    var showAllCourse = function(){
        $('.has_more').on('click', function(){
            $('.super-card').each(function(){
                $(this).removeClass('hide');
            });
            $(this).hide();
        });
        $('.has_more-2').on('click', function(){
            $('.super-card-2').each(function(){
                $(this).removeClass('hide');
            });
            $(this).hide();
        });
    }

    return function(page_data){
        lazyLoadImage.init();
        var phoneEnv = env.os;
        var isWeixin = env.thirdapp && env.thirdapp.isWeixin;
        var isQQ = env.thirdapp && env.thirdapp.isQQ;
        var isWeibo = env.thirdapp && env.thirdapp.isWeibo;
        var isApp = app.isApp();

        //bactTo();
        if(isApp || isWeibo || isQQ || isWeixin){
            shareFriend();
            $('.super-1').css('margin-bottom','0px');
            $('.share-infos').css('margin-bottom','90px');
        }else{
            $('.share-infos').hide();
        }

        showAllCourse();
        var shareInfo = {
            title : '一年一度高考季，专业选择是难题！学长学姐解读高校专业',
            content : '这个专业适合你吗？学长学姐亲身介绍高校专业，速速围观~！',
            img : 'https://imgs.genshuixue.com/0cms/d/file/content/2016/05/574562dd307b6.png'
        };
        setShare(shareInfo);
        openAppWindow.init();
        if(isApp){
            $('.super-1').css('margin-bottom','5px');
            $('.share-infos').css('margin-bottom','5px');
        }
        $('.cancel-banner').on('click',function(){
            $('.bottom-nav').hide();
            $('.super-1').css('margin-bottom','5px');
            $('.share-infos').css('margin-bottom','5px');
        });

    }
});