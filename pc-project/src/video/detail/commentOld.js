/**
 * @file 视频课详情页 － 课程评价
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var store = require('common/store');
    var Tooltip = require('cobble/ui/Tooltip');
    var service = require('common/service');
    var Editor = require('common/component/Editor');
    var Validator = require('cobble/form/Validator');
    var SaveButton = require('common/component/SaveButton');
    var ImageDialog = require('common/component/ImageDialog');
    var Rotatable = require('common/component/Rotatable');

    var LoginDialog = require('common/component/LoginDialog');
    var SwitchRoleDialog = require('common/component/SwitchRoleDialog');
    var CanCommentOrderListDialog = require('common/component/CanCommentOrderListDialog');
    //新增cookie  store
    var cookie = require('cobble/util/cookie');
    var container = $('#video-comment');
    var writeComment = container.find('.write-comment-form');
    var noComment = $('#video-no-comment');
    var rotateHash = {};
    var rotateIndex = 1;
    // ajax获取评价列表后实例化回复评价相关对象
    var textareas, commentForm, commentSubmitBtns;
    // 验证
    var hash = {};

    //上报函数
    function report() {
        var params = {
            teacher_number:store.get('teacherNum'),
            user_id:store.get('userId') || "",
            track_id: cookie.get('__track_id__'),
            comment_type:store.get('type'),
            comment_tag:store.get('commentTag_name') || "",
            comment_tag_num:store.get('commentTag_count') || "",
            dsp:'1',
            city_id:cookie.get('CITY_ID'),
            source:'1',
            type: 'comment',
            page: store.get('page'),
        };
        WAT.send('http://click.genshuixue.com/gs.gif', params);
    }

    //页面滚动时
    function HoverTreeScroll() {
        var Obj =container.find('#show-tab-nav-info');
        if (Obj.length != 1) { return false; }

        var offsetTop = arguments[1] ? arguments[1] : 0;
        var ObjTop = Obj.offset().top - $(window).height();
        var h_one = true;

        $(window).scroll(function () {
            if ($(window).scrollTop() > ObjTop) {
                if (h_one) {
                    report();
                    h_one = false;
                }

            }
        });
    }

    // 获取评论列表
    function getCommentList() {

        var sortBy = 'create_time'; // 按时间排序

        return service
        .getVideoCourseCommentList({
            courseNum: store.get('courseNum'),
            page: store.get('page'),
            pageSize: 10,
            commentTag: store.get('tag')
        })
        .done(function (response) {
            if (response.code === 0) {

                var data = response.data;
                var tpl = data.tpl;
                var totalCount = data.comment_data.comment_list.length;

                var content = container.find('.nav-content');
                // 评价框展示
                if (data.comment_data.additional.can_comment) {
                    writeComment.show();
                    store.set('purchaseId', data.comment_data.additional.purchase_id_video);
                }

                if (totalCount > 0) {
                    // 显示评价栏
                    container.addClass('show-teacher-comment');
                    content.html(tpl.comment_list);
                    container.find('.overview').html(tpl.comment_overview);

                    var trigger = container.find('.nav-item-all');
                    var angleIcon = trigger.find('i');

                    // 回复评价的输入框
                    textareas = container.find('.form-editor');
                    textareas.each(function (i, item) {
                        var element = $(item);
                        new Editor({
                            element: element,
                            maxLength: 500,
                            minLength: 15
                        });
                    });

                    // 对多个编辑框进行校验,校验值存入hash中
                    commentForm = container.find('.comment-form');
                    commentForm.each(function (i, item) {
                        hash[i] = new Validator({
                            realtime: true,
                            element: $(item),
                            fields: {
                                info: {
                                    rules: {
                                        required: true,
                                        maxlength: 500,
                                        minlength: 15
                                    },
                                    errors: {
                                        required: '请输入回复信息',
                                        maxlength: '不能超过 500 字',
                                        minlength: '不能少于 15 字'
                                    }
                                }
                            }
                        });
                    });

                    // 回复评价
                    commentSubmitBtns = container.find('.comment-submit');
                    commentSubmitBtns.each(function (i, item) {
                        var element = $(item);
                        var commentItem = element.closest('.item');
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
                                                commentItem.find('.comment').append(content);
                                            });

                                        }
                                    });

                                }

                            }
                        });
                    });

                    if (content.is(':visible')) {
                        Tooltip.init(content.find('[data-title]'));
                    }
                } else {
                    container.find('.overview').hide();
                    content.html('<div class="no-comment"><i class="icon icon-info-circle"></i>暂时没有评价哦</div>');
                }
            }
        });
    }

    exports.init = function () {

        // 评论列表
        store.set('page', 1);
        store.set('comment', 0);

        // 获取初识评价列表
        getCommentList();

        /*
         * 写评论交互123
         */
        new Editor({
            element: writeComment.find('.form-editor'),
            maxLength: 500,
            minLength: 15
        });

        var writeValidator = new Validator({
            realtime: true,
            element: writeComment,
            fields: {
                info: {
                    rules: {
                        required: true,
                        maxlength: 500,
                        minlength: 15
                    },
                    errors: {
                        required: '请输入评价信息',
                        maxlength: '不能超过 500 字',
                        minlength: '不能少于 15 字'
                    }
                }
            }
        });

        new SaveButton({
            element: writeComment.find('.btn-write-comment'),
            saveText: '正在发送...',
            save: function () {

                // 评分
                var score = writeComment.find('.star-score:eq(0)').find('.star-shine').length;
                if(score === 0) {
                    alert("评分不能为空");
                    return false;
                }

                if (writeValidator.validate()) {

                    var info = writeComment.find('textarea[name="info"]').val();
                    // 匿名评价
                    var anonymous = 0;
                    var anonymousInput = writeComment.find('input[name=anonymous]');
                    if (anonymousInput.prop('checked')) {
                        anonymous = 1;
                    }

                    service
                    .addCommentMore({
                        purchaseId: store.get('purchaseId'),
                        total_score: score,
                        info: info,
                        anonymous: anonymous
                    },
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
                    })
                    .done(function (response) {
                        if (response.code === 0) {
                            success('评论成功！', function () {
                                location.reload();
                            });
                        }
                    });
                }


            }
        });

        container
        .on('click', '[data-page]', function (e) {

            var target = $(e.currentTarget);
            store.set('page', target.data('page'));
            report();//上报
            getCommentList();

            return false;
        })

        /*
       .on('click', '.comment-label li', function (e) { // 标签
            var target = $(e.currentTarget);
            store.set('tag', target.data('value'));
            store.set('page', 1);
            report();//上报
            getCommentList();

            return false;
        })
        */
        // 新增
        .on('click', '.comment-label li', function (e) { // 评价标签化
            var target = $(e.currentTarget);
             if (!target.hasClass('selected')) {
                 store.set('commentTag', target.data('value'));
                 store.set('commentTag_name', target.data('name'));
                 store.set('commentTag_count', target.data('count'));
                 store.set('page', 1);
                 report();
                 getCommentList(true);
                  return false;
            }
        })

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
                        getCommentList();
                    }
                });

            });
        })

        .on('click', '.btn-support', function (e) { // 有用

            var target = $(this);

            if (target.attr('data-supported') == 1) {
                return;
            }

            if (target.data('wait')) {
                return;
            }

            var support = function () {

                target.data('wait', true);

                return service
                .commentThumbUp({
                    id: target.data('id')
                })
                .done(function (response) {

                    target.data('wait', false);

                    if (response.code === 0) {

                        success('提交成功');

                        target.find('em').html(
                            target.data('count') + 1
                        );

                        target.attr({
                            'data-supported': 1,
                            'data-title': '你已经点过了哦'
                        });

                        Tooltip.init(target);
                    }
                });
            };

            var userType = store.get('user').type;
            if (userType >= 0) {
                if (userType === 0) {
                    new SwitchRoleDialog({
                        createText: '只有学生身份才可以点击，确认开通吗？',
                        switchText: '只有学生身份才可以点击，确认切换吗？',
                        switchTo: 'student',
                        onSuccess: function () {
                            support()
                            .done(function () {
                                location.reload();
                            });
                        }
                    });
                }
                else {
                    support();
                }
            }
            else {
                new LoginDialog({
                    onSuccess: function () {
                        support()
                        .done(function () {
                            location.reload();
                        });
                    }
                });
            }
        })

        .on('click', '.reply-comment-btn', function (e) { // 回复评价
            var target = $(e.currentTarget);
            var commentItem = target.closest('.item');

            commentItem.find('.comment-form').toggle();
        });

        /*
         * 写评论交互
         */
        Tooltip.init(writeComment.find('[data-title]'));
        writeComment
        .on('click', '.icon-star', function (e) {
            var target = $(e.currentTarget);
            var starScore = target.parent();

            var idx = target.index();
                starScore.attr("sum",idx);
            for(var i = 0 ; i <= idx ; i++) {
                starScore.find('.icon:eq(' + i + ')').addClass('star-shine').addClass('scored');
            }
            for(var j = 4 ; j > idx ; j--) {
                starScore.find('.icon:eq(' + j + ')').removeClass('star-shine').removeClass('scored');
            }

            var stars = $.map($(starScore).parent().parent().find(".star-score"),function(num){
                return parseInt($(num).attr("sum") ? $(num).attr("sum") : 5);
            });
        })

        .on('mouseenter', '.icon-star', function (e) {
            var target = $(e.currentTarget);
            var starScore = target.parent();

            var idx = target.index();
            for(var i = 0 ; i <= idx ; i++) {
                starScore.find('.icon:eq(' + i + ')').addClass('star-shine');
            }
            for(var j = 4 ; j > idx ; j--) {
                starScore.find('.icon:eq(' + j + ')').removeClass('star-shine');
            }
        })

        .on('mouseleave', '.star-score', function (e) {

            var element = $(this);

            element.find('.icon').each( function(i, item) {
                var sub_element = $(item);
                if( !sub_element.hasClass('scored') ){
                    sub_element.removeClass('star-shine');
                } else {
                    sub_element.addClass('star-shine');
                }
            });
        });

    }

})