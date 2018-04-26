/**
 * @file 老师详情页评论列表
 * @author jixiaohui
 */
define(function (require, exports) {

    'use strict';

    var Popup = require('cobble/helper/Popup');
    var Select = require('cobble/form/Select');
    var Tooltip = require('cobble/ui/Tooltip');
    var ImageDialog = require('common/component/ImageDialog');
    var service = require('common/service');
    var store = require('common/store');
    var Rotatable = require('common/component/Rotatable');
    var Editor = require('common/component/Editor');
    var Validator = require('cobble/form/Validator');
    var SaveButton = require('common/component/SaveButton');
    var cookie = require('cobble/util/cookie');
    var container = $('#teacher-comment');
    var noComment = $('#teacher-no-comment');
    var LoginDialog = require('common/component/LoginDialog');
    var SwitchRoleDialog = require('common/component/SwitchRoleDialog');
    var HasCommentedDialog = require('common/component/HasCommentedDialog');

    var sortSelect;
    var rotateIndex = 1 ;
    var rotateHash = {} ;
    // 验证
    var hash = {};
    // ajax获取评价列表后实例化回复评价相关对象
    var textareas, commentForm, commentSubmitBtns;
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
            commentTag: store.get('commentTag')
        })
        .done(function (response) {
            if (response.code === 0) {
                var data = response.data;
                var tpl = data.tpl;
                var totalCount = data.comment_data.comment_list.length;

                var content = container.find('.nav-content');

                if (totalCount > 0) {
                    // 显示评价栏
                    //container.show();
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

    exports.init = function () {
        //上报
        function report() {
            var params = {
                teacher_number:store.get('teacherNum'),
                user_id:store.get('userId') || "",
                track_id: cookie.get('__track_id__'),
                comment_type:store.get('type')||'1',
                comment_tag:store.get('commentTag_name')|| "",
                comment_tag_num:store.get('commentTag_count')|| "",
                dsp:'1',
                city_id:cookie.get('CITY_ID'),
                source:'3',
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

        HoverTreeScroll()

        store.set('page', 1);
        store.set('comment', 0);
        store.set('type', 1);
        getCommentList();

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

        //getCommentList();
        if (container.find('.sort-select')[0]) {
            sortSelect = new Select({
                element: container.find('.sort-select'),
                name: 'sort',
                value: 'display_order',
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
        }

        container
        .on('click', '[data-page]', function (e) {
            var target = $(e.currentTarget);
            store.set('page', target.data('page'));
            report();
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
        .on('click', '[data-comment]', function (e) {
            var target = $(e.currentTarget);
            store.set('comment', target.data('comment'));
            store.set('type', target.data('type'));//新增  评价类型comment_type
            store.set('face', '');
            store.set('page', 1);
            report();
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
        .on('click', '.btn-support', function (e) {

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
        .on('click', '.more-comment', function (e) {
            var target = $(e.currentTarget);
            target.hide();
            var others = target.closest('.other-comment').find('.others_comment');
            others.show();
        })
        .on('click', '.packup', function (e) {// 收起评价图片
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
        .on('click', '.reply-comment-btn', function (e) { // 回复评价
            var target = $(e.currentTarget);
            var commentItem = target.closest('.comment');
            if (commentItem.length == 0) {
                commentItem = target.closest('.others_comment');
            }
            commentItem.find('.comment-form').toggle();
        })
        .on('click', '.comment-label li', function (e) { // 评价标签化
            var target = $(e.currentTarget);
            if (!target.hasClass('selected')) {
                store.set('commentTag', target.data('value'));
                store.set('commentTag_name', target.data('name'));
                store.set('commentTag_count', target.data('count'));
                store.set('page', 1);
                getCommentList(true);
                report();

                return false;

            }
        });

        noComment
        .on('click', '.comment-label li', function (e) { // 评价标签化
            var target = $(e.currentTarget);
            if (!target.hasClass('selected')) {

                store.set('commentTag', target.data('value'));

                store.set('commentTag_name', target.data('name'));
                store.set('commentTag_count', target.data('count'));
                store.set('page', 1);
                getCommentList(true);
                report();
                return false;

            }
        });;

    };

});