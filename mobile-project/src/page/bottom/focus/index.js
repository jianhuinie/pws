define(function(require) {

    var $ = require('zepto');
    var container = $('#main');
    var user = require('common/user');
    var service = require('common/service');
    var ui = require('common/ui');
    var bottom = $('.bottom');
    var env = require('util/env');
    var openApp = require('common/app_wakeup');
    var app = require('common/app');
    var habo = require('common/component/analysis/habo/index');
    var isTeacherApp = app.isTeacherApp();
    var isApp;
    var userInfo;

    return function(options) {
        userInfo = user.getUserInfo();
        isApp = app.isApp();
        var isWeixin = env.thirdapp && env.thirdapp.isWeixin;
        var isQQ = env.thirdapp && env.thirdapp.isQQ;
        if (!(isWeixin || isQQ)) {
            bottom.find('.focus').removeClass('hide');
        }
        bottom.on('click', '.focus', function() {
            var that = $(this);
            var focusFlag = that.data('focus');
            var btnName;
            var type = focusFlag === 1 ? 0 : 1;
            var remindText;

            habo.send({
                type: that.data('stype')
            });

            if (isApp) {
                if (!userInfo) {
                    user.loginStudent();
                } else {
                    //取消关注或者关注的接口
                    service.post(
                        '/teacher/ajax_focus', {
                            id: options.teacher_number,
                            type: type
                        },
                        function(res) {
                            if (res.code === 0) {
                                if (focusFlag == 1) {
                                    btnName = "关注";
                                    remindText = "成功取消关注";
                                    that.find('.icon').removeClass('icon-focus');
                                    that.find('.icon').addClass('icon-unfocus');
                                } else {
                                    btnName = "已关注";
                                    remindText = "关注成功";
                                    that.find('.icon').removeClass('icon-unfocus');
                                    that.find('.icon').addClass('icon-focus');
                                }
                                ui.remind(remindText);
                                that.attr('data-focus', type);
                                that.find('div').text(btnName);
                            }
                        });
                }
            } else {
                // 调起APP
                var schemaUrl = 'bjhlstudent://o.c?a=url&url=' + encodeURIComponent(location.href);
                openApp({
                    type: 'internal',
                    url: schemaUrl
                }, function(isSuccess) {
                    if (!isSuccess) {
                        location.href = 'http://m.genshuixue.com/app/dw?t=s&ct=';
                    }
                });
            }
        })
    }
});