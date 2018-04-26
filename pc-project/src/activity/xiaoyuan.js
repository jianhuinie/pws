/**
 * @file 赢在校园
 * @author zhengjunxin
 */
define(function(require, exports) {

    'use strict';

    var VideoDialog = require('common/component/VideoDialog');
    var store = require('common/store');
    var service = require('common/service');
    var SwitchRoleDialog = require('common/component/SwitchRoleDialog');
    var LoginDialog = require('common/component/LoginDialog');


    exports.init = function() {
        var user = store.get('user');
        var hasLogin = user.id;
        var url = location.href;

        // 3个锚点如果是老师的身份，要切换
        $('.message').on('click', 'a', function (e) {
            if(user.type === 0) {
                e.preventDefault();
                new SwitchRoleDialog({
                    createText: '需要开通学生身份才能报名',
                    switchText: '需要切换学生身份才能报名',
                    switchTo: 'student',
                    onSuccess: function (data) {
                        location.reload();
                    }
                });
            }
        });

        /**
         * 弹出视频
         */
        $('.video')
            .on('click', '.video-thumbnail', function(e) {
                var element = $(this);
                var url = element.data('video');
                var title = element.data('name');

                new VideoDialog({
                    url: url,
                    title: title
                });
                return false;
            });
        // 未登录的两个按钮的点击事件
        var checkStatus = function () {

            if (!hasLogin) {
                // location.href = store.get('originHttps')+'/static/login?next=' + encodeURIComponent(url);
                new LoginDialog({
                    registerPrefix: '/track/source?id=gsx_xiaoyuan_pc&url=',
                    onSuccess: function () {
                        location.reload();
                        $(window).scrollTop(2750);
                    }
                });
            }
            else if (user.type === 0) {
                new SwitchRoleDialog({
                    createText: '需要开通学生身份才能报名',
                    switchText: '需要切换学生身份才能报名',
                    switchTo: 'student',
                    onSuccess: function (data) {
                        location.reload();
                    }
                });
            }
            else {
                // 登录后才能向后端发个消息，让后端知道他参加了

                service
                    .getEnroll()
                    .done(function (response) {
                        if (response.code === 0) {
                            location.href = '/student_center/profile';
                        }
                    })
            }
        };
        // 完成报名后的scroll事件
        var scroll = function () {
            $(window).scrollTop(3150);
        };
        if (store.get('status') === 2 && user.type === 2 ) {
            $('.sign').on('click', scroll);
            // $('.icon-enroll').on('click', scroll);

        }
        else {
            $('.sign')
                .on('click', checkStatus);
            // $('.icon-enroll')
            //     .on('click', checkStatus);
        }

    };
});