define(function (require, exports) {

    'use strict';
    var form = require('common/form');
    var date = require('cobble/util/date');
    var time = require('cobble/util/time');

    function ClassScheduleDisabled(options) {
        $.extend(this, options);
        this.init();
    }

    ClassScheduleDisabled.prototype = {
        init: function () {

            var me = this;
            var element = me.element;

            me.setIndex(me.index);
            me.refresh();

        },
        refresh: function () {
            var data = this.data;
            var element = this.element;

            this.element
            .find('input[name]')
            .each(function (index, item) {
                var name = $(item).prop('name');
                $(item).val(data[name]);
            });

            if (data.organization.is_organization) {
                element.find('.is-org').show();
            }

            var begin = new Date(data.begin_time * 1000);
            var end = new Date(data.end_time * 1000);

            var courseDate = date.stringify(begin);
            var beginTime = time.stringify(begin);
            var endTime = time.stringify(end);

            element.find('.course-date').html(courseDate);
            element.find('.begin-time').html(beginTime);
            element.find('.end-time').html(endTime);

            element.find('.content').html(data.content);
            if (data.organization.is_organization) {
                element.find('.teacher-name').html(data.teacher.display_name);
            }
        },
        getData: function () {
            var data = form.parse(this.element.find('.schedule-form'));
            return {
                data: data
            };
        },
        setIndex: function (index) {
            this.index = index;
            this.element.find('.label').html('第' + index + '节');
            this.element.data('index', index);
        }
    }


    return ClassScheduleDisabled;
});