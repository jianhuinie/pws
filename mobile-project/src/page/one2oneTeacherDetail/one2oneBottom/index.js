define(function (require, exports) {
    var $ = require('zepto');
    var open400TelDialog = require('common/openAppDialog/open400TelDialog');
    var user = require('common/user');
    var Loading = require('common/ui/Loading/index');
    var service = require('common/service');
    var ui_new = require('common/ui');
    var stay = require('common/courseBottom/tryListen/index');
    var wxMask = require('common/component/wxMask/weixinMask');
    var app = require('common/app');
    var browserType = require('util/env');
    var container = $('#page_main');
    var userInfo;
    var loading = new Loading();
    var courseNumber;
    function getFavor () {
        function getFavorInit () {
            service.get('/favorite/check', {
                object_id: courseNumber,
                object_type: 'ONE_ONE_ONE_COURSE'
            }, function (responese) {
                if (+responese.code === 0) {
                    var flag = responese.data.query_favorite_check.flag;
                    var status = (flag === 'YES') ? 1 : 0;
                    var text = status ? '已收藏' : '收藏';
                    var favor = container.find('.favor');
                    favor.find('.title').text(text);
                    if (status) {
                        favor.find('.icon')
                            .removeClass('icon-unfavor')
                            .addClass('icon-star-full');
                    }
                    favor.attr('data-status', status);
                }   
            });
        }
        // 获取收藏信息
        if(userInfo && user.isStudentLogin()) {
            getFavorInit();
        } 
        container.on('click', '.favor', function () {
            // 非app，浏览器环境，唤起app
            if (!app.isApp()) {
                app.wakeUpApp();
                return;
            }
            var that = $(this);
            function clickFunc () {
                loading.show();
                var status = +that.attr('data-status');
                var operateType = status ? 'DELETE' : 'ADD';
                service.post('/favorite/operate',{
                    object_id: courseNumber,
                    object_type: 'ONE_ONE_ONE_COURSE',
                    operate_type: operateType
                }, function (responese) {
                    if (+responese.code === 0) {
                        status = status ? 0 : 1;
                        that.attr('data-status', status);
                        var text = status ? '已收藏' : '收藏';
                        that.find('.title').text(text);
                        that.find('.icon')
                            .toggleClass('icon-unfavor')
                            .toggleClass('icon-star-full');
                        var warnTips = status ? '收藏成功' : '取消收藏成功';
                        setTimeout(function () {
                            ui_new.remind(warnTips);
                        }, 500);
                    }
                    loading.hide();
                });
            }
            if (!userInfo) {
                user.loginStudent(function () {
                    location.reload();
                });
            } else if (user.isStudentLogin()) {
                clickFunc();
            } else if (user.isTeacherLogin()) {
                ui_new.remind('请切换学生身份');
            }
        });
    }

    return function () {
        var there = this;
        courseNumber = there.courseNumber;
        var teacherNumber = there.teacherNumber;
        var subjectName = there.teachInfo.subject;
        userInfo = user.getUserInfo();
        if(app.isWeixin() || browserType.thirdapp.isQQ) {
            container.find('.shares').removeClass('hide');
        } else {
            container.find('.favor').removeClass('hide');
        }
        container
            .unbind('click', '.consult-box')
            .on('click', '.consult-box', function () {
                var that = $(this);
                var tel = that.attr('href');
                open400TelDialog.makePhoneCall(tel);
        });

        container   
            .unbind('click', '.shares')
            .on('click', '.shares', function () {
                wxMask.openMask('share');
            });

        getFavor();
        var channels = app.isApp() ? 'youxuan_teacher_app' : 'youxuan_teacher_m';
        var tryListenerOptions = {
            title: '预约咨询老师',
            buttonTitle: '确认提交',
            className: 'tryListener-new',
            subject_name_source: subjectName,
            class_number_source: courseNumber,
            teacherNumber: teacherNumber,
            place: 'notSignle',
            channel: channels
        };
        stay(tryListenerOptions);
    };
});