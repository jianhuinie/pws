define(function (require) {

    'use strict';
    var container = $('#main');
    var liudanClickLog = require('common/liudanClickLog/liudanClickLog');
    var bindCourseClick = require('common/bindCourseClick');
    var app = require('common/app');
    var user = require('common/user');
    var isTeacherApp;
    var appVersion;
    var userInfo;

    return function (options) {
        isTeacherApp = app.isTeacherApp();
        appVersion = app.appVersion();
        userInfo = user.getUserInfo();
        var consultBtn = container.find('.consult-box');
        var flag = consultBtn.data('flag');
        consultBtn.on('click', function () {
            //咨询还是咨询电话
            var that = $(this);

            //flag 1-预约咨询 2-咨询 3-机构电话咨询
            if(flag == 1 || flag == 3) {
                liudanClickLog.send({
                    stype: 4
                });
                location.href = that.attr('href');
            } else {
                var param = {
                    c_id: options.org_number,
                    c_role: '6',
                    group_id: ''

               };
                var supportVersionNumber = app.version2Number(isTeacherApp ? '2.7.0' : '2.6.0');
                var currentVersionNumber = app.version2Number(appVersion);
                var imSupportVersionNumber = app.version2Number('3.0.7');
                var easemob = '';
                if (that.data('easemob')) {
                    easemob = that.data('easemob');
                }

                if (currentVersionNumber >= supportVersionNumber) {
                    if ((userInfo && !userInfo.number) || !userInfo) {
                        // 2016-01-05 by caoying，学生端要求未登录时调用另外一个jokey接口,无需调用原来的登陆页面
                        if (currentVersionNumber >= imSupportVersionNumber) {
                            app.send('anonymousIM');
                        } else {
                            user.loginStudent();
                        }
                    } else {
                        app.send('IM', param);
                    }
                } else {
                    if (userInfo && !userInfo.number) {
                        user.loginStudent(function() {
                            app.send('toChat', { easemob: easemob });
                        });
                    } else {
                        app.send('toChat', { easemob: easemob });
                    }
                }
            }
        });

        /*if(flag!=1) {
            bindCourseClick.initChat(consultBtn, param);
        }*/
    }
});
