define(function (require) {

    'use strict';

    var $ = require('zepto');

    var container = $('#page_main');

    var lazyLoadImage = require('common/lazyLoadImage');
    var imagePlayer = require('common/ui/ImagePlayer/showImagePlayer');
    var app = require('common/app');
    var openAppWindow = require('common/openAppWindow');
    var template = require('artTemplate');
    var liRender = template.compile(require('text!./li.tpl'));
    var service = require('common/service');
    var teacherNumber;

    //点击问题中的图片放大
    var photoArray = function () {
        container.on('click', '.ask-img-item', function() {
            var ImgArray = [];
            $(this).parent().find('img').each(function(item, index) {
                ImgArray.push($(this).data('src'));
            });
            imagePlayer(ImgArray, $(this).data('index'));
        });
    }

    //点击单张图片
    var showSinglePic = function () {
        container.on('click', '.answer-img', function() {
            var photo = $(this).data('src');
            var result = [];
            result.push(photo);
            imagePlayer(result, 0);

        });

        container.on('click', '.ask-img-item-single', function() {
            var photo = $(this).find('img').data('src');
            var result = [];
            result.push(photo);
            imagePlayer(result, 0);

        });
    }

    //初始化语音的长度
    var audioLength = function () {
        container.find('.answer-audio-lenth').each(function() {
            var length = $(this).data('length');
            var lengthHtml = Math.floor(length / 60) + "' " + Math.ceil(length % 60) + '"';
            $(this).text(lengthHtml);
        });
    }

    var createAudios = (function() {
        var keys = {};
        return function(url) {
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


        container.on('click', '.answer-audio', function(e) {

            var that = $(this);
            var mp3Url = that.data('url');
            if (!mp3Url) {
                return;
            }
            //因为Jquery对象不能使用DOM 方法，所以应该转换为js的Dom方法
            //var $audio = $('<audio preload="none" volume="1.0" src="' + mp3Url + '"></audio>');

            var audio = createAudios(mp3Url);
            var audioLenth = that.data('length');

            var waveImg;
            var len;
            var dynamicImgUrl = 'https://imgs.genshuixue.com/0cms/d/file/content/2016/06/576cd5cc48dc8.gif';
            var staticImgUrl = 'https://imgs.genshuixue.com/0cms/d/file/content/2016/06/576cd76f73b60.png';

            that.addClass('answer-audio-player');
            waveImg = that.siblings('img');
            len = Math.floor(audioLenth / 60) + "' " + Math.ceil(audioLenth % 60);
            setTimeout(function() {
                if (audioStatus) {
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
                    .addEventListener("timeupdate", function() {
                        var overPlus;
                        overPlus = (audioLenth - this.currentTime);
                        if (overPlus < 0) {
                            that.siblings('p').html(len);
                        } else {
                            overPlus = Math.floor(overPlus / 60) + "' " + Math.ceil(overPlus % 60) + '"';
                            that.siblings('p').html(overPlus);
                        }
                    });

                audio
                    .addEventListener('ended', function() {
                        audioStatus = 0;
                        waveImg.attr('src', staticImgUrl);
                    });

                audio
                    .addEventListener('loadeddata', function() {
                        audioLoaded = 1;
                        waveImg.attr('src', dynamicImgUrl);
                    });

                $(window).on('beforeunload', function() {
                    audio.pause();
                    audioStatus = 0;
                });
            }, 300);
        });
    }

    //点击整块问题区域跳转到详情页
    var clickRedirect = function () {
        container
            .on('click', '.main-wenda', function(e) {
                var dom = e.target;
                dom = $(dom);
                if (!dom.hasClass('ask-single-img') &&
                    !dom.hasClass('answer-img') &&
                    !dom.hasClass('ask-img-item-single') &&
                    !dom.hasClass('answer-audio')) {
                    var url = location.origin + '/wenda/teacherAnswer?teacher_number=' + teacherNumber;
                    if (app.isApp()) {
                        openAppWindow.open(url)
                    } else {
                        location.href = url;
                    }
                }
            });
    }

    //Ajax异步加载处理数据加载至模板中
    var getWendaData = function (options) {
        var nextUrl = '/wenda/teacherWendaAjax';

        var getIntoTpl = function (courseInfo) {
            var html = liRender({
                list: courseInfo,
                teacherNumber: teacherNumber,
                model: options.model
            });
            $('.main-wenda').html(html);
            photoArray();
            showSinglePic();
            audioLength();
            audioPlay();
            clickRedirect();
            openAppWindow.init();
            lazyLoadImage.init();
        }
        service.post(nextUrl, {teacher_number: teacherNumber}, function (res) {
            var data = res.data;
            if(data.is_show === 1) {
                getIntoTpl(data);
            } else {
                return;
            }
        });
    }

    return function (options) {
        teacherNumber = options.teacher_number;
        getWendaData(options);

    }

});