/**
 * 社区帖子评论模块
 * @author zengcheng
 */
define(function (require, exports) {

    var holder, threadId, groupId, permission, loginUser;
    var service = require('common/service');
    var store = require('common/store');
    var Dialog = require('cobble/ui/Dialog');
    var proxyService = require('../common/proxyService');
    var Up = require('../common/up');
    var ModifyProfileLandingDialog = require('../common/ModifyProfileLandingDialog');
    var defaultReply = {
            'time_tip' : '刚刚',
            'user_id' : 0,
            'user_role' : 0,
            'user_name': '',
            'avatar':  ''
        };

    var Rotatable = require('common/component/Rotatable');
    var ImageDialog = require('common/component/ImageDialog');

    // 图片旋转
    var rotateIndex = 1;
    var rotateHash = {};

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

    var addComment = function (data) {
        return service
        .postComment(data, errorHandler)
        .done(function (response) {
            if (!response.code) {
                exports.addComment(response.data);
            }
        });
    };

    var addReply = function (container, data) {
        return service.postReply(data, errorHandler).done(function (response) {
            if (!response.code) {
                var user = store.get('user');
                var data = response.data;
                defaultReply.user_name = user.name;
                defaultReply.user_id = user.id;
                defaultReply.user_role = user.type;
                defaultReply.avatar = user.avatar;
                data = $.extend(true, defaultReply, data);
                data.permission = permission;
                data.user = loginUser;
                var html = Simplite.render('social-detail-reply', data);
                container.find('.reply-list ul').append(html);
            }
        });
    };


    function moveCaretToEnd(el) {
        if (typeof el.selectionStart == "number") {
            el.selectionStart = el.selectionEnd = el.value.length;
        }
        else if (typeof el.createTextRange != "undefined") {
            el.focus();
            var range = el.createTextRange();
            range.collapse(false);
            range.select();
        }
    };

    exports.addComment = function (data) {
        var html;
        var listHolder = holder.find('.comment-list-wrapper .comment-list');
        data.permission = permission;
        data.user = loginUser;
        html = Simplite.render('social-detail-comment', data);
        listHolder.find('.no-comment').remove();
        listHolder.append(html);
    };

    exports.fresh = function (pager) {
        var pager = $.extend(true, {
            page: 1,
            page_size: 25,
            count: 0,
            hide_jump: true,
            thread_id: threadId
        }, pager);

        service.getCurrentCommentList(pager).done(function (response) {

            pager.count = +response.data.pager.count;
            var html = Simplite.render('social-detail-commentList', {
                data: response.data.list || [],
                permission: permission,
                loginUser: loginUser
            });

            html += Simplite.render('social-common-pager', {
                pager: pager
            });

            holder.find('.comment-list-wrapper').html(html);
        });
    };

    exports.init = function (event, data) {

        threadId = data.threadId;
        groupId = data.groupId;
        holder = $(this);
        permission = store.get('permission');
        loginUser = store.get('user') || {};

        var up = new Up({
            container: holder
        });

        var actions = {
            'reply-action': function () {
                var commentItemContent = $(this).closest('.comment-content');
                var replyForm = commentItemContent.find('.reply-form');
                commentItemContent.addClass('open-reply');
                replyForm.show();
                replyForm.data('toCommentId', '');
                commentItemContent.find('textarea').removeClass('hide').focus().data('init', '');
            },
            'up-action': function () {
                var target = $(this);
                var status = 0;
                var numberEle = target.find('.num');
                var number = +$.trim(numberEle.text());
                var item = target.closest('.reply-item-wrapper');
                item.length == 0 && (item = target.closest('.comment-item'))
                var commentId = item.data('commentId') || item.data('postId');
                if (!target.hasClass('active')) {
                   status = 1;
                }
                service
                .setThumbs({
                    id: commentId,
                    postType: 2,
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
            },
            'reply-to-action': function () {
                var replyItem = $(this).closest('.reply-item-wrapper');
                var editor = replyItem.closest('.reply-list').find('.reply-form');
                var data = replyItem.data();
                var textarea = editor.find('textarea');
                var initStr = '回复' +  data.user + '：';
                textarea.val(initStr).removeClass('hide').data('init', initStr);
                editor.show().data('toCommentId', data.commentId);
                textarea.focus();
                moveCaretToEnd(textarea[0]);
            },
            'btn-reply': function () {
                var me = $(this);
                var editor = me.closest('.reply-form');
                var container = editor.closest('.reply-list-wrapper');
                var commentItem = container.closest('.comment-item');
                var textarea = editor.find('textarea');
                if (textarea.hasClass('hide')) {
                    editor.data('toCommentId', '');
                    textarea.removeClass('hide');
                } else {
                    var content = $.trim(textarea.val().replace(textarea.data('init'), ''));
                    me.prop('disabled', true);
                    setTimeout(function (){ me.prop('disabled', false); }, 3000);
                    if (content.length <= 500) {
                        if (content.length > 0) {
                            addReply(container, {
                                postId: commentItem.data('postId'),
                                commentId: editor.data('toCommentId') || '',
                                content: content
                            }).done(function (response) {
                                if (!response.code) {
                                    textarea.val('');
                                    textarea.addClass('hide');
                                    editor.find('.form-hint').hide();
                                }
                                me.prop('disabled', false);
                            });
                        } else {
                            alert('回复不能为空', '温馨提示');
                        }
                    } else {
                        alert('回复不能超过500个字', '温馨提示');
                    }
                }
            },
            'delete-action': function () {
                var item = $(this).closest('.comment-item');
                var postId = item.data('postId');
                confirm('您确定要删除该评论么？', '温馨提示').done(function () {
                    var data = {
                        postId: postId
                    };
                    service.deletePost(data).done(function(response){
                        if (!response.code) {
                            item.remove();
                            success('删除成功');
                        }
                    });
                });
            },
            'delete-reply-action': function () {
                var item = $(this).closest('.reply-item-wrapper');
                var itemWrap = item.closest('.comment-content');
                var commentId = item.data('commentId');
                confirm('您确定要删除该回复么？', '温馨提示').done(function () {
                    var data = {
                        commentId: commentId
                    };
                    service.deleteReply(data).done(function(response){
                        if (!response.code) {
                            if (itemWrap.find('.reply-list').find('.reply-item-wrapper').length == 1) {
                                itemWrap.removeClass('open-reply');
                            }
                            item.remove();
                            success('删除成功');
                        }
                    });
                });
            },
            'close-action': function () {
                var item = $(this).closest('.comment-item');
                var data = {
                    userId: item.data('userId'),
                    groupId: groupId
                };

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
                        }
                    });
                }).on('click', ':radio', function () {
                    var len = dialog.element.find(':radio[name="time"]:checked').val();
                    var reason = dialog.element.find(':radio[name="reason"]:checked').val();
                    len && reason && dialog.element.find('.btn-primary').prop('disabled', false);
                });
            }
        };

        var updateTextHint = function () {
            var target = $(this);
            var currentLength = target.val().length;
            var initLength = target.data('init').length;
            var leave = 500- currentLength + initLength;
            var formHint = target.closest('.reply-form').find('.form-hint');
            if (leave >= 0) {
                formHint.text('还可以输入' + leave  + '个字').show();
                formHint.css('color', '');
            } else {
                formHint.text('已超出' + (0 - leave)  + '个字').show();
                formHint.css('color', '#f00');
            }
        };

        holder
        .on('click', 'a[data-page]', function () {

            var me = $(this);
            var page = me.data('page');
            exports.fresh({
                page: page
            });
            return false;
        })

        .on('click', '[data-need-login="1"]', function () {

            var target = this;
            proxyService.checkLogin().done(function (service) {
                var action = $(target).data('action');
                actions[action].call(target);
            });
        })

        .on('click', '.more-reply', function () {
            var target = $(this);
            var container = target.closest('.reply-list');
            var postId = container.closest('.comment-item').data('postId');
            var page = target.data('page') || 1;

            service.getMoreReply({
                postId: postId,
                page: page,
                pageSize: 10
            }).done(function (response){
                if (!response.code && response.data.list && response.data.list.length) {
                    var html = '', list = response.data.list;
                    var i = 0, tmp;
                    if (page == '1') { i = 3; } //第一页从第3个开始取
                    for (var len = list.length; i < len; i++) {
                        tmp = list[i];
                        tmp.permission = permission;
                        tmp.user = loginUser;
                        html += Simplite.render('social-detail-reply', tmp);
                    }
                    container.find('ul').append(html);
                    if (response.data.has_more == '1') {
                        target.data('page', page + 1);
                    } else {
                        target.hide();
                    }
                }
            });
        })

        .on('input', '.reply-form textarea', updateTextHint)

        .on('propertychange', '.reply-form textarea', updateTextHint)

        .on('click', '.photo-item', function (e) { // 评价图
            var element = $(this);
            var parent = element.parent().parent();
            parent.find('.photo-item').removeClass('active');
            element.addClass('active');
            // 设置大图
            // 设置垂直间距
            var vertical = element.data('vertical');
            var vheight = element.data('vheight');
            var horizontal = element.data('horizontal');
            var hheight = element.data('hheight');
            var title = element.data('name');

            var photoWrapper = parent.find('.photo-wrapper');
            var floater = photoWrapper.find('.floater');
            var img = photoWrapper.find('.rotate-img');
            var photoName = parent.find('.photo-name');

            img.attr('src', horizontal);
            photoWrapper.css({'width':400,'height':300});
            floater.css({'margin-bottom':'-'+Math.floor(hheight/2)+'px'});
            photoName.text(title);
            parent.find('.comment-photo-player').show();

            // 初始化图片旋转
            var rotateImages = holder.find('.photo-wrapper').find('img');

            if (!photoWrapper.data('rotateindex')) {
                rotateHash[rotateIndex] = new Rotatable({
                                                element: photoWrapper.find('.rotate-img'),
                                                callback: function () {
                                                }
                                            });
                photoWrapper.data('rotateindex',rotateIndex);
                rotateIndex++;
            } else {
                var index = photoWrapper.data('rotateindex');
                rotateHash[index].rotate({animateTo: 0,
                                      duration: 1});
            }
            photoWrapper.data('rotateangle',0);
        })

        .on('click', '.packup', function (e) {
            var element = $(this);
            var parent = element.parent().parent().parent();
            parent.find('.comment-photo-player').hide();
            parent.find('.photo-item').removeClass('active');
        })

        .on('click', '.sourse', function (e) {
            var element = $(this);
            var parent = element.parent().parent().parent();
            var images = parent.find('.photo-item');
            var curImg = parent.find('.active');
            var index = images.index(curImg);
            var data = images.map(function (index, item) {
                return {
                    url: $(item).data('image'),
                    title: $(item).data('name')
                };
            });

            new ImageDialog({
                data: data,
                index: index
            });
        })

        .on('click', '.left', function (e) {
            var element = $(this);
            var parent = element.parent().parent().parent();
            var photoWrapper = parent.find('.photo-wrapper');
            var index = photoWrapper.data('rotateindex');
            var angle = photoWrapper.data('rotateangle');
            var newangle = (angle-90);
            rotateHash[index].rotate({animateTo: newangle,
                                      duration: 1});
            photoWrapper.data('rotateangle',newangle);
        })

        .on('click', '.right', function (e) {
            var element = $(this);
            var parent = element.parent().parent().parent();
            var photoWrapper = parent.find('.photo-wrapper');
            var index = photoWrapper.data('rotateindex');
            var angle = photoWrapper.data('rotateangle');
            var newangle = (angle+90);
            rotateHash[index].rotate({animateTo: newangle,
                                      duration: 1});
            photoWrapper.data('rotateangle',newangle);
        })

        .on('click', '.photo-wrapper', function (e) {
            var element = $(this);
            element.parent().find('.packup').click();
        });
    };
});