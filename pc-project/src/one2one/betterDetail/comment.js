/**
 * @file 优选一对一课程详情页 － 课程评价
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
    var etpl = require('cobble/util/etpl');

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

    var renderCommentSummary = etpl.compile($('#show-comment-overview').html());
    var renderCommentList = etpl.compile($('#show-comment-list').html());
    var renderCommentPager = etpl.compile($('#show-comment-pager').html());

    // 获取评论汇总信息
    function getCommentSummary() {

        service
        .getCommentSummary({
            key: 'ONE_ON_ONE_COURSE',
            value: store.get('courseNum')
        })
        .done(function (response) {
            if (response.code === 0) {
                container
                .find('.overview')
                .html(renderCommentSummary({summary: response.data.comment_summary}));
            }
        });
    }

    // 获取评论列表
    function getCommentList(addHash) {

        service
        .getCommentList({
            key: 'ONE_ON_ONE_COURSE',
            value: store.get('courseNum'),
            page: store.get('page'),
            pageSize: 10,
            orderBy: 'SORT'
        })
        .done(function (response) {
            if (response.code === 0) {

                var commentContent = container.find('.comment-content');

                commentContent
                .find('.list')
                .html(renderCommentList({comments: response.data.comment_paged.items}));

                commentContent
                .find('.pager-block')
                .html(renderCommentPager({pager: response.data.comment_paged.pager}));

                if (addHash) {
                    // 自动定位
                    location.hash = '#teacher-comment';
                }

            }
        });
    }

    // 获取更多评论
    function getMoreCommentList() {

        service
        .getCommentList({
            key: 'ONE_ON_ONE_COURSE',
            value: store.get('courseNum'),
            page: store.get('page'),
            pageSize: 10,
            orderBy: 'SORT'
        })
        .done(function (response) {
            if (response.code === 0) {

                var commentContent = container.find('.comment-content');

                commentContent
                .find('.list')
                .append(renderCommentList({comments: response.data.comment_paged.items}));

            }
        });
    }

    // 上报 delay
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
        getCommentSummary();
        getCommentList();

        container
        .on('click', '.pager-block a', function (e) { // 获取更多评论
            getMoreCommentList();
        })

        .on('click', '.more-comment', function (e) { // 查看该用户其他评论
            var target = $(e.currentTarget);
            target.hide();
            var others = target.closest('.other-comment').find('.others_comment');
            others.show();
        })

        .on('click', '.btn-support', function () { // 有用

            var target = $(this);
            var id = target.data('id');

            // 点赞
            service
            .thumbOperate({
                type: 'COMMENT',
                id: id,
                action: 'UP'
            })
            .done(function (response) {
                if (response.code === 0) {
                    target
                    .find('em')
                    .html(
                        target.data('count') + 1
                    );
                }
            });

        });

    }

})