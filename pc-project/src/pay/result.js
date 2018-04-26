define(function (require, exports) {

    'use strict';

    var MakePhoneCallDialog = require('common/component/MakePhoneCallDialog');
    var EnterClassroomDialog = require('common/center/component/EnterClassroomDialog');
    var QuickLessonDialog = require('common/component/QuickLessonDialog');
    var service = require('common/service');
    var store = require('common/store');

    var courseType = '';

    /*
     *  上报
     */
    function gsReport(type, stype) {
         var params = {
            type: type,
            stype: stype,
            course_type: courseType
        };
        WAT.send('http://click.genshuixue.com/gs.gif', params);
    }

    exports.init = function () {

        var container = $('#main');

        // 确定上报所需课程类型
        if (store.get('courseType') == 1) { // 一对一
            courseType = 'One2One';
        }
        else if (store.get('courseType') == 2) { // 班课
            if (store.get('lessonWay') == 2) { // 直播课
                courseType = 'OnlineClass';
            }
            else { // 线下班课
                courseType = 'OfflineClass';
            }
        }
        else if (store.get('courseType') == 3) { // 视频课
            courseType = 'Video';
        }
        else if (store.get('courseType') == 5) { // 试听课
            courseType = 'Audition';
        }
        else if (store.get('purchaseType') == 29) { // 组合课
            courseType = 'Package';
        }

        // 展示上报
        if (courseType) {
            gsReport('PayResult _Display', courseType);
        }

        container
        .on('click', '.wrapper [data-mobile]', function () { // 拨打电话

            var from = store.get('user').number;
            var to  = $(this).data('number');
            var name = $(this).data('name');

            new MakePhoneCallDialog({
                from: from,
                to: to,
                mobile: store.get('user').mobile,
                name: name
            });
        })

        .on('click', '.buttons .enter-class', function (e) {
            var target = $(this);

            var data = target.data();
            new EnterClassroomDialog({
                data: data.online
            });
        })

        .on('click', '[name="quick-lesson"]', function (e) { // 闪电约课 new

            var target = $(e.currentTarget);
            var qlessonBox = target.closest('.quick-lesson-box');

            if (target.prop('checked')) { // 开启

                // 闪电约课 - 弹窗不再提醒
                var remind = store.get('user').qreserve_remind;

                if (remind == 1) {
                    new QuickLessonDialog({
                        teacher_num: qlessonBox.data('user-num'),
                        closeDialog: function () {
                            target.prop('checked', false);
                        }

                    });
                }
                else if (remind == 0) {

                    service
                    .quickLesson({
                        qreserveSign: 1,
                        teacherNum: qlessonBox.data('user-num')
                    })
                    .done(function (response) {
                        if (response.code === 0) {
                            // 直接刷新吧
                            success('闪电约课开启', function () {
                                location.reload();
                            });
                        }
                    });

                }

            }
            else { // 取消

                confirm({
                    content: '关闭闪电约课后，该老师向你发起的约课以及时间修改需要手动确认，是否确定要关闭？',
                    title: '温馨提示',
                    width: 330
                })
                .done(function () {

                    // 取消闪电约课
                    service
                    .quickLesson({
                        qreserveSign: 0,
                        teacherNum: qlessonBox.data('user-num')
                    })
                    .done(function (response) {
                        if (response.code === 0) {
                            // 直接刷新吧
                            success('闪电约课关闭', function () {
                                location.reload();
                            });
                        }
                    });

                })
                .fail(function () {
                    target.prop('checked', true);
                });

            }
        })

        .on('click', '.invite-reserve', function () { // 请老师为我排课 new

            service
            .inviteTeacherReserve({
                purchaseId: store.get('purchaseId')
            })
            .done(function (response) {
                if (response && response.code === 0) {

                    var data = response.data;
                    if (data.times == 1) {
                        alert('已经提醒老师，请耐心等待老师为你排课');
                    }
                    else if (data.times >= 2) {
                        alert('已经提醒老师，请不用重复提交请求');
                    }

                }
            });
        })

        .on('click', '.teacher-reserve', function () { // 机构X课一对一，请老师为我排课

            service
            .inviteTeacherReserve({
                purchaseId: store.get('purchaseId')
            })
            .done(function (response) {
                if (response && response.code === 0) {

                    var data = response.data;
                    if (data.times == 1) {
                        alert('请求已发送，请等待老师排课');
                    }
                    else if (data.times >= 2) {
                        alert('已经提醒老师，请不用重复提交请求');
                    }

                }
            });
        })

        .on('click', '.buttons .btn', function (e) { // 按钮，点击上报 new

            var target = $(e.currentTarget);

            if (target.data('stype')) {
                gsReport('PayResult _Click', target.data('stype'));
            }
        });
    }

});