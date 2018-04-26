/**
 * author: huangshiming
 * 功能： 播放语音的组件
 */
define(function (require, exports) {

    var $  = require('zepto');
    var keys = {};
    var audioStatus = 0;
    var audioLoaded = 0;

    exports.initAudioLength = function (dom) {
        var length = dom.data('length');
        var lengthHtml = Math.floor(length / 60) + "'" + Math.ceil(length % 60) + '"';
        dom.text(lengthHtml);
    };

    exports.playAudio = function (object) {
        var dom = object.dom;
        var mp3Url = dom.data('url');
        var audioX;
        if (!mp3Url) {
            return;
        }

        if (!keys[mp3Url]) {
            var audioDom = $('<audio preload="none" volume="1.0" src="' + mp3Url + '"></audio>')[0];
            keys[mp3Url] = audioDom;
        }
        audioX = keys[mp3Url];
        var audioLength = dom.data('length');
        var waveImg = dom.find('img');
        var staticIcon = dom.find('.icon');

        var length = Math.floor(audioLength / 60) + "'" + Math.ceil(audioLength % 60);

        setTimeout(function () {
            // 在播放状态
            if (audioStatus) {
                audioX.pause();
                audioStatus = 0;
                waveImg.hide();
                staticIcon.show();
            } else {
                // 在下载中
                if (!audioLoaded) {
                    dom.find('span').html('下载中');
                }

                audioX.play();
                audioStatus = 1;
                waveImg.show();
                staticIcon.hide();
             }

             audioX
                .addEventListener('timeupdate', function () {
                    var overPlus;
                    overPlus = audioLength - this.currentTime;
                    if (overPlus < 0) {
                        dom.find('span').html(length);
                    } else {
                        overPlus = Math.floor(overPlus / 60) + "'" + Math.ceil(overPlus % 60) + '"';
                        dom.find('span').html(overPlus);
                    }
                });

            audioX
                .addEventListener('ended', function () {
                    audioStatus = 0;
                    waveImg.hide();
                    staticIcon.show();
                });

            audioX
                .addEventListener('loadeddata', function () {
                    audioLoaded = 1;
                    waveImg.show();
                });

            $(window).on('beforeunloaded', function () {
                audioX.pause();
                audioStatus = 0;
            });
        }, 300);
    };
});