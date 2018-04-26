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
    var phoneEnv;
    var isWeixin;
    var isQQ;
    var isWeibo;
    var isApp;

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

    //点击视频课
    var videoCourse = function () {
        container
            .on('click','.video-course',function() {

                if(isApp){
                    var schema = 'bjhlstudent://o.c?a=video_course&number=' + $(this).data('number');
                    Jockey.send('urlSchemeRoute', {
                        url: schema
                    });
                } else {
                    location.href = $(this).data('href');
                }
            });
    }

    return function(page_data){
        lazyLoadImage.init();

        phoneEnv = env.os;
        isWeixin = env.thirdapp && env.thirdapp.isWeixin;
        isQQ = env.thirdapp && env.thirdapp.isQQ;
        isWeibo = env.thirdapp && env.thirdapp.isWeibo;
        isApp = app.isApp();

        if(isApp || isWeibo || isQQ || isWeixin){
            shareFriend();
            $('.back-review').css('margin-bottom','0px');
            $('.share-infos').css('margin-bottom','90px');
        }else{
            $('.share-infos').hide();
        }

        showAllCourse();
        videoCourse();
        var shareInfo = {
            title : '高考考的好，志愿更要填的好，专家帮你来支招！ ',
            content : '超级高考志愿专家做客直播，拨云见日解读高考志愿填报的那些事，互动问答现场指导，免费名额有限速速前来!',
            img : 'https://imgs.genshuixue.com/0cms/d/file/content/2016/05/574562dd307b6.png'
        };
        setShare(shareInfo);
        openAppWindow.init();
        if(isApp){
            $('.back-review').css('margin-bottom','5px');
            $('.share-infos').css('margin-bottom','5px');
        }
        $('.cancel-banner').on('click',function(){
            $('.bottom-nav').hide();
            $('.back-review').css('margin-bottom','5px');
            $('.share-infos').css('margin-bottom','5px');
        });
    }
});