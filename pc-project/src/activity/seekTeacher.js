/**
 * @file 平台找老师页面
 * @author niejianhui
 * @version v1
 */
define(function (require, exports) {

    'use strict';
    var seekTeacher = require('teacher/seekTeacher');

    exports.init = function () {

        //其它页面因为需求，要传teacherNum sendToteacher channel三个参数，这个页面做特殊处理
        seekTeacher.init(0, false, '');
    }
});