/* 机构主页
* author huangshiming
* create 2016/11/11
*/
define(function(require) {

    'use strict';

    var $ = require('zepto');
    var swiperBoard = require('page/orgDetail/board/board');
    var service = require("common/service");
    var template = require('artTemplate');
    var app = require('common/app');
    var SlideImageControl = require('common/ui/slideImageControl/slideImageControl');
    var appoint = require('common/appoint/appoint');
    var lazyLoadImage = require('common/lazyLoadImage');
    var imagePlayer = require('common/ui/ImagePlayer/showImagePlayer');
    var setShare = require('common/share/initialize');
    var wxMaskOpen = require('common/component/wxMask/weixinMask');
    var user = require('common/user');
    var ui_new = require('common/ui');
    var env = require('util/env');
    var urlLink = require('util/url');
    var observer = require('common/mvc/observer');
    var ImageCheckCodeDialog = require('common/ui/ImageCheckCodeDialog/ImageCheckCodeDialog');
    var cookie = require('util/cookie');
    var countDown = require('page/orgDetail/board/countDown');
    var transToPx = require('common/function/transPxByRatio');

    // 一些全局变量
    var courseRender = template.compile(require('text!./render/course.tpl'));
    var commentNavRender = template.compile(require('text!./render/commentNav.tpl'));
    var courseNavRender = template.compile(require('text!./render/courseNav.tpl'));
    var commentRender = template.compile(require('text!./render/commentList.tpl'));
    var dynamicRender = template.compile(require('text!./render/dynamic.tpl'));
    var recordRender = template.compile(require('text!./render/record.tpl'));
    var initAdsRender = template.compile(require('text!./render/init.tpl'));
    var goldCouponRender = template.compile(require('text!./render/goldCoupon.tpl'));

    var isOrgApp;
    var userInfo;
    var pageData;
    var container = $('.container');
    var Iscroll = require('iscroll');
    var Swiper = require('swiper');
    var boardPane = $('.board');
    var ajaxUrl = location.href;
    var page = 1;
    var ajaxFlag = true;
    var courseWay = 'all';
    var courseType = 5;
    var commentTypes = 0;
    var commentWays = 'display_order';
    var isApp;
    var isTeacherApp;
    var appVersion;
    var navType = 'home';
    var isWeixin;
    var isGoldOrg;
    var tabItemContainer;
    var pageMain;


    // 需要设置一个参数来表示有没有吸顶 0-不吸顶的状态 1-吸顶的状态
    var fixStatus = 0;
    var checkCourseTpl = '';
    var baseInfo;
    var containerMask;
    var hasMore;
    var goldCouponBox

    // 初始化轮播图
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
    }

    //老师轮播页面
    var teacherSwiper = function () {

        //金牌机构一屏露出2.5个老师头像 普通机构一屏漏出4.5个老师头像
        var slidesPerView = 4.5;
        if (baseInfo.is_gold_certification) {
            slidesPerView = 2.5;
        }
        var swiper = new Swiper('.swiper-container-2', {
            pagination: '.swiper-pagination',
            slidesPerView: slidesPerView,
            paginationClickable: true,
            spaceBetween: 10,
            freeMode: true
        });
    }

    // 初始化好评的星星
    var stars = function () {
        var stars = $('.star');
        var count = stars.data('socre');
        var starImg = ''
            + '<span>'
            +       '<img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/10/5816ee8e34109.png">'
            + '</span>'
        var starshtml = '';
        for (var i = 0; i < parseInt(count); i++) {
            starshtml += starImg;
        }
        stars.html(starshtml);
    }


    //课程信息的ajax
    var getCourseAjax = function (orderType, courseType) {
        var courseTypeMap = {
            '5': '全部类型',
            '3': '直播课',
            '2': '线下班课',
            '1': '1对1',
            '4': '视频课'
        }
        if (ajaxFlag) {
            ajaxFlag = false;
            service.post(
                ajaxUrl, {
                    order_type: courseWay,
                    course_type: courseType,
                    next_cursor: parseInt(page),
                    render: 'json'
                },
                function (res) {
                    if (+res.code === 0) {
                        var data = res.data;
                        var courseHtml = courseRender({
                            data: data
                        });
                        if (page === 1) {
                            var courseNavhtml = courseNavRender({
                                index: courseType,
                                status: courseWay,
                                fixStatus: fixStatus
                            });
                            var courseAllhtml = courseNavhtml + courseHtml;
                            container.find('.container-box .course-container-box')
                                .show()
                                .html(courseAllhtml);
                            tabItemContainer.each(function () {
                                var that = $(this);
                                if(that.data('type') !== navType) {
                                    that.hide();
                                }
                            });
                            $('.course-nav .tab .all').find('span').text(courseTypeMap[courseType]);
                            if (fixStatus && $('.container-box .courses .course-content').find('.item').length) {
                                // hurry
                                // $('.container-box .courses .course-content').find('.item')[0].scrollIntoView();
                                $('.quart-f-no-fixed')[0].scrollIntoView();
                            }
                        } else if (page > 1) {
                            container.find('.container-box .course').append(courseHtml);
                        }
                        page = parseInt(page) + 1;

                        if (data.pager.has_more) {
                            hasMore
                                .attr('data-next-cursor', parseInt(page + 1))
                                .show();
                            getNextPage();
                        } else {
                            hasMore.hide();
                        }
                        lazyLoadImage.init();
                        sildeMoreType();
                        clickEvents();
                        collectCourse();
                        fixTab();
                        showStagingFlag();
                        countDown.countDown($('.last-time'));
                    }
                    ajaxFlag = true;
                }
            );
        }
    }

    //选择全部类型的时候的下拉框
    var sildeMoreType = function() {
        var moreCourseType = $('.course-nav').find('.tab .all');
        var nav = $('.course-nav .box');
        var item = $('.course-nav').find('.tab .item');
        var index = 0;
        item.unbind('click');
        item.on('click', function() {
            var that = $(this);

            hasMore.hide();
            containerMask.hide();
            page = 1;
            that.siblings('.item').each(function() {
                var there = $(this);
                there.removeClass('active');
            });
            that.addClass('active');
            courseWay = that.data('order');
            index = that.data('index');
            getCourseAjax(courseWay, courseType);
        });

        nav.find('.it').unbind('click');
        nav.find('.it').on('click', function() {
            var that = $(this);
            hasMore.hide();
            containerMask.hide();
            page = 1;

            that.siblings('.it').each(function() {
                var there = $(this);
                there.removeClass('active');
                there.find('img').addClass('hide');
            });
            that.addClass('active');
            that.find('img').removeClass('hide');
            nav.hide();
            containerMask.hide();
            moreCourseType.attr('data-status', 0);
            moreCourseType.text(that.data('value'));
            courseType = that.data('type');
            $('.tab').find('.item').each(function() {
                var there = $(this);
                if (there.hasClass('active')) {
                    index = there.data('index');
                }
            });
            //container.find('.courses').html('');
            getCourseAjax(courseWay, courseType);
        });

        moreCourseType.unbind('click');
        moreCourseType.on('click', function() {
            hasMore.hide();
            containerMask.hide();
            if (!(+moreCourseType.data('status'))) {
                nav.show();
                containerMask.show();
                moreCourseType.attr('data-status', 1);
            } else {
                nav.hide();
                containerMask.hide();
                moreCourseType.attr('data-status', 0);
            }
        });
        containerMask.unbind('click');
        containerMask.on('click', function() {
            containerMask.hide();
            nav.hide();
        });
    }

    //自动加载还有更多
    var getNextPage = function() {
        if (!hasMore.length) {
            return;
        }

        var lastScroHeight = hasMore.position().top;

        function updataMoreDom(hasMoreStatus, nextCursor) {
            if (hasMoreStatus && nextCursor) {
                hasMore
                    .attr('data-next-cursor', nextCursor)
                    .show();
            } else {
                hasMore.hide();
            }
        }


        function getCourseContentAjax(params) {
            if (ajaxFlag) {
                ajaxFlag = false;
                hasMore.text('加载中...');
                service.post(
                    ajaxUrl,
                    params,
                    function(res) {

                        var data = res.data;
                        if (+res.code === 0) {
                            var courseListhtml = courseRender({
                                data: data
                            });

                            page = parseInt(page) + 1;
                            container.find('.container-box .course-container-box').append(courseListhtml);
                            updataMoreDom(data.pager.has_more, parseInt(data.pager.next_cursor));
                            if (!data.pager.has_more) {
                                lastScroHeight = 100000000000;
                            } else {
                                lastScroHeight = hasMore.position().top;
                            }
                            lazyLoadImage.init();
                            sildeMoreType();
                            collectCourse();
                            clickEvents();
                            showStagingFlag();
                            countDown.countDown($('.last-time'));
                        }
                        ajaxFlag = true;
                        hasMore.text('还有更多');
                    });
            }
        }

        function getCommentContentAjax(params) {
            if (page > 1) {
                ajaxUrl = '/org/comment_ajax';
            }
            if (ajaxFlag) {
                ajaxFlag = false;
                hasMore.text('加载中...');
                service.post(
                    ajaxUrl,
                    params,
                    function(res) {

                        var data = res.data;
                        if (+res.code === 0) {
                            var commentListhtml = commentRender({
                                data: data
                            });

                            container.find('.container-box .comment-container-box').append(commentListhtml);
                            page = parseInt(page) + 1;
                            updataMoreDom(data.comment.has_more, parseInt(data.comment.next_cursor));
                            if (!data.comment.has_more) {
                                lastScroHeight = 100000000000;
                            } else {
                                lastScroHeight = hasMore.position().top;
                            }

                            sildeMoreType();
                            clickEvents();
                            commentPicArray();
                            lazyLoadImage.init();
                        }
                        ajaxFlag = true;
                        hasMore.text('还有更多');
                    });
            }
        }

        function getDynamicContentAjax(params) {
            if (ajaxFlag) {
                ajaxFlag = false;
                hasMore.text('加载中...');
                service.post(
                    ajaxUrl,
                    params,
                    function(res) {

                        var data = res.data;
                        if (+res.code === 0) {
                            var html = dynamicRender({
                                data: data,
                                img: baseInfo.logo,
                                orgName: baseInfo.name
                            });

                            container.find('.container-box .dynamic-container-box').append(html);
                            page = page + 1;
                            var resPager = data.pager;
                            updataMoreDom(resPager.has_more, parseInt(resPager.next_cursor));
                            if (!resPager.has_more) {
                                lastScroHeight = 100000000000;
                            } else {
                                lastScroHeight = hasMore.position().top;
                            }
                            lazyLoadImage.init();
                            clickEvents();

                            //sildeMoreType();
                        }
                        ajaxFlag = true;
                        hasMore.text('还有更多');
                    });
            }
        }

        function initDom() {
            if (window.scrollY + window.innerHeight >= lastScroHeight - 20) {
                var params;
                if (navType === 'course') {
                    params = {};
                    params = {
                        order_type: courseWay,
                        course_type: courseType,
                        next_cursor: parseInt(page),
                        render: 'json'
                    };
                    getCourseContentAjax(params, page);
                } else if (navType === 'comment') {
                    params = {};
                    params = {
                        org_id: baseInfo.number,
                        page: parseInt(page) + 1,
                        page_size: 15,
                        face_type: commentTypes,
                        sort_by: commentWays,
                        render: 'json'
                    };
                    getCommentContentAjax(params, page);
                } else if (navType === 'dynamic') {
                    params = {};
                    params = {
                        next_cursor: parseInt(page) + 1,
                        render: 'json'
                    };
                    getDynamicContentAjax(params, page);
                }
            }
        }
        $(window).unbind('scroll', initDom);
        $(window).on('scroll', initDom);

    };
    var getCommentAjax = function (commentType, commentWay) {
        if (ajaxFlag) {
            ajaxFlag = false;
            service.post(
                ajaxUrl, {
                    org_id: baseInfo.number,
                    page: page,
                    page_size: 15,
                    face_type: commentType,
                    sort_by: commentWay,
                    render: 'json'
                },
                function (res) {
                    var commentMap = {
                        display_order: "推荐评价",
                        create_time: "最新评价"
                    };
                    if (+res.code === 0) {
                        var data = res.data;
                        var commentCoursehtml = commentRender({
                            data: data,
                        });
                        if (page === 1) {
                            var commentNavhtml = commentNavRender({
                                index: commentType,
                                status: commentWay,
                                fixStatus: fixStatus
                            });
                            var commentAllhtml = commentNavhtml + commentCoursehtml;
                            container.find('.container-box .comment-container-box')
                                .show()
                                .html(commentAllhtml);
                            tabItemContainer.each(function () {
                                var that = $(this);
                                if(that.data('type') !== navType) {
                                    that.hide();
                                }
                            });
                            container.find('.comment-tab .all').find('span').text(commentMap[commentWay]);
                            if (fixStatus && $('.container-box .comment .content').find('.box').length) {
                                // $('.container-box .comment .content').find('.box')[0].scrollIntoView();
                                // hurry
                                $('.quart-f-no-fixed')[0].scrollIntoView();
                            }
                        } else {
                            container.find('.container-box .comment').append(commentCoursehtml);
                        }

                        if (data.comment.has_more) {
                            hasMore
                                .attr('data-next-cursor', parseInt(page + 1))
                                .show();
                            getNextPage();
                        } else {
                            hasMore.hide();
                        }

                        //stars();
                        clickEvents();
                        fixTab();
                        commentSlide();
                        commentPicArray();
                        lazyLoadImage.init();
                    }
                    ajaxFlag = true;
                }
            );
        }
    }

    //选择评价类型的时候的下拉框
    var commentSlide = function () {
        var moreCourseType = $('.comment-nav').find('.comment-tab .all');
        var mask = $('.course-content .mask');
        var nav = $('.comment-nav .box');
        var item = $('.comment-nav').find('.comment-tab .item');
        var index = 0;
        item.unbind('click')
        item.on('click', function() {
            var that = $(this);
            hasMore.hide();
            containerMask.hide();
            page = 1;
            that.siblings('.item').each(function() {
                var there = $(this);
                there.removeClass('active');
            });
            that.addClass('active');
            commentTypes = that.data('order');
            index = that.data('index');
            getCommentAjax(commentTypes, commentWays);

        });
        nav.find('.it').unbind('click');
        nav.find('.it').on('click', function() {
            var that = $(this);
            hasMore.hide();
            page = 1;
            that.siblings('.it').each(function() {
                var there = $(this);
                there.removeClass('active');
                there.find('img').addClass('hide');
            });
            that.addClass('active');
            that.find('img').removeClass('hide');
            moreCourseType.text(that.data('value'));
            nav.hide();
            containerMask.hide();
            moreCourseType.attr('data-status', 0);

            commentWays = that.data('type');
            $('.tab').find('.item').each(function() {
                var there = $(this);
                if (there.hasClass('active')) {
                    index = there.data('index');
                }
            });
            //container.find('.comment').html('');
            getCommentAjax(commentTypes, commentWays);
        });

        moreCourseType.unbind('click');
        moreCourseType.on('click', function() {
            if (!(+moreCourseType.data('status'))) {
                nav.show();
                containerMask.show();
                moreCourseType.attr('data-status', 1);
            } else {
                nav.hide();
                containerMask.hide();
                moreCourseType.attr('data-status', 0);
            }
        });
        containerMask.unbind('click');
        containerMask.on('click', function() {
            containerMask.hide();
            nav.hide();
        });
    }

    //评价Ajax
    var getDynamicAjax = function() {
        if (ajaxFlag) {
            ajaxFlag = false;
            service.post(
                ajaxUrl, {
                    number: baseInfo.number,
                    next_cursor: parseInt(page)
                },
                function(res) {
                    if (+res.code === 0) {
                        var data = res.data;
                        var dynamicHtml = dynamicRender({
                            data: data,
                            img: baseInfo.logo,
                            orgName: baseInfo.name
                        });
                        if (page === 1) {
                            container.find('.container-box .dynamic-container-box')
                                .show()
                                .html(dynamicHtml);
                            tabItemContainer.each(function () {
                                var that = $(this);
                                if(that.data('type') !== navType) {
                                    that.hide();
                                }
                            });
                            if (fixStatus && container.find('.container-box .dynamic').length)
                                // hurry
                                // container.find('.container-box .dynamic')[0].scrollIntoView();
                                $('.quart-f-no-fixed')[0].scrollIntoView();
                        }
                    } else {
                        container.find('.container-box').append(dynamicHtml);
                    }

                    if (data.pager.has_more) {
                        hasMore
                            .attr('data-next-cursor', parseInt(page + 1))
                            .show();
                        getNextPage();
                    } else {
                        hasMore.hide();
                    }
                    page = parseInt(page) + 1;
                    lazyLoadImage.init();
                    clickEvents();
                    fixTab();
                    ajaxFlag = true;
                });
        }
    }


    //点击链接进入新页面
    var clickEvents = function() {
        $('.showClick')
            .unbind('click')
            .on('click', function(e) {
            /*$(checkCourseTpl).addClass('hide');
            $(checkCourseTpl).css('display', 'none');*/
            $(checkCourseTpl).hide();
            var that = $(this);
            var dom = e.target;
            dom = $(dom);
            if (that.data('url')) {
                if (!dom.hasClass('favor')
                    && !dom.parent().hasClass('favor')
                    && !dom.hasClass('favor-course')
                    && !dom.hasClass('favor-mask')) {
                    if (isApp) {
                        if(that.hasClass('isVideo') || that.data('url').indexOf('video_course') > 0){
                            var videoNumber = that.data('number');
                            if (!videoNumber) {
                                videoNumber = that.data('url').split('?')[1].split('&')[0].split('=')[1];
                            }
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
                }
            }

        });
    }

    //预约试听bottom
    var appointOrg = function() {
        $('.bottom .appoint')
            .on('click', '.btn-appoint', function() {
                var param = {
                    courseType: 'org',
                    title: baseInfo.name,
                    objectId: baseInfo.number,
                    objectType: 'yunying.org_account',
                    tel400: baseInfo.extension,
                    orgNumber: baseInfo.number
                };
                appoint.appoint(param);
            });
    };

    //打电话
    var makePhoneCall = function() {
        $('.bottom .phone')
            .on('click', function () {
                var that = $(this);
                if (isApp) {
                    Jockey.send('toMakePhoneCall', {
                        phone_number: that.data('number')
                    });
                } else {
                    location.href = that.data('tel');
                }
            });

        $('.board .phoneCall')
            .on('click', function () {
                var that = $(this);
                if (isApp) {
                    Jockey.send('toMakePhoneCall', {
                        phone_number: that.data('number')
                    });
                } else {
                    location.href = that.data('tel');
                }
            });
    }

    //发消息

    var sendMsg = function() {
        var supportVersionNumber = app.version2Number(isTeacherApp ? '2.7.0' : '2.6.0');
        var currentVersionNumber = app.version2Number(appVersion);
        var imSupportVersionNumber = app.version2Number('3.0.7');
        var easemob = '';
        $('.bottom .consult')
            .on('click', function() {
                var that = $(this);
                if (that.data('easemob')) {
                    easemob = that.data('easemob');
                }
                var param = {
                    c_id: '' + baseInfo.number,
                    c_role: "6",
                    group_id: ""
                };
                if (currentVersionNumber >= supportVersionNumber) {
                    if ((userInfo && !userInfo.number) || !userInfo) {
                        // 2016-01-05 by caoying，学生端要求未登录时调用另外一个jokey接口,无需调用原来的登陆页面
                        if (currentVersionNumber >= imSupportVersionNumber) {
                            app.send('anonymousIM');
                        } else {
                            user.loginStudent();
                        }
                    } else {
                        app.send('IM', param);
                    }
                } else {
                    if (userInfo && !userInfo.number) {
                        user.loginStudent(function() {
                            app.send('toChat', { easemob: easemob });
                        });
                    } else {
                        app.send('toChat', { easemob: easemob });
                    }
                }
            });
    }

    //关注
    var focusAction = function() {
        $('.focus').on('click', function() {
            var that = $(this);
            var flag = 0;
            if (!(+that.data('flag'))) {
                flag = 1;
            }
            service.post('/focus/setFocus', {
                    status: flag,
                    user_number: baseInfo.number,
                    user_role: 6
                },
                function(res) {
                    if (+res.code === 0) {
                        if (flag === 1) {
                            that.text('已关注');
                            that.attr('data-flag', 1);
                            ui_new.remind('已关注');
                            that.css('background', '#9d9d9e');
                        } else {
                            that.text('关注');
                            that.attr('data-flag', 0);
                            ui_new.remind('已取消关注');
                            that.css('background', '#ff6c00');
                        }
                    }
                });
        });
    }

    //收藏课程
    var favorCourse = function(status, number, type) {
        service.post('/Collection/addFav', {
            type: status,
            number: number,
            value: type
        }, function (res) {
            if (+res.code === 0) {
                if (+type === 1) {
                    ui_new.remind('收藏成功');
                } else {
                    ui_new.remind('取消收藏');
                }
            }
        });
    }

    //检查收藏状态
    var collectCourse = function() {
        $('.favor').on('click', function() {
            var that = $(this);
            if(!checkCourseTpl) {
                that.parent().find('.favor-container .favor-info').removeClass('hide');
                checkCourseTpl = that.parent().find('.favor-container .favor-info')[0];
            } else {
                that.parent().find('.favor-container .favor-info').removeClass('hide');
                that.parent().find('.favor-container').html(checkCourseTpl);
            }

            var type = that.data('type');
            var collectStatus = that.data('collect');
            var status = 0;
            if (+collectStatus !== 4) {
                service.post('/Collection/checkCollectedAjax/' + type, {
                        number: that.data('number')
                    },
                    function(res) {
                        if (+res.code === 0) {
                            if (!res.data.is_favored) {
                                that.parent().find('.favor-info').show();
                                that.parent().find('.favor-info .favor-course').text('收藏课程');
                                status = 1;
                            } else {
                                that.parent().find('.favor-info').show();
                                that.parent().find('.favor-info .favor-course').text('取消收藏');
                                status = 0;
                            }
                            that.parent().find('.favor-info').unbind('click');
                            that.parent().find('.favor-info').on('click', function() {
                                favorCourse(type, that.data('number'), status);
                                that.parent().find('.favor-info').hide();
                            });

                        }
                    });
            } else {
                ui_new.remind('该课程暂不支持收藏');
            }
        });
    }


    /**
     * 音频播放
     * */

    // 模板音频长度设置
    var audioLength = function() {
        var audioLength = $('.board').find('.audio').data('length');
        var lengthHtml = Math.floor(audioLength / 60) + "'" + Math.ceil(audioLength % 60) + '"';
        $('.board').find('.audio .time').text(lengthHtml);
    };

    var audioPlay = function() {
        var url = baseInfo.audio.url;
        if (!url) {
            return;
        }
        var $audio = $('<audio preload="none" volume="1.0" src="' + url + '"></audio>');
        var audio = $audio[0];
        var audioStatus = 0;
        var audioLoaded = 0;
        audioLength();

        $('.board')
            .on('click', '.audio', function(e) {
                var that = $(this);
                var url = that.data('url');
                var len = that.data('length');
                var length;
                var dynamicUrl;
                var staticUrl;
                var waveImg;

                that.addClass('audio-player');
                waveImg = that.find('.audio');
                length = Math.floor(len / 60) + "'" + Math.ceil(len % 60) + '"';
                dynamicUrl = "https://imgs.genshuixue.com/0cms/d/file/content/2016/11/581a0d157f708.gif";
                staticUrl = 'https://imgs.genshuixue.com/0cms/d/file/content/2016/11/581a091f56369.png';

                if (audioStatus) {
                    audio.pause();
                    audioStatus = 0;
                    waveImg.attr('src', staticUrl);
                    return false;
                } else {
                    if (!audioLoaded) {
                        that.find('.time').html('下载中');
                        that.find('.time').html(length);
                    }
                    audio.play();
                    audioStatus = 1;
                    waveImg.attr('src', dynamicUrl);
                }

                audio
                    .addEventListener("timeupdate", function() {
                        var overPlus;
                        overPlus = (len - this.currentTime);
                        if (overPlus < 0) {
                            that.find('.time').html(length);
                        } else {
                            /*if (pageData.page_model != "super_vip") {
                                overPlus = Math.floor(overPlus / 60) + ':' + Math.ceil(overPlus % 60);
                            } else {
                                overPlus = Math.floor(overPlus / 60) + "'" + Math.ceil(overPlus % 60) + '"';
                            }*/
                            overPlus = Math.floor(overPlus / 60) + "'" + Math.ceil(overPlus % 60) + '"';
                            that.find('.time').html(overPlus);
                        }

                    });

                audio
                    .addEventListener('ended', function() {
                        audioStatus = 0;
                        waveImg.attr('src', staticUrl);
                    });

                audio.addEventListener('loadeddata', function() {
                    audioLoaded = 1;
                    waveImg.attr('src', dynamicUrl);
                });

                $(window).on('beforeunload', function() {
                    audio.pause();
                    audioStatus = 0;
                });

            });
    };

    // 分享
    var toShare = function () {
        var shareInfo = {
            title: pageData.share_info.title,
            content: pageData.share_info.content,
            img: pageData.share_info.img
        };
        setShare(shareInfo);
    }

    // 机构主页学生数量
    var studentCount = function () {
        service.post('/org/students_count', {
            number: baseInfo.number
        }, function(res) {
            if (+res.code === 0) {
                $('.student-number').text('学生 ' + res.data.students_count);
                if(isGoldOrg) {
                    $('.gold-borad').find('.border-bottom').css('display', 'flex');
                }
            }
        });
    }

    //点击图片预览
    var photoArray = function() {
        $('.board').on('click', '.photo', function() {
            var ImgArray = [];
            var that = $(this);
            if (that.find('img').data('index') < that.find('img').data('length') - 1) {
                that.parent().parent().find('.swiper-slide').each(function(item, index) {
                    ImgArray.push($(this).find('.photo img').data('img'));
                });
                imagePlayer(ImgArray, $(this).find('img').data('index'));
            }
        });
    }


    //点击评价图片预览
    var commentPicArray = function() {
        $('.comment-photo').on('click', function() {
            var ImgArray = [];
            var that = $(this);
            that.parent().find('img').each(function() {
                var there = $(this);
                ImgArray.push(there.data('src'));
            });
            imagePlayer(ImgArray, that.data('index'));
        });
    }

    //  点击评论或者课程的时候切换tab

    var moreCourseOrComment = function (param) {

        var clickParam = 'moreCourse';
        if(param === 'comment') {
            clickParam = 'moreComment';
        }

        $('.' + clickParam).on('click', function() {
            var that = $(this);
            $('.quart').find('.item').each(function() {
                var there = $(this);
                if(there.data('flag')!== param) {
                    there.removeClass('active');
                } else {
                    there.addClass('active');
                }
            });
            navType = param;
            hasMore.hide();
            page = 1;
            ajaxUrl = that.data('url');
            if(param === 'comment') {
                commentSlide();
                getCommentAjax(commentTypes, commentWays);
            } else {
                getCourseAjax(1, 5);
            }

        });
    }

    //参数以外部source进来，进行自动跳转
    var moreAutoDirect = function (source) {
        $('.quart').find('.item').each(function() {
            var there = $(this);
            if (there.data('flag') === 'home') {
                there.removeClass('active');
            } else if (there.data('flag') === source) {
                there.addClass('active');
            }
        });
        navType = source;
        hasMore.hide();
        page = 1;

        if(source === 'dynamic') {
            ajaxUrl = '/i/black/' + baseInfo.number;
        } else {
            ajaxUrl = '/i/' + source + '/' + baseInfo.number;
        }

        if(source === 'dynamic') {
            getDynamicAjax();
        } else if (source === 'course') {
            getCourseAjax(1, 5);
        } else if (source === 'comment') {
            getCommentAjax(commentTypes, commentWays);
        }

    }



    //tab吸顶

    function fixTab() {
        var screenHeight = screen.availHeight;

        function update() {
            var navBar = $('.quart-f-no-fixed');
            var navBarHeight = navBar.height();
            var navBarTop = navBar.offset().top;
            var bodyHeight = $(document.body).height();
            // hurry:
            //  1、显示fix的必要条件是:
            //      body的总高度 > nav的top + 屏幕的高度
            var isFixed = bodyHeight > navBarTop + screenHeight;
            var scrollTop = $(window).scrollTop();

            if (isFixed && (scrollTop > navBarTop)) {
                $('.quart-f-no-fixed').css('visibility', 'hidden');
                $('.quart-f-fixed')
                    .removeClass('hide')
                    .css('display', 'fixed')
                    .addClass('fix_tab');
                $('.comment-nav').addClass('comment-fix-tab');
                if ($('.course-nav').length) {
                    $('.course-nav-fixed')
                        .removeClass('hide')
                        .addClass('fix-course-tab');
                    $('.course-nav-no-fixed').css('visibility', 'hidden');
                }
                fixStatus = 1;
                $('.pull-content').removeClass('hide');
            } else if (scrollTop < (navBarHeight + navBarTop)) {
                $('.quart-f-no-fixed').css('visibility', 'visible');
                $('.quart-f-fixed')
                    .removeClass('fix_tab')
                    .addClass('hide');
                $('.comment-nav').removeClass('comment-fix-tab');
                if ($('.course-nav').length) {
                    $('.course-nav-fixed')
                        .addClass('hide')
                        .removeClass('fix-course-tab');
                    $('.course-nav-no-fixed').css('visibility', 'visible');
                }
                fixStatus = 0;
                $('.pull-content').addClass('hide');
            }
        }

        document.addEventListener('touchmove', update, false);
        $(window).scroll(update);
    }

    //矫正凤6手机一下屏幕宽度小于360的宽度的手机时，关注位置适当调整
    var fixFocusPosition = function() {
        var focusButton = $('.focus');
        focusButton.css({
            'top': '32px',
            'height': '30px',
            'line-height': '30px',
            'font-size': '14px'

        });
    }


    // 判断是否显示分期标签
    var showStagingFlag = function() {
        var phoneEnv = env.os;
        var isIphone = phoneEnv.isIPhone;

        $('.fenqi').each(function() {
            var that = $(this);
            var isVideoFlag = that.data('video');
            if (!(isApp && isVideoFlag && isIphone)) {
                that.show();
            }
        });
    }

    // 留单操作
    var liudan = function () {
        var liudan = $('.liudan');
        var studentPhone = $('.student-phone');
        var studentName = $('.student-name');

        var formElement = $('.formElement');
        var bottom = $('.bottom');

        formElement.find('input')
            .on('focus', function () {
                bottom.css({
                    'position': 'static'
                });
            })
            .on('blur', function () {
                bottom.css({
                    'position': 'fixed'
                });
            });

        liudan.find('.get').on('click', function () {
            var that = $(this);
            var deferred = $.Deferred();
            var phoneValue = studentPhone.find('input').val();
            var nameValue = studentName.find('input').val();
            var pattern = /^1[34578]\d{9}$/;

            if(nameValue.length < 2) {
                ui_new.remind('请输入正确的姓名');
                return false;
            }

            if(phoneValue.length !== 11) {
                ui_new.remind('请输入正确的手机号');
                return false;
            } else if (phoneValue === '') {
                ui_new.remind('请输入手机号');
                return false;
            } else if (!pattern.test(phoneValue)) {
                ui_new.remind('请输入正确的手机号');
                return false;
            } else {
                var doSend = function (imageCode) {
                    var param = {};
                    if (imageCode) {
                        param.captcha_code = imageCode + '';
                        param.captcha_name = 'common';
                    }
                    param.mobile = phoneValue;
                    param.object_number = baseInfo.number;;
                    param.content_type = 'jigou';
                    param.realname = nameValue;
                    param.detail_url = location.href;
                    param.advisory_type = 6;

                    // 调用预约试听接口
                    // 课程编号，班课/机构班课/机构，留言内容
                    service.post('/student_advisory/create', param, function (response) {
                        if (+response.code === 1000070) {
                            // 弹出图形验证码
                            var imageCodeDialog = new ImageCheckCodeDialog({
                                'text': '请输入图形验证码',
                                'type': 'common',
                                'errorText': +response.code === 110056 ? '验证码错误，请重新输入' : ''
                            });
                            observer.addListenerOnce(imageCodeDialog, 'success', function (code) {
                                imageCodeDialog.hide();
                                imageCodeDialog.destroy();
                                doSend(code);
                            });
                            observer.addListenerOnce(imageCodeDialog, 'cancel', function () {
                                deferred.resolve({
                                    code: -1
                                });
                            });
                            imageCodeDialog.show();
                        } else {
                            deferred.resolve(response);
                            if ((+response.code === 0) && response.data.result === 'succ') {
                                ui_new.remind('预约成功');
                            } else if (+response.code === 1) {
                                ui_new.remind(response.msg);
                            }
                        }
                        return false;
                    });
                };
                doSend();
            }
        });

    }

    // 点击证书
    var showRecord = function () {
        $('.gold-certi').on('click', function () {
            var recordCard = $('.record-card');
            var recordMask = $('.record-mask');

            if(!recordCard.length) {
                var certy = recordRender({
                    name: baseInfo.name,
                    recordId: baseInfo.contract_no,
                    beginTime: baseInfo.start_time,
                    endTime: baseInfo.end_time
                });
                pageMain.append(certy);
                recordCard = $('.record-card');
                recordMask = $('.record-mask');
            } else {
                recordCard.show();
                recordMask.show();
            }
            lazyLoadImage.init();
            recordCard.on('click', function () {
                recordCard.hide();
                recordMask.hide();
            });
            recordMask.on('click', function () {
                recordCard.hide();
                recordMask.hide();
            });
        });
    }

    //一进入的启动屏
    var initAds = function () {
        var hasInitAdsCookie = cookie.get('goldOrgInitAds' + baseInfo.number);
        var initAds;
        var initMask;
        var startScreen = pageData.start_screen;
        if (!hasInitAdsCookie) {
            if(!($('.initAds').length)) {
                var initAdshtml = initAdsRender({
                    img: startScreen.img_url,
                    url: startScreen.web_url
                });
                pageMain.append(initAdshtml);
                initAds = $('.initAds');
                initMask =$('.init-mask');
                lazyLoadImage.init();
            }

            initAds.find('.no-more').on('click', function () {
                cookie.set('goldOrgInitAds' + baseInfo.number, true, {expires: 24});
                initAds.remove();
                initMask.remove();
            });

            initAds.find('.close-box').on('click', function () {
                initAds.remove();
                initMask.remove();
            });
            clickEvents();
        }
    }

    //金牌机构的优惠券操作
    var goldCouponFunc = function () {
        var goldCouponInfo = pageData.coupon.list[0];
        var goldCouponHtml = goldCouponRender({
            price: goldCouponInfo.balance,
            url: goldCouponInfo.url
        });

        pageMain.append(goldCouponHtml);
        goldCouponBox = $('.gold-coupon-box');
        //向下滑一屏幕的时候
        $(window).on('scroll', function () {
            var scrollTop = $(window).scrollTop();
            var sHeight = window.screen.availHeight;
            var couponInfoBig = goldCouponBox.find('.coupon-info-big');
            var couponInfoSmall = goldCouponBox.find('.coupon-info-small');
            if(scrollTop > sHeight - 100) {
                couponInfoBig.addClass('hide');
                couponInfoSmall.removeClass('hide');
                goldCouponBox.css({
                    height: '3.125rem',
                    width: '3.125rem'
                });
                couponInfoSmall.find('img').css({
                    height: '3.125rem',
                    width: '3.125rem'
                });
            } else {
                couponInfoBig.removeClass('hide');
                couponInfoSmall.addClass('hide');
                goldCouponBox.css({
                    height: '4.375rem',
                    width: '4.375rem'
                });
                couponInfoBig.find('img').css({
                    height: '4.375rem',
                    width: '4.375rem'
                });
            }

        });
        clickEvents();
    }

    // 金牌机构所有的函数
    var goldOrgFunc = function () {
        // 留单操作
        liudan();
        //点击证书
        showRecord();
        //启动屏幕
        if (pageData.start_screen.img_url) {
            initAds();
        }
        //优惠券的交互
        if (pageData.coupon.list.length > 0) {
            goldCouponFunc();
        }

        // 锚点
        var screenTitle = $('.screenTitle');
        var liudanForm = $('.liudan');
        var hashTable = location.hash.split('#');
        var hasLiudanHash = false;

        for (var i = 0; i < hashTable.length; i++) {
            if (hashTable[i] === 'liudan') {
                hasLiudanHash = true;
            }
        }

        var Qheight = $('.quart-f-no-fixed').height();
        if (hasLiudanHash && screenTitle.length > 0) {
            $(window).scrollTop(screenTitle.offset().top - Qheight);
        } else if (hasLiudanHash && screenTitle.length === 0) {
            $(window).scrollTop(liudanForm.offset().top - Qheight);
        }

    }

    // 图文详情里面所有的图片都要压缩宽度
    var photoInfo = function () {
        $('.orgInfo').find('.content img').each(function () {
            var that = $(this);
            that.css({
                'width': '100%'
            });
        });
    };

    return function(page_data) {
        pageData = page_data;
        baseInfo = pageData.base_info;
        userInfo = user.getUserInfo();
        isTeacherApp = app.isTeacherApp();
        appVersion = app.appVersion();
        isWeixin = env.thirdapp && env.thirdapp.isWeixin;
        isApp = app.isApp();
        lazyLoadImage.init();
        isGoldOrg = baseInfo.is_gold_certification && (+baseInfo.template_id === 2);
        containerMask = $('.container-mask');
        hasMore = $('.has-more');
        pageMain = $('#page_main');
        swiperBoard();
        if (pageData.video.list.length > 0) {
            initSlider();
        }
        teacherSwiper();
        if (pageData.org_info) {
            var orgInfo = $('.detail').find('.info');
            orgInfo.html(pageData.org_info.content);
        }
        //stars();
        clickEvents();
        //getHomePage();
        appointOrg();
        sendMsg();
        studentCount();
        makePhoneCall();
        if (baseInfo.audio) {
            audioPlay();
        }
        focusAction();
        if (isWeixin) {
            var weChat = $('.bottom').find('.wechat');
            weChat.show();
            weChat.on('click', function () {
                wxMaskOpen.openMask('share');
            });
        }
        toShare();
        photoArray();
        showStagingFlag();
        /*moreCourse();
        moreComment();*/

        moreCourseOrComment('comment');
        moreCourseOrComment('course');

        fixTab();
        commentPicArray();
        // 图文详情
        photoInfo();

        // 限时折扣倒计时
        countDown.countDown($('.last-time'));
        lazyLoadImage.init();

        isOrgApp = app.isOrgApp();
        var detailBottom = $('.bottom');
        if(isOrgApp) {
            detailBottom.hide();
        }

        // if (isApp && screen.width < 350) {
        //     fixFocusPosition();
        // }

        // 机构或老师app中隐藏底栏和关注按钮
        if (app.isTeacherApp() || app.isOrgApp()) {
            $('.bottom, .focus').hide();
        }

        //tab参数
        var tabParams = ['dynamic', 'comment', 'course'];

        if(urlLink().params.source && (tabParams.indexOf(urlLink().params.source) > -1)) {
            moreAutoDirect(urlLink().params.source);
        }

        // 金牌机构的函数
        if(isGoldOrg){
            goldOrgFunc();
        }

        // 根据手机对头部line的宽度进行适配
        if (window.screen.availWidth > 350) {
            $('.border-bottom').find('.line').css({
                'margin-left': '10px',
                'margin-right': '10px'
            });
        }

        var orgInfos = pageData.org_info;
        if (orgInfos && orgInfos.content) {
            var filterS = transToPx.init(orgInfos.content);
            container.find('.detail .info').html(filterS);
        }

        var tab = $('.quart').find('.item');
        tabItemContainer = $('.tab-container-box');
        tab.on('click', function() {
            var that = $(this);
            var flag = that.data('flag');
            containerMask.hide();
            var items = $('.quart').find('li[data-flag="' + flag + '"]');
            items.each(function (i, v) {
                var me = $(v);
                me.addClass('active');
                me.siblings().each(function() {
                    var there = $(this);
                    there.removeClass('active');
                });
            });

            //切换的tab是主页
            if (flag === 'home') {
                navType = 'home';
                page = 1;
                hasMore.hide();
                if (goldCouponBox) {
                    goldCouponBox.show();
                }
                fixTab();
                tabItemContainer.each(function () {
                    var that = $(this);
                    if(that.data('type') !== navType) {
                        that.hide();
                    }
                });
                $('.home-container-box').show();

            } else if (flag === 'course') {
                //切换的tab是课程页
                navType = 'course';
                hasMore.hide();
                if (goldCouponBox) {
                    goldCouponBox.show();
                }
                page = 1;
                ajaxUrl = that.data('url');
                getCourseAjax(1, 5);

            } else if (flag === 'comment') {
                //切换评价页面
                navType = 'comment';
                hasMore.hide();
                if (goldCouponBox) {
                    goldCouponBox.show();
                }
                page = 1;
                ajaxUrl = that.data('url');
                commentSlide();
                getCommentAjax(commentTypes, commentWays);
            } else if (flag === 'dynamic') {
                //切换动态页面
                navType = 'dynamic';
                if (goldCouponBox) {
                    goldCouponBox.show();
                }
                hasMore.hide();
                page = 1;
                ajaxUrl = that.data('url');
                getDynamicAjax();
            }
        });
    };
});