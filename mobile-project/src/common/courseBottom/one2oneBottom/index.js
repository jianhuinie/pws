define(function(require) {

    var shares = require('../share/index');
    var consult = require('../consult/index');
    var tryListen = require('../tryListen/index');
    var appController = require('common/app');
    var browserType = require('util/env');
    var isStudentApp;
    var isTeacherApp;
    var isOrgApp;

    return function(options) {

        isStudentApp = appController.isStudentApp();
        isTeacherApp = appController.isTeacherApp();
        isOrgApp = appController.isOrgApp();

        if (isTeacherApp || isOrgApp) {
            $('.bottom').hide();
        } else {
            var consultBox = $('.consult-box');
            options.cdbName = 'cdb.teacher_course';
            //在非APP和微信、QQ环境中会有三个底导，其余有四个
            if (!(appController.isWeixin() || appController.isApp() || browserType.thirdapp.isQQ)) {
                consultBox.show();
                consultBox.addClass('cousult-three');
            } else {
                consultBox.show();
                consultBox.addClass('cousult-four');
            }
            shares(options);
            consult(options);
            tryListen(options);
        }
    }
});