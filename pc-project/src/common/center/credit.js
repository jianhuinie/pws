/**
 * @file 我的信用
 * @author jixiaohui
 */
define(function (require, exports) {

    'use strict';

    var Tab = require('cobble/ui/Tab');
    var Popup = require('cobble/helper/Popup');
    var Editor = require('common/component/Editor');
    var Validator = require('cobble/form/Validator');
    var service = require('common/service');
    var SaveButton = require('common/component/SaveButton');

    var userInfoTooltip = require('common/component/userInfoTooltip');
    var Rotatable = require('common/component/Rotatable');
    var ImageDialog = require('common/component/ImageDialog');
    var commentAppealReasonDialog = require('common/component/CommentAppealReasonDialog');
    var floatHelp = require('teacherCenter/component/floatHelp');

    // 验证
    var hash = {};

    // 图片旋转
    var rotateIndex = 1;
    var rotateHash = {};

    /**
     * 初始化
     */
    exports.init = function () {

        var container = $('#content');
        var navInfo = container.find('#tab-nav-info');
        var trigger = container.find('.nav-item-all');
        var angleIcon = trigger.find('i');
        var pageType = container.data('type'); // 当前页面类型

        new Popup({
            element: trigger,
            layer: container.find('.nav-list'),
            show: {
                trigger: 'over',
                delay: 100
            },
            hide: {
                trigger: 'out',
                delay: 100
            },
            onAfterShow: function () {
                angleIcon
                .removeClass('icon-angle-down')
                .addClass('icon-angle-up');
            },
            onAfterHide: function () {
                angleIcon
                .removeClass('icon-angle-up')
                .addClass('icon-angle-down');
            }
        });

        // 追评与回复的输入框
        var textareas = container.find('.form-editor');
        textareas.each(function (i, item) {
            var element = $(item);
            new Editor({
                element: element,
                maxLength: 500
            });
        });

        // 对多个编辑框进行校验,校验值存入hash中
        var commentForm = container.find('.comment-form');
        commentForm.each(function (i, item) {
            hash[i] = new Validator({
                realtime: true,
                element: $(item),
                fields: {
                    info: {
                        rules: {
                            required: true,
                            maxlength: 500
                        },
                        errors: {
                            required: '请输入评价信息',
                            maxlength: '不能超过 500 字'
                        }
                    }
                }
            });
        });

        // 追加 ＋ 回复 评价
        var additionBtns = container.find('.comment-submit');
        additionBtns.each(function (i, item) {
            var element = $(item);
            var commentItem = element.closest('.comment-item');
            var commentItemForm = commentItem.find('.comment-form');

            new SaveButton({
                element: $(item),
                saveText: '正在发送...',
                save: function () {

                    if (hash[i].validate()) {

                        var commentId = commentItemForm.data('commentid');
                        var info = commentItemForm.find('textarea[name="info"]').val();

                        var data = {
                            commentId: commentId,
                            info: info
                        };

                        if (pageType == 'commentTeacher') { // 学生 － 给老师的评价 － 追评
                            return service
                            .additionComment(
                                data,
                                {
                                    errorHandler: {
                                        '100061': function (response) { // 敏感词过滤

                                            var map = {
                                                'info': '评价信息'
                                            };

                                            var errorMsg = response.data;
                                            var content = '你';  // 你

                                            $.each(errorMsg, function (index, item) {

                                                if (item.length) {
                                                    content += '<span class="sensitive">在<em>' + map[index] + '</em>中输入的内容包含';
                                                    $.each(item, function (i, j) {
                                                        content += '“<em>' + j + '</em>”';
                                                    });
                                                    content += '；</span><br />';
                                                }

                                            });

                                            content += '请删除后重新输入';

                                            alert({
                                                title: '温馨提示',
                                                content: content,
                                                width: 450,
                                                buttons: [
                                                    {
                                                        text: '确定',
                                                        type: 'primary',
                                                        handler: function () {
                                                            this.hide();
                                                        }
                                                    }
                                                ]
                                            });

                                        }
                                    }
                                }
                            )
                            .done(function (response) {
                                if (response.code === 0) {
                                    success('评价成功！', function () {
                                        var content = '<div class="add-comment-show">'
                                                    +     '［追加评论］'
                                                    +     info
                                                    + '</div>';
                                        // 隐藏评论框 + 追评按钮
                                        commentItem.find('.add-comment-btn').hide();
                                        commentItemForm.hide();
                                        // 反显评论内容
                                        commentItem.append(content);
                                    });

                                }
                            });
                        } else if (pageType == 'commentFromStudent') { // 老师 － 来自学生的评价 － 回复
                            return service
                            .reviewComment(
                                data,
                                {
                                    errorHandler: {
                                        '100061': function (response) { // 敏感词过滤

                                            var map = {
                                                'info': '回复信息'
                                            };

                                            var errorMsg = response.data;
                                            var content = '你';  // 你

                                            $.each(errorMsg, function (index, item) {

                                                if (item.length) {
                                                    content += '<span class="sensitive">在<em>' + map[index] + '</em>中输入的内容包含';
                                                    $.each(item, function (i, j) {
                                                        content += '“<em>' + j + '</em>”';
                                                    });
                                                    content += '；</span><br />';
                                                }

                                            });

                                            content += '请删除后重新输入';

                                            alert({
                                                title: '温馨提示',
                                                content: content,
                                                width: 450,
                                                buttons: [
                                                    {
                                                        text: '确定',
                                                        type: 'primary',
                                                        handler: function () {
                                                            this.hide();
                                                        }
                                                    }
                                                ]
                                            });

                                        }
                                    }
                                }
                            )
                            .done(function (response) {
                                if (response.code === 0) {
                                    success('回复成功！', function () {
                                        var content = '<div class="comment-reply">'
                                                    +     '［回复］'
                                                    +     info
                                                    + '</div>';
                                        // 隐藏回复框 + 回复按钮
                                        commentItem.find('.reply-comment-btn').hide();
                                        commentItemForm.hide();
                                        // 反显回复内容
                                        commentItem.append(content);
                                    });

                                }
                            });
                        }

                    }

                }
            });
        });

        container
        .on('click', '.del', function (e) {
            var element = $(this);
            var commentId = element.data('id');

            confirm('确认删除该条邀请评价吗？', '温馨提示')
            .done(function () {

                service
                .delInviteComment({ commentId: commentId })
                .done(function (response) {
                    if (response.code === 0) {
                        success('删除成功');
                        location.reload();
                    }
                });

            });
        })

        .on('click', '[data-comment]', function (e) {
            var element = $(this);
            var faceType = navInfo.data('ftype');
            var commentType = element.data('comment');
            var link = container.data('link');
            var commentTypeUrl = commentType ? 'comment_type=' + commentType : '';
            link = link + '?' + commentTypeUrl +
                          '&page=1&page_size=10';
            location.href = link;
        })

        .on('click', '[data-face]', function (e) {
            var element = $(this);
            var commentType = navInfo.data('ctype'); // 课程类型
            var faceType = element.data('face'); // 好中差评
            var link = container.data('link');
            var commentTypeUrl = commentType ? 'comment_type=' + commentType : '';
            var faceTypeUrl = faceType ? '&face_type=' + faceType : '';
            link = link + '?' + commentTypeUrl +
                          faceTypeUrl +
                          '&page=1&page_size=10';
            location.href = link;
        })

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
            var rotateImages = container.find('.photo-wrapper').find('img');

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
        })

        .on('click', '.add-comment-btn', function (e) { // 学生追评
            var target = $(e.currentTarget);
            var commentItem = target.closest('.comment-item');

            commentItem.find('.comment-form').toggle();
        })

        .on('click', '.reply-comment-btn', function (e) { // 老师回复
            var target = $(e.currentTarget);
            var commentItem = target.closest('.comment-item');

            commentItem.find('.comment-form').toggle();
        })

        .on('click', '.appeal-btn', function (e) { // 发起申诉

            var target = $(e.currentTarget);

            new commentAppealReasonDialog({
                commentId: target.data('commentid'),
                target: target
            });

        })

        .on('click', '.appeal-result-btn', function (e) { // 申诉结果展示

            var target = $(e.currentTarget);
            var reason = target.data('reason');

            alert({
                title: '温馨提示',
                width: 350,
                content: '您好，此条评价申诉“' + reason + '”不通过，建议您可以尝试通过回复评价的方式引导学生',
                buttons: [
                            {
                                text: '我知道了',
                                type: 'primary',
                                handler: function () {
                                    this.hide();
                                }
                            }
                        ]
            });

        });

        userInfoTooltip.init(container, '.name');
        floatHelp.init();
    };
});
