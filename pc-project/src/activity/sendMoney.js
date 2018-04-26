/**
 * @file 活动页面 - 首单返现
 * @author liuxin
 */
define(function (require, exports) {

    'use strict';

    var ClassCourseProgress = require('common/component/ClassCourseProgress');
    var LoginDialog = require('common/component/LoginDialog');
    var SwitchRoleDialog = require('common/component/SwitchRoleDialog');

    var Popup = require('cobble/helper/Popup');
    var store = require('common/store');


    exports.init = function() {

        var container = $('#main');

        container
        .on('click', '.whether-cash', function (e) {

            var user = store.get('user');

            var hasLogin = user.id;

            if (!hasLogin) {
                new LoginDialog({
                    onSuccess: function () {
                        location.reload();
                    }
                });
                return;
            }
            else if (user.type === 2) {
                new SwitchRoleDialog({
                    createText: '抱歉，本活动只针对老师开放，需要开通老师身份吗？',
                    switchText: '抱歉，本活动只针对老师开放，需要切换老师身份吗？',
                    switchTo: 'teacher',
                    onSuccess: function (data) {
                        location.reload();
                    }
                });
                return;
            }

            var target = $(e.currentTarget);
            var progress = target.data('progress');            // 调用班课权限进度框
            new ClassCourseProgress({
                progress: progress
            });
        });

        var popup = new Popup({
            element: container.find('.share-trigger'),
            layer: container.find('.baidu-share'),
            show: {
                trigger: 'click'
            },
            hide: {
                trigger: 'click'
            }
        });


    };


});