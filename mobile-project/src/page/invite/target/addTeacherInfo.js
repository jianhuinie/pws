define(function(require, exports) {
    'use strict';
    var $ = require("zepto");
    var template = require('artTemplate');
    var teacherInfoRender = template.compile(require("text!./teacherInfo.tpl"));

    function addTeacherInfo(teacherNumber) {
        $.ajax({
            type: "post",
            url: '/teacher/baseInfo',
            data: {
                teacher_number: teacherNumber
            },
            success: function(response) {
                if (response.code == 0) {
                    var html = teacherInfoRender({
                        info: response.data
                    });
                    $('#j_teacherInfoCtn').append(html);
                }
            }
        });
    }

    return function (teacherNumber) {
        addTeacherInfo(teacherNumber);
    }
});
