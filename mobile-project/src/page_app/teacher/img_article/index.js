/**
 * Created by wuxl on 16/7/22.
 */
define(function(require) {
    'use strict';

    var $ = require('zepto');
    var service = require('common/service');
    var ui = require('common/ui');
    var observer = require('common/mvc/observer');
    var lazyLoadImage = require('common/lazyLoadImage');


    function initVideo() {
        $('.video-player').each(function(){
            var me = $(this);
            var backImg = me.data('cover');
            var playUrl = me.data('src');
            var $posterContainer = me.find('.video-poster');
            var playIcon = me.find('.play-wrapper');
            var playFrame = me.find('.player-frame');
            var playId = me.data('id');
            var param = {
                id: playId
            };
            $posterContainer.css('background-image', 'url(' + backImg + ')');
            playIcon.click(function () {
                pause_audio();
                if (playUrl) {
                    playFrame
                        .attr('src', playUrl)
                        .show();
                    $(this).css('background','#fff').css('width','70px')
                        .html('正在加载...');
                    $posterContainer.hide();
                } else {
                    service.post('/tcenter/foundation/storage/getVideoInfo',
                        param,
                        function(response) {
                            if (response.code == 0) {
                                var data  = response.data;
                                if (data.status == 70) {
                                    playFrame
                                        .attr('src', data.pc_play_url)
                                        .show();
                                    $(this).css('background','#fff').css('width','70px')
                                        .html('正在加载...');
                                    $posterContainer
                                        .css('background-img', 'url("'+data.preface_url+'")')
                                        .hide();
                                }
                                else {
                                    ui.remind('视频转码中，请耐心等待...');
                                }
                            }

                        });
                }
            });
        });

    }

    /**
     * 切换样式
     */
    function switchStyle(){
        var data_class;
        var oLis = $('.circle-li');
        var oTitles = $('.title');
        var oMain = $('.main');
        var oImg = $('.image');
        var img_black = location.origin + '/src/page_app/teacher/img_article/img/img_black.png';
        var img_blue = location.origin + '/src/page_app/teacher/img_article/img/img_blue.png';
        var img_green = location.origin + '/src/page_app/teacher/img_article/img/img_green.png';
        var img_pink = location.origin + '/src/page_app/teacher/img_article/img/img_pink.png';
        var img_brown = location.origin + '/src/page_app/teacher/img_article/img/img_red.png';
        var img = {
            'img_black': img_black,
            'img_blue': img_blue,
            'img_green': img_green,
            'img_pink': img_pink,
            'img_brown': img_brown
        };
        $('.circle-ul').on('click', 'li', function(e) {
            data_class = $(this).data('class');
            oLis.removeClass('on');
            $(this).addClass('on');
            oTitles.each(function() {
                $(this).removeClass('title-white title-black title-brown title-pink title-green title-blue')
                    .addClass('title-' + data_class);
            });
            oImg.each(function(){
                //$(this).attr('src',img['img_' + data_class]);
                $(this).removeClass('img-white img-black img-brown img-pink img-green img-blue')
                    .addClass('img-' + data_class);
            });
            oMain.removeClass('main-white main-black main-brown main-pink main-green main-blue')
                .addClass('main-' + data_class);
            Jockey.send("toGetClassStyle", {
                style: data_class
            });

        });
    }

    /**
     * 音频播放
     * */

    var keys = {};
    var createAudios = (function() {
        return function(url){
            if (!keys[url]) {
                var audiosDom = $('<audio preload="auto" volume="1.0" src="' + url + '"></audio>')[0];
                keys[url] = audiosDom;
            }
            return keys[url];
        }
    })();

    function pause_audio() {
        for (var key in keys) {
            if (keys.hasOwnProperty(key)) {
                keys[key].pause();
            }
        }
        $.each($('.audio'), function (index, item) {
            $(item).attr('data-play', 0);
            var staticUrl = $(item).data('voice');
            var waveImg = $(item).siblings('.audio-wave');
            waveImg.attr('src',staticUrl);
        });
    }
    var audioPlay = function () {
        var container = $('.main');
        var audioStatus = 0;
        var audioLoaded = 0;

        container.on('click', '.audio', function(){
            var me = $(this);
            var url = me.data('url');
            var play_status = me.data('play');
            var dynamicUrl = me.data('wave');
            var len = me.data('length');
            var staticUrl = me.data('voice');
            var audio = createAudios(url);
            if (!url) {
                return;
            }
            var waveImg = me.siblings('.audio-wave');
            if (len >= 60) {
                var length = Math.floor(len / 60) + "'" + Math.ceil(len % 60) + '"';
            }
            else {
                var length = Math.ceil(len % 60) + '"';
            }

            if (play_status) {
                audio.pause();
                me.attr('data-play', 0);
                audioStatus = 0;
                waveImg.attr('src',staticUrl);
                return false;
            }
            else {
                if (!audioLoaded) {
                    me.siblings('span').html('下载中');
                    me.siblings('span').html(length);
                }
                pause_audio();
                audio.play();
                me.attr('data-play', 1);
                waveImg.attr('src',dynamicUrl + '?randmod=' + Math.random());
            }
            audio.addEventListener("timeupdate", function () {
                var overPlus;
                overPlus = (len - this.currentTime);
                if (overPlus <= 0) {
                    me.siblings('span').html(length);
                }
                else {
                    if (len >= 60) {
                        overPlus = Math.floor(overPlus / 60) + "'" + Math.ceil(overPlus % 60) + '"';
                    }
                    else {
                        overPlus = Math.ceil(overPlus % 60) + '"';
                    }

                    me.siblings('span').html(overPlus );
                }

            });

            audio.addEventListener('ended', function () {
                me.attr('data-play', 0);
                audioStatus = 0;
                waveImg.attr('src', staticUrl);
                me.siblings('span').html(length);
            });

            audio.addEventListener('loadeddata', function () {
                audioLoaded = 1;
                waveImg.attr('src', dynamicUrl);
            });

            $(window).on('beforeunload', function () {
                pause_audio();
                me.attr('data-play', 0);
            });
        });
    };

    /**
     * colorInit
     * */
    function initColor(color){
        var oLis = $('.circle-li');
        var type = 'li[data-class=' + color + ']';
        var oLi = $(type);
        oLis.removeClass('on');
        oLi.addClass('on');
    }

    return function(page_data) {
        var color;
        if (page_data.data.style) {
            color = page_data.data.style;
        }
        else {
            color = 'white';
        }
        Jockey.send("toPreviewClass");
        lazyLoadImage.init();
        switchStyle();
        initColor(color);
        audioPlay();
        initVideo();


    };
});