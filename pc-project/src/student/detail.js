/**
 * @file 学生信用中心
 * @author jixiaohui
 */
define(function (require, exports) {

    'use strict';
    var Popup = require('cobble/helper/Popup');
    var container = $('#content');

    exports.init = function () {

        var navInfo = container.find('#tab-nav-info');
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

        container

        .on('click', '[data-comment]', function (e) {
            var element = $(this);
            var faceType = navInfo.data('ftype');
            var commentType = element.data('comment');
            var number = $('.profile').data('number');
            var link = '/comment/fromTeacherDetail?number='+number;
            var commentTypeUrl = commentType ? '&comment_type=' + commentType : '';
            link = link + commentTypeUrl +
                          '&page=1&page_size=10';
            location.href = link;
        })

        .on('click', '[data-face]', function (e) {
            var element = $(this);
            var commentType = navInfo.data('ctype');
            var faceType = element.data('face');
            var number = $('.profile').data('number');
            var link = '/comment/fromTeacherDetail?number='+number;
            var commentTypeUrl = commentType ? '&comment_type=' + commentType : '';
            var faceTypeUrl = faceType ? '&face_type=' + faceType : '';
            link = link + commentTypeUrl +
                          faceTypeUrl +
                          '&page=1&page_size=10';
            location.href = link;
        });

    };
});