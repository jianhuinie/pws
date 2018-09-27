/**
 * @file 老师详情页评论列表
 * @author wuhongjie
 */
define(function (require, exports) {

    'use strict';

    var Popup = require('cobble/helper/Popup');
    var Select = require('cobble/form/Select');
    var Tooltip = require('cobble/ui/Tooltip');
    var ImageDialog = require('common/component/ImageDialog');
    var store = require('common/store');
    var Rotatable = require('common/component/Rotatable');
    var Editor = require('common/component/Editor');
    var Validator = require('cobble/form/Validator');
    var service = require('common/service');
    var SaveButton = require('common/component/SaveButton');
    var LoginDialog = require('common/component/LoginDialog');
    var SwitchRoleDialog = require('common/component/SwitchRoleDialog');
    var HasCommentedDialog = require('common/component/HasCommentedDialog');
    var CanCommentOrderListDialog = require('common/component/CanCommentOrderListDialog');
    var header = require('./header');
    var cookie = require('cobble/util/cookie');

    var container = $('#teacher-comment');
    var noComment = $('#teacher-no-comment');


    var sortSelect;
    var rotateIndex = 1 ;
    var rotateHash = {} ;
    // 验证
    var hash = {};
    // ajax获取评价列表后实例化回复评价相关对象
    var textareas, commentForm, commentSubmitBtns;

    //评价标签stype 映射MAP
    var stypeMap = {
        "classify_3001": 'Pay',
        "classify_3002": 'Positive',
        "classify_3003": 'Negative',
        "classify_3004": 'Relate'
    };

    function getCommentList(addHash) {

        var sortBy = sortSelect ? sortSelect.getValue() : 'display_order';

        return service
        .getTeacherCommentListNew({
            teacherNum: store.get('teacherNum'),
            page: store.get('page'),
            pageSize: 10,
            face: store.get('face'),
            comment: store.get('comment'),
            sortBy: sortBy,
            domain: store.get('domain'),
            commentTag: store.get('commentTag') || 'all'
        })
        .done(function (response) {
            if (response.code === 0) {

                var data = response.data;
                var tpl = data.tpl;
                var totalCount = data.comment_data.comment_list.length;

                var content = container.find('.nav-content');

                if (totalCount > 0) {
                    // 显示评价栏
                    container.show();
                    container.addClass('show-teacher-comment');
                    container.find('.tab-nav-info').html(tpl.comment_nav);
                    content.html(tpl.comment_list);
                    container.find('.overview').html(tpl.comment_overview);

                    var trigger = container.find('.nav-item-all');
                    var angleIcon = trigger.find('i');

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

                    sortSelect = new Select({
                        element: container.find('.sort-select'),
                        name: 'sort',
                        value: sortBy,
                        data: [
                            {
                                text: '推荐排序',
                                value: 'display_order'
                            },
                            {
                                text: '最近评价',
                                value: 'create_time'
                            }
                        ],
                        onChange: function (e) {
                            store.set('page', 1);
                            getCommentList(true);
                        }
                    });

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
                    commentSubmitBtns
                    .each(function (i, item) {
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
                                    .reviewComment(data, {
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
                        location.hash = '';
                        location.hash = '#teacher-comment';
                    }
                } else {
                    container.find('.tab-nav-info').html(tpl.comment_nav);
                    content.html('<div class="no-comment"><i class="icon icon-info-circle"></i>暂时没有评价哦</div>');
                }
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

    //上报函数
    function report(options) {
        var params = {
            teacher_number:store.get('teacherNum'),
            user_id: store.get('userId')|| "",
            track_id: cookie.get('__track_id__'),
            comment_type:store.get('type')|| '1',
            comment_tag:store.get('commentTag_name')|| "",
            comment_tag_num:store.get('commentTag_count')|| "",
            dsp:'1',
            city_id:cookie.get('CITY_ID'),
            source: store.get('source'),
            type: options.type || 'comment',
            stype: options.stype || '',
            page: store.get('page'),
        };
        WAT.send('http://click.genshuixue.com/gs.gif', params);
    }

    //页面滚动时
    function HoverTreeScroll() {
        var Obj =container.find('.top-nav');
        if (Obj.length != 1) { return false; }

        var offsetTop = arguments[1] ? arguments[1] : 0;
        var ObjTop = Obj.offset().top - $(window).height();
        var h_one = true;

        $(window).scroll(function () {
            if ($(window).scrollTop() > ObjTop) {
                if (h_one) {
                    report({
                        type: 'comment',
                        stype: ''
                    });
                    h_one = false;
                }

            }
        });
    }

    exports.init = function () {
        //页面滚动
        HoverTreeScroll();
        store.set('page', 1);
        store.set('comment', 0);
        
        if(store.get('initHeader')){
            header.init();
        }
        sortSelect = new Select({
            element: container.find('.sort-select'),
            name: 'sort',
            data: [
                {
                    text: '推荐排序',
                    value: 'display_order'
                },
                {
                    text: '最近评价',
                    value: 'create_time'
                }
            ],
            onChange: function (e) {
                store.set('page', 1);
                getCommentList();
            }
        });
        sortSelect.setValue('display_order');

        container
        .on('click', '[data-comment]', function (e) {
            var target = $(e.currentTarget);
            store.set('comment', target.data('comment'));
            store.set('type', target.data('type'));//新增  评价类型comment_type
            store.set('face', '');
            store.set('page', 1);
            store.set('commentTag', 'all');
            getCommentList();
            report({
                type: 'comment',
                stype: ''
            });
            return false;
        })
        .on('click', '[data-page]', function (e) {
            var target = $(e.currentTarget);
            store.set('page', target.data('page'));
            report({
                type: 'comment',
                stype: ''
            });
            getCommentList(true);
            return false;
        })
        .on('click', '[data-face]', function (e) {
            var target = $(e.currentTarget);
            store.set('face', target.data('face'));
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
                            getCommentList(true);
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
            var haslogin = store.get('haslogin');

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
        })
        .on('click', '.comment-label li', function (e) { // 评价标签化
            var target = $(e.currentTarget);
            var tagValue = target.data('value');
            if (!target.hasClass('selected')) {
                store.set('commentTag', tagValue);
                store.set('commentTag_name', target.data('name'));
                store.set('commentTag_count', target.data('count'));
                store.set('page', 1);

                report({
                    type: 'CommentTag_Click',
                    stype: stypeMap[tagValue] || ''
                });
                getCommentList(true);
                return false;

            }
        })
        .on('click', '.more-comment', function (e) {
            var target = $(e.currentTarget);
            target.hide();
            var others = target.closest('.other-comment').find('.others_comment');
            others.show();
        });

        noComment
        .on('click', '#comment-more', function (e) { // 写评价
            var target = $(e.currentTarget);
            var haslogin = store.get('haslogin');

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
        })
        .on('click', '.comment-label li', function (e) { // 评价标签化
            var target = $(e.currentTarget);
            if (!target.hasClass('selected')) {

                store.set('commentTag', target.data('value'));
                store.set('page', 1);

                getCommentList(true);
                return false;

            }
        });

    };

});