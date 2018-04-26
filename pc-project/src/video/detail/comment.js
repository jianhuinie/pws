/**
 * @file 视频课详情页 － 课程评价 2017.1.6
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

    var container = $('#courseComment');
    var writeComment = container.find('.write-comment-form');
    var noComment = $('#video-no-comment');

    var rotateHash = {};
    var rotateIndex = 1;
    // ajax获取评价列表后实例化回复评价相关对象
    var textareas, commentForm, commentSubmitBtns;
    // 验证
    var hash = {};

    // 点击上报
    function clickReport(stype, userNum, courseNum) {
        var params = {
            type: 'PC_video',
            style: stype,
            user_number: userNum,
            number: courseNum
        };
        WAT.send('http://click.genshuixue.com/gs.gif', params);
    }

    // 页面滚动时
    function HoverTreeScroll() {
        // var Obj = container.find('#show-tab-nav-info');
        var Obj = container;
        if (Obj.length != 1) { return false; }

        var offsetTop = arguments[1] ? arguments[1] : 0;
        var ObjTop = Obj.offset().top - $(window).height();
        // var h_one = true; 要反复上报

        $(window).scroll(function () {
            if ($(window).scrollTop() > ObjTop) {
                clickReport('commentstay');
                // if (h_one) {
                    // report();
                    // h_one = false;
                // }

            }
        });
    }

    // 获取评论列表
    function getCommentList(faceType) {

        var sortBy = 'create_time'; // 按时间排序

        return service
        .getVideoCourseCommentList({
            courseNum: store.get('courseNum'),
            page: store.get('page'),
            pageSize: 10,
            commentTag: store.get('tag'),
            faceType: faceType || 0
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

                // 评论分类
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
                    content.html(tpl.comment_list);
                }
            }
        });
    }

    exports.init = function () {

        // 获取初识评价列表 - 默认全部评价
        store.set('page', 1);
        store.set('comment', 0);
        store.set('faceType', 0);

        getCommentList(0);

        // 页面滚动到评论上报
        HoverTreeScroll();

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
                // 上报
                clickReport('comment');

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

                    var data = {
                        purchaseId: store.get('purchaseId'),
                        total_score: score,
                        info: info,
                        anonymous: anonymous,
                        skip_verify: 1
                    };

                    service
                    .addCommentMore(
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
                                },
                                '888889': function (response) { //竞品中差评

                                    alert({
                                        title: '温馨提示',
                                        content: '平台禁止竞品老师之间恶意中差评，如违规且被核实会被扣分，请如实评价哦～',
                                        width: 450,
                                        buttons: [
                                            {
                                                text: '暂不发布',
                                                type: 'muted',
                                                handler: function () {
                                                    this.hide();
                                                }
                                            },
                                            {
                                                text: '继续评价',
                                                type: 'primary',
                                                handler: function () {
                                                    this.hide();
                                                    data.skip_verify = 0;
                                                    service
                                                        .addCommentMore(data, {})
                                                        .done(function (response) {
                                                            if (response.code === 0) {
                                                                success('评论成功！', function () {
                                                                    location.reload();
                                                                });
                                                            }
                                                        });
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
                            success('评论成功！', function () {
                                location.reload();
                            });
                        }
                    });
                }


            }
        });

        container
        .on('click', '[data-page]', function (e) { // 翻页
            // 上报
            clickReport('commenttttp');

            var target = $(e.currentTarget);

            store.set('page', target.data('page'));
            getCommentList(store.get('faceType'));

            return false;
        })

        .on('click', '[data-face]', function () { // 评价种类切换
            var target = $(this);
            store.set('page', 1);
            store.set('faceType', target.data('face'));
            getCommentList(store.get('faceType'));
        })

        .on('click', '.del', function (e) { // 删除
            var element = $(this);
            var commentId = element.data('id');

            confirm('确认删除该条邀请评价吗？', '温馨提示')
            .done(function () {

                service
                .delInviteComment({ commentId: commentId })
                .done(function (response) {
                    if (response.code === 0) {
                        success('删除成功');
                        getCommentList(store.get('faceType'));
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

});