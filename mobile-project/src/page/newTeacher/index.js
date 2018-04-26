/* 新老师主页
* author huangshiming
* date 2016/12/26
*/

define(function(require) {

    'use strict';
    var $ = require('zepto');
    var lazyLoadImage = require('common/lazyLoadImage');
    var SlideImageControl = require('common/ui/slideImageControl/slideImageControl');
    var service = require('common/service');
    var fixTab = require('common/fixTab/fixTab');
    var app = require('common/app');
    var ui_new = require('common/ui');
    var SlideInDialog = require('common/mvc-tools/SlideInDialog/SlideInDialog');
    var imagePlayer = require('common/ui/ImagePlayer/showImagePlayer');
    var navPanel = require("common/navPanel");
    var couponFunc = require('common/component/coupon/coupon');
    var setShare = require('common/share/initialize');
    var habo = require('common/component/analysis/habo/index');
    var urlLink = require('util/url');
    var template = require('artTemplate');
    //var Iscroll = require('iscroll');
    var Swiper = require('swiper');
    var util_function = require('util/function');
    var inter = require('common/component/interactLayer/index');
    // var loading = require('common/ui/loading/index');
    var Loading = require('common/ui/Loading/index');
    var BottomAction = require('page/bottom/teacherBottom');
    var topAction = require('page/teacherCenter/_part/topBanner');
    var transToPx = require('common/function/transPxByRatio');

    var courseRender = template.compile(require('text!./render/course.tpl'));
    var courseNavRender = template.compile(require('text!./render/courseNav.tpl'));
    var comementNavRender = template.compile(require('text!./render/commentNav.tpl'));
    var commentRender = template.compile(require('text!./render/comment.tpl'));
    var dynamicNavRender = template.compile(require('text!./render/dynamicNav.tpl'));
    var wendaRender = template.compile(require('text!./render/wenda.tpl'));
    var articleRender = template.compile(require('text!./render/article.tpl'));
    var photoRender = template.compile(require('text!./render/photo.tpl'));
    var videoRender = template.compile(require('text!./render/video.tpl'));
    var personRender = template.compile(require('text!./render/personal.tpl'));
    var skillRender = template.compile(require('text!./render/skill.tpl'));
    var container;

    // 一些全局变量
    // 课程类型
    var courseType = 0;

    // 评价类型
    var commentType = 0;

    // other全局变量
    var page = 1;
    // 课程标签id
    var tagId;
    // 获取课程ajax类型:'tag'(点击标签),'classType'(切换课程类型||点击"课程"tab),'more'(获取更多)
    var courseAjaxType;
    // 课程标签容器
    var tagContainer;
    var pageData;
    var isApp;
    var isTeacherApp;
    var isStudentApp;
    var offsetHeight;
    var adsInit = false;
    var navBar;
    var ajaxFlag = true;
    var navType = 'home';
    var dynamicBarType = 'wenda';
    var dialog;

    //  评价星星nav展示
    var commentNav = '';
    // 评价的分数 只第一次请求
    var averageScore = 0;
    var staticNoticeInfo = {};

    // 老师number
    var teacherNumber;
    var hasMoreDom;

    // 高清比率
    var deviceRetio;

    var loading = new Loading();

    // 首页相册让高度和宽度一样
    var formatHeight = function (name, rate) {
        name.find('img').each(function() {
            var that = $(this);
            var width = that.width();
            var height = width * rate;
            that.css('height', height);
        });
    };

    // 轮播图
    var initSlider = function () {
        var cContain = $('.myslider');
        var bullets = cContain.find('.slide_position li');
        var curimage = new SlideImageControl(cContain[0], {
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
    };

    // // 课程tab可以支持滑动
    // var listScroll = function () {
    //     new Iscroll(
    //         '.list-container', {
    //             probeType: 1,
    //             useTransition: true,
    //             click: true,
    //             scrollX: true,
    //             scrollY: false,
    //             tab: true
    //         }
    //     );
    // }

    // 用swiper支持课程的tab滑动
    var swiperFunc = function () {

        var scWidth = window.screen.width;
        var number = 3.5;
        if(scWidth >= 330 && scWidth <= 375) {
            number = 4;
        }  else if (scWidth > 375) {
            number = 4.5;
        }
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            slidesPerView: number,
            paginationClickable: true,
            spaceBetween: 0,
            freeMode: true
        });
    };

    // 切换课程标签
    var tagChange = function () {
        tagContainer = $('.tag-container');
        tagContainer.on('click','.tag', function () {
            var self = $(this);
            courseAjaxType = 'tag';
            page = 1;
            // 如果点击已经选中的标签,则取消选中
            if (self.hasClass('active')) {
                self.removeClass('active');
            } else {
                self.siblings('.tag').removeClass('active');
                self.addClass('active');
            }
            hasMoreDom.hide();
            courseType = $('.swiper-wrapper .course-item-tab.on').data('type');
            getCourseAjax();
        });
    };

    // 切换course的子tab
    var courseNavFunc = function () {
        $('.course-item-tab')
            .unbind('click')
            .on('click', function() {
                var that = $(this);
                courseAjaxType = 'classType';
                page = 1;
                toHobe({
                    type: that.data('stype')
                });
                hasMoreDom.hide();
                that.parent().siblings('.swiper-slide').find('.course-item-tab').removeClass('on');
                that.addClass('on');
                courseType = that.data('type');
                tagContainer.children('.tag').removeClass('active');
                getCourseAjax();
        });
    };

    //切换tab到courseTab下面的操作
    var getCourseAjax = function () {
        // 获取课程标签id
        var tagActive = tagContainer.children('.tag.active');
        tagId = tagActive.length === 1 ? tagActive.data('tagid')
                                       : undefined;
        var param = {
            id: teacherNumber,
            type: courseType,
            page: page
        };
        if (tagId !== undefined) {
            param['tag_id'] = tagId;
        }
        service.post(
            '/teacher/courseAjax', param,
            function(res) {
                if (+res.code === 0) {
                    // 如果是切换课程类型,则更新课程标签DOM
                    if (courseAjaxType === 'classType') {
                        var tagHTML = '';
                        var tagList = res.data.tag_list;
                        var tagCount;
                        if (tagList.length !== 0) {
                            tagContainer.show();
                            tagCount = tagList.length;
                            for (var i = 0; i < tagCount; i++) {
                                tagHTML += '<span class="tag" data-tagId="' + tagList[i].id + '">';
                                tagHTML += tagList[i].name;
                                tagHTML += '</span>';
                            }
                            tagContainer.html(tagHTML);
                        }
                        else {
                            tagContainer.html('');
                            tagContainer.hide();
                        }
                    }

                    var courseHtml = courseRender({
                        courseList: res.data.list,
                        hasMore: res.data.pager.has_more
                    });
                    container.find('.course-tab .course').remove();
                    container.find('.course-tab')
                        .append(courseHtml)
                        .siblings('.tab-container').hide();
                    lazyLoadImage.init();
                    goIntoNextPage();
                    container.find('.course-tab').css({
                        'padding-bottom': 10 * deviceRetio + 'px'
                    });

                    if (navBar.hasClass('fix-tab')) {
                        fixTabPadding('course-tab');
                    }

                    page = page + 1;
                    if (res.data.pager.has_more) {
                        hasMoreDom
                            .attr('data-next-cursor', page)
                            .show();
                        getNextPage();
                    } else {
                        hasMoreDom.hide();
                    }
                }
            });
    };

    //评论的星星(在artTemplate中无法用for，所以就在html中写)
    var initStars = function (starsNum) {
        var star = '';
        var halfStar = '<i class="icon icon-star_half half"></i>';
        var allStar = '<i class="icon icon-star_all"></i>';
        var greyStar = '<i class="icon icon-star_all" style="color: #dcddde;">';
        var halfBstar = '<b class="star-half">'
                        + '<i class="icon icon-star_half half"></i>'
                        + '<i class="icon icon-star_all" style="color: #dcddde;"></i>'
                        +'</b>';
        for (var i = 1; i <= 5; i++) {
            if (starsNum >= i) {
                star += allStar;
            } else if (i - starsNum >= 0.5 && i - starsNum < 1){
                star += greyStar;
            } else if (i - starsNum < 0.5) {
                star += halfBstar;
            } else {
                star += greyStar;
            }
        }
        return star;
    }

    //transtion 来渐变评价的进度条
    var getCommentLineWidth = function () {
        $('.star-item').each(function() {
            var that = $(this);
            var width = that.find('.line').width();
            var percent = that.data('percent');
            var maskWidth = (width * percent) + 'px';
            that.find('.line .mask').css('width', maskWidth);
        });
    }

    // 吸顶不够时进行填充的函数（包含一些吸顶的操作）
    var fixTabPadding = function (className) {
        var tabHeight = container.find('.' + className).height();
        var screenHeight = window.innerHeight;
        var bottomHeight = $('.bottom').height();
        var navHeight = $('.nav').height();
        if(tabHeight < screenHeight) {
            container.find('.' + className).css({
                'padding-bottom': screenHeight - tabHeight - bottomHeight - navHeight + (1 * deviceRetio) + 'px'
            });
        }
        initOffsetHeight();
        window.scrollTo(0, offsetHeight);
    }

    // comment下面的子tab
    var commentNavFunc = function () {
        $('.comment-nav-tab')
            .unbind('click')
            .on('click', function() {
                var that = $(this);
                page = 1;
                hasMoreDom.hide();
                commentType = that.data('type');
                //var commentUrl = location.href.split('?')[0] + '/tcomment';
                var commentUrl = location.href.split('?')[0] + '/ajax_comment';
                getCommentAjax(commentUrl, {
                        comment_type: commentType,
                        from_page: 'teacherDetail',
                        page: page,
                        comment_tag: 'all'
                    });
            });

    }


    //切换tab到commentTab下面的操作
    var getCommentAjax = function (url, params) {
        loading.show();
        service.post(
            url, params,
            function(res) {
                if (+res.code === 0) {
                    var commentData = res.data;
                    var commentAdditional = commentData.additional;
                    if (!commentNav) {
                        commentNav = comementNavRender({
                            commentInfo: {
                                score: commentAdditional.average,
                                count: commentAdditional.active_total_number,
                                total_score: commentAdditional.total_score
                            },
                            type: commentType,
                        });
                        averageScore = commentAdditional.average;
                    }
                    var commentListHtml = commentRender({
                        isFirstCommentPage: 1,
                        commentTags: (commentData.additional.comment_tags) ? commentData.additional.comment_tags : [],
                        commentList: commentData.comment_list
                    });
                    var commentListLength = commentData.comment_list.length;
                    if (commentListLength === 0) {
                        var commentEmptyNav = '<p class="none-comment">暂无评论</p>';
                        var commentHtml = commentNav + commentEmptyNav;
                    } else {
                        var commentHtml = commentNav + commentListHtml;
                    }

                    container.find('.comment-tab .comment-list').remove();
                    container.find('.comment-tab')
                        .html(commentHtml)
                        .siblings('.tab-container').hide();

                    var commentInfo = $('.comment-info');
                    if (commentListLength === 0) {
                        commentInfo.hide();
                    }
                    $('.comment-child-tab').find('.item').each(function () {
                        var that = $(this);
                        if (that.data('type') === commentType) {
                            that.addClass('on');
                        } else {
                            that.removeClass('on');
                        }
                    });
                    var leftComment = $('.comment-info .comment-left');
                    if (averageScore > 0) {
                        var allStarsHtml = initStars(averageScore);
                        leftComment.find('.stars').html(allStarsHtml);
                    } else {
                        leftComment.removeClass('not-empty');
                        leftComment.html('<p class="none-comment">暂无评分</p>');
                    }
                    getCommentLineWidth();
                    lazyLoadImage.init();
                    commentNavFunc();
                    openComment();
                    trumpFunc();
                    allPhotoFunc($('.comment-photos'));
                    var commentTagsContent = $('.commentTags');
                    commentTagsContent.on('click', '.tagItem', function () {
                        var that = $(this);
                        var commentUrl = location.href.split('?')[0] + '/ajax_comment';
                        page = 1;
                        getCommentAjax(commentUrl, {
                            comment_type: commentType,
                            from_page: 'teacherDetail',
                            page: page,
                            comment_tag: that.data('value')
                        });
                    });
                    $('.itme-score').each(function() {
                        var that = $(this);
                        var number = that.data('number');
                        var singleHtml = initStars(number);
                        that.html(singleHtml);
                    });

                    container.find('.comment-tab').css({
                        'padding-bottom': 10 * deviceRetio + 'px'
                    });

                    if (navBar.hasClass('fix-tab')) {
                        fixTabPadding('comment-tab');
                    }

                    page = page + 1;
                    if (res.data.has_more) {
                        hasMoreDom
                            .attr('data-next-cursor', page)
                            .show();
                        getNextPage();
                    } else {
                        hasMoreDom.hide();
                    }
                }
                loading.hide();
            }
        );
    };

    // 问答的相关操作都写在这个函数里面
    var wendaFunc = function (html, res) {

        var wendahtml = wendaRender({
            wendaList: res.data.question_list,
            wendaBasic: res.data.header_area
        });

        var dynamicHtml = html + wendahtml;
        if (html) {
            container.find('.dynamic-tab')
                .html(dynamicHtml)
                .siblings('.tab-container').hide();
            container.find('.dynamic-tab').css({
                'padding-bottom': 10 * deviceRetio + 'px'
            });

            if (navBar.hasClass('fix-tab')) {
                fixTabPadding('dynamic-tab');
            }
        } else {
            container.find('.dynamic-tab')
                .append(dynamicHtml)
        }
        dynamicNavFunc();
        lazyLoadImage.init();
        allPhotoFunc($('.ask-img'));
        audioLength();
        audioPlay();

        $('.ask-img').each(function() {
            var that = $(this);
            that.find('.ask-img-item').each(function() {
                var there = $(this);
                formatHeight(there, 1);
            });
        });

        $('.wenda-item')
            .find('.first-nav')
            .unbind('click')
            .on('click', function () {
                quitTab.home();
            });

        $('.wenda-item')
            .unbind('click')
            .on('click', function (e) {
                var that = $(this);
                var dom = e.target;
                dom = $(dom);
                if(!dom.hasClass('avatar') &&
                    !dom.hasClass('first-nav') &&
                    !dom.hasClass('ask-img-item') &&
                    !dom.hasClass('ask-single-img') &&
                    !dom.hasClass('audio-show')) {
                    if (isApp) {
                        app.openNewWindow(location.origin + that.data('url'));
                    } else {
                        location.href = that.data('url');
                    }
                }
            });

        //初始化提问的标识
        var askHtml = ''
                       +'<img class="ask-icon"'
                       + 'data-url="/Wenda/askQuestion"'
                       + 'src="https://imgs.genshuixue.com/0cms/d/file/content/2016/12/5857aa6a4caa3.png">'
        if(!container.hasClass('ask-icon')) {
            container.append(askHtml);
        }
        $('.ask-icon')
            .unbind('click')
            .on('click', function () {
                var that = $(this);
                if(isApp) {
                    app.openNewWindow(location.origin + that.data('url'));
                } else {
                    location.href = that.data('url');
                }
            });

    }

    // 文章的相关操作都写在这个函数里面
    var articleFunc = function (html, res) {
        var articlehtml = articleRender({
            basicInfo: pageData.base_info,
            articleList: res.data.articles
        });

        var dynamicHtml = html + articlehtml;
        if (html) {
            container.find('.dynamic-tab')
                .html(dynamicHtml)
                .siblings('.tab-container').hide();
            container.find('.dynamic-tab').css({
                'padding-bottom': 10 * deviceRetio + 'px'
            });
            if (navBar.hasClass('fix-tab')) {
                fixTabPadding('dynamic-tab');
            }
        } else {
            container.find('.dynamic-tab')
                .append(dynamicHtml);
        }
        goIntoNextPage();
        dynamicNavFunc();
        lazyLoadImage.init();
    };

    // 相册的相关操作都在这里
    var photoFunc = function (html, res) {
        var photoHtml = photoRender({
            photoList: res.data.photo_list
        });

        var dynamicHtml = html + photoHtml;
        if (html) {
            container.find('.dynamic-tab')
                .html(dynamicHtml)
                .siblings('.tab-container').hide();
            container.find('.dynamic-tab').css({
                'padding-bottom': 10 * deviceRetio + 'px'
            });
            if (navBar.hasClass('fix-tab')) {
                fixTabPadding('dynamic-tab');
            }
        } else {
            container.find('.dynamic-tab')
                .append(dynamicHtml);
        }
        dynamicNavFunc();
        formatHeight($('.teacher-photo'), 1);
        lazyLoadImage.init();
        allPhotoFunc($('.teacher-photo'));
    };

    // 视频的相关操作都在这里
    var videoFunc = function (html, res) {
        var videohtml = videoRender({
            basicInfo: pageData.base_info,
            videoList: res.data.video_list
        });

        var dynamicHtml = html + videohtml;
        if (html) {
            container.find('.dynamic-tab')
                .html(dynamicHtml)
                .siblings('.tab-container').hide();
            container.find('.dynamic-tab').css({
                'padding-bottom': 10 * deviceRetio + 'px'
            });
            if (navBar.hasClass('fix-tab')) {
                fixTabPadding('dynamic-tab');
            }
        } else {
            container.find('.dynamic-tab')
                .append(dynamicHtml);
        }
        dynamicNavFunc();
        goIntoNextPage();
        lazyLoadImage.init();

        $('.video-item').each(function() {
            var that = $(this);
            formatHeight(that.find('.video-preface .preface'), 0.5625);
        });
    };

    //动态子tab切换
    var dynamicNavFunc = function () {
        var param = {
            wenda: {
                teacher_number: teacherNumber,
                page: page,
                render: 'json'
            },
            article: {
                teacher_number: teacherNumber,
                page: page,
                render: 'json'
            },
            photo: {
                teacher_number: teacherNumber,
                next_cursor: page
            },
            video: {
                teacher_number: teacherNumber,
                next_cursor: page
            }
        };
        var dynamicChildTab = $('.dynamic-child-tab');
        dynamicChildTab.find('.item')
            .unbind('click')
            .on('click', function() {
                var that = $(this);
                page = 1;
                $('.ask-icon').remove();
                hasMoreDom.hide();
                dynamicBarType = that.data('type');
                getDynamicAjax(
                    that.data('url'),
                    param[that.data('type')],
                    that.data('type')
                );
            });
    };

    var QdynamicTab = {
        wenda: function(html, res) {
            wendaFunc(html, res);
        },
        article: function(html, res) {
            articleFunc(html, res);
        },
        photo: function(html, res) {
            photoFunc(html, res);
        },
        video: function(html, res) {
            videoFunc(html, res);
        }
    };

    //切换到dynamicTab下面的操作，默认是问答
    var getDynamicAjax = function (url, params, index) {
        loading.show();
        service.post(url, params, function (res) {
            if (+res.code === 0) {
                var dynamicNav = dynamicNavRender({
                    index: index,
                    params: staticNoticeInfo
                });

                QdynamicTab[index](dynamicNav, res);
                var hasMore;
                if (dynamicBarType === 'article') {
                    hasMore = res.data.pager.has_more;
                } else {
                    hasMore = res.data.has_more;
                }
                page = page + 1;
                if (hasMore) {
                    hasMoreDom
                        .attr('data-next-cursor', page)
                        .show();
                    getNextPage();
                } else {
                    hasMoreDom.hide();
                }
            }
            loading.hide();
        });
    }


    //切tab分发器
    var quitTab = {
        // 主页
        home: function() {
            if(ajaxFlag) {
                $('.ask-icon').remove();
                container.find('.home-tab')
                    .show()
                    .siblings('.tab-container').hide();
                navBar.find('.item').each(function () {
                    var that = $(this);
                    if(that.data('type') === 'home') {
                        that.addClass('active');
                    } else {
                        that.removeClass('active');
                    }
                });
                lazyLoadImage.init();
                if (navBar.hasClass('fix-tab')) {
                    initOffsetHeight();
                    window.scrollTo(0, offsetHeight);
                }
                hasMoreDom.addClass('hide');
            }
        },

        //课程tab
        course: function() {
            //课程的子tab是滑动的 所以要先加载出来并且不能以后切换的时候不能再加载模板
            $('.ask-icon').remove();
            var hasAllCourse = true;
            if (!(staticNoticeInfo.hasOne2oneCourse
                || staticNoticeInfo.hasOnlineCourse
                || staticNoticeInfo.hasOfflineCourse
                || staticNoticeInfo.hasVideoCourse)) {
                hasAllCourse = false;
            }
            if (hasAllCourse) {
                var courseNavHtml = courseNavRender({
                    params: staticNoticeInfo
                });
                navType = 'course';
                container.find('.course-tab')
                    .show()
                    .html(courseNavHtml);
                //listScroll();
                swiperFunc();
                courseNavFunc();
                courseAjaxType = 'classType';
                tagChange();
                getCourseAjax();
            } else {
                var emptyHtml = '<div class="empty">老师暂时还没有开设课程</div>';
                hasMoreDom.addClass('hide');
                container.find('.course-tab')
                    .show()
                    .html(emptyHtml)
                    .siblings('.tab-container').hide();
            }
        },

        //评价
        comment: function() {
            $('.ask-icon').remove();
            navType = 'comment';
            container.find('.comment-tab').show();
            if (pageData.students_comments.comment_count > 0) {
                var commentUrl = location.href.split('?')[0] + '/ajax_comment';
                getCommentAjax(
                    commentUrl, {
                    comment_tag: 'all',
                    commentType: commentType,
                    id: teacherNumber
                });
            } else {
                var emptyHtml = '<div class="empty">暂无评价</div>';
                hasMoreDom.addClass('hide');
                container.find('.comment-tab')
                    .show()
                    .html(emptyHtml)
                    .siblings('.tab-container').hide();
            }
        },

        //动态
        dynamic: function(url, params, type) {
            $('.ask-icon').remove();
            navType = 'dynamic';
            container.find('.dynamic-tab').show();
            if (staticNoticeInfo.hasVideo
                || staticNoticeInfo.hasPhoto
                || staticNoticeInfo.hasArticle
                || staticNoticeInfo.hasWenda) {
                getDynamicAjax(url, params, type);
                dynamicNavFunc();
            } else {
                var emptyHtml = '<div class="empty">暂无动态</div>';
                hasMoreDom.addClass('hide');
                container.find('.dynamic-tab')
                    .show()
                    .html(emptyHtml)
                    .siblings('.tab-container').hide();
            }
        }
    }

    var clickTab = function () {
        //第一层tab
        navBar.find('.item').unbind('click').on('click', function() {
            var that = $(this);
            page = 1;
            hasMoreDom
                .removeClass('loading')
                .removeClass('hide');
            that.siblings().removeClass('active');
            that.addClass('active');
            var flag = that.data('type');
            toHobe({
                type: that.data('stype')
            });
            if (flag === 'dynamic') {
                var firstIndynamic = [
                    staticNoticeInfo.hasVideo,
                    staticNoticeInfo.hasPhoto,
                    staticNoticeInfo.hasArticle,
                    staticNoticeInfo.hasWenda
                ];
                var index = 0;
                for (var i = 0; i < firstIndynamic.length; i++) {
                    if (firstIndynamic[i]) {
                        index = i;
                    }
                };
                var params = {
                    0: {
                        url: '/teacher/videos_ajax',
                        param: {
                            teacher_number: teacherNumber,
                            next_cursor: page
                        },
                        type: 'video'
                    },
                    1: {
                        url: '/teacher/photos_ajax',
                        param: {
                            teacher_number: teacherNumber,
                            next_cursor: page
                        },
                        type: 'photo'
                    },
                    2: {
                        url: '/teacher/article',
                        param: {
                            teacher_number: teacherNumber,
                            page: page,
                            render: 'json'
                        },
                        type: 'article'
                    },
                    3: {
                        url: '/wenda/teacherAnswer',
                        param: {
                            teacher_number: teacherNumber,
                            page: page,
                            render: 'json'
                        },
                        type: 'wenda'
                    }
                };
                // hurry: 动态获取
                dynamicBarType = params[index].type;
                quitTab[flag](params[index].url, params[index].param, params[index].type);
            } else {
                quitTab[flag]();
            }
        });

        //点击定位到对应的tab
        var hasMoreTab = $('.has-more-tab');
        hasMoreTab.unbind('click');
        hasMoreTab.unbind('click').on('click', function() {
            var that = $(this);
            courseType = 0;
            commentType = 0;
            toHobe({
                type: that.data('ctype')
            });
            navType = that.data('type');
            if (that.data('type') !== 'dynamic') {
                quitTab[that.data('type')]();
            } else {
                quitTab.dynamic(that.data('url'), {
                        teacher_number: teacherNumber,
                        page: page
                    },
                    that.data('stype'));
            }
            navBar.find('.item').each(function() {
                var there = $(this);
                there.removeClass('active');
                if (there.data('type') === that.data('type')) {
                    there.addClass('active');
                }
            });
        });

        // 通过url自动跳转
        if (urlLink().params.tab) {
            quitTab[urlLink().params.tab]();
        }
    }
    // 主要用于判断有没有广告位
    var initOffsetHeight = function () {
        if ($('.page-banner-wrap').length > 0 && !adsInit) {
            adsInit = true;
            var adsHeight = $(".page-banner-wrap").height() * deviceRetio;
            offsetHeight = offsetHeight + adsHeight;
        }
    };

    //所有跳转都写在这里
    var goIntoNextPage = function () {
        $('.clickRevers')
            .unbind('click')
            .on('click', function(e) {
                var that = $(this);
                var dom = e.target;
                dom = $(dom);

                toHobe({
                    type: that.data('stype')
                });

                //if (!dom.hasClass('favor') && !dom.parent().hasClass('favor') && !dom.hasClass('favor-course') && !dom.hasClass('favor-mask')) {
                if (isStudentApp) {
                    if (+that.data('type') === 3) {
                        var videoNumber = that.data('number');
                        var param = {
                            number: '' + videoNumber,
                            index: ''
                        };
                        app.send('toVideoCourseDetail', param);
                    } else {
                        app.openNewWindow(that.data('url'));
                    }
                } else {
                    location.href = that.data('url');
                }
            });
    };

    // 加载还有更多
    var getNextPage = function () {
        //var hDom = $('.has-more');
        if (!hasMoreDom.length) {
            return;
        }

        var lastScrollHeight = hasMoreDom.position().top;

        function updataMoreDom(hasMore, nextCursor) {
            if (hasMore && nextCursor) {
                hasMoreDom
                    .attr('data-next-cursor', nextCursor)
                    .show();
            } else {
                hasMoreDom.hide();
            }
        }

        var lastIndex = 0;
        var isLoading = false;

        function getMoreCourseAjax(params) {
            courseAjaxType = 'more';
            if (ajaxFlag) {
                ajaxFlag = false;
                hasMoreDom
                    .removeClass('hide')
                    .addClass('loading');
                service.post(
                    '/teacher/courseAjax',
                    params,
                    function(res) {
                        var data = res.data;
                        if (+res.code === 0) {
                            var courseHtml = courseRender({
                                courseList: res.data.list,
                                hasMore: res.data.pager.has_more
                            });
                            container.find('.course-tab')
                                .append(courseHtml);
                            lazyLoadImage.init();
                            goIntoNextPage();
                            page = page + 1;
                            updataMoreDom(res.data.pager.has_more, page);
                            if (+res.data.pager.has_more === 1) {
                                lastScrollHeight = hasMoreDom.position().top;
                            } else {
                                lastScrollHeight = 100000000000;
                            }
                        }
                        ajaxFlag = true;
                    });
            }
        }

        function getMoreCommentAjax(params) {
            if (ajaxFlag) {
                ajaxFlag = false;
                hasMoreDom.removeClass('hide');
                hasMoreDom.addClass('loading');
                service.post(
                    //location.href.split('?')[0] + '/tcomment',
                    location.href.split('?')[0] + '/ajax_comment',
                    params,
                    function(res) {
                        if (+res.code === 0) {
                            var commentData = res.data;
                            var commentListHtml = commentRender({
                                isFirstCommentPage: 0,
                                commentTags: (commentData.additional.comment_tags) ? commentData.additional.comment_tags : [],
                                commentList: commentData.comment_list
                            });
                            container.find('.comment-tab')
                                .append(commentListHtml);
                            lazyLoadImage.init();
                            openComment();
                            trumpFunc();
                            allPhotoFunc($('.comment-photos'));
                            page = page + 1;
                            $('.itme-score').each(function() {
                                var that = $(this);
                                var number = that.data('number');
                                var singleHtml = initStars(number);
                                that.html(singleHtml);
                            });
                            var pageHasMore = res.data.has_more;
                            updataMoreDom(pageHasMore, page);
                            if (pageHasMore) {
                                lastScrollHeight = hasMoreDom.position().top;
                            } else {
                                lastScrollHeight = 100000000000;
                            }
                        }
                        ajaxFlag = true;
                    }
                );
            }
        }

        function getMoreDynamicAjax(url, params) {
            if (ajaxFlag) {
                ajaxFlag = false;
                service.post(url, params, function(res) {
                    if (+res.code === 0) {
                        QdynamicTab[dynamicBarType]('', res);
                        page = page + 1;

                        var hasMore;
                        if (dynamicBarType === 'article') {
                            hasMore = res.data.pager.has_more;
                        } else {
                            hasMore = res.data.has_more;
                        }

                        updataMoreDom(hasMore, page);
                        if (hasMore) {
                            lastScrollHeight = hasMoreDom.position().top;
                        } else {
                            lastScrollHeight = 100000000000;
                        }
                    }
                    ajaxFlag = true;
                });
            }
        }

        function initDom() {
            if (window.scrollY + window.innerHeight >= lastScrollHeight - 20) {
                var params;
                if (navType === 'course') {
                    // 获取课程标签id
                    var tagActive = tagContainer.children('.tag.active');
                    tagId = tagActive.length === 1 ? tagActive.data('tagid')
                                                   : undefined;
                    params = {};
                    params = {
                        id: teacherNumber,
                        type: courseType,
                        page: page
                    }
                    if (tagId !== undefined) {
                        params['tag_id'] = tagId;
                    }
                    getMoreCourseAjax(params);
                } else if (navType === 'comment') {
                    params = {};
                    params = {
                        comment_type: commentType,
                        from_page: 'teacherDetail',
                        page: page
                    }
                    getMoreCommentAjax(params);
                } else if (navType === 'dynamic') {
                    params = {
                        wenda: {
                            url: '/wenda/teacherAnswer',
                            params: {
                                teacher_number: teacherNumber,
                                page: page,
                                render: 'json'
                            }
                        },
                        article: {
                            url: '/teacher/article',
                            params: {
                                teacher_number: teacherNumber,
                                page: page,
                                render: 'json'
                            }
                        },
                        video: {
                            url: '/teacher/videos_ajax',
                            params: {
                                teacher_number: teacherNumber,
                                next_cursor: page
                            }
                        },
                        photo: {
                            url: '/teacher/photos_ajax',
                            params: {
                                teacher_number: teacherNumber,
                                next_cursor: page
                            }
                        }
                    }
                    getMoreDynamicAjax(params[dynamicBarType].url, params[dynamicBarType].params);
                }
            }
        }

        $(window).unbind('scroll', initDom);
        $(window).on('scroll', initDom);
    }

    //个人认证的silide
    var personalIdentify = function () {
        $('.cert').unbind('click').on('click', function() {
            service.post('/teacher/cert/' + teacherNumber, {
                render: 'json'
            }, function(res) {
                if (+res.code === 0) {
                    var html = personRender({
                        personalList: res.data.certs
                    });

                    if (!dialog) {
                        var dialog = new SlideInDialog({
                            content: html
                        });
                    }
                    dialog.show();
                    $('.slide-close').unbind('click').on('click', function() {
                        dialog.hide();
                    });
                }
            })
        });
    }

    // 老师特点
    var teacherSkills = function () {
        $('.skills').unbind('click').on('click', function() {
            var html = skillRender({
                personalList: pageData.detail_info.skill
            });
            if (!dialog) {
                var dialog = new SlideInDialog({
                    content: html
                });
            }
            dialog.show();
            $('.slide-close').unbind('click').on('click', function() {
                dialog.hide();
            });
        });
    }

    // 评价展开打开
    var openComment = function () {
        $('.other-comment-title').unbind('click').on('click', function() {
            var that = $(this);
            that.hide();
            that.siblings('.other-comment-box').show();
        });
    }

    //点赞
    var trumpFunc = function () {
        $('.trump').unbind('click').on('click', function() {
            var that = $(this);
            if (!(+that.data('hasTrump')) && ajaxFlag) {
                // 可以点赞
                ajaxFlag = false;
                service.post('/comment/supportComment', {
                    comment_id: that.data('commentId')
                }, function(res) {
                    if (+res.code === 0) {
                        that.attr('data-trump-number', that.data('trumpNumber') + 1);
                        that.attr('data-has-trump', 1);
                        that.find('.number').text('(' + that.data('trumpNumber') + ')');
                        that.find('.icon-like').addClass('active');
                        that.find('.number').addClass('active');
                    }
                    ajaxFlag = true;
                });
            } else if (+that.data('hasTrump')) {
                ui_new.remind('您已经点过赞了');
            }
        });
        }

    //单张图片预览
    var singlePhotoFunc = function () {
        $('.single-img').unbind('click').on('click', function() {
            var photo = $(this).data('src');
            var result = [];
            result.push(photo);
            imagePlayer(result, 0);
        });
    }

    // 数组图片预览
    var allPhotoFunc = function (className) {
        var childClass = '';
        className.on('click', 'img', function() {
            var imgArray = [];
            var that = $(this);
            toHobe({
                type: that.data('stype')
            });
            that.parent().find('img').each(function() {
                var there = $(this);
                imgArray.push(there.data('src'));
            });
            imagePlayer(imgArray, that.data('index'));
        });
    }

    //初始化语音的长度
    var audioLength = function () {
        container.find('.audio-lenth').each(function() {
            var length = $(this).data('length');
            var lengthHtml = Math.floor(length / 60) + "' " + Math.ceil(length % 60) + '"';
            $(this).text(lengthHtml);
        });

        var headerAudio = $('.header').find('.audio-length');
        var length = headerAudio.data('length');
        var lengthHtml = Math.floor(length / 60) + "' " + Math.ceil(length % 60) + '"';
        headerAudio.text(lengthHtml);
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

        var playAudio = function(that, dynamicImgUrl, staticImgUrl) {
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

            that.addClass('audio-player');
            waveImg = that.find('.play-icon');
            len = Math.floor(audioLenth / 60) + "' " + Math.ceil(audioLenth % 60);
            setTimeout(function() {
                if (audioStatus) {
                    audio.pause();
                    audioStatus = 0;
                    waveImg.attr('src', staticImgUrl);
                    return false;
                } else {
                    if (!audioLoaded) {
                        that.find('span').html('下载中');
                        that.find('span').html(len);
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
                            that.find('span').html(len);
                        } else {
                            overPlus = Math.floor(overPlus / 60) + "' " + Math.ceil(overPlus % 60) + '"';
                            that.find('span').html(overPlus);
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
        }



        $('.header').unbind('click').on('click', '.teacher-audio-show', function(e) {
            var that = $(this);
            var dynamicImg = 'https://imgs.genshuixue.com/0cms/d/file/content/2016/01/56a1c08824e48.gif';
            var staticImg = 'https://imgs.genshuixue.com/0cms/d/file/content/2016/01/569ee8d2bf4e1.png';
            playAudio(that, dynamicImg, staticImg);
        });

        $('.audio-show').unbind('click').on('click', function() {
            var that = $(this);
            var dynamicImg = 'https://imgs.genshuixue.com/0cms/d/file/content/2016/01/56a1c08824e48.gif';
            var staticImg = 'https://imgs.genshuixue.com/0cms/d/file/content/2016/01/569ee8d2bf4e1.png';
            playAudio(that, dynamicImg, staticImg);
        });
    }

    // 分享
    var toShare = function () {
        var shareInfo = {
            title: pageData.share_info.title,
            content: pageData.share_info.content,
            img: pageData.share_info.img
        };
        setShare(shareInfo);
    }

    // 上报
    var toHobe = function (arg) {
        habo.send(arg);
    }


    // 点击展开过往经历和相关案例
    var openRelaExp = function () {
        $('.short-icon').unbind('click').on('click', function () {
            var that = $(this);
            that.hide();
            that.siblings('.exp-relative-box').each(function () {
                var there = $(this);
                if (there.hasClass('hide')) {
                    there.removeClass('hide');
                }
            });
        });
    }


    return function (page_data) {
        deviceRetio = window.devicePixelRatio;
        isApp = app.isApp();
        isTeacherApp = app.isTeacherApp();
        isStudentApp = app.isStudentApp();
        navBar = $('.nav');
        container = $('.container');
        pageData = page_data;
        teacherNumber = pageData.base_info.number;
        pageData.teacher_number = teacherNumber;
        pageData.isOne2oneTeacher = pageData.is_one_on_one_teacher;
        hasMoreDom = $('.has-more');
        var staticNInfo = pageData.static_notice_info;
        staticNoticeInfo = {
            hasVideo: false,
            hasPhoto: false,
            hasArticle: false,
            hasWenda: staticNInfo.has_wenda,
            hasOne2oneCourse: staticNInfo.has_one2one_course,
            hasOnlineCourse: staticNInfo.has_online_course,
            hasOfflineCourse: staticNInfo.has_offline_course,
            hasVideoCourse: staticNInfo.has_video_course
        };
        service.post('/teacher/article', {
            teacher_number: teacherNumber,
            page: 1,
            render: 'json'
        }, function (res) {
            if(+res.code === 0) {
                if(res.data.pager.total > 0) {
                    staticNoticeInfo.hasArticle = true;
                }
            }
        });

        if (pageData.videos.length > 0) {
            staticNoticeInfo.hasVideo = true;
        }
        if (pageData.photos.length > 0) {
            staticNoticeInfo.hasPhoto = true;
        }
        formatHeight($('.photo-container'), 1);
        lazyLoadImage.init();
        if (pageData.videos && pageData.videos.length > 0) {
            initSlider();
        }
        goIntoNextPage();
        clickTab();

        window.gsx_ready(function (config) {
            var ads = config.page_data.ads.top;
            if (ads.length > 0 && !isApp) {
                fixTab(navBar[0], true);
            } else {
                fixTab(navBar[0], false);
            }
        });

        personalIdentify();
        teacherSkills();
        openRelaExp();
        $('.coupon').unbind('click').on('click', function () {
            toHobe({
                type: $(this).data('stype')
            });
            couponFunc.init({
                teacher_number: teacherNumber
            });
        });
        //couponFunc();
        singlePhotoFunc();
        allPhotoFunc($('.photo-container'));
        audioLength();
        audioPlay();
        if (!pageData.title) {
            pageData.title = pageData.base_info.name;
        }
        // hurry: 预约试听，机构老师取机构number，没有取老师number
        pageData.userNum = (pageData.org && pageData.org.number)
            || teacherNumber;
        BottomAction(pageData);
        if (!isTeacherApp) {
            inter.init(teacherNumber);
        }
        if (isApp) {
            offsetHeight = $('.header').height() - navBar.height() + 58 * deviceRetio;
        } else {
            // 名称bar的高度
            offsetHeight =$('.header').height() + 62 * deviceRetio - navBar.height();
        }
        if (!isApp && urlLink().params.viewType !== 'hide') {
            topAction();
        }

        if (app.isTeacherApp() || app.isOrgApp()) {
            $('.bottom').hide();
        }

        $('.topTitle .nav-button').tap(function() {
            navPanel.show();
        });

        initOffsetHeight();
        toShare();
        habo.initClick();

        var filterS = transToPx.init(pageData.other_info);
        $('.other-info .info').html(filterS);
    }


});