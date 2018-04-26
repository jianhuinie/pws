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
    var slideImageControl = require("common/ui/slideImageControl/slideImageControl");
    var phoneEnv;
    var isWeixin;
    var isQQ;
    var isWeibo;
    var isApp;

    //init slider
    function initSlider() {
        var cContain = $("#myslider");
        var bullets = cContain.find(".slide_position li");
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


    //返回
    var bactTo = function(){
        $('.back-icon').on('click',function(){
            alert(history.length);
            //location.href = history.go(-1);
        });
    }

    //必读资讯点击切tab

    var BiduNewsTab = function(){
        var tabs = ['必读','政策','专业','院校'];
        $('.item-tab').on('click', function(){
            //$(this).removeClass('tab-on');
            $(this).siblings('.item-tab').removeClass('tab-on');
            $(this).addClass('tab-on');
            var itemTab = tabs[$(this).index()];
            service.post('/gaokao/news_ajax',{
                tag: itemTab
            },function(res){
                var data = res.data || {};
                var code = res.code;
                if(code == 0){
                    if(data){
                        $('.new-content').find('li').each(function(){
                            $(this).find('a').attr('href',data.news_list[$(this).index()].paper_url);
                            $(this).find('.item-avatar').attr('src',data.news_list[$(this).index()].cover.url);
                            var $h1 = $(this).find('.item-content h1');
                            var $p = $(this).find('.item-content p');
                            if(data.news_list[$(this).index()].paper_title.length < 9){
                                $h1.text(data.news_list[$(this).index()].paper_title);
                                //$(this).find('.item-content h1').text(data.news_list[$(this).index()].paper_title.substring(0,10)+'...');
                            }else{
                                $h1.text(data.news_list[$(this).index()].paper_title.substring(0,9)+'...');
                            }
                            if(data.news_list[$(this).index()].paper_snippet.length > 20){
                                $p.text(data.news_list[$(this).index()].paper_snippet.substring(0,20)+'...');
                            }else{
                                $p.text(data.news_list[$(this).index()].paper_snippet);
                            }
                            $(this).find('.item-content span p').text(data.news_list[$(this).index()].paper_views + '次阅读');
                        });
                    }
                }
                return false;
            });
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

        phoneEnv = env.os;
        isWeixin = env.thirdapp && env.thirdapp.isWeixin;
        isQQ = env.thirdapp && env.thirdapp.isQQ;
        isWeibo = env.thirdapp && env.thirdapp.isWeibo;
        isApp = app.isApp();

        lazyLoadImage.init();
        //bactTo();


        BiduNewsTab();
        if(page_data.banner_list.length > 0){
            initSlider();
        }
        if(isApp || isWeibo || isQQ || isWeixin){
            shareFriend();
            $('.rank-pic').css('margin-bottom','0px');
            $('.share-infos').css('margin-bottom','90px');
        }else{
            $('.share-infos').hide();
        }
        var shareInfo = {
            title : '考生必看：高考志愿填报一站式解决方案',
            content : '高校招生办主任、志愿填报专家开直播教你了解最新政策，掌握志愿填报的技巧和方法。全面填报工具，帮助你选择心仪的院校！',
            img : 'https://imgs.genshuixue.com/0cms/d/file/content/2016/05/574562dd307b6.png'
        };
        setShare(shareInfo);
        openAppWindow.init();
        videoCourse();
        if(isApp){
            $('.rank-pic').css('margin-bottom','5px');
            $('.share-infos').css('margin-bottom','5px');
        }
        $('.cancel-banner').on('click',function(){
            $('.bottom-nav').hide();
            $('.rank-pic').css('margin-bottom','5px');
            $('.share-infos').css('margin-bottom','5px');
        });
    }
});