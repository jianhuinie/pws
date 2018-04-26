/**
 * Created by chenmo on 16/1/19.
 */
define(function (require) {
    'use strict';
    var $ = require('zepto');
    var imagePlayer = require('common/ui/ImagePlayer/showImagePlayer');
    var lazyLoadImage = require('common/lazyLoadImage');
    var iScroll = require('iscroll');
    var service = require('common/service');
    var ui = require("common/ui");
    var commentList = $('.comment-list-wrapper');
    var commentBtn = $('#comment-icon');
    var moreComment = $('.more-comment');
    var scriptData;
    var teacherNum;

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
    }

    function photosArray(element) {

        var photos = element.find('li img');

        var result = [];
        for (var i = 0, max = photos.length; i < max; i++) {
            result.push($(photos[i]).data('src'));
        }

        return result;
    }

    return function (page_data) {
        scriptData = page_data;
        teacherNum = scriptData.teacherNum;

        lazyLoadImage.init();
        ////初始化图片高度
        //$('.comment-photo-list').each(function () {
        //    var imgLi = $(this).find('li');
        //    var width = imgLi.width();
        //    imgLi.height(width);
        //});
        //加载大图
        commentList.on('click', '.comment-photo-list li', function () {
            var index = $(this).data('index');
            var parent = $(this).closest('ul');
            var photos = photosArray(parent);
            imagePlayer(photos, index);
        });
        comment();
        //加载更多
        moreComment.on('click', function () {
            var me = $(this);
            var user_id = scriptData.user_id;
            var anonymous = scriptData.anonymous;
            var course_number = scriptData.course_number;
            var page = me.data('page');
            if (page === 'nomore') {
                return;
            } else {
                page = +page;
            }
            me.html('正在加载更多评价......');
            service.post('/comment/getMoreCommentAjax', {
                user_id: user_id,
                next_cursor: page,
                anonymous: anonymous,
                course_number: course_number
            }, function (res) {
                if (res.code == 0) {
                    var html = $.trim(res.data.tpl);

                    if (html.length) {
                        commentList.find('#comment-ul').append(html);
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
                }
            })
        });
        commentList.on('click', '.like', function () {
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