/*
 *   huangsiming
 *   问答大厅
 */
define(function (require) {
    'use strict';

    var $ = require("zepto");

    var container = $('#page_main');

    var util_function = require('util/function');
    var math = require('util/math');
    var lazyLoadImage = require('common/lazyLoadImage');
    var service = require('common/service');
    var app = require('common/app');
    var user = require('common/user');
    var env = require('util/env');
    var setShare = require('common/share/initialize');
    var imagePlayer = require('common/ui/ImagePlayer/showImagePlayer');
    var ui = require('common/ui');
    var openAppWindow = require("common/openAppWindow");
    var playAudio = require('../_part/playAudio');

    var isApp;
    var isTeacherApp;
    var isStudentApp;
    var pageData;
    var isWeixin;
    var LoginInfos;
    var isAnswerSelf = 0;

    //点击问题中的图片放大
    var photoArray = function() {
        container.on('click', '.ask-img-item', function() {
            var ImgArray = [];
            $(this).parent().find('img').each(function(item, index) {
                ImgArray.push($(this).data('src'));
            });
            imagePlayer(ImgArray, $(this).data('index'));
        });
    }

    //点击单张图片
    var showSinglePic = function() {
        container.on('click', '.answer-show-img', function() {
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

    //向老师提问
    var getAskForSb = function() {
        container.on('click', '.ask-for-teacher', function() {
            //if(pageData.loginuser && pageData.loginuser.user_number) {
            if (!user.isLogin() && isWeixin) {
                location.href = '/static/login?next='
                            + encodeURIComponent(window.location.href);
            } else {
                if (user.isLogin()) {
                    if (isApp) {
                        Jockey.send('toAnswerPage', {});
                    } else {
                        location.href = '/Wenda/askQuestion';
                    }
                } else {
                    user.loginStudent(function() {
                        if (isApp) {
                            Jockey.send('toAnswerPage', {});
                        } else {
                            location.href = '/Wenda/askQuestion';
                        }
                    });
                }
            }
        });
    }

    //点击整块问题区域跳转到详情页
    var clickRedirect = function() {
        container
            .on('click', '.main-item', function(e) {
                var dom = e.target;
                dom = $(dom);
                if (!dom.hasClass('ask-single-img') &&
                    !dom.hasClass('answer-show-img') &&
                    !dom.hasClass('ask-img-item-single') &&
                    !dom.hasClass('audio')) {
                    var url = '/wenda/questionDetail?number=' + $(this).data('number');
                    if (isApp) {
                        openAppWindow.open(url);
                    } else {
                        location.href = url;
                    }
                }
            });
    }

    var shareShow = function() {
        var shareInfo = {
            title: '跟谁学问答-全品类名师为你即时解答问题',
            content: '专业认证老师，为你答疑解惑，尽在跟谁学问答',
            img: 'https://imgs.genshuixue.com/0cms/d/file/content/2016/07/577e1f9ab3486.png'
        };
        setShare(shareInfo);
    }
    return function(page_data) {
        pageData = page_data;

        isApp = app.isApp();
        isStudentApp = app.isStudentApp();
        isTeacherApp = app.isTeacherApp();
        lazyLoadImage.init();
        isWeixin = env.thirdapp && env.thirdapp.isWeixin;

        openAppWindow.init();

        playAudio();
        clickRedirect();
        photoArray();
        showSinglePic();
        lazyLoadImage.init();
        getAskForSb();
        shareShow();
    }
});