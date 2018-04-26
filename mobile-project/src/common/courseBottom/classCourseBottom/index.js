/**
 * 底部样式统一处理
 * @author hsm/sbq/hurry
 */
define(function (require) {

    var browserType = require('util/env');
    var appController = require('common/app');

    var shares = require('../share/index');
    var consult = require('../consult/index');
    var tryListen = require('../tryListen/index');
    var enterClassroom = require('../enterClassroom/index');
    var replay = require('../replay/index');
    var favor = require('../favor/index');
    var callPhone = require('../call/index');
    
    var isStudentApp;
    var isTeacherApp;
    var isOrgApp;

    return function (options) {
        isStudentApp = appController.isStudentApp();
        isTeacherApp = appController.isTeacherApp();
        isOrgApp = appController.isOrgApp();

        if (isTeacherApp || isOrgApp) {
            $('.bottom').hide();
        } else {
            var consultBox = $('.consult-box');
            options.cdbName = 'cdb.teacher_class_course';
            //在非APP和微信、QQ环境中会有三个底导，其余有四个
            if (!(appController.isWeixin() || isStudentApp || browserType.thirdapp.isQQ)) {
                consultBox.show();
                consultBox.addClass('cousult-three');
            } else {
                consultBox.show();
                consultBox.addClass('cousult-four');
            }
            // 课程中心
            // if (options.course_info.button_info.type == 'has_pay' && isStudentApp) {
                $('.bottom-item .course-center-btn').on('click', function () {
                    var me = $(this);
                    var courseNum = me.data('course-number');
                    var purchaseId = me.data('purchase-id');
                    appController.send('urlSchemeRoute', {
                        url: 'bjhlstudent://o.c?a=student_online_course&class_course_number=' + courseNum + '&purchase_id=' + purchaseId
                    });
                });
            // }
            shares(options);
            consult(options);
            tryListen(options);
            enterClassroom(options);
            replay(options);
            callPhone(options);
            favor(options, options.course_info.course_type);
        }
    };
});