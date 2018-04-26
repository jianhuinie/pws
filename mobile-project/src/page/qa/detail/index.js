/**
 *huangshiming  问答详情页改版
 **/

define(function(require) {

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
    var url = require('util/url');
    var goodFlag = true;

    var isApp;
    var isTeacherApp;
    var isStudentApp;
    var pageData;
    var isWeixin;
    var LoginInfos;
    var isAnswerSelf = 0; //0登录用户非提问者 1登录用户是提问者

    var showAnswerScore = function() {
        if ((isTeacherApp || isAnswerSelf) && pageData.question.integral > 0) {
            $('.answer-score').css('display', 'inline-block');
        }
    }

    var photoArray = function() {
        var photos = container.find('.ask-single-img');
        var result = [];

        photos.each(function(index, item) {
            result.push(photos.eq(index).data('src'));
        });

        return result;
    };


    var showPics = function() {
        container.on('click', '.ask-img-item', function() {
            var photos = photoArray();
            console.log($(this).data('index'));
            imagePlayer(photos, $(this).data('index'));
        });
    }

    var showSinglePic = function() {
        container.on('click', '.answer-show-img', function() {
            var photo = $(this).data('src');
            var result = [];
            result.push(photo);
            imagePlayer(result, 0);

        });
    }

    //采纳异步
    var getAnswer = function(answerId) {
        if (answerId) {
            service.post('/wenda/answerAcceptAjax', {
                'answer_id': answerId
            }, function(res) {
                if (res.code == 0) {
                    var data = res.data;
                    if (isApp) {
                        Jockey.send('showIntegral', {
                            integral: data.integral,
                            title: data.info
                        });
                    }
                    setTimeout(function() {
                        location.reload();
                    }, 100);
                }
            });
        }
    }

    //点击采纳
    var getAnswerAction = function() {
        container.on('click', '.answer-tobe-get', function() {
            var answerId = $(this).data('answerId');

            if (!user.isLogin() && isWeixin) {
                location.href = '/static/login?next=' + encodeURIComponent(window.location.href);
            } else {
                if (!pageData.loginuser.user_number) {
                    user.loginStudent(function() {
                        getAnswer(answerId);
                    });
                } else {
                    getAnswer(answerId);
                }
            }
        });
    }

    //点赞的ajax
    var getGood = function(answerId, isSupport, that) {
        var goodPics = {
            good: 'https://imgs.genshuixue.com/0cms/d/file/content/2016/06/576de8abe13b8.png',
            noGood: 'https://imgs.genshuixue.com/0cms/d/file/content/2016/06/576de8ab72dc1.png',
        }
        if (answerId && goodFlag === true) {
            var supportKey = 1;
            if (isSupport) {
                supportKey = 0;
            }
            goodFlag = false;
            service.post('/wenda/SupportAjax', {
                'id': answerId,
                'type': 2,
                'action': supportKey
            }, function(res) {
                if (res.code == 0) {

                    if (isSupport) {
                        that.find('img').attr('src', goodPics.noGood);
                        that.attr('data-support', 0);
                        that.attr('data-good-number', that.data('goodNumber') - 1);
                        if (that.data('goodNumber') == 0) {
                            that.find('.answer-support-number').html('赞');
                        } else {
                            that.find('.answer-support-number').html(that.data('goodNumber'));
                        }
                        that.find('.answer-support-number').css('color', '#9d9e9e');
                    } else {
                        that.find('img').attr('src', goodPics.good);
                        that.attr('data-support', 1);
                        that.attr('data-good-number', that.data('goodNumber') + 1);
                        that.find('.answer-support-number').html(that.data('goodNumber'));
                        that.find('.answer-support-number').css('color', '#ff9100');
                    }
                }
                goodFlag = true;
            });
        }
    }

    //点赞
    var getGoodAction = function() {
        container.on('click', '.zan-action', function() {
            var that = $(this);
            var answerId = that.data('answerId');
            var isSupport = that.data('support');

            if (!user.isLogin() && isWeixin) {
                location.href = '/static/login?next=' + encodeURIComponent(window.location.href);
            } else {
                if (!pageData.loginuser.user_number) {
                    user.loginStudent(function() {
                        location.reload();
                        setTimeout(function() {
                            getGood(answerId, isSupport, that);
                        }, 100);
                    });
                } else {
                    getGood(answerId, isSupport, that);
                }
            }
        });
    }

    //向他提问
    var getAskForSb = function() {
        container.on('click', '.answer-tobe-ask', function() {
            var that = $(this);
            var userNumber = that.data('userNumber');
            if (!user.isLogin() && isWeixin) {
                location.href = '/static/login?next=' + encodeURIComponent(window.location.href);
            } else {
                if (pageData.loginuser.user_number) {
                    if (isApp) {
                        Jockey.send('toAnswerPage', {});
                    } else {
                        if (userNumber) {
                            location.href = '/Wenda/askQuestion' + '?teacher_number=' + userNumber;
                        } else {
                            location.href = '/Wenda/askQuestion';
                        }
                    }
                } else {
                    user.loginStudent(function() {
                        if (isApp) {
                            Jockey.send('toAnswerPage', {});
                        } else {
                            if (userNumber) {
                                location.href = '/Wenda/askQuestion' + '?teacher_number=' + userNumber;
                            } else {
                                location.href = '/Wenda/askQuestion';
                            }
                        }
                    });
                }
            }
        });
    }

    //判断是否跳二级页面
    var getNextPage = function() {
        container.on('click', '.answer-link', function(e) {
            var that = $(this);

            if (that.data('canEnter') == 1) {
                var dom = e.target;
                dom = $(dom);
                //设置不可跳转的热点
                if (!dom.hasClass('answer-show-img') &&
                    !dom.hasClass('audio') &&
                    !dom.hasClass('answer-class') &&
                    !dom.hasClass('answer-good-icon') &&
                    !dom.hasClass('answer-support-number') &&
                    !dom.hasClass('answer-unget') &&
                    !dom.hasClass('answer-bottom') &&
                    !dom.hasClass('zan-action') &&
                    !dom.hasClass('answer-avart')) {
                    var nextUrl = '/wenda/questionAnswer?number=' + that.data('answerId') + '&user_number=' + that.data('answerNumber') + '&user_role=' + that.data('userRole');
                    var studentAppUrl = location.origin + '/wenda/questionAnswer?number=' + that.data('answerId') + '&teacher_id=' + that.data('appNumber');

                    var teacherAppUrl = location.origin + '/wenda/questionAnswer?number=' + that.data('answerId') + '&teacher_id=' + that.data('answerNumber');

                    if (isStudentApp) {
                        Jockey.send(
                            'toAnswerDetailWindow', {
                                url: studentAppUrl,
                                teacher_id: that.data('appNumber'),
                                question_id: that.data('answerId')
                            }
                        );
                    } else if (isTeacherApp) {
                        Jockey.send(
                            'toAnswerDetailWindow', {
                                url: teacherAppUrl,
                                teacher_id: that.data('answerNumber'),
                                question_id: that.data('answerId')
                            }
                        );
                    } else {
                        location.href = nextUrl;
                    }
                }
            }
        });

        container.on('click', '.answer-link-all', function() {
            var that = $(this);
            if (!user.isLogin() && isWeixin) {
                location.href = '/static/login?next=' + encodeURIComponent(window.location.href);
            } else {
                if (pageData.loginuser.user_number) {
                    var nextUrl = '/wenda/questionAnswer?number=' + that.data('answerId') + '&user_number=' + that.data('answerNumber') + '&user_role=' + that.data('userRole');

                    var studentAppUrl = location.origin + '/wenda/questionAnswer?number=' + that.data('answerId') + '&teacher_id=' + that.data('appNumber');

                    var teacherAppUrl = location.origin + '/wenda/questionAnswer?number=' + that.data('answerId') + '&teacher_id=' + that.data('answerNumber');

                    if (isStudentApp) {
                        Jockey.send(
                            'toAnswerDetailWindow', {
                                url: studentAppUrl,
                                teacher_id: that.data('appNumber'),
                                question_id: that.data('answerId')
                            }
                        );
                    } else if (isTeacherApp) {
                        Jockey.send(
                            'toAnswerDetailWindow', {
                                url: teacherAppUrl,
                                teacher_id: that.data('answerNumber'),
                                question_id: that.data('answerId')
                            }
                        );
                    } else {
                        location.href = nextUrl;
                    }
                } else {
                    user.loginStudent(function() {
                        location.href = location.href + '&sourceType=qa';
                    });
                }
            }
        });
    }

    var shareInfo = function() {
        var titleInfo = pageData.question.content ? pageData.question.content : '【小伙伴们快来看看这道' + pageData.question.subject_name + '题】'
        var imgBackUp = 'https://imgs.genshuixue.com/0cms/d/file/content/2016/07/577e1f9ab3486.png';
        var shareImg = imgBackUp;
        if (pageData.question.pics_url.length > 0) {
            shareImg = pageData.question.pics_url[0];
        }
        var shareInfo = {
            title: titleInfo,
            content: '跟谁学问答，在线实时解答',
            img: shareImg
        };
        setShare(shareInfo);
    }

    function formatPhotos () {
        $('.ask-img-item').each(function () {
            var that = $(this);
            var widths = that.width();
            that.css({
                height: widths
            });
        });
    }

    return function(page_data) {
        pageData = page_data;

        var userInfo;
        gsx_ready(function(config) {
            userInfo = config;
            var myAnswer = $('.answer-link-all');
            if (userInfo && (url().params.sourceType == 'qa')) {
                var nextUrl = '/wenda/questionAnswer?number=' + myAnswer.data('answerId') + '&user_number=' + myAnswer.data('answerNumber') + '&user_role=' + myAnswer.data('userRole');

                var studentAppUrl = location.origin + '/wenda/questionAnswer?number=' + myAnswer.data('answerId') + '&teacher_id=' + myAnswer.data('appNumber');

                var teacherAppUrl = location.origin + '/wenda/questionAnswer?number=' + myAnswer.data('answerId') + '&teacher_id=' + myAnswer.data('answerNumber');

                if (isStudentApp) {
                    Jockey.send(
                        'toAnswerDetailWindow', {
                            url: studentAppUrl,
                            teacher_id: myAnswer.data('appNumber'),
                            question_id: myAnswer.data('answerId')
                        }
                    );
                } else if (isTeacherApp) {
                    Jockey.send(
                        'toAnswerDetailWindow', {
                            url: teacherAppUrl,
                            teacher_id: myAnswer.data('answerNumber'),
                            question_id: myAnswer.data('answerId')
                        }
                    );
                } else {
                    location.href = nextUrl;
                }
            }
        });
        isApp = app.isApp();
        isStudentApp = app.isStudentApp();
        isTeacherApp = app.isTeacherApp();
        // 格式化图片
        formatPhotos();
        lazyLoadImage.init();
        isWeixin = env.thirdapp && env.thirdapp.isWeixin;

        var LoginInfos = pageData.loginuser;
        var AnswerUser = pageData.question.user;
        if (LoginInfos.user_number) {
            if (LoginInfos.user_number == AnswerUser.number) {
                isAnswerSelf = 1;
            }
        }
        openAppWindow.init();

        //在老师端和学生本人登录时展示学分
        showAnswerScore();

        //点击单张图片放大
        showSinglePic();

        //点击问题中图片放大支持滑动
        showPics();

        //播放音频
        playAudio();

        //采纳
        getAnswerAction();

        //点赞
        getGoodAction();

        //进入二级页面
        getNextPage();

        //向ta提问
        getAskForSb();

        //分享
        shareInfo();
    }
});