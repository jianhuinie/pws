/*huangshiming
 *问答对话
 */
define(function(require) {
    'use strict';

    var $ = require("zepto");

    var container = $('#page_main');
    var template = require('artTemplate');
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
    var iScroll = require('iscroll');
    require('common/wx/wxInput');
    var liRender = template.compile(require('text!./li.tpl'));

    var isApp;
    var isTeacherApp;
    var isStudentApp;
    var pageData;
    var isWeixin;
    var LoginInfos;

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

    /**
     * 更新评论
     */
  /*  function updateQaAnswerComment() {
        var maxcid = pageData.max_comment_id;
        var params = {
            number: pageData.number,
            //teacher_id: teacherId,
            answer_id: pageData.answer_id,
            max_comment_id: maxcid
        };

        service.post('/wenda/answerAjax', params, function(res) {
            if (res.code === 0) {
                var data = res.data;

                pageData.max_comment_id = data.max_comment_id;
                var questionCommentsElement = container.find('.question-comments');
                var emptyElement = questionCommentsElement.find('.empty');
                var html = $.trim(data.tpl.comment_list);

                if (emptyElement.length) {
                    emptyElement.remove();
                }
                questionCommentsElement.append(html);

                if (answerUsers) {
                    container.find('.head-read p').text(answerUsers);
                }
                scrollTo(0, document.body.offsetHeight);
                lazyLoadImage.init();
                playAudio();
                showSinglePic();
            }
        });

    }*/

    var initEvents = function() {

        var userNumber = pageData.loginuser.user_number;
        var userRole = pageData.loginuser.user_role;


        container
            .on('click', '.item-nav-avatar', function(event) {
                if (!isApp) {
                    return;
                }
                event.preventDefault();
                var number = $(this).data('number').toString();
                var isTeacher = 1;
                if (userRole == 2) { //2是学生
                    var isTeacher = 0;
                }
                //var isTeacher = $(this).parents('.avatar').data('isTeacher');

                // 如果是老师客户端，是学生的头像，且当前登录者是当前的老师，就跳转和学生聊天
                if (isTeacherApp && !isTeacher && number == userNumber) {

                    var supportVersionNumber = app.version2Number(isTeacherApp ? '2.7.0' : '2.6.0');
                    var currentVersionNumber = app.version2Number(app.appVersion());

                    if (currentVersionNumber >= supportVersionNumber) {
                        app.imChat({
                            c_id: number,
                            c_role: 2,
                            group_id: ""
                        });
                    } else {
                        Jockey.send('toChat', {
                            student_id: number
                        });
                    }
                } else {
                    if (isTeacher) {
                        location.href = '/number';
                    } else {
                        location.href = '/x/number';
                    }
                }
            });
    };

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
            url: pageData.share_url,
            img: shareImg
        };
        setShare(shareInfo);
    }

    //设置滚动
    var scrollSlowly = function(position, time) {
        var item = 0;
        var times = 10;
        position = parseInt(position); // 滚动的整个高度
        var conH = parseInt(container.height());
        var xPostion = (position + conH) / times;
        var show = setInterval(function() {
            item++;
            if (item < 10) {
                container.scrollTop(item * xPostion);
            } else {
                clearInterval(show);
            }
        }, times);
    }

    var list = function(params) {
        service.post("/Wenda/addAnswerAjax", params, function(res) {
            var data = res.data;
            if (data) {
                var html = liRender({
                    list: data
                });
                var questionComent = $('.question-comments');
                var scrollH = container[0].scrollHeight;
                if (questionComent.data('hasCount') == 0) {
                    $('.empty').hide();
                    questionComent.show();
                    questionComent.html(html);
                    questionComent.attr('data-has-count', 1);
                    lazyLoadImage.init();
                    playAudio();
                    showSinglePic();
                    scrollSlowly(scrollH, 100);
                } else {
                    questionComent.append(html);
                    lazyLoadImage.init();
                    showSinglePic();
                    playAudio();
                    scrollSlowly(scrollH, 100);
                }
            }
        });
    }

    //设置返回
    var backToAnswer = function() {
        $('.nav-button').attr('href', '/wenda/questionDetail?number=' + pageData.question.number);
    }

    var initScroll = function() {
        window.gsx_ready(function() {
            new iScroll('#page_main', {
                scrollY: true,
                scrollX: false,
                click: true,
                mouseWheel: true,
                scrollbars: true
            });
        });
    };

    //APP中同步把页面塞入页面中
    var updateQaAnswerComment = function () {
        var maxcid = pageData.max_comment_id;

        var params = {
            number: pageData.question.number,
            teacher_id: pageData.pageData.user_number,
            max_comment_id: maxcid
        };

        service.post("/wenda/answerAjax", params, function(res) {

            if(res.code == 0) {
                var data = res.data;
                pageData.maxcid = data.max_comment_id;
                var questionComent = $('.question-comments');
                var html = $.trim(data.tpl.comment_list);
                var scrollH = container[0].scrollHeight;

                if(questionComent.data(hasCount)){
                    questionComent.remove();
                }

                questionComent.append(html);
                lazyLoadImage.init();
                showSinglePic();
                playAudio();
                scrollSlowly(scrollH, 100);
            }
        });
    }


    return function(page_data) {
        pageData = page_data;

        isApp = app.isApp();
        isStudentApp = app.isStudentApp();
        isTeacherApp = app.isTeacherApp();
        // initScroll();
        lazyLoadImage.init();
        $('#page_main').on('scroll', function() {
            lazyLoadImage.refresh();
        });
        isWeixin = env.thirdapp && env.thirdapp.isWeixin;

        //微信里面要隐去nav
        if (isWeixin) {
            $('.nav-bar').hide();
        }

        openAppWindow.init();

        playAudio();
        photoArray();
        showSinglePic();
        initEvents();
        backToAnswer();

        if (isApp) {
            // 监听客户端刷新
            Jockey.on('setRefresh', function() {
                location.reload();
                //updateQaAnswerComment();
            });
        }
        var mp3Url;
        var imgUrl;
        var content;
        if (!isApp) {
            $.jqwxInput({
                placeholder: '回答这个问题',
                callback: function(data, type, wx) {
                    //debugger;
                    mp3Url = '';
                    imgUrl = '';
                    content = '';

                    console.log(data);
                    if (type == 1) {
                        content = data;
                    } else if (type == 2) {
                        imgUrl = data;
                    } else {
                        mp3Url = data;
                    }
                    var userNumberId = pageData.user_number + '_' + pageData.user_role;
                    var params = {
                        question_number: pageData.question.number,
                        content: content,
                        pic: imgUrl,
                        audio: mp3Url,
                        audio_length: '',
                        teacher_number: userNumberId,
                    }
                    if (!content) {
                        delete params.content;
                    }
                    list(params);
                }
            });
        }

        shareInfo();


    }
});