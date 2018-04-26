/**
 * @file 可授课时间
 * @author jixiaohui
 */
define(function (require, exports) {

    'use strict';

    var WeekCalendar = require('../component/WeekCalendar2');
    var date = require('cobble/util/date');
    var store = require('common/store');
    var service = require('common/service');

    exports.init = function () {

        var container = $('#teacher-calendar');

        var weekCalendar = new WeekCalendar({
            element: container,
            onAfterRender: function (data) {

                service
                .getTeacherBusyDate({
                    number: store.get('teacherNum'),
                    start: date.stringify(date.parse(data.start)),
                    end: date.stringify(date.parse(data.end))
                })
                .done(function (response) {
                    if (response.code === 0) {
                        weekCalendar.apply(
                            response.data
                        );
                    }
                });

            }
        });
    };

});