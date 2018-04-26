/**
 * Created by gsx on 16/1/15.
 */
define(function (require) {
    'use strict';

    var utilBase = require('../../util/base');
    var env = require('../../util/env');
    var utilFunction = require('../../util/function');

    function parseGSXApp() {
        var UA_TEACHER = 'GenShuiXue-teacher';
        var UA_STUDENT = 'GenShuiXue-student';
        var UA_ORG = 'GenShuiXue-institution';
        /* 考研部落app */
        var UA_KAOYAN = 'KaoYanBuLuo';

        var ua = navigator.userAgent;

        var gsxApp = !1;

        var appPrefix = '';
        var appName = '';
        var isStudentApp;
        var isTeacherApp;
        var isOrgApp;
        var isKaoYanApp;
        if (-1 !== ua.indexOf(UA_STUDENT)) {
            appPrefix = UA_STUDENT;
            appName = 'student';
            isStudentApp = true;
        } else if (-1 !== ua.indexOf(UA_TEACHER)) {
            appPrefix = UA_TEACHER;
            appName = 'teacher';
            isTeacherApp = true;
        } else if (-1 !== ua.indexOf(UA_ORG)) {
            appPrefix = UA_ORG;
            appName = 'org';
            isOrgApp = true;
        } else if (-1 !== ua.indexOf(UA_KAOYAN)) {
            appPrefix = UA_KAOYAN;
            appName = 'kaoyan';
            isKaoYanApp = true;
        }
        if (appPrefix) {
            var arr = new RegExp(appPrefix + '-([0-9]{1,}[\.0-9]{0,})').exec(ua);
            gsxApp = {
                name: appName,
                version: createVersion(arr[1]),
                isStudentApp: isStudentApp,
                isTeacherApp: isTeacherApp,
                isOrgApp: isOrgApp,
                isKaoYanApp: isKaoYanApp,
                isApp: isStudentApp || isTeacherApp || isOrgApp || isKaoYanApp
            };
        }
        return gsxApp;
    }

    function Env() {
        utilBase.deepCopy(this, env);
        Object.defineProperty(this, 'app', {
            get: utilFunction.lazyConst(function () {
                return parseGSXApp();
            }),
            enumerable: !0
        });
    }

    return new Env();
});