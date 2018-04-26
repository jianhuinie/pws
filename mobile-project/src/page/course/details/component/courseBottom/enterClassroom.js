define(function (require) {
    'use strict';
    var appController = require('common/app');
    var service = require('common/service');
    var ui_new = require('common/ui');
    var util = require('common/util');
    var LoginDialog = require('common/ui/LoginDialog/LoginDialog');
    var observer = require('common/mvc/observer');
    var habo = require('common/component/analysis/habo/index');

    var container = $('.bottom');
    var button = container.find('.enterClass');
    var url;
    var isAndroid = util.platform.isAndroid();
    var isIOS = util.platform.isIOS();
    var platform = null;
    var userId;
    var courseId;
    var reportObj = {};

    function initReport(config, options) {
        var result = {};
        userId = config.user.number;
        courseId = options.classId;

        if (appController.isApp()) {
            if (isIOS) {
                platform = 'ios';
            } else if (isAndroid) {
                platform = 'android';
            } else {
                platform = 'others';
            }
        } else {
            platform = 'msite';
        }

        result.userId = userId;
        result.courseId = courseId;
        result.platform = platform;
        return result;
    }


    function initEvent(options) {
        button.on('click', function () {
            window.gsx_ready(function (config) {
                if (!config.user) {
                    if (appController.isApp()) {
                        appController.getUserInfo(function () {
                            location.reload();
                        });
                    } else {
                        var loginDialog = new LoginDialog();
                        loginDialog.show();
                        var listener1 = observer.addListener(loginDialog, 'success', function () {
                            //自动刷新一下
                            window.location.reload();
                        });
                        var listener2 = observer.addListener(loginDialog, 'display_changed', function () {
                            var display = this.get('display');
                            if (!display) {
                                observer.removeListener(listener1);
                                observer.removeListener(listener2);
                                loginDialog.destroy();
                            }
                        });
                    }
                    // location.href= "/static/login?next=" + encodeURIComponent(window.location.href);
                } else {
                    reportObj = initReport(config, options);
                    habo.send({
                        type: 'paycourse_preview',
                        stype: 'click',
                        key: 'paycourse_preview',
                        platform: reportObj.platform,
                        course_number: reportObj.courseId,
                        userId: reportObj.userId
                    });
                    $.ajax({
                        type: 'POST',
                        url: '/class_course/check_trial_info',
                        data: {
                            room_no: options.trial_info.lesson.room_no
                        },
                        success: function (response) {
                            url = response.data.location;
                            if (response.data.trial_info.left_minutes > 0) {
                                if (appController.isApp()) {
                                    appController.urlSchemeRoute({
                                        url: url
                                    });
                                    return;
                                } else {
                                    location.href = url;
                                }
                            } else if (response.data.trial_info.left_minutes <= 0) {
                                if (appController.isApp()) {
                                    appController.urlSchemeRoute({
                                        url: location.origin + "/class_course/trial_feedback?room_no=" + encodeURIComponent(options.trial_info.lesson.room_no)
                                    });
                                    return;
                                } else {
                                    location.href = "/class_course/trial_feedback?room_no=" + encodeURIComponent(options.trial_info.lesson.room_no);
                                }
                            } else {
                                ui_new.alert(response.msg);
                            }
                        }
                    });
                }
            });
        });
    }

    return function (options) {
        if (button.length !== 0) {
            initEvent(options);
        }
    };
});
