/**
 * @file SEM K12聚合页 - 评价模板
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var service = require('common/service');
    var store = require('common/store');
    var Tooltip = require('cobble/ui/Tooltip');

    var container, commentBox;
    var faceType = '';

    exports.init = function () {

        container = $('.show-comment');
        commentBox = container.find('.nav-content');

        // 初始加载评论列表数据
        getCommentList(1);

        container
        .on('click', '.bottom-nav input[type="radio"]', function (e) {
            var target = $(e.currentTarget);
            faceType = target.closest('.item').data('face');

            if (!target.find('input[name="face-type"]').prop('checked')) {
                getCommentList(1);
            }
        })

        .on('click', '.pager a', function (e) {
            var target = $(e.currentTarget);
            var page = target.data('page');

            getCommentList(page);
            return false;
        });

    }


    /*
     * ajax获取评论列表
     */
    function getCommentList (page) {

        service
        .semCommentList({
            page: page,
            faceType: faceType,
            source: store.get('source'),
            plan: store.get('plan'),
            group: store.get('group'),
            keyword: store.get('keyword'),
            q: store.get('query')
        })
        .done(function (response) {
            if (response.code === 0) {
                var list = response.data.tpl.info;
                commentBox.html(list);
                Tooltip.init(container.find('[data-title]'));
            }
        });
    }

});