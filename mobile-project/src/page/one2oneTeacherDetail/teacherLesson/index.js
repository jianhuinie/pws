define(function (require) {
    var $  = require('zepto');
    var template = require('artTemplate');
    var render = template.compile(require('text!./render.tpl'));
    var service = require('common/service');
    var dom = $('.teach-lesson');
    var lessonWaysMap = {
        STUDENT: '学生上门',
        TEACHER: '老师上门',
        ONLINE: '线上授课',
        OFFLINE: '线下授课'
    };

    return function () {
        var teachInfo = this.teachInfo;
        var gradeStr = '';
        if (teachInfo.categories.length > 0) {
            teachInfo.categories.map(function (item, index) {
                var temp = '';
                if (index > 0) {
                    temp = '/';
                }
                gradeStr += temp + item.name;
            });
        }

        var lessonWayStr = '';
        if (teachInfo.lessonWay.length > 0) {
            teachInfo.lessonWay.map(function (item, index) {
                var temp = '';
                if (index > 0) {
                    temp = '/';
                }
                lessonWayStr += temp + lessonWaysMap[item];
            });
        }

        var params = {
            subject: teachInfo.subject,
            grade: gradeStr,
            ways: lessonWayStr,
            areas: teachInfo.address ? teachInfo.address.area_path_str : ''
        };

        var teachLessonHtml = render({
            list: params
        });

        dom.html(teachLessonHtml);

    };
});