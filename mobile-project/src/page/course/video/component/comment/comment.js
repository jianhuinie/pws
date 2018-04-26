/**
 * @file  评价
 * @author  hurry
 * @date  2017/1/16
 */
define(function (require) {
    'use strict';
    var appController = require('common/app');
    var SlideInDialog = require('common/mvc-tools/SlideInDialog/SlideInDialog');
    var ui_new = require('common/ui');
    var service = require('common/service');
    var LoginDialog = require('common/ui/LoginDialog/LoginDialog');
    var observer = require('common/mvc/observer');
    var lazyLoadImage = require('common/lazyLoadImage');
    var artTemplate = require('artTemplate');

    var navTab = require('../navTab/navTab');

    var shortCommentRender = artTemplate.compile(require('text!./shortComment.tpl'));
    var videoCourseInfo;
    var container = $('#container');
    var slideDialog;
    var isApp;
    var comment;
    var scriptData;

    // 首页ajax加载评论
    var getFirstCommentData = function () {
        service.videoMoreComment({
            page: 1,
            type: 'video',
            number: videoCourseInfo.number
        }).done(function (response){
            if (+response.code === 0) {
               var shortCommentHtml =  shortCommentRender({
                    list: response.data.comment_list
               });
               $('.comment-box').find('.comment-content-box').tpl(shortCommentHtml);
                lazyLoadImage.init();
            }
        });
    };

	// 发表评价
    var commitComment = function() {

        function doRequest (fn, params) {
            service.publishComment(params)
                .done(function(response) {
                    if (response.code == 0) {
                        // ui_new.remind("评价成功");
                        // dialog.hide();
                        // commentContent.find('.icon-star_all').removeClass('star-shine');
                        // commentContent.find('textarea').val('');
                        // commentContent.find('#anonymity').attr('checked', false);
                        // location.reload();
                        // 要操作的函数
                        fn();
                    } else if (+response.code === 888889) {
                        var conDom = ui_new.confirm({
                            content: response.msg,
                            title: '温馨提示',
                            button_ok: "继续评价",
                            button_cancel: "取消"
                        });
                        conDom.done(function () {
                            params['skip_verify'] = 0;
                            doRequest(fn, params);
                        });
                    }
                });
    }
        container
            .on('click', '.has-comment-banner,.enter-comment,.add-comment,.no-comment-symbol', function() {
                var that = $(this);
                gsx_ready(function(config) {
                    if (config.user) {
                        var additional = scriptData.comment_info.additional;
                        var canComment = additional.can_comment;
                        var hasComment = additional.has_comment;
                        if (canComment || (!canComment && additional.has_comment)) {
                            var dialogContent = $('<div class="comment-content"><div class="title">发表评价<span class="close-icon">' +
                                '<i class="icon icon-close"></span></div></div>');
                            var content = "<div class='comment-star'><i class='icon icon-star_all' data-index='1'></i><i class='icon icon-star_all' data-index='2'></i>" +
                                "<i class='icon icon-star_all' data-index='3'></i><i class='icon icon-star_all' data-index='4'></i><i class='icon icon-star_all' data-index='5'></i></div>";
                            var commentDetail = "<div class='comment-detail'><textarea class='detail-info' placeholder='快来写下你的评价吧！'></textarea></div>";
                            var anonymity = "<div class='comment-anonymity'><input type='checkbox' id='anonymity'/><label for='anonymity'>匿名评价</label></div>";
                            var commitBtn = "<div class='comment-commit'><div class='commit-button'>发表评价</div></div>";
                            // 第一次评价
                            if (!hasComment) {
                                dialogContent.append(content);
                                dialogContent.append(commentDetail);
                                dialogContent.append(anonymity);
                            } else {
                                // 追评不能匿名，也不能打分
                                dialogContent.append(commentDetail);
                            }

                            dialogContent.append(commitBtn);

                            if (!slideDialog) {
                                slideDialog = new SlideInDialog({
                                    content: dialogContent[0].outerHTML
                                });

                                var commentContent = $('.comment-content');
                                commentContent
                                    .on('click', '.icon-star_all', function() {
                                        var index = $(this).data('index');
                                        var stars = $(this).siblings('.icon');
                                        $(this).addClass('star-shine');
                                        $.each(stars, function() {
                                            if ($(this).data('index') < index) {
                                                $(this).addClass('star-shine');
                                            } else {
                                                $(this).removeClass('star-shine');
                                            }
                                        });
                                        // $('.commit-button').css('color', '#fff');
                                    });

                                commentContent
                                    .on('click', '.commit-button', function() {
                                        var iconStars = commentContent.find('.star-shine');
                                        var starIndex = 0;
                                        var anonymity;
                                        var anonymityFlag = 0;

                                        $.each(iconStars, function() {
                                            var index = $(this).data('index');
                                            if (index > starIndex) {
                                                starIndex = index;
                                            }
                                        });
                                        if (starIndex == 0 && !hasComment) {
                                            ui_new.alert("请输入评分！");
                                            return false;
                                        }
                                        var commentDetail = commentContent.find('.detail-info').val();
                                        if (!hasComment) {
                                            anonymityFlag = commentContent.find('.comment-anonymity').find('input')[0].checked;
                                            if (anonymityFlag) {
                                                anonymity = 1;
                                            } else {
                                                anonymity = 0;
                                            }
                                        }
                                        var param = {};

                                        // 发表评价
                                        if (!hasComment) {

                                            param['total_score'] = starIndex;
                                            param['info'] = commentDetail;
                                            param['anonymous'] = anonymity;
                                            param['skip_verify'] = 1;
                                            // param['purchase_id'] = videoCourseInfo.purChase_id;
                                            param['purchase_id'] = scriptData.comment_info.additional.purchase_id_video;
                                            doRequest(function () {
                                                ui_new.remind("评价成功");
                                                dialog.hide();
                                                commentContent.find('.icon-star_all').removeClass('star-shine');
                                                commentContent.find('textarea').val('');
                                                commentContent.find('#anonymity').attr('checked', false);
                                                location.reload();
                                            }, param);
                                            // service.publishComment(param)
                                            //     .done(function(response) {
                                            //         if (response.code == 0) {
                                            //             ui_new.remind("评价成功");
                                            //             dialog.hide();
                                            //             commentContent.find('.icon-star_all').removeClass('star-shine');
                                            //             commentContent.find('textarea').val('');
                                            //             commentContent.find('#anonymity').attr('checked', false);
                                            //             location.reload();
                                            //         } else if (+response.code === 888889) {
                                                        
                                            //         }
                                            //     });
                                        } else {
                                            param['info'] = commentDetail;
                                            param['comment_id'] = that.closest('.comment-praise').data('id');

                                            // 追加评价
                                            service
                                                .addCommentAddition(param)
                                                .done(function(response) {
                                                    if (response.code == 0) {
                                                        ui_new.remind("追评成功");
                                                        dialog.hide();
                                                        commentContent.find('.icon-star_all').removeClass('star-shine');
                                                        commentContent.find('textarea').val('');
                                                        commentContent.find('#anonymity').attr('checked', false);
                                                        location.reload();
                                                    }
                                                });
                                        }

                                    });

                                commentContent
                                    .on('click', '.close-icon', function() {
                                        dialog.hide();
                                        commentContent.find('.icon-star_all').removeClass('star-shine');
                                        commentContent.find('textarea').val('');
                                        commentContent.find('#anonymity').attr('checked', false);
                                    });

                            }

                            var dialog = slideDialog;
                            dialog.show();
                        } else {
                            var remindContent;
                            if (videoCourseInfo.price > 0) {
                                remindContent = "购买课程才能评价哦";
                            } else {
                                remindContent = "加入课程才能评价哦";
                            }
                            ui_new.alert(remindContent);
                            return false;
                        }

                    } else {
                        if (!isApp) {
                            //未登录
                            var loginDialog = new LoginDialog();
                            loginDialog.show();
                            var listener1 = observer.addListener(loginDialog, 'success', function() {
                                location.reload();
                            });
                            var listener2 = observer.addListener(loginDialog, 'display_changed', function() {
                                var display = this.get('display');
                                if (!display) {
                                    observer.removeListener(listener1);
                                    observer.removeListener(listener2);
                                    loginDialog && (loginDialog.destroy());
                                }
                            });
                        } else {
                            appController.getUserInfo(function() {
                                location.reload();
                            });
                        }
                    }
                });
            });
    };

    // 切换tab，查看不同类型的评价
    var commentTabChange = function() {
        var commentTags = $('.comment-detail-tag').find('.tag');
        var allCommentList = $('all-comment-lists').find('.comment-list');
        var moreLoading = allCommentList.closest('.all-comment-lists').find('.more-loading');
        commentTags.click(function() {
            var type = $(this).data('tag');
            service.videoMoreComment({
                page: 1,
                type: type,
                number: videoCourseInfo.number
            }).done(function(response) {
                if (response.code == 0) {
                    allCommentList.tpl('');
                    allCommentList.append(response.data.tpl);
                    if (response.data.additional.has_more) {
                        moreLoading.find('.more').text('查看更多评价');
                        moreLoading.attr('data-page', response.data.additional.next_cursor);
                    } else {
                        moreLoading.hide();
                    }
                }
            });
        });
    };

    // 点击查看更多评论
    var moreComment = function() {
        container
            .on('click', '.more-loading', function() {
                var next_cursor = $(this).attr('data-page');
                var that = $(this);
                var type = $('.comment-detail-tag').find('.active').data('tag');
                $(this).find('.more').text('正在加载更多评价');
                service.videoMoreComment({
                    page: next_cursor,
                    type: type,
                    number: videoCourseInfo.number
                }).done(function(response) {
                    if (response.code == 0) {
                        $('.all-comment-lists').find('.comment-list').append(response.data.tpl);
                        if (response.data.additional.has_more) {
                            that.find('.more').text('查看更多评价');
                            that.attr('data-page', response.data.additional.next_cursor);
                        } else {
                            that.hide();
                        }
                        lazyLoadImage.init();
                        comment.send({
                            page: next_cursor
                        });
                    } else {
                        that.find('.more').text('查看更多评价');
                    }
                });
            });
    };

    // 评价点赞
    var commentPraise = function() {
        container
            .on('click', '.praise-info', function() {
                var commentId = $(this).closest('.comment-praise').data('id');
                var thumbFlag = $(this).attr('data-thumb-flag');
                var praiseCount = parseInt($(this).attr('data-count'));
                var that = $(this);

                if (thumbFlag == "1") {
                    return false;
                } else {
                    thumbFlag = 1;
                }

                service
                    .videoCommentPraise({
                        id: commentId,
                        action: thumbFlag
                    })
                    .done(function(response) {
                        if (response.code == 0) {
                            praiseCount = praiseCount + 1;
                            that.find('i').addClass('has-praise');
                            that.attr('data-thumb-flag', thumbFlag);
                            that.attr('data-count', praiseCount);
                            that.find('.thumb_count').text(praiseCount);
                        }
                    });
            });
    };

    return {
    	init: function (commentObj, data) {
            comment = commentObj;
            scriptData = data;
            videoCourseInfo = scriptData.course_info;
            comment.listenerOne($(".detail-class-comment"));
            
            isApp = appController.isApp();
    		if (!appController.isOrgApp()) {
                commitComment();
            }
            container.on('click', '.total-comment', function () {
                window.scrollTo(0, 0);
                navTab.changeTab($('.nav-tab-item-class-comment'));
            });
            commentPraise();
            moreComment();
    	}
    };
});