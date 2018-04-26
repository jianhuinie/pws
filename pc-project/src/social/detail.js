/**
 * 社区-帖子详情页
 * @author zengcheng
 */
define(function (require, exports) {

    var commentList = require('./detail/commentList');
    var tools = require('./detail/tools');
    var commentEditor = require('./detail/commentEditor');
    var groupInfo = require('./detail/groupInfo');
    var eventEmitter = require('common/eventEmitter');
    var Editor = require('common/component/Editor');
    var Dialog = require('cobble/ui/Dialog');
    var store = require('common/store');
    var service = require('common/service');
    var proxyService = require('./common/proxyService');
    var ModifyProfileLandingDialog = require('./common/ModifyProfileLandingDialog');
    var Up = require('./common/up');

    require('tpl!social/detail.tpl');
    require('tpl!social/common/pager.tpl');

    exports.init = function () {

        var threadId = store.get('threadId');
        var groupId = store.get('groupId');
        var threadUserId = store.get('threadUserId');
        var user = store.get('user');
        var errorHandler = {
            '800053': function () {
                new ModifyProfileLandingDialog({
                    tpl: 'duply-nickname'
                });
            },
            '800054': function () {
                new ModifyProfileLandingDialog({
                    tpl: 'no-nickname'
                });
            },
            '800055': function () {
                new ModifyProfileLandingDialog({
                    tpl: 'no-avatar'
                });
            }
        };

        var up = new Up({
            container: $('.post-actions')
        });
        var container = $('#main .content');

        container.find('.post-content-holder').html(store.get('threadContent'));

        var fastEditor = new Editor({
            element: container.find('.fast-reply'),
            maxLength: 100,
            autoHint: 1,
            flexHeight: false
        });

        $(document)
        .on('click', '[data-need-intercept="1"]', function(){
            var target = $(this);
            proxyService.checkLogin().done(function () {
                window.open(target.data('href'), '_blank');
            });
            return false;
        });

        $('.fast-reply')
        .on('click', '.placeholder', function() {
            $('.fast-reply').find('textarea').focus();
        });

        $('.actions').find('.action').last().addClass('last');

        $('.fast-reply .btn')
        .click(function() {
            var button = $(this);
            button.prop('disabled', true);
            setTimeout(function() {button.prop('disabled', false);}, 3000);
            proxyService.checkLogin().done(function (service) {
                var value = $.trim(fastEditor.getValue());
                if (value) {
                    if (value.length <= 100) {
                        service.postComment({
                            threadId: threadId,
                            content: value
                        }, errorHandler).done(function (response) {
                            if (!response.code) {
                                eventEmitter.emit('comment-saved', response.data);
                                fastEditor.setValue('');
                                button.prop('disabled', false);
                            }
                        });
                    } else {
                        alert('评论不能超过100个字符', '温馨提示');
                    }
                } else {
                    alert('评论不能为空', '温馨提示');
                }
            });
        });

        // 回帖保存
        eventEmitter
        .on('comment-saved', function (event, data) {
            var defaultData = {user_id: '', avatar: '', user_name:'', zans: 0, time_tip: '刚刚'};
            var user = store.get('user');
            data.user_id = user.id;
            data.avatar = user.avatar;
            data.user_name = user.name;

            commentList.addComment($.extend(defaultData, data));
            success('评论成功');
            $('html, body').animate({
                scrollTop: $('.comment-item:last').offset().top + 'px'
            }, 1000);
        });

        // 去回帖
        eventEmitter
        .on('detail-comment', function () {
            commentEditor.focus();
        });

        // 去发帖
        eventEmitter
        .on('detail-write', function () {
            window.location.href = '/forum/addThread?group_id=' + groupId;
        });

        // 赞和收藏
        $('.post-actions')
        .on('click', '.up-btn', function () {
            var target = $(this);
            var status = 0;
            var numberEle = target.find('.num');
            var number = +$.trim(numberEle.text());
            if (!target.hasClass('active')) {
                status = 1;
            }
            proxyService.checkLogin().done(function (service) {

                service.setThumbs({
                    id: threadId,
                    postType: 1,
                    op: status
                }).done(function (response) {
                    if (!response.code) {
                        up.updateStatus(target);
                        if (status) {
                            numberEle.text(number+1);
                            target.addClass('active');
                        } else {
                            numberEle.text(number-1);
                            target.removeClass('active');
                        }
                    }
                });
            });
        })
        .on('click', '.star-btn', function () {
            var target = $(this);
            var status = 0;
            if (!target.hasClass('active')) {
                status = 1;
            }
            proxyService.checkLogin().done(function (service) {

                service.setCollect({
                    threadId: threadId,
                    op: status
                }).done(function (response) {
                    if (!response.code) {
                        if (status) {
                            success('收藏成功');
                            target.addClass('active');
                        } else {
                            success('取消收藏成功');
                            target.removeClass('active');
                        }
                    }
                });
            });
        });

        // 帖子操作
        container
        .find('.post-header-wrapper')
        .on('click', '.set-black', function () {
            var target = $(this);
            var status = target.data('status');

            var data = {
                id: threadId,
                postType: 1
            };
            proxyService.checkLogin().done(function (service) {
                var dialog = new Dialog({
                    title: '举报帖子',
                    content: Simplite.render('social-common-report'),
                    width: 428,
                    heigt: 192
                });
                dialog.element.on('click', '.btn', function () {
                    data.reasonType = $('input[name="type"]:checked').val();
                    if (data.reasonType) {
                        service.setBlack(data).done(function(response){
                            if (!response.code) {
                                dialog.hide();
                                success('举报成功');
                            }
                        });
                    }
                })
                .on('click', 'input', function () {
                    dialog.element.find('.btn-primary').prop('disabled', false);
                });
            });
        })
        .on('click', '.set-top', function () {
            var target = $(this);
            var status = target.data('status');
            var label = $('.post-main').find('.content-label.top');
            status = (status == '1' ? 0 : 1);
            var data = {
                threadId: threadId,
                op: status
            };
            proxyService.checkLogin().done(function (service) {
                service.setTop(data).done(function(response){
                    if (!response.code) {
                        target.data('status', status);
                        target.text(status == '1' ? '取消置顶' : '置顶');
                        success(status == '0' ? '取消置顶成功' : '置顶成功');
                        label[status == '0' ? 'hide' : 'show']();
                    }
                });
            });
        })
        .on('click', '.set-good', function () {
            var target = $(this);
            var status = target.data('status');
            var label = $('.post-main').find('.content-label.better');
            status = (status == '1' ? 0 : 1);
            var data = {
                threadId: threadId,
                op: status
            };
            proxyService.checkLogin().done(function (service) {
                service.setGood(data).done(function(response){
                    if (!response.code) {
                        target.data('status', status);
                        target.text(status == '1' ? '取消加精' : '加精');
                        success(status == '0' ? '取消加精成功' : '加精成功');
                        label[status == '0' ? 'hide' : 'show']();
                    }
                });
            });
        })
        .on('click', '.set-ban', function () {

            var target = $(this);
            var data = {
                userId: threadUserId,
                groupId: groupId
            };

            proxyService.checkLogin().done(function (service) {
                var dialog = new Dialog({
                        title: '封禁账号',
                        content: Simplite.render('social-common-ban'),
                        width: 535,
                        heigt: 345
                    });
                dialog.element.on('click', '.btn', function () {
                    data.len = dialog.element.find(':radio[name="time"]:checked').val() * 24 * 3600;
                    data.reason = dialog.element.find(':radio[name="reason"]:checked').val();
                    service.setBan(data).done(function(response){
                        if (!response.code) {
                            dialog.hide();
                            target.removeClass('set-ban').addClass('baned').text('已禁言');
                        }
                    });
                }).on('click', ':radio', function () {
                    var len = dialog.element.find(':radio[name="time"]:checked').val();
                    var reason = dialog.element.find(':radio[name="reason"]:checked').val();
                    len && reason && dialog.element.find('.btn-primary').prop('disabled', false);
                });
            });
        })
        .on('click', '.delete', function () {
            proxyService.checkLogin().done(function (service) {
                confirm('您确定要删除该帖子么？', '温馨提示').done(function () {
                    var data = {
                        threadId: threadId
                    };
                    service.deleteThread(data).done(function(response){
                        if (!response.code) {
                            success('删除成功');
                            window.location.href = '/forum/threadBrowse/' + groupId;
                        }
                    });
                });
            });
        });

    };

});