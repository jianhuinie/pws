define(function (require) {
    'use strict';
    var $ = require('zepto');
    var service = require('common/service');
    var openAppWindow = require('common/openAppWindow');
    var user = require('common/user');
    var ui = require('common/ui');
    var container = $('#page_main');
    var initStars = require('common/comment/initStars');
    var userInfo;

    return function () {
        userInfo = user.getUserInfo();
        initStars.initStars($('.comment-stars'));
        var commentCount = this.commentNumber;
        var trump = container.find('.trump');
        var commentId = trump.data('id');
        var canClick = trump.attr('data-can-trump');
        var status = trump.attr('data-status');
        var time = container.find('.comment-date');
        if (time && time.data('time')) {
            time.text(time.data('time').split(' ')[0]);
        }
        var commentArray = [];
        commentArray.push(commentId);

        function getThumbInit () {
             service.get('/thumb/check', {
                object_type: 'COMMENT',
                action: 'UP',
                object_ids: JSON.stringify(commentArray)
            }, function (responese) {
                if (+responese.code === 0) {
                    var comfirmArray = responese.data.thumbed;
                    comfirmArray = comfirmArray.map(function (item) {
                        return +(item.object_id);
                    });
                    if (comfirmArray.indexOf(+commentId) > -1) {
                        // 赞过了
                        trump.attr('data-status', 1);
                        trump.find('i')
                            .removeClass('icon-like')
                            .addClass('icon-ic_tuijian_done');
                    } else{
                        // 还没赞
                        trump.attr('data-status', 0);
                        trump.find('i')
                            .removeClass('icon-ic_tuijian_done')
                            .addClass('icon-like');
                    }
                }
            });
        }
        
        if (userInfo && user.isStudentLogin() && commentCount > 0) {
            getThumbInit();
        }

        container
            .unbind('click', '.trump')
            .on('click', '.trump', function () {
                var that = $(this);
                if (!userInfo) {
                    user.loginStudent(function() {
                        location.reload();
                    });
                } else if (user.isStudentLogin()) {
                    var status = +that.attr('data-status');
                    var canTrump = +that.attr('data-can-trump');
                    if(+canTrump) {
                        that.attr('data-can-trump', 0);
                        service.post('/thumb/operate', {
                            object_type: 'COMMENT',
                            object_id: commentId,
                            action: status ? 'CANCEL_UP' : 'UP'
                        }, function (responese) {
                            if (+responese.code === 0) {
                                var trumpCount = +that.attr('data-count');
                                var trumpCountDom = that.find('.number');
                                if (status) {
                                    // 取消赞
                                    that.attr('data-status', 0);
                                    that.find('i')
                                        .removeClass('icon-ic_tuijian_done')
                                        .addClass('icon-like');
                                    trumpCountDom.text(trumpCount - 1);
                                    that.attr('data-count', trumpCount - 1); 
                                } else {
                                    // 赞
                                    that.attr('data-status', 1);
                                    that.find('i')
                                        .removeClass('icon-like')
                                        .addClass('icon-ic_tuijian_done');
                                    trumpCountDom.text(trumpCount + 1);
                                    that.attr('data-count', trumpCount + 1); 
                                }
                    
                                that.attr('data-can-trump', 1);
                            }
                        });
                    }
                } else if (user.isTeacherLogin()) {
                    ui.remind('请切换学生身份');
                }
        });


        container
            .unbind('click','.comment-lines')
            .on('click', '.comment-lines', function () {
                var that = $(this);
                var url = that.data('url');
                openAppWindow.open(url);
            });     
    };
});