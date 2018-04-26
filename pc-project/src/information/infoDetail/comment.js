/**
 * @file 老师详情页评论列表
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var Popup = require('cobble/helper/Popup');
    var service = require('common/service');
    var store = require('common/store');

    var container = $('#teacher-comment');

    function getCommentList(page) {
        return service
        .getTeacherCommentList({
            teacherId: store.get('teacherId'),
            page: store.get('page'),
            pageSize: 10,
            face: store.get('face'),
            comment: store.get('comment')
        })
        .done(function (response) {
            if (response.code === 0) {

                var data = response.data;
                var tpl = data.tpl;

                if (!store.get('face') && data.comment_nav.score.comment_type.all === 0 ) {
                    container.find('.overview').hide();
                    container.find('.tab-nav').hide();
                } else {
                    container.find('.overview').html(tpl.comment_overview);
                    container.find('.tab-nav').html(tpl.comment_nav);
                }
                container.find('.nav-content').html(tpl.comment_list);

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

            }
        });
    }

    exports.init = function () {

        store.set('page', 1);
        store.set('comment', 0);

        getCommentList();

        container
        .on('click', '[data-page]', function (e) {

            var target = $(e.currentTarget);
            store.set('page', target.data('page'));

            getCommentList();

            return false;
        })
        .on('click', '[data-face]', function (e) {

            var target = $(e.currentTarget);
            store.set('face', target.data('face'));

            getCommentList();

            return false;
        })
        .on('click', '[data-comment]', function (e) {

            var target = $(e.currentTarget);
            store.set('comment', target.data('comment'));
            store.set('face', '');
            getCommentList();

            return false;
        });

    };

});