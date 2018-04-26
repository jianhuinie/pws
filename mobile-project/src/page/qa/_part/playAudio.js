/*
*huangshiming
*在问答中播放音频的js
*/
define (function(require) {

    'use strict';

    var $ = require("zepto");

    var container = $('#page_main');

    //初始化语音的长度
    var audioLength = function () {
        container.find('.audio-lenth').each(function () {
            var length  = $(this).data('length');
            var lengthHtml = Math.floor(length / 60) + "' " + Math.ceil(length % 60) + '"';
            $(this).text(lengthHtml);
        });
    }

    var createAudios = (function() {
        var keys = {};
        return function(url){
            if (!keys[url]) {
                var audiosDom = $('<audio preload="none" volume="1.0" src="' + url + '"></audio>')[0];
                keys[url] = audiosDom;
            }
            return keys[url];
        }
    })();

    //点击语音播放
    var audioPlay = function () {

        var audioStatus = 0;
        var audioLoaded = 0;


        container.on('click', '.audio', function (e) {

            var that = $(this);
            var mp3Url = that.data('url');
            if(!mp3Url) {
                return;
            }
            //因为Jquery对象不能使用DOM 方法，所以应该转换为js的Dom方法
            //var $audio = $('<audio preload="none" volume="1.0" src="' + mp3Url + '"></audio>');

            var audio = createAudios(mp3Url);
            var audioLenth = that.data('length');

            var waveImg;
            var len;
            var dynamicImgUrl = 'https://imgs.genshuixue.com/0cms/d/file/content/2016/10/58087319667bd.gif';
            var staticImgUrl = 'https://imgs.genshuixue.com/0cms/d/file/content/2016/06/576cd76f73b60.png';

            that.addClass('audio-player');
            waveImg = that.siblings('img');
            len = Math.floor(audioLenth / 60) + "' " + Math.ceil(audioLenth % 60);
            setTimeout(function (){
                if(audioStatus) {
                audio.pause();
                audioStatus = 0;
                waveImg.attr('src', staticImgUrl);
                return false;
            } else {
                if (!audioLoaded) {
                    that.siblings('p').html('下载中');
                    that.siblings('p').html(len);
                }
                //alert(audio);
                audio.play();
                audioStatus = 1;
                waveImg.attr('src', dynamicImgUrl);
            }

            audio
                .addEventListener("timeupdate", function () {
                    var overPlus;
                    overPlus = (audioLenth - this.currentTime);
                    if(overPlus < 0) {
                        that.siblings('p').html(len);
                    } else {
                        overPlus = Math.floor(overPlus / 60) + "' " + Math.ceil(overPlus % 60) + '"';
                        that.siblings('p').html(overPlus);
                    }
                });

            audio
                .addEventListener('ended', function () {
                    audioStatus = 0;
                    waveImg.attr('src', staticImgUrl);
                });

            audio
                .addEventListener('loadeddata', function () {
                    audioLoaded = 1;
                    waveImg.attr('src', dynamicImgUrl);
                });

            $(window).on('beforeunload', function () {
                audio.pause();
                audioStatus = 0;
            });
            }, 300);
        });
    }

    return function() {

        audioLength();
        audioPlay();
    }


})