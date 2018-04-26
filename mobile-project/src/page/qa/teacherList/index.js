/**
 *老师问题详情页
 *
 */

define(function(require) {
    'use stric';

    var $ = require('zepto');
    var container = $('#page_main');

    var lazyLoadImage = require('common/lazyLoadImage');
    var service = require('common/service');
    var app = require('common/app');
    var user = require('common/user');
    var env = require('util/env');
    var setShare = require('common/share/initialize');
    var imagePlayer = require('common/ui/ImagePlayer/showImagePlayer');
    var openAppWindow = require("common/openAppWindow");
    var playAudio = require('../_part/playAudio');
    var ui_new = require('common/ui');
    var url = require("util/url");
    var template = require('artTemplate');
    var liRender = template.compile(require('text!./list.tpl'));

    var isApp;
    var isTeacherApp;
    var isStudentApp;
    var pageData;
    var isWeixin;
    var LoginInfos;
    var isAnswerSelf = 0;
    var loginUserNumber;
    var loginUserRole;

    var isWhat = function() {
        container.on('click', '.left-icon', function() {
            ui_new.alert({
                content: '老师在问答功能中回答20个有效问题则可展示在主页，默认按提问时间排序',
                button: '我知道了'
            });
        });
    }

    var setShow = function() {
        container.on('click', '.right-icon', function() {
            var content;
            var confirmText;
            if (pageData.header_area.icon_two == 1) {
                content = '问答列表可彰显您教学的专业度，并加强与学生的互动，您也可以选择隐藏，隐藏后该功能仅您自己可见，学生不可见。';
                confirmText = '隐藏';
            } else {
                content = '问答列表可彰显您教学的专业度，并加强与学生的互动，当前该功能已设置隐藏，您可以重新开启显示。';
                confirmText = '开启显示';
            }

            ui_new.confirm({
                content: content,
                button_ok: confirmText,
                button_cancel: '我知道了'
            }).done(function() {
                service.post('/wenda/updateSettingStatus', { teacher_number: url().params.teacher_number }, function(res) {
                    if (res.code == 0) {
                        if (res.data.status == 1) {
                            ui_new.remind('设置成功,已对学生显示');
                            setTimeout(function(){
                                location.reload();
                            }, 200);
                        } else {
                            ui_new.remind('设置成功,已对学生隐藏');
                            setTimeout(function(){
                                location.reload();
                            }, 200);

                        }
                    } else {
                        ui_new.remind(res.msg);
                    }
                });
            });
        });
    }

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
        container.on('click', '.ask-current-teacher', function() {
            //if(pageData.loginuser && pageData.loginuser.user_number) {
            if (!user.isLogin() && isWeixin) {
                location.href = '/static/login?next=' + encodeURIComponent(window.location.href);
            } else {
                if (user.isLogin()) {
                    if (isApp) {
                        Jockey.send('toAnswerPage', {});
                    } else {
                        location.href = '/Wenda/askQuestion' + '?teacher_number=' + url().params.teacher_number;
                    }
                } else {
                    user.loginStudent(function() {
                        if (isApp) {
                            Jockey.send('toAnswerPage', {});
                        } else {
                            location.href = '/Wenda/askQuestion' + '?teacher_number=' + url().params.teacher_number;
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
                        openAppWindow.open(url)
                    } else {
                        location.href = url;
                    }
                }
            });
    }

    var shareShow = function() {
        var img = 'https://imgs.genshuixue.com/0cms/d/file/content/2016/07/577e1f9ab3486.png';
        if(pageData.header_area.avatar_url) {
            img = pageData.header_area.avatar_url;
        }
        var shareInfo = {
            title: '跟谁学好老师' + pageData.header_area.nick_name + ',已帮' + pageData.header_area.question_count + '个学生解答问题,等你来提问',
            content: '学习有疑问，欢迎随时来问，快速为你解答',
            img: img
        };
        setShare(shareInfo);
    }

    //还有更多的分页
    function getNextPage() {
        var hDom = $('.more-button');
        if (!hDom.length) {
            return;
        }

        var lastScoreHeight = hDom.position().top;

        function updateSettingStatus(hasMore, nextCuror) {
            if (hasMore && nextCuror) {
                hDom.attr('data-next-cursor', nextCuror);
                hDom.show();
            } else {
                hDom.hide();
            }
        }

        if (hDom.length) {
            updateSettingStatus(1, 2);
        }

        var lastIndex = 0;
        var isLoading = false;

        function getIntoContent(list) {
            var html = liRender({
                list: list,
                is_tapp: isTeacherApp,
                login_user_number: loginUserNumber,
                login_user_role: loginUserRole
            });
            $('.main-nav').append(html);
            playAudio();
            clickRedirect();
            photoArray();
            showSinglePic();
            lazyLoadImage.init();
        }

        function getNextPageContent() {
            if (isLoading) {
                return;
            }

            isLoading = true;
            var urlTo = '/wenda/teacherAnswer?teacher_number=' + url().params.teacher_number;
            var params = {
                render: 'json',
                page: hDom.data('nextCursor'),
            }
            hDom.addClass('loading');
            service.post(urlTo, params, function(res) {
                hDom.removeClass('loading');
                if (res.code == 0) {
                    //插入模板中
                    if(res.data.question_list){
                        getIntoContent(res.data.question_list);
                    }
                    updateSettingStatus(res.data.has_more, parseInt(res.data.cur_page) + 1);
                    setTimeout(function() {
                        isLoading = false;
                        if (!res.data.has_more) {
                            lastScoreHeight = 100000000000;
                        } else {
                            lastScoreHeight = hDom.position().top;
                            initDom();
                        }
                    }, 100);
                }
            });
        }

        function initDom() {
            if (window.scrollY + window.innerHeight >= lastScoreHeight) {
                getNextPageContent();
            }
        }

        $(window).on('scroll', initDom);
        initDom();

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
        isWhat();
        isApp = app.isApp();
        isStudentApp = app.isStudentApp();
        isTeacherApp = app.isTeacherApp();
        lazyLoadImage.init();
        isWeixin = env.thirdapp && env.thirdapp.isWeixin;

        if(pageData.loginuser.user_number) {
            loginUserNumber = pageData.loginuser.user_number;
            loginUserRole = pageData.loginuser.user_role;
        }

        openAppWindow.init();

        playAudio();
        clickRedirect();
        photoArray();
        showSinglePic();
        lazyLoadImage.init();
        getAskForSb();
        shareShow();
        setShow();
        formatPhotos();
        if(pageData.has_more){
            $('.more-button').show();
            getNextPage();
        }
    }
})