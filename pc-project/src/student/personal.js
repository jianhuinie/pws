/**
 * @file 个人资料
 * @author zhengjunxin
 */
define(function (require, exports) {
    'use strict';
    var Popup = require('cobble/helper/Popup');
    var container = $('#main');
    var studentProfile = container.find('#student-profile');

    // 分享弹出
    // exports.init = function () {
    //     var popup = new Popup({
    //         element: studentProfile.find('.social-share'),
    //         layer: studentProfile.find('.baidu-share'),
    //         show: {
    //             trigger: 'over',
    //             delay: 100
    //         },
    //         hide: {
    //             trigger: 'out',
    //             delay: 200
    //         }
    //     });
    // };

    // tab的切换
    // studentProfile.
    // on('click', '.list-item', function (e) {
    //     var element = $(this);
    //     var nav = element.data('nav');
    //     container.removeClass('profile-active')
    //              .removeClass('comment-active')
    //              .removeClass('media-active')
    //              .removeClass('course-active')
    //              .removeClass('main-active')
    //              .addClass(nav);
    //     studentProfile.find('.list-item').removeClass('active');
    //     element.addClass('active');
    // });
});