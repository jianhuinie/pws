/**
 * @file 一对一课程详情页 － 课程评价
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var store = require('common/store');
    // var Popup = require('../../helper/Popup');
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
    var cookie = require('cobble/util/cookie');
    var container = $('#teacher-comment');
    var noComment = $('#teacher-no-comment');
    var rotateHash = {};
    var rotateIndex = 1;
    // ajax获取评价列表后实例化回复评价相关对象
    var textareas, commentForm, commentSubmitBtns;
    // 验证
    var hash = {};

    // 获取评论列表
    function getCommentList(addHash) {

        var sortBy = 'create_time'; // 按时间排序

        return service
        .getOne2oneCourseList({
            teacherNum: store.get('teacherNum'),
            page: store.get('page'),
            pageSize: 10,
            face: store.get('face'),
            comment: store.get('comment'),
            sortBy: sortBy,
            domain: store.get('domain'),
            number: store.get('courseNumber'),
            pageType: 'one2one'
        })
        .done(function (response) {
            if (response.code === 0) {

                var data = response.data;
                var tpl = data.tpl;
                //var totalCount = data.comment_data.course_comment.length + data.comment_data.related_comment.length;

                var content = container.find('.nav-content');

                //if (totalCount > 0) {
                    // 显示评价栏
                    container.addClass('show-teacher-comment');
                    container.find('.tab-nav-info').html(tpl.comment_nav);
                    content.html(tpl.comment_list);
                    container.find('.overview').html(tpl.comment_overview);

                    var trigger = container.find('.nav-item-all');
                    var angleIcon = trigger.find('i');
                    /*
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
                    */

                    // 回复评价的输入框
                    textareas = container.find('.form-editor');
                    textareas.each(function (i, item) {
                        var element = $(item);
                        new Editor({
                            element: element,
                            maxLength: 200
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
                                        maxlength: 200
                                    },
                                    errors: {
                                        required: '请输入回复信息',
                                        maxlength: '不能超过 200 字'
                                    }
                                }
                            }
                        });
                    });

                    // 回复评价
                    commentSubmitBtns = container.find('.comment-submit');
                    commentSubmitBtns.each(function (i, item) {
                        var element = $(item);
                        var commentItem = element.closest('.comment');

                        if (commentItem.length == 0) {
                            commentItem = element.closest('.others_comment');
                        }
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
                                                commentItem.append(content);
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
                    if (addHash) {
                        // 自动定位
                        location.hash = '#teacher-comment';
                    }
                //}
            }
        });
    }


    // 获取可写评价课程列表
    function getCanCommentOrderList (teacherNum) {

        service
        .getCanCommentOrderList({
            teacherNum: store.get('teacherNum')
        })
        .done(function (response) {
            if (response.code === 0) {
                var commentList = response.data.can_comment_list;
                if (commentList.length === 1) {
                    // 只有一门可评论课程，直接跳转至评论页面
                    location.href = '/comment/purchaseInfo?purchase_id=' + commentList[0].purchase_id;

                } else if (commentList.length > 1) {
                    // 调课程列表弹窗
                    new CanCommentOrderListDialog({
                        commentList: commentList
                    });
                } else {
                    confirm({
                        title: "温馨提示",
                        content: "你没有可评价的课程哦～",
                        buttons: [
                            {
                                text: '发现精彩课程',
                                type: 'primary',
                                handler: function () {
                                    // 跳转到老师课程页面
                                    this.hide();
                                    location.href = "/" + store.get('domain') + "/course";
                                }
                            },
                            {
                                text: '以后再看',
                                handler: function () {
                                    location.reload();
                                }
                            }
                        ]
                    });
                }
            }
        });
    }



    //上报
    function report() {
        var params = {
            teacher_number: store.get('teacherNum'),
            user_id: store.get('userId') || "",
            track_id: cookie.get('__track_id__'),
            comment_type: '1',
            comment_tag: store.get('commentTag_name') || "",
            comment_tag_num: store.get('commentTag_count') || "",
            dsp: '1',
            city_id: cookie.get('CITY_ID'),
            source: '3',
            type: 'comment',
            page: store.get('page'),
        };
        WAT.send('http://click.genshuixue.com/gs.gif', params);

    }


    exports.init = function () {

        // 评论列表
        store.set('page', 1);
        store.set('comment', 0);

        // 获取初识评价列表
        store.set('page', 1);
        getCommentList();

        container

            //点击类型上报
            .on('click', '.bottom-nav .item', function (e) {
                var target = $(e.currentTarget);

                store.set('commentTag', target.data('value'));
                store.set('commentTag_name', target.data('name'));
                store.set('commentTag_count', target.data('num'));
                store.set('page', 1);
                report();
                //getCommentList();
                return false;
            })


            //分页上报

            .on('click', '[data-page]', function (e) {

            var target = $(e.currentTarget);
            store.set('page', target.data('page'));
            report()
            getCommentList(true);

            return false;
        })

        .on('click', '.more-comment', function (e) {
            var target = $(e.currentTarget);
            target.hide();
            var others = target.closest('.other-comment').find('.others_comment');
            others.show();
        })

        .on('click', '[data-face]', function (e) {

            var target = $(e.currentTarget);
            store.set('face', target.data('face'));
            store.set('page', 1);
            getCommentList(true);

            return false;
        })

        .on('click', '[data-comment]', function (e) {

            var target = $(e.currentTarget);
            store.set('comment', target.data('comment'));
            store.set('face', '');
            store.set('page', 1);
            getCommentList(true);

            return false;
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
            var commentItem = target.closest('.comment');
            if (commentItem.length == 0) {
                commentItem = target.closest('.others_comment');
            }
            commentItem.find('.comment-form').toggle();
        })

        .on('click', '.photo-item', function (e) {
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

        .on('click', '.packup', function (e) { // 收起评价图片
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
        .on('click', '#comment-more', function (e) { // 写评价
            var target = $(e.currentTarget);
            var haslogin = !!store.get('user').number;

            // 登录或身份变更成功后 需要发请求 获取用户可评价列表
            if (haslogin) {
                if (store.get('user').type === 0) {
                    new SwitchRoleDialog({
                        createText: '需要开通学生身份才能评价老师课程哦~现在开通？',
                        switchText: '需要切换学生身份才能评价老师课程哦~现在切换？',
                        switchTo: 'student',
                        onSuccess: function (data) {
                            getCanCommentOrderList();
                        }
                    });
                }
                else {
                    getCanCommentOrderList();
                }
            } else { // 未登录
                new LoginDialog({
                    onSuccess: function () {
                        // 调用Aiax请求，获取用户可评价课节列表
                        getCanCommentOrderList();
                    }
                });
            }
        });

        noComment
        .on('click', '#comment-more', function (e) { // 写评价
            var target = $(e.currentTarget);
            var haslogin = !!store.get('user').number;

            // 登录或身份变更成功后 需要发请求 获取用户可评价列表
            if (haslogin) {
                if (store.get('user').type === 0) {
                    new SwitchRoleDialog({
                        createText: '需要开通学生身份才能评价老师课程哦~现在开通？',
                        switchText: '需要切换学生身份才能评价老师课程哦~现在切换？',
                        switchTo: 'student',
                        onSuccess: function (data) {
                            getCanCommentOrderList();
                        }
                    });
                }
                else {
                    getCanCommentOrderList();
                }
            } else { // 未登录
                new LoginDialog({
                    onSuccess: function () {
                        // 调用Aiax请求，获取用户可评价课节列表
                        getCanCommentOrderList();
                    }
                });
            }
        });

    }

})