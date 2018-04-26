/**
 * Created by chenmo on 16/1/15.
 */

define(function (require) {
    'use strict';
    var tpl = require("text!./main/article.tpl");
    var $ = require("zepto");
    var navPanel = require('common/navPanel');
    var util_function = require('util/function');
    var math = require('util/math');
    var lazyLoadImage = require('common/lazyLoadImage');
    var service = require('common/service');
    var app = require('common/app');
    var qrcode = require("common/qrcode");
    var user = require('common/user');
    var env = require('util/env');
    var appoint = require('common/appoint/appoint');
    var bindCourseClick = require('common/bindCourseClick');
    var fullPageDialog = require('common/ui/FullPageDialog/FullPageDialog');
    var setShare = require('common/share/initialize');
    var doShare = require('common/share/doShare');
    var cityMgr = require('common/city_mgr');
    var StaySingle = require("common/staySingle/staySingle");
    var imagePlayer = require('common/ui/ImagePlayer/showImagePlayer');
    var ui = require('common/ui');
    var Dialog = require('common/ui/FullPageDialog/FullPageDialog');
    var Comment = require("../../_common/comment");
    var cookie = require("util/cookie");
    var ChengduSem = require('common/chengduSem');
    var question = require('../_part/question');
    var topAction = require('../_part/topBanner');
    var BottomAction = require('page/bottom/teacherBottom');
    var util_object = require('util/object');
    var template = require('artTemplate');
    var ArticleRender = template.compile(tpl);
    var inter = require('common/component/interactLayer/index');
    // yuanye: 新版统一上报js
    var habo = require('common/component/analysis/habo/index');
    var url = require('util/url');
    var transToPx = require('common/function/transPxByRatio');
    var urlParams = url().params;

    var container = $("#main");
    var bottom = container.find(".bottom");
    var commentsFilter = $('.comments-filter');
    var postUrl = "https://click.genshuixue.com/gs.gif";
    var pageData;
    var isApp;
    var height;
    var userInfo;
    var value;
    var isStudentApp;
    var appVersion;
    var isWeixin;
    var isTeacherApp;
    var hostStr;
    var host;
    var isKaoyan;
    var isJinyou;
    var nextPage = 1;
    var comment;//评论统计
    var deviceRetio;

    // 会员模板设置音频长度
    var audioLength = function () {
        var audioLength = container.find('.audio-player').data('length');
        var lengthHtml = Math.floor(audioLength / 60) + ':' + Math.ceil(audioLength % 60);
        container.find('.audio-length').text(lengthHtml);
    };

    // 超级会员模板音频长度设置
    var superAudioLength = function () {
        var audioLength = container.find('.audio-player').data('length');
        var lengthHtml = Math.floor(audioLength / 60) + "'" + Math.ceil(audioLength % 60) + '"';
        container.find('.audio-length').text(lengthHtml);
    };

    /**
     * 音频播放
     * */
    var audioPlay = function () {
        var url = pageData.audioUrl;
        if (!url) {
            return;
        }
        var $audio = $('<audio preload="none" volume="1.0" src="' + url + '"></audio>');
        var audio = $audio[0];
        var audioStatus = 0;
        var audioLoaded = 0;
        if (pageData.page_model != "super_vip") {
            audioLength();
        }
        else {
            superAudioLength();
        }


        container
            .on('click', '.audio', function (e) {
                var that = $(this);
                var url = that.data('url');
                var len = that.data('length');
                var length;
                var dynamicUrl;
                var staticUrl;
                var waveImg;

                that.addClass('audio-player');

                if (pageData.page_model != "super_vip") {
                    waveImg = that.siblings('img');
                    length = Math.floor(len / 60) + ':' + Math.ceil(len % 60);
                    if (pageData.model == "default") {
                        dynamicUrl = "https://imgs.genshuixue.com/0cms/d/file/content/2016/01/56a343a4568a0.gif";
                        staticUrl = 'https://imgs.genshuixue.com/0cms/d/file/content/2016/01/56a3415e0559d.png';
                    } else {
                        dynamicUrl = 'https://imgs.genshuixue.com/0cms/d/file/content/2015/12/5674c1cb06375.gif';
                        staticUrl = 'https://imgs.genshuixue.com/0cms/d/file/content/2015/12/5674c1cb535ec.png';
                    }
                } else {
                    waveImg = that.siblings('.audio-wave');
                    length = Math.floor(len / 60) + "'" + Math.ceil(len % 60) + '"';
                    dynamicUrl = 'https://imgs.genshuixue.com/0cms/d/file/content/2016/01/56a1c08824e48.gif';
                    staticUrl = 'https://imgs.genshuixue.com/0cms/d/file/content/2016/01/569ee8d2bf4e1.png';
                }

                if (audioStatus) {
                    audio.pause();
                    audioStatus = 0;
                    waveImg.attr('src', staticUrl);
                    return false;
                }
                else {
                    if (!audioLoaded) {
                        that.siblings('span').html('下载中');
                        that.siblings('span').html(length);
                    }
                    audio.play();
                    audioStatus = 1;
                    waveImg.attr('src', dynamicUrl);
                }

                audio
                    .addEventListener("timeupdate", function () {
                        var overPlus;
                        overPlus = (len - this.currentTime);
                        if (overPlus < 0) {
                            that.siblings('span').html(length);
                        }
                        else {
                            if (pageData.page_model != "super_vip") {
                                overPlus = Math.floor(overPlus / 60) + ':' + Math.ceil(overPlus % 60);
                            } else {
                                overPlus = Math.floor(overPlus / 60) + "'" + Math.ceil(overPlus % 60) + '"';
                            }

                            that.siblings('span').html(overPlus);
                        }

                    });

                audio
                    .addEventListener('ended', function () {
                        audioStatus = 0;
                        waveImg.attr('src', staticUrl);
                    });

                audio.addEventListener('loadeddata', function () {
                    audioLoaded = 1;
                    waveImg.attr('src', dynamicUrl);
                });

                $(window).on('beforeunload', function () {
                    audio.pause();
                    audioStatus = 0;
                });

            });
    };

    // 初始化简介/相册/文章/评价
    var initActiveTab = function (element) {

        var activeParentName = element.attr('class');
        var tabContainer = container.find('.tab-container');
        tabContainer.find('[data-tab]').hide();
        var activeTab = tabContainer.find('[data-tab="' + activeParentName + '"]');
        var dataLoad = activeTab.attr('data-load');
        activeTab.show();

        var privateDomain = pageData.private_domain;
        

        var loading = $('<div class="ajax-loading"><img width="' + 40 * deviceRetio + '" height="' + 40 * deviceRetio + '"src="https://imgs.genshuixue.com/0cms/d/file/content/2015/12/567d34816bb3a.gif"></div>');

        if (activeParentName == 'tab-photo' && !dataLoad) {
            activeTab.attr('data-load', 1);
            activeTab.append(loading);

            service.post('/' + privateDomain + '/ajax_photo',
                {}, function (response) {
                    if (response.code == 0) {
                        //tabCon.hide();
                        activeTab.find('.ajax-loading').remove();
                        activeTab.append(response.data.tpl);
                        setTimeout(lazyLoadImage.init, 500);
                    }
                });


        }
        else if (activeParentName == 'tab-article' && !dataLoad) {
            activeTab.attr('data-load', 1);
            activeTab.append(loading);
            var param = {};
            param['domain'] = privateDomain;
            param['page'] = 1;

            service.get('/' + param.domain + '/article?render=json',
                {}, function (response) {
                    if (response.code === 0) {
                        var html = ArticleRender({
                           tpl_data: response.data
                        });
                        //tabCon.hide();
                        activeTab.find('.ajax-loading').remove();
                        activeTab.append(html);
                        ajaxArticleInit();
                        nextPage = response.data.pager.next_page;

                        setTimeout(lazyLoadImage.init, 500);
                    }
                });
        }
        else if (activeParentName == 'tab-comment' && !dataLoad) {
            var hasMore = activeTab.find('.more-comment');
            hasMore.attr('data-page', 1);
            activeTab.attr('data-load', 1);
            activeTab.append(loading);
            service.post('/' + privateDomain + '/ajax_comment',
                {
                    commentType: 0,
                    show_score: 1,
                    id: pageData.teacher_number,
                    page: 1,
                }, function (response) {
                    if (response.code == 0) {
                        //tabCon.hide();
                        activeTab.find('.ajax-loading').remove();
                        activeTab.find('.tab-comment-container').html(response.data.tpl);
                        if (+response.data.has_more) {
                            hasMore.removeClass('hide');
                            // var page = +hasMore.attr('data-page') + 1;
                            hasMore.attr('data-page', +hasMore.attr('data-page') + 1);
                        } else {
                            hasMore
                                .addClass('hide')
                                .attr('data-page', 'nomore');
                        }

                        setTimeout(lazyLoadImage.init, 500);
                        comment.send();
                    }
                });
        }
        else {
            container.find('.tab-container').find('.ajax-loading').remove();
        }
    };

    // tab切换
    var tabClick = function () {
        var tabTitle = container.find('.main-tab-title');
        tabTitle
            .on('click', 'li', function () {
                $(this).find('span').addClass('active');
                $(this).siblings('li').find('span').removeClass('active');
                initActiveTab($(this));
                if (pageData.page_model == "vip") {
                    if (isApp && $('.main-tab-title').hasClass('tab_fixed')) {
                        window.scrollTo(0, height + 10);
                    }
                    else if ($('.main-tab-title').hasClass('tab_fixed')) {
                        window.scrollTo(0, height + 15);
                    }
                } else if (pageData.page_model == "super_vip") {
                    if (isApp && $('.main-tab-title').hasClass('tab_fixed')) {
                        window.scrollTo(0, height + 20);
                    }
                    else if ($('.main-tab-title').hasClass('tab_fixed')) {
                        window.scrollTo(0, height + 10);
                    }
                }

            });
    };

    var tabUrl = function () {
        if (urlParams.tab) {
            var ele = $('.main-tab-title .tab-' + urlParams.tab);
            initActiveTab(ele);
            ele.siblings('li').find('span').removeClass('active');
            ele.find('span').addClass('active');
        }
        else {
            // 初始化简介
            var liActive = container.find('.main-tab-title').find('.active').closest('li');
            initActiveTab(liActive);
        }
    };

    // 过往经历点击展开所有
    var expSpread = function () {
        container.on('click', '.exp-spread', function () {
            var expInfo = $(this).closest('.exp-info');
            expInfo.find('.hide').show();
            expInfo.find('.exp-spread').hide();
        });
    };

    //隐藏特点
    function countFeature() {
        var feature = $(".feature");
        var slideDown = feature.find(".slide-down");
        var slideHeight = slideDown.height();
        var content = feature.find("#content-slide-down");
        var contentHeight = content.height();

        if (contentHeight > slideHeight) {
            feature.find("i").show();
            feature.on("click", bindOrgIntroFeature);
        } else {
            feature.find("i").hide();
        }
    }

    // 老师特点
    var bindOrgIntroFeature = function () {
        if (!$(this).hasClass("active")) {
            $(this).find(".slide-down").css("height", "auto")
                .next().removeClass("icon-angle-down").addClass("icon-angle-up");
            $(this).addClass("active");
        } else {
            $(this).find(".slide-down").css("height", "2.5rem")
                .next().removeClass("icon-angle-up").addClass("icon-angle-down");
            $(this).removeClass("active");
        }

    };

    //tab吸顶
    var fixTab = function () {

        var adsInit = false;
        var adsHeight = 0;
        var topTitle = $('.topTitle');
        if (pageData.page_model == "vip") {
            height = container.find(".head-img").height() + $('.teacher-course').height()
                + $('.V2-item-list').height() + $('.change-tab').height() - 30 * deviceRetio;
            var navBarHeight;
            if (isApp) {
                navBarHeight = 0;
            }
            else {
                navBarHeight = $(".nav-bar").height();
            }

            height = height + navBarHeight;
        } else if (pageData.page_model == "super_vip") {
            height = container.find(".head-img").height() + $('.teacher-course').height()
                + $('.change-tab').height() + 10 * deviceRetio;
            if (isApp) {
                height = height - 40 * deviceRetio;
            }
        }

        function update() {
            // 有广告位，需要加上广告位的高度
            if ($(".page-banner-wrap").length > 1 && !adsInit) {
                adsInit = true;
                adsHeight = $(".page-banner-wrap").height();
            }
            height = height + adsHeight;
            var scrollTop = $(window).scrollTop();
            if (scrollTop > height) {
                container.find(".main-tab-title").addClass('tab_fixed');
                container.find(".change-tab").css('height', 10 * deviceRetio + 'px');
                if ($(".page-banner-wrap").length == 0) {
                    container.find(".tab-container").addClass('fix-top');
                }
                if (pageData.page_model == "super_vip") {
                    $('.tab_fixed').css('width', $(document.body).width() - 30 * deviceRetio);
                    if (!isApp && $(".page-banner-wrap").length > 0) {
                        container.find(".change-tab").css('height', '0');
                    } else if (isApp && $(".page-banner-wrap").length == 0) {
                        container.find(".change-tab").css('height', 18 * deviceRetio + 'px');
                    }
                } else if (!isApp && pageData.page_model == "vip" && $(".page-banner-wrap").length == 0) {
                    container.find(".change-tab").css('height', 18 * deviceRetio + 'px');
                }
                topTitle.css('display', 'none');
            } else {
                container.find(".change-tab").css('height', 43 * deviceRetio + 'px');
                container.find(".main-tab-title").removeClass('tab_fixed');
                container.find(".tab-container").removeClass('fix-top');
                topTitle.css('display', 'block');
            }
        }

        document.addEventListener('touchmove', update, false);
        $(window).scroll(update);
        setTimeout(update, 500);
    };

    var photosArray = function () {
        var photos = container.find(".photo");
        var result = [];

        photos.each(function (index, item) {
            result.push(photos.eq(index).data('src'));
        });

        return result;
    };
    // 相册查看大图
    var photoClick = function () {
        container.on('click', '.photo-style', function () {
            var photos = photosArray();
            imagePlayer(photos, $(this).data('index'));
        });
    };

    // 文章加载更多
    function articleMore() {
        container.find('.tab-container')
            .on('click', '.load-next-cursor', function () {
                var curDom = $(this);
                var nxt = curDom.attr('next_cursor');
                var privateDomain = pageData.private_domain;
                $(this).find('span').text('正在加载更多...');
                if (!nxt) {
                    return;
                }
                var param = {};
                param['domain'] = privateDomain;
                param['page'] = nxt;

                service.get('/' + param.domain + '/article?render=json', {
                        page: nextPage
                    }, function (response) {
                        if (response.code == 0) {
                             var html = ArticleRender({
                                tpl_data: response.data
                             });
                            //tabCon.hide();
                            var activeTab = $('.tab-container').find('[data-tab="tab-article"]');
                            activeTab.find('.ajax-loading').remove();
                            activeTab.append(html);
                            // ajaxArticleInit();
                            nextPage = response.data.pager.next_page;
                            curDom.remove();
                            setTimeout(lazyLoadImage.init, 500);
                        }
                    });
            });

    }

    function ajaxArticleInit() {
        var container = $("[data-tab='tab-article']");
        container.on('click', 'li', function (e) {
            var target = $(e.currentTarget);
            var url = target.data('url');
            var type = target.data('type');
            var id = target.data('id');
            var schema = 'bjhlstudent://o.c?a=xxtoutiao_itemdetail&item_id=' + id + '&item_type=' + type;
            if (app.isApp()) {
                // 调用学习头条SDK
                if (appVersion >= '3.3.3') {
                    Jockey.send('urlSchemeRoute', {
                        url: schema
                    });
                } else {
                    app.openNewWindow(url);
                }
            } else {
                location.href = url;
            }
        });
    }

    // 评价tab切换(全部评价/一对一/班课/视频课等)
    var commentTypeChange = function () {
        var privateDomain = pageData.private_domain;
        var activeTab = $('.tab-container').find('[data-tab="tab-comment"]');
        var hasMore = activeTab.find('.more-comment');
        var tabCommentContainer = activeTab.find('.tab-comment-container');
        var loading = $('<div class="ajax-comment-loading"><img width="' + 40 * deviceRetio  + '" height="' + 40 * deviceRetio + '"src="https://imgs.genshuixue.com/0cms/d/file/content/2015/12/567d34816bb3a.gif"></div>');
        function photosArray(element) {

            var photos = element.find('li img');

            var result = [];
            for (var i = 0, max = photos.length; i < max; i++) {
                result.push($(photos[i]).data('src'));
            }

            return result;
        }

        var total = page_data.total||"";

        // 评价的标签
        var commentTag = 'all';

        activeTab
            .unbind('click', '.tab-title li')
            .on('click', '.tab-title li', function () {
                var me = $(this);
                var commentType = me.attr('comment_type');
                hasMore.attr('data-page', 1);
                activeTab.find('.course-tab').html(loading);
                $('.tab-title').find('.active').removeClass('active');
                me.addClass('active');

                comment.send({
                    comment_type: {
                        0:1,
                        1:2
                    }[commentType] || commentType,
                    comment_tag: "",
                    comment_tag_num: commentType==0?total:"",
                    page: 1,
                    teacher_number: pageData.userNum || ""
                });

                service.post(
                    //'/' + privateDomain + '/tcomment',
                    '/' + privateDomain + '/ajax_comment',
                    {
                        comment_type: commentType,
                        from_page: 'teacherDetail',
                        page: 1,
                        show_score: 1,
                    }, function (response) {
                        if (response.code == 0) {
                            //tabCon.hide();
                            activeTab.find('.ajax-comment-loading').remove();
                            activeTab.find('.course-tab').html('');
                            tabCommentContainer.html(response.data.tpl);
                            tabCommentContainer.find('.tab-title .tab-item').each(function () {
                                var that = $(this);
                                if (+that.data('type') === +commentType) {
                                    that
                                        .addClass('active');
                                } else {
                                    that
                                        .removeClass('active');
                                }
                            });
                            if (+response.data.has_more) {
                                hasMore.removeClass('hide');
                                var page = +hasMore.attr('data-page') + 1;
                                hasMore.attr('data-page', page);
                            } else {
                                hasMore
                                    .addClass('hide')
                                    .attr('data-page', 'nomore');
                            }   
                            setTimeout(lazyLoadImage.init, 500);
                        }
                    });
            });

        //整页的加载更多
        //activeTab
            //.unbind('click', '.course-tab .more-comment')
            //.on('click', '.course-tab .more-comment', function () {
        hasMore
            .unbind('click')
            .on('click', function () {
                var me = $(this);
                var commentType = $('.tab-title').find('.active').attr('comment_type');       
                var page = me.attr('data-page');
                if (page === 'nomore') {
                    return;
                } else {
                    page = +page;
                }

                me.html('正在加载更多评价......');

                service.post('/' + privateDomain + '/ajax_comment', {
                    comment_type: commentType,
                    comment_tag: commentTag,
                    page: page,
                    show_score: 0,
                }, function (res) {
                    if (res.code == 0) {
                        var html = $.trim(res.data.tpl);
                        // var html = res.data.tpl;

                        if (html.length) {
                            tabCommentContainer.append(html);
                            if (res.data.has_more) {
                                me.removeClass('hide');
                                me.attr('data-page', +page + 1);
                                me.html('加载更多评价');
                            } else {
                                me.addClass('hide');
                                me.html('没有更多评价了');
                                me.attr('data-page', 'nomore');
                            }
                        } else {
                            me.addClass('hide');
                            me.html('没有更多评价了');
                            me.attr('data-page', 'nomore');
                        }
                        lazyLoadImage.init();

                        //添加评论统计
                        comment.send({
                            page: page,
                            teacher_number: pageData.userNum || ""
                        });
                    }
                });
            });

        // 标签切换
        activeTab
            .unbind('click', '.comment-tag')
            .on('click', '.comment-tag', function () {
                var me = $(this);
                var type = me.data('type');
                commentTag = type;
                //var commentTag = me.text();
                me
                    .siblings().removeClass('active')
                    .removeClass('active');
                //$('.comments-filter').find('.active').removeClass('active');
                me.addClass('active');
                var commentType = $('.tab-title').find('.active').attr('comment_type');
                //service.post('/teacher/ajax_comment_selected', {
                service.post('/' + privateDomain + '/ajax_comment', {
                    comment_tag: commentTag,
                    comment_type: commentType,
                    page: 1,
                    show_score: 1
                    //id: pageData.teacher_number
                },
                function (res) {
                    if (+res.code === 0) {
                        var html = $.trim(res.data.tpl);
                        if (html.length) {
                            tabCommentContainer.html(html);
                            tabCommentContainer.find('.comments-filter .comment-tag').each(function () {
                                var that = $(this);
                                if (that.data('type') === commentTag) {
                                    that.addClass('active');
                                } else {
                                    that.removeClass('active');
                                }
                            });
                            if (res.data.has_more) {
                                hasMore
                                    .removeClass('hide')
                                    .html('查看更多评价')
                                    .attr('data-page', 2);
                            } else {
                                hasMore
                                    .addClass('hide')
                                    .html('没有更多评价了')
                                    .attr('data-page', 'nomore');
                            }

                        }
                        else {
                            activeTab.find('.comment-panel').html('<div class="no-comment">' +
                                '<img src="https://img.genshuixue.com/0cms/d/file/content/2015/09/55e58e64b2c1e.png" alt="">' +
                                '<p>暂无评价数据</p>' +
                                '</div>'
                            );

                        }
                        lazyLoadImage.init();

                        comment.send({
                            page: 1,
                            comment_tag: commentTag
                        })
                    }
                });

            });


        //查看同一用户其它课节的评价
        var userMoreComment = $('.user-more-comment');
        activeTab
            .on('click', '.user-more-comment', function () {

                var me = $(this);
                var total = me.data('comment_num');

                var userNum = me.data('user_num');
                var parent = me.closest('.comment-list-wrapper');
                if (me.hasClass('next-page')) {
                    var url = location.origin + '/comment/getMoreComment';
                    if (isApp) {
                        app.openNewWindow(url);
                    } else {
                        location.href = url;
                        return;
                    }

                }
                me.hide();
                parent.find('ul.other-comment-list').each(function () {
                    if ($(this).data('user_num') == userNum && $(this).data('userType') == me.data('userType')
                        && $(this).data('courseNumber') == me.data('courseNumber')) {
                        $(this).show();
                    }

                });
                if (total > 4) {
                    total = total - 4;
                    me.html('查看该用户其他' + total + '条评价');
                    me.addClass('next-page');
                    me.show();
                }


            });

        activeTab
            .on('click', '.comment-panel .like', function () {
                var me = $(this);
                var commend_id = me.data('comment_id');
                var thumb_num = me.data('thumb');
                thumb_num = thumb_num + 1;
                if (me.hasClass('isLike')) {
                    ui.remind('您已经赞过了');
                    return;
                }

                service.post('/comment/supportComment', {
                    comment_id: commend_id
                }, function (res) {
                    if (res.code == 0) {
                        if (res.data.type == 1) {
                            me.addClass('isLike');
                            me.find('.like-num').text('(' + thumb_num + ')');

                        } else if (res.data.type == 0) {
                            ui.remind(res.data.msg);
                        }
                    }
                });

            });

        activeTab
            .on('click', '.comment-panel .comment-photo-list li', function () {
                var index = $(this).data('index');
                var parent = $(this).closest('ul');
                var photos = photosArray(parent);

                imagePlayer(photos, index);
            });
    };

    // app中显示分享图标，隐藏m站二维码
    var shareShow = function () {
        if (isApp) {
            if (isStudentApp && appVersion >= '3.0.2') {
                $('.app-qrCode').show();
            }
            else {
                $('.share-qrCode').hide();
            }
        }
        else {
            $('.m-qrCode').show();
        }

        //app中朋友圈分享
        container.on('click', '.li-friends', function () {
            if (isApp && appVersion >= '3.0.2') {
                doShare('share_pyq', JSON.parse(pageData.shareInfo).share_pyq);
            }

        });
        //app中微信分享
        container.on('click', '.li-weixin', function () {
            if (isApp && appVersion >= '3.0.2') {
                doShare('share_weixin', JSON.parse(pageData.shareInfo).share_weixin);
            }
        });
    };

    // 预览状态时，只有头图可点击，其余地方不可点击
    var previewPage = function () {
        if (pageData.isPreview) {
            $('.page-mask').show();
        }
        else {
            $('.page-mask').hide();
        }

    };

    /**
     * 显示二维码
     *
     */
    function showQrcode() {
        var body = $('body');
        var element = $('.qrcode-container');
        body.addClass('noscroll');
        element.show(100);
    }

    /**
     * 隐藏二维码
     *
     */
    function hideQrcode() {
        var body = $('body');
        var element = $('.qrcode-container');
        body.removeClass('noscroll');
        element.hide();
    }

    var qrCodeClick = function () {
        var init = false;

        container
            .on('click', '.m-qrCode,.li-qrcode', function () {
                showQrcode();
            });

        $('.qrcode-container')
            .on('click', '.cancel', function () {
                hideQrcode();
            });
    };

    var bottomButton = function () {
        if (!isApp) {
            var bottomConsult = bottom.find('.consult');
            //if (!bottomConsult.data('tel')) {
            //    bottomConsult.addClass('display-none');
            //} else {
                bottomConsult.removeClass('display-none');
            //}
            if (isWeixin) {
                bottom.find('.share').removeClass('display-none');
            } else {
                bottom.find('.share').addClass('display-none');
            }

            bottom
                .on('click', '.share', function () {
                    $('.share-mask').show();
                    $('[name="control_top"]').css('z-index', '5');
                });
            $('.share-mask').click(function () {
                $(this).hide();
            });

        }

    };

    /**
     * 机构App或者老师身份统一隐藏底部*/
    var bottomHide = function () {
        if (isApp) {
            if (app.isOrgApp() || app.isTeacherApp()) {
                $('.bottom').hide();
                $('.app-bottom').hide();
            }
        }
        if (userInfo) {
            var userType = userInfo.type;
            if (userType == 0 || userType == 6) {
                $('.bottom').hide();
                $('.app-bottom').hide();
            }
        }
    };

    // 判断是在app还是m站页面，来决定展示上面按钮还是底部吸底按钮
    var buttonShow = function () {
        var userNum = pageData.userNum;
        var displayDom = null;

        var ky = /kaoyan/g;
        var jy = /jinyou/g;
        var mAction = $('.m-action');
        var kAction = $('.kaoyan-action');
        var jAction = $('.jinyou-action');
        var aAction = $('.app-action');


        if (isApp) {
            if (!userInfo || (userInfo && userInfo.number != userNum)) {
                displayDom = aAction;
                mAction.addClass('display-none');
                kAction.addClass('display-none');
                jAction.addClass('display-none');
            }
        }
        else if (ky.test(host[0])) {
            displayDom = kAction;
            mAction.addClass('display-none');
            aAction.addClass('display-none');
        }
        else if (host[0].indexOf('jinyou')>-1) {
            displayDom = jAction;
            mAction.addClass('display-none');
            aAction.addClass('display-none');
        }
        else {
            displayDom = mAction;
            aAction.addClass('display-none');
            kAction.addClass('display-none');
            jAction.addClass('display-none');
        }
        if (displayDom) {
            /* 如果底部没有要展示的按钮，就不显示了 */
            var shouldShowBottom = false;
            displayDom.children().each(function(index, item) {
                if (!$(item).hasClass('display-none')) {
                    shouldShowBottom = true;
                    return false;
                }
            });
            if (shouldShowBottom) {
                displayDom.removeClass('display-none');
            }
        }
    };

    // 2015-11-24 预约试听
    /*var appointCourse = function () {
        container
            .on('click', '#bottom-appointment', function (e) {
                var url = window.location.href;
                var param = {};
                param['courseType'] = 'org';
                param['title'] = pageData.title;
                param['objectId'] = pageData.userNum;
                param['objectType'] = 'cdb.teacher';
                param['detail_url'] = url;
                param['color'] = pageData.model;

                appoint.appoint(param);
            })
    };*/

    var gotoTrialLink = function (e) {
        var url = location.origin + $(this).data('href');
        if (isApp) {
            app.openNewWindow(url);
        }
        else {
            location.href = url;
        }
    };
    //试听课点击按钮事件
    var tryButtonBind = function () {
        var status = pageData.try_status;
        var tryButton = $(".try-course-style").find(".course-btn");
        var tryContainer = $(".try-container");
        var tryDiv = $(".try");
        if (status == 0) {
            tryButton.click(gotoTrialLink);
            tryDiv.click(gotoTrialLink);

        } else if (status == 4) {
            tryButton.click(function () {
                tryContainer.show();
            });
            tryDiv.click(function () {
                tryContainer.show();
            });
            tryContainer.find(".cancel-pay").click(function () {
                tryContainer.hide();
            });
            tryContainer.find(".pay").click(function (e) {
                tryContainer.hide();
                if (isApp) {
                    var appDetail = $(this).find('a').data('app').split("|");
                    var action = appDetail[0];
                    var param = {};
                    param["purchase_id"] = appDetail[1];
                    param["course_type"] = appDetail[2];
                    app.send(action, param);

                    e.preventDefault();
                    return false;
                }
            });
        } else if (status == 5) {
            tryButton.click(function () {
                ui.remind("您不能购买自己的课程");
            });
            tryDiv.click(function () {
                ui.remind("您不能购买自己的课程");
            });
        } else if (status == 2 || status == 1) {
            tryButton.click(function () {
                tryContainer.show();
            });
            tryDiv.click(function () {
                tryContainer.show();
            });
            tryContainer.find(".cancel-pay").click(function () {
                tryContainer.hide();
            });
            tryContainer.find(".pay").click(function () {
                tryContainer.hide();
            });
        } else {
            tryButton.click(function () {
                var url = location.origin + $(this).data('href');
                if (isApp) {
                    app.openNewWindow(url);
                } else {
                    location.href = url;
                }
            });
            tryDiv.click(function () {
                var url = location.origin + $(this).data('href');
                if (isApp) {
                    app.openNewWindow(url);
                } else {
                    location.href = url;
                }
            });


        }
    };

    /**
     * 三方通话ajax
     * @param container
     */
    /*function threeWayCall(container) {
        var targetData = container.data();
        var courseNum = targetData.course_num;
        var orgNum = targetData.org_num;
        var spread_id = targetData.spread_id;
        service.post('/bell_system/getCallUrl', {
            number: orgNum,
            user_type: 6,
            course_num: courseNum,
            type: 'class_trial',
            spread_id: spread_id || ''
        }, function (response) {
            var resCode = response.code;
            if (resCode == 0 && response.data.call_url) {
                callPage(response.data.call_url);
            } else if (resCode == 401 || resCode == 200002) {

                user.loginStudent(function () {
                    $('.consult').click();
                });
            }
        });
    }*/

    /**
     * 三方通话界面
     * @param url 打电话url
     */
    /*function callPage(url) {
        var dialog = new fullPageDialog({
            'content': '<iframe width="100%" height="100%" src="' + url + '"></iframe>',
            'animateType': 2,
            'position': 'fixed'
        });
        dialog.show();
        $('.download-show #download').hide(); //隐藏顶部下载banner
        var listener = observer.addListener(dialog, 'display_changed', function () {
            var display = this.get('display');
            if (!display) {
                observer.removeListener(listener);
                listener = null;
                dialog.destroy();
                dialog = null;
                $('.download-show #download').show();
            }
        });
    }*/


    /**
     * 咨询*/
    /*var consult = function () {
        var hasDoInitChart = false;
        container
            .on('click', '.consult', function (e) {
                //直播
                if(!$(this).find(".zxkf")[0]){
                    e.preventDefault();
                    var im_data = JSON.parse(pageData.im_data);
                    var telNumber = $(this).data('tel');
                    var param;
                    var easemob;
                    easemob = $(this).data('easemob');
                    var isTeacherApp = app.isTeacherApp();
                    var supportVersionNumber = app.version2Number(isTeacherApp ? '2.7.0' : '2.6.0');
                    var currentVersionNumber = app.version2Number(appVersion);
                    var imSupportVersionNumber = app.version2Number('3.0.7');

                    if (!(im_data instanceof Array)) {
                        param = {
                            "c_id": im_data.c_id + '',
                            "c_role": im_data.c_role + '',
                            "group_id": im_data.group_id + ''
                        }
                    }

                    if (isApp) {
                        if (currentVersionNumber >= supportVersionNumber) {
                            if ((userInfo && !userInfo.number) || !userInfo) {
                                // 2016-01-05 by caoying，学生端要求未登录时调用另外一个jokey接口,无需调用原来的登陆页面
                                if (currentVersionNumber >= imSupportVersionNumber) {
                                    app.send('anonymousIM');
                                }
                                else {
                                    user.loginStudent();
                                }
                            } else {
                                app.send('IM', param);
                            }
                        } else {
                            if (userInfo && !userInfo.number) {
                                user.loginStudent(function () {
                                    app.send('toChat', {easemob: easemob});
                                });
                            } else {
                                app.send('toChat', {easemob: easemob});
                            }
                        }

                    } else {
                        if (telNumber) {
                            // initChat 方法是个函数声明，真正的事件响应实在点击了元素之后，请看initChat函数的写法。第一遍调用时，无法触发事件，只有重新调用一遍click事件才可以。
                            if (!hasDoInitChart) {
                                bindCourseClick.initChat($(this), param);
                                hasDoInitChart = true;
                                $(this).click();
                            }
                        } else {
                            threeWayCall($(this));
                        }
                    }
                }else {
                    require(['common/liudanClickLog/liudanClickLog'], function(liudanClickLog){
                        liudanClickLog.send({
                            stype: 4
                        });
                    });
                };
            })


    };*/

    // app中调用关注接口
    /*var appFocus = function () {
        container
            .on('click', '.focus', function () {
                var focusFlag = $(this).attr('data-focus');
                var that = $(this);
                var type;
                var btnName;
                var remindText;
                var imgSrc;

                // 若用户没有登录，则需要登录
                if (!userInfo) {
                    user.loginStudent();
                }
                else {

                    if (focusFlag == 1) {
                        type = 0;
                        btnName = "关注";
                        remindText = "成功取消关注";
                        imgSrc = "https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5698aaa209f31.png";
                    }
                    else {
                        type = 1;
                        btnName = "已关注";
                        remindText = "关注成功";
                        imgSrc = "https://imgs.genshuixue.com/0cms/d/file/content/2016/01/5698aaa22f431.png";
                    }
                    // 关注或者取消关注
                    service.post(
                        '/teacher/ajax_focus',
                        {
                            id: pageData.teacher_number,
                            type: type
                        }, function (response) {
                            if (response.code == 0) {
                                ui.remind(remindText);
                                that.find('img').attr('src', imgSrc);
                                that.attr('data-focus', type);
                                that.find('span').text(btnName);
                            }
                        });
                }
            })
    };*/

    // 点击课程链接
    var courseLink = function () {
        var teacherCourse = container.find('.teacher-course');
        teacherCourse
            .on('click', '.course-info', function () {
                var url = $(this).data('href');
                // 在app中，视频课需要跳转app视频课详情页面
                var videoNumber = $(this).data('number');
                var forceUrl = $(this).data('forceUrl');

                if(forceUrl && forceUrl.length > 0) {
                    if (isStudentApp) {
                        app.openNewWindow(forceUrl);
                    } else {
                        location.href = forceUrl;
                    }
                } else {
                    if (isStudentApp) {
                        if (videoNumber) {
                            var param = {};
                            // 注意：视频课的number必须转化成字符串，否则app不支持
                            param['number'] = videoNumber + '';
                            param['index'] = '';
                            app.send('toVideoCourseDetail', param);
                        } else {
                            app.openNewWindow(url);
                        }
                    }
                    else {
                        location.href = url;
                    }
                }
            });
    };

    // 点击VIP课程链接
    var courseLinkforVip = function () {
        var teacherCourse = container.find('.course-list');
        teacherCourse
            .on('click', '.a-course-info', function () {
                var url = $(this).data('url');
                // 在app中，视频课需要跳转app视频课详情页面
                var videoNumber = $(this).data('number');
                var courseType = $(this).data('type');
                var forceUrl = $(this).data('forceUrl');

                if(forceUrl && forceUrl.length > 0) {
                    if (isStudentApp) {
                        app.openNewWindow(forceUrl);
                    } else {
                        location.href = forceUrl;
                    }
                } else {
                    if (isStudentApp) {
                        if (videoNumber && courseType == 3) {
                            var param = {};
                            // 注意：视频课的number必须转化成字符串，否则app不支持
                            param['number'] = videoNumber + '';
                            param['index'] = '';
                            app.send('toVideoCourseDetail', param);
                        } else {
                            app.openNewWindow(url);
                        }
                    }
                    else {
                        location.href = url;
                    }
                }
            });
    };

    // 设置当前位置与老师的距离
    var distanceCount = function () {
        cityMgr.geoLocation(function (lat, lng) {
            var distance;
            var currentParam = {
                lat: lat,
                lng: lng
            };
            var courseParam = {
                lat: pageData.lat,
                lng: pageData.lng
            };
            distance = math.computeDistance(currentParam, courseParam, '');
            distance = Math.round(distance / 1000, 5);
            if (distance > 0) {
                container.find('.address').find('.distance').text(distance + 'km');
                container.find('.address').find('.info').css('width', '52%');
                container.find('.address').find('.address-info').css('max-width', '68%');
            }
            else {
                container.find('.address').find('.distance').text('');
            }

        }, function () {
        }, false, true);
    };

    // 在app中设置app的navBar标题
    var appNavBarTitle = function () {
        if (isStudentApp) {
            app.send('setPageTitle', {title: pageData.title});
        }
        else if (isTeacherApp) {
            if (userInfo && userInfo.number == pageData.userNum) {
                app.send('setPageTitle', {title: '我的主页'});
            }
            else {
                app.send('setPageTitle', {title: pageData.title});
            }
        }
    };

    //编辑封面
    var editBackground = function () {
        var editDiv = $(".edit-banner");

        var userNum = pageData.userNum;
        if (userInfo && userInfo.number != '') {
            if (isApp && isTeacherApp) {
                if (userInfo.number == userNum) {
                    gsx_ready(function (pageConfig) {
                        // 只有会员才显示
                        if (pageConfig.user.vip_level > 0) {
                            // 显示编辑笔
                            $('.edit-background').show();
                            //老师app隐藏底部收藏栏
                            var url = pageData.cover_url;
                            if (appVersion > '2.8.0' || appVersion == '2.8.0') {
                                editDiv.click(function () {
                                    $('.page-mask').show();
                                    app.send('toChangeCoverBackground', {url: url});
                                });
                            }
                        }
                    });
                    
                }
            }
        }

    };

    // 超级会员模板，相关案例展开更多
    var spreadCase = function () {
        var caseContainer = container.find('.overflow-info');
        $.each(caseContainer, function () {
            var caseInfo = $(this).find('.info');
            var that = $(this);
            var caseHeight = 0;
            $.each(caseInfo, function () {
                caseHeight = caseHeight + parseInt($(this).height());
            });
            if (caseHeight > 260 * deviceRetio) {
                that.siblings('.more-info').show();
                that.addClass('overflow-height');
            }

            that.siblings('.more-info').click(function () {
                if ($(this).attr('data-spread') == "false") {
                    caseContainer.removeClass('overflow-height');
                    $(this).find('span').text('收起更多');
                    $(this).find('i').removeClass('icon-angle-down');
                    $(this).find('i').addClass('icon-angle-up');
                    $(this).attr('data-spread', 'true');
                } else {
                    caseContainer.addClass('overflow-height');
                    $(this).find('span').text('展开更多');
                    $(this).find('i').removeClass('icon-angle-up');
                    $(this).find('i').addClass('icon-angle-down');
                    $(this).attr('data-spread', 'false');
                }
            });
        });

    };

    /**
     * 课程图文详情处理
     */
    function initDragLoadDetail() {
        // 判断是否含有课程图文
        var detail = pageData.img_text;
        if (!detail) {
            // 没有就拉倒
            return;
        }

        var $mainContent = $('.main');
        var bottomTxt = $('.img-text');
        bottomTxt.on('click', function () {
            loadDetail();
        });
        var mainContent = $mainContent[0];

        function removeTouchEvent() {
            $mainContent.off('touchend.drag');
            $mainContent.off('touchmove.drag');
        }

        function animateScroll(endY) {
            var cY = window.scrollY;
            var speed = (endY - cY) / 20;
            var lastScrollY = cY + speed;
            window.scrollTo(0, lastScrollY);
            var roCount = 1;
            var intival = setInterval(function () {
                if (roCount >= 20) {
                    clearInterval(intival);
                    window.scrollTo(0, endY);
                } else {
                    lastScrollY += speed;
                    window.scrollTo(0, lastScrollY);
                }
                roCount++;
            }, 10);
        }

        var $pContainer = $('#detail-container');

        /*0:没意义； 1：加载中； 2：加载完*/
        var loaded = 0;
        /*执行加载*/
        function loadDetail() {
            if (loaded == 2) {
                animateScroll($pContainer.position().top - 34 * deviceRetio);
            } else {
                animateScroll(document.body.scrollHeight - 240 * deviceRetio);
                var $classDetail = $('#detail');
                if (loaded == 1) {
                    return;
                }
                loaded = 1;
                bottomTxt.html('加载中,请稍后...');
                var fillContent = function (content) {
                    bottomTxt.hide();
                    $classDetail.html(content);
                    lazyLoadImage.init($classDetail);
                    var sh = document.body.scrollHeight - 240 * deviceRetio;
                    $classDetail.css({
                        'min-height': window.innerHeight + 'px'
                    });
                    $pContainer.show();
                    animateScroll(sh);
                    removeTouchEvent();
                    loaded = 2;
                };
                fillContent(detail);

            }
        }

    }

    // 超级会员模板，评价点赞功能
    var thumbUp = function () {
        container
            .on('click', '.support', function () {
                var support = $(this).data('support');
                var id = $(this).data('id');
                var count = parseInt($(this).find('.count').text());
                var that = $(this);
                var action;

                if (!support) {

                    action = 1;
                    count = count + 1;

                    service.ajaxCommentSupport({
                        action: action,
                        id: id
                    }).done(function (response) {
                        if (response.code == 0) {
                            that.addClass('active');
                            that.find('.count').text(count);
                            that.removeClass('support');
                            that.addClass('un-support');

                        }
                    });
                }
            });
    };

    // 点击查看全部评价,触发点击评价tab的方法
    var moreComment = function () {
        var introComment = container.find('.intro-comment');
        introComment
            .on('click', '.more', function () {
                var commentLi = container.find('.main-tab-title').find('.tab-comment');
                container.find('.main-tab-title').find('li').find('span').addClass('active');
                commentLi.siblings('li').find('span').removeClass('active');
                initActiveTab(commentLi);
                if (pageData.page_model == "vip") {
                    if (isApp && $('.main-tab-title').hasClass('tab_fixed')) {
                        window.scrollTo(0, height + 10 * deviceRetio);
                    }
                    else if ($('.main-tab-title').hasClass('tab_fixed')) {
                        window.scrollTo(0, height + 10 * deviceRetio);
                    }
                } else if (pageData.page_model == "super_vip") {
                    if (isApp && $('.main-tab-title').hasClass('tab_fixed')) {
                        window.scrollTo(0, height + 1 * deviceRetio);
                    }
                    else if ($('.main-tab-title').hasClass('tab_fixed')) {
                        window.scrollTo(0, height + 10 * deviceRetio);
                    }
                }
            });
    };

    // app中点击文章，需要调用Jokey接口
    var articleItem = function(){
        var articleTab = $("[data-tab='tab-article']");
        articleTab
            .on('click', '.item-article', function(e){
                if(isApp) {
                    app.send('toNews', {
                        url: $(this).attr('href')
                    });
                    e.preventDefault();
                    return false;
                }
            });
    };

    // 发送上报
    function sender(param){
        var cUrl = postUrl + '?' + util_object.toParamUrl(param, true);
        var img = new Image();
        img.onload = img.onerror = img.onabort = function(){
            img = null;
        };
        img.src = cUrl;
    }

    // 增加点击上报
    var report = function () {
        container.find('.tab-intro').on('click', function () {
            sender({
                type: 'teacher',
                stype: 'Introduction',
                key: 'tab-intro'
            });
        });
        container.find('.tab-photo').on('click', function () {
            sender({
                type: 'teacher',
                stype: 'Album',
                key: 'tab-photo'
            });
        });
        container.find('.tab-article').on('click', function () {
            sender({
                type: 'teacher',
                stype: 'article',
                key: 'tab-article'
            });
        });
        container.find('.tab-comment').on('click', function () {
            sender({
                type: 'teacher',
                stype: 'comment',
                key: 'tab-comment'
            });
        });
        container.find('.title-more-course').on('click', function () {
            sender({
                type: 'teacher',
                stype: 'more_class',
                key: 'title-more-course'
            });
        });
        container.find('.more-course').on('click', function () {
            sender({
                type: 'teacher',
                stype: 'more_class',
                key: 'title-more-course'
            });
        });
    };

    // 判断是否展示分期标志
    var showStagingFlag = function() {
        var phoneEnv = env.os;
        var isIphone = phoneEnv.isIPhone;

        $('.fenqi').each(function() {
            var that = $(this);
            var isVideoFlag = that.data('video');
            if (!(isApp && (isVideoFlag == 1) && isIphone)) {
                that.show();
            }
        });
    };

    function showChristmasMark() {
        var timeStamp = +new Date(),
            startTime = +new Date('2016/12/23 00:00:00'),
            endTime = +new Date('2016/12/27 00:00:00');
        if (timeStamp > startTime && timeStamp < endTime) {
            $('.christmas-mark').show();
        }
    }

    return function (page_data) {
        pageData = page_data;
        deviceRetio = window.devicePixelRatio;
        userInfo = user.getUserInfo();
        lazyLoadImage.init();
        isApp = app.isApp();
        isStudentApp = app.isStudentApp();
        isTeacherApp = app.isTeacherApp();
        var isOrgApp;
        isOrgApp = app.isOrgApp();
        appVersion = app.appVersion();
        isWeixin = env.thirdapp && env.thirdapp.isWeixin;
        hostStr = window.location.hostname;
        host = hostStr.split('.');
        isKaoyan = /kaoyan/g;
        isJinyou = /jinyou/g;
        var isChengduSem = pageData.is_sem_chengdu;
        var SEMTeacherInfo = {
            name: pageData.title,
            orgName: pageData.org_name,
            type: 'Teacher',
            number: pageData.teacher_number
        };

        if (isChengduSem && !isTeacherApp && !isOrgApp) {
            ChengduSem(SEMTeacherInfo);
            $('#bottom-chat').attr('href', 'tel:4000630083');
        }

        if (!isApp && pageData.canAppDownload) {
            topAction();
        }
        showChristmasMark();
        audioPlay();
        tabUrl();
        tabClick();
        expSpread();
        countFeature();
        fixTab();
        photoClick();
        articleMore();
        commentTypeChange();

        previewPage();

        shareShow();

        qrCodeClick();

        bottomHide();

        bottomButton();

        //appointCourse();

        tryButtonBind();

        report();

        //appFocus();

        //consult();

        courseLink();

        distanceCount();

        appNavBarTitle();

        editBackground();

        spreadCase();

        initDragLoadDetail();

        var otherInfos = transToPx.init(pageData.otherInfo);
        if (pageData.model === 'green') {
            $('.detail-container').find('#detail').html(otherInfos);
        } else {
            $('.img-text').find('.img-text-content').html(otherInfos);
        }

        thumbUp();

        moreComment();

        //staySingleInit();

        // articleItem();
        courseLinkforVip();
        // 展示分期标志
        showStagingFlag();

        //底部操作都在此
        BottomAction(pageData);

        question({
            teacher_number: pageData.teacher_number,
            model: pageData.model
        });

        /* 将居底的fix元素加入layout布局 */
        // var fixedFilter = isApp ? '.app-bottom' : '.bottom';
        // page_layout.bottom_fixed.addElement($(fixedFilter));

        // 分享
        if (pageData.shareInfo) {
            setShare(
                JSON.parse(pageData.shareInfo)
            );
        }

        //考研页面隐藏右上角按钮
        if (!isKaoyan.test(host[0]) && host[0].indexOf('jinyou') <= -1) {
            $('.nav-wrap-right .nav-button').tap(function () {
                navPanel.show();
            });
            $('.topTitle .nav-button').tap(function () {
                navPanel.show();
            });
        }
        //金囿页面隐藏右上角按钮
        if (host[0].indexOf('jinyou') > -1) {
            $('#bottom-chat').attr('href', 'tel:02164780375');
            $('.nav-wrap-right a').attr('href', location.origin + '/download/jinyou');
        }

        // 如果在红色模板中，上课地址有距离的时候，把上课地址的长度改为40%
        var addressBox = $('.teacher-intro .address');
        var hasDistance = addressBox.find('.distance').children().length;
        if (pageData.model === 'red' && hasDistance > 0) {
            var addressInfo = addressBox.find('.info');
            var windowWidth = window.screen.availWidth;
            if (windowWidth <= 320) {
                addressInfo.css('width', '44%');
            } else if (windowWidth > 320 && windowWidth <= 375) {
                addressInfo.css('width', '54%');
            } else if (windowWidth > 375) {
                addressInfo.css('width', '60%');
            }
        }

        buttonShow();

        comment = new Comment({
            comment_tag_num:page_data.total || "",
            teacher_number: pageData.userNum || ""
        });

        comment.listenerOne($(".student-comment"));
        // hurry: 移到最后，依赖广告条
        inter.init(pageData.teacher_number);
        // yuanye: 修改预约试听上报
        habo.initClick();
    };
});

