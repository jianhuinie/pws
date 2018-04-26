/**
 * @file 预约试听 - 列表页
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var service = require('common/service');
    var EditTrialCourseTimeDialog = require('common/component/EditTrialCourseTimeDialog');
    var EnterClassroomDialog = require('common/center/component/EnterClassroomDialog');
    var CancelOrderDialog = require('common/component/CancelOrderDialog');
    var store = require('common/store');

    var container;

    exports.init = function () {

        container = $('#content');

        container
        .on('click', '.modi-time', function (e) { // 修改时间
            var data = $(this).data('json');

            new EditTrialCourseTimeDialog({
                lessonInfo: data
            });
        })

        .on('click', '.enter-room', function (e) { // 进入教室
            var target = $(e.currentTarget);
            var data = target.closest('td').data();
                new EnterClassroomDialog({
                    data: data.online
                });
        })

        .on('click', '.cancleOrder' ,function(e){
                var target = $(this);
                var userType =  'teacher';
                var data = {
                    userType: userType,
                    type: 'order',
                    url: target.data('url')
                };
                new CancelOrderDialog(data);
        });

    };

});