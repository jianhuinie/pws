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
    var page = 1;
    var page2 = 1;
    var pageSize = 9;
    var env = require('util/env');
    var app = require('common/app');
    var openAppWindow = require("common/openAppWindow");
    var phoneEnv;
    var isWeixin;
    var isQQ;
    var isWeibo;
    var isApp;

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
        //bactTo();
        phoneEnv = env.os;
        isWeixin = env.thirdapp && env.thirdapp.isWeixin;
        isQQ = env.thirdapp && env.thirdapp.isQQ;
        isWeibo = env.thirdapp && env.thirdapp.isWeibo;
        isApp = app.isApp();

        if(isApp || isWeibo || isQQ || isWeixin){
            shareFriend();
            $('.zhuren-2').css('margin-bottom','0px');
            $('.share-infos').css('margin-bottom','90px');
        }else{
            $('.share-infos').hide();
        }

        if(page_data.admissions.online){
            var isCommingLength = page_data.admissions.online.length;
        }

        if(page_data.admissions.video){
            var isBackLength = page_data.admissions.video.length;
        }

        $('.has_more').on('click',function(){
            var array = page_data.admissions.online;
            var sHtml = '';
            var temp = [];
            var formSize = page * pageSize;
            var toSize = (page+1) * pageSize;
            page++;
            if(toSize > array.length){
                toSize = array.length;
            }
            for (var i = formSize; i < toSize; i++) {
                var tempStatus = '免费报名';
                var className = 'zhuren-button-unpay';
                if(array[i].has_buy == true){
                        tempStatus = '已报名';
                        var className = 'zhuren-button-haspay';
                }
                sHtml = '<a href=' + array[i].detail_url + '>'
                        +'<li class="zhuren-card">'
                        +'<img data-src=' + array[i].school_logo + ' class="zhuren-avatar">'
                        +'<p class="zhuren-school">' + array[i].school_name.substring(0,6) +'</p>'
                        +'<p class="zhuren-date">' + array[i].class_date + '</p>'
                        +'<p class="zhuren-date">' + array[i].class_time + '</p>'
                        +'<p class="' + className + '">' + tempStatus + '</p>'
                        +'</li>'
                        +'</a>';
                    temp.push(sHtml);
            };

            $('.zhuren-list').append(temp.join(""));
            if(toSize == page_data.admissions.online.length){
                $('.has_more').hide();
            }
            lazyLoadImage.init();
        });
        $('.has_more-2').on('click',function(){
            var array = page_data.admissions.video;
            var sHtml2 = '';
            var temp2 = [];
            var formSize2 = page2 * pageSize;
            var toSize2 = (page2+1) * pageSize;
            page2++;
            if(toSize2 > array.length){
                toSize2 = array.length;
            }
            for (var i = formSize2; i < toSize2; i++) {
                var className = 'zhuren-button-video';

                sHtml2 = '<a class="video-course" data-href="'+ array[i].detail_url +'" data-appnojump="true" data-number="' + array[i].course_number + '">'
                        +'<li class="zhuren-card">'
                        +'<img data-src=' + array[i].school_logo + ' class="zhuren-avatar">'
                        +'<p class="zhuren-school">' + array[i].school_name.substring(0,6) +'</p>'
                        +'<p class="zhuren-date">' + '播放' + array[i].play_count + '次</p>'
                        +'<p class="' + className + '">' + '观看回放' + '</p>'
                        +'</li>'
                        +'</a>';
                    temp2.push(sHtml2);
            };
            $('.zhuren-list-2').append(temp2.join(""));
            if(toSize2 == page_data.admissions.video.length){
                $('.has_more-2').hide();
            }
            lazyLoadImage.init();
        });

        videoCourse();
        var shareInfo = {
            title : '高考志愿如何填报？招生办主任直播指导！',
            content : '各大高校招生办主任做客跟谁学直播，解读最新高招政策，以及志愿填报注意事项，助力学子迈向心仪高校！',
            img : 'https://imgs.genshuixue.com/0cms/d/file/content/2016/05/574562dd307b6.png'
        };
        setShare(shareInfo);
        openAppWindow.init();
        if(isApp){
            $('.zhuren-2').css('margin-bottom','5px');
            $('.share-infos').css('margin-bottom','5px');
        }
        $('.cancel-banner').on('click',function(){
            $('.bottom-nav').hide();
            $('.zhuren-2').css('margin-bottom','5px');
            $('.share-infos').css('margin-bottom','5px');
        });

    }
});