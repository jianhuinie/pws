/**
 * Created by chenmo on 16/1/15.
 */
define(function (require) {
    'use strict';
    var $ = require("zepto");
    var iScroll = require('iscroll');
    var ui = require("common/ui");
    var lazyLoadImage = require('common/lazyLoadImage');
    var service = require('common/service');
    var imagePlayer = require('common/ui/ImagePlayer/showImagePlayer');
    var Comment = require("page/_common/comment");
    var url = require("util/url");
    var urlUtil = require('util/url_v2');
    var app = require('common/app');

    var tabList = $('.tab-title');
    var commentPanel = $('.comment-panel');
    var moreComment = $('.more-comment');
    var courseMoreComment = $('.course-more-comment');
    var commentBtn = $('#comment-icon');   

    var teacherNum;
    var scriptData;

    function photosArray(element) {

        var photos = element.find('li img');

        var result = [];
        for (var i = 0, max = photos.length; i < max; i++) {
            result.push($(photos[i]).data('src'));
        }

        return result;
    }


    //顶部评价
    function comment() {
        var cDom = $('#comment-main');
        if (cDom.length > 0) {
            $('#comment-mask')
                .bind('touchmove', function (e) {
                    e.preventDefault();
                    return false;
                })
                .on('click', function () {
                    cDom.hide();
                });

        }
        commentBtn.on('click', function (e) {
            if (cDom.length > 0) {
                if (cDom.is(':hidden')) {
                    cDom.show();
                    if (!comment.loaded) {
                        new iScroll('.comment-list', {
                            mouseWheel: true,
                            tap: true,
                            click: true
                        });
                        comment.loaded = true;
                    }
                } else {
                    cDom.hide();
                }
            } else {
                ui.remind('完成相应课节才可以评价哦');
            }
            e.preventDefault();
            return false;
        });
    };

    function getAbsoluteLink(href) {
        var newElement = $('<a href="' + href + '"></a>')[0];
        var result = newElement.href;
        if (!(result.indexOf('http://') == -1 && result.indexOf('https://') == -1)) {
            return result;
        } else {
            return false;
        }
    }

    function initEvent() {
        $('body>*').on('click', 'a', function (e) {
            var url = getAbsoluteLink(this.href);
            if (url) {
                e.preventDefault();
                var link = encodeURI(url);
                if (app.isApp()) {
                    app.openNewWindow(link);
                }
                else {
                    if (window.top) {
                        // 暂时不考虑跨域问题
                        window.top.location.href = link;
                    }
                    location.href = link;
                }
            }
        });
    }

    return function (page_data) {
        scriptData = page_data;
        // hurry: iframe嵌套部分机型宽度有问题，需要显示指定
        if (window.top) {
            $('.tab-list').css('width', screen.availWidth + 'px');
            window.top.postMessage(JSON.stringify({ height: $(document).height() }), '*');
        }
        lazyLoadImage.init();
        teacherNum = scriptData.teacherNum;
        initEvent();
        var commentTotal = new Comment({
            source: "2",
            teacher_number: teacherNum
        });

        var commentType = (url().params||{}).comment_type || 0;
        var total = scriptData.total|| "";

        commentTotal.send({
            comment_type: {
                0:1,
                1:2
            }[commentType] || commentType,
            comment_tag_num: commentType==0?total:"",
            comment_tag: ""
        });

        //顶部评价
        comment();
        //初始化photo高度
        //$('.main-course-comment .comment-photo-list').each(function () {
        //    var imgLi = $(this).find('li');
        //
        //    imgLi.each(function () {
        //        var width = imgLi.width();
        //        $(this).height(width);
        //    });
        //});

        /**
         * tab切换
         */
        tabList.on('click', 'li', function () {
            var me = $(this);
            var commentType = $(this).attr('comment_type');
            var faceType = $(this).data('face-type');
            if (!me.hasClass('active')) {
                tabList.find('.active').removeClass('active');
                me.addClass('active');
                var url;
                if (location.pathname == '/comment/getCourseComments') {
                    url = ''
                        + location.origin
                        + location.pathname
                        + '?course_number=' + scriptData.course_number
                        + "&comment_type=" + scriptData.comment_type
                        + '&face_type=' + faceType;
                }
                else {
                    url = ''
                        + location.origin
                        + location.pathname
                        + "?comment_type=" + commentType;
                }
                // hurry: 加来源信息
                var query = urlUtil.parseQuery(location.href);
                if (query.source) {
                    url += '&source=' + query.source;
                }
                location.href = url;
            }
        });
        //标签切换
        // var commentsFilter = $('.comments-filter');
        // commentsFilter
        // .on('click', 'li', function () {
        //     var me = $(this);
        //     var type = me.data('type');
        //     $('.comments-filter').find('.active').removeClass('active');
        //     me.addClass('active');

        //     service.post('/teacher/ajax_comment_selected', {
        //         type: type,
        //         page: 1,
        //         id: teacherNum
        //     }, function (res) {
        //         if (res.code == 0) {
        //             commentTotal.send({
        //                 page: 1,
        //                 comment_tag: $(me).text(),
        //                 comment_tag_num: type=="all" ? page_data.total : ""
        //             });

        //             var html = $.trim(res.data.tpl);
        //             if (html.length) {
        //                 commentPanel.html(html);
        //                 if (res.data.has_more) {
        //                     moreComment.html('查看更多评价').data('page', 2);
        //                 } else {
        //                     moreComment.html('没有更多评价了').data('page', 'nomore');
        //                 }

        //             }
        //             else {
        //                 commentPanel.html('<div class="no-comment">' +
        //                     '<img src="https://imgs.genshuixue.com/0cms/d/file/content/2015/09/55e58e64b2c1e.png" alt="">' +
        //                     '<p>暂无评价数据</p>' +
        //                     '</div>'
        //                 );

        //             }
        //             lazyLoadImage.init();
        //         }
        //     });

        // });

        commentPanel.on('click', '.comment-photo-list li', function () {
            var index = $(this).data('index');
            var parent = $(this).closest('ul');
            var photos = photosArray(parent);
            // hurry: iframe嵌套不能直接打开，需要在父页面打开
            if (window.top) {
                var params = {
                    photos: photos,
                    index: index
                };
                window.top.postMessage(JSON.stringify(params), '*');
                return;
            }

            imagePlayer(photos, index);
        });
        
        //查看同一用户其它课节的评价
        var userMoreComment = $('.user-more-comment');
        commentPanel.on('click', '.user-more-comment', function () {

            var me = $(this);
            var total = me.data('comment_num');

            var userNum = me.data('user_num');
            var parent = me.closest('.comment-list-wrapper');
            if (me.hasClass('next-page')) {
                location.href = "/comment/getMoreComment";
                return;
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
        //整页的加载更多
        moreComment
        .on('click', function () {
            var me = $(this);
            var type = $('.comments-filter').find('.active').attr('data-type');
            var page = me.data('page');
            if (page === 'nomore') {
                return;
            } else {
                page = +page;
            }

            me.html('正在加载更多评价......');
            service.post('tcomment', {
                comment_type: type,
                next_cursor: page
            }, function (res) {
                if (res.code == 0) {
                    var html = $.trim(res.data.tpl);
                    // var html = res.data.tpl;
                    if (html.length) {
                        commentPanel.find('.comment-list-wrapper').append(html);
                        if (res.data.has_more) {
                            me.data('page', page + 1);
                            me.html('加载更多评价');
                        } else {
                            me.html('没有更多评价了');
                            me.data('page', 'nomore');
                        }
                    } else {
                        me.html('没有更多评价了');
                        me.data('page', 'nomore');
                    }
                    lazyLoadImage.init();

                    commentTotal.send({
                        page: page
                    })
                }
            })
        });

        // 课程页的更多评价
        var flagCourseCommentCount = true;
        var courseCommentCountPost;
        courseMoreComment.on('click', function () {
            var me = $(this);
            var page = me.data('page');
            var param = {};
            if (flagCourseCommentCount) {
                param.course_comment_count = page_data.course_comment_count;
            }
            else {
                param.course_comment_count = courseCommentCountPost;
            }
            if (page === 'nomore') {
                return;
            } else {
                page = +page;
            }
            me.html('正在加载更多评价......');
            service.post('/comment/getCourseComments', {
                course_comment_count: param.course_comment_count,
                course_number: page_data.course_number,
                comment_type: page_data.comment_type,
                next_cursor: page,
                face_type: page_data.face_type
            }, function (res) {
                if (res.code == 0) {
                    var tpl = res.data.tpl;
                    var commentHtml = $.trim(tpl.comment_list);
                    var relatedHtml = $.trim(tpl.related_comment_list);

                    // var html = res.data.tpl;
                    if (commentHtml || relatedHtml) {
                        commentPanel.find('.comment-list').append(commentHtml);
                        if (relatedHtml && commentPanel.find('.related-comment-list').length == 0) {
                            commentPanel.find('.comment-list').addClass('.related-comment-list').append(relatedHtml);
                        }
                        else {
                            commentPanel.find('.related-comment-list').append(relatedHtml);
                        }
                        if (res.data.has_more) {
                            courseCommentCountPost = res.data.course_comment_count;
                            flagCourseCommentCount = false;
                            me.data('page', page + 1);
                            me.html('加载更多评价');
                        } else {
                            me.html('没有更多评价了');
                            me.data('page', 'nomore');
                        }
                    }
                    else {
                        me.html('没有更多评价了');
                        me.data('page', 'nomore');
                    }
                    lazyLoadImage.init();
                }
            })
        });


        commentPanel.on('click', '.like', function () {
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
    }

});