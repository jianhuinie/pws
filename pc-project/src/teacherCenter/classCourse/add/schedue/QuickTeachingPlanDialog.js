define(function (require, exports) {

    'use strict';
    var Dialog = require('cobble/ui/Dialog');
    var Validator = require('cobble/form/Validator');
    var Calendar = require('cobble/form/Date');
    var dateUtil = require('cobble/util/date');
    var QuickTeachingPlanSchedule = require('./QuickTeachingPlanSchedule');
    var Select = require('cobble/form/Select');
    var moment = require('moment');

    var step1Tpl = Simplite.render('quick-plan-step1');

    var step2Tpl = Simplite.render('quick-plan-step2');

    var teacherSelectTpl = Simplite.render('quick-plan-step2-select-teacher');


    var header = {
        step1: '<span>快速排课（1/2）</span>起末日期',
        step2: '<span>快速排课（2/2）</span>上课规律',
    };

    function QuickTeachingPlanDialog(options) {
        $.extend(this, options);
        this.init();
    }

    function refreshDialog(dialog) {
        dialog.hide();
        dialog.show();
    }

    function addSchedule(container, startDate, endDate) {

        return new QuickTeachingPlanSchedule({
            container: container,
            startDate: startDate,
            endDate: endDate
        });
    }

    function formatDate(date) {
        return Date.parse(date.replace(/-/, '/'));
    }

    QuickTeachingPlanDialog.prototype = {
        init: function () {

            var me = this;
            var hasStep2 = false;
            me.scheduleList = [];

            var dialog = me.dialog = new Dialog({
                title: header.step1,
                content: step1Tpl,
                width: 800,
                skinClass: 'quick-teaching-plan-dialog',
                disposeOnHide: false
            });

            var element = dialog.element;

            var scheduleContainer;
            var step1Validator = new Validator({
                element: element.find('.date-period'),
                fields: {
                    start_date: {
                        errors: {
                            required: '请选择开课日期'
                        }
                    },
                    end_date: {
                        errors: {
                            required: '请选择结课日期'
                        }
                    }
                }
            });

            var step2Validator;

            var startDate = new Calendar({
                element: element.find('input[name="start_date"]')
            });

            var endDate = new Calendar({
                element: element.find('input[name="end_date"]')
            });

            startDate.onChange = function (evt) {
                var start = evt.cobble.value;
                var end = endDate.getValue();
                if (end) {
                    if (moment(start).diff(end) > 0) {
                        endDate.setValue(start);
                    }
                }
            };

            endDate.onChange = function (evt) {
                var end = evt.cobble.value;
                var start = startDate.getValue();
                if (start) {
                    if (moment(start).diff(end) > 0) {
                        startDate.setValue(end);
                    }
                }
            };

            element
            .on('click', '.next', function () {
                if (step1Validator.validate()) {
                    if (!hasStep2) { //构建step2
                        element
                        .find('.dialog-body')
                        .append(step2Tpl);
                        if (me.organization && me.organization.is_organization) {
                            element
                            .find('.time-period')
                            .prepend(teacherSelectTpl);

                            var teacherSelect = me.teacherSelect = new Select({
                                element: element.find('.time-period .teacher .dropdown'),
                                name: 'teacher'
                            });

                            teacherSelect.refresh({
                                data: $.map(me.organization.teacher_list, function (item) {
                                    return {
                                        text: item.display_name,
                                        value: item.number
                                    };
                                })
                            });

                            step2Validator = new Validator({
                                element: element.find('.time-period'),
                                fields: {
                                    teacher: {
                                        errors: {
                                            required: '请选择授课老师'
                                        }
                                    }
                                }
                            });
                        }

                        scheduleContainer = element.find('.schedule');

                        me.scheduleList.push(
                            addSchedule(
                                scheduleContainer,
                                startDate.getValue(),
                                endDate.getValue()
                            )
                        );

                        scheduleContainer
                        .on('removeschedule', function (e, schedule) {
                            if(me.scheduleList.length == 1) {
                                alert('抱歉，目前仅剩一个上课时间段，暂时无法删除');
                            }
                            else {

                                var index = $.inArray(schedule, me.scheduleList);
                                me.scheduleList[index].remove();
                                me.scheduleList.splice(index, 1);
                            }
                        });

                        hasStep2 = true;
                    } else {
                        //返回上一步修改信息后 跳到下一步需要更新下拉菜单
                        var len = me.scheduleList.length;
                        for (var i = 0; i < len; i++) {
                            me.scheduleList[i].remove();
                        }
                        me.scheduleList.splice(0, len);
                        me.scheduleList.push(
                            addSchedule(
                                scheduleContainer,
                                startDate.getValue(),
                                endDate.getValue()
                            )
                        );
                        $.each(me.scheduleList, function (index, item) {
                            item.refresh({
                                startDate: startDate.getValue(),
                                endDate: endDate.getValue()
                            })
                        });
                        
                    }

                    element.find('.time-period').show();

                    element
                    .find('.date-period')
                    .hide();

                    element
                    .find('.dialog-header h1')
                    .html(header.step2);

                    refreshDialog(dialog);
                }
            })
            .on('click', '.pre', function () {

                element
                .find('.time-period')
                .hide();

                element
                .find('.date-period')
                .show();

                element
                .find('.dialog-header h1')
                .html(header.step1);

                refreshDialog(dialog);
            })
            .on('click', '.add b', function () {

                var length = me.scheduleList.length;

                if (length == 3) {
                    alert('亲，一次最多设置3种不同的时间段');
                }
                else {
                    me.scheduleList.push(
                        addSchedule(
                            scheduleContainer,
                            startDate.getValue(),
                            endDate.getValue()
                        )
                    );

                    refreshDialog(dialog);
                }
            })
            .on('click', '.complete', function () {

                var valid = true;

                $.each(me.scheduleList, function (inex, item) {
                    if (!item.validate()) {
                       valid = false;
                    }
                });

                if ((!step2Validator || step2Validator.validate()) && valid) {
                    var schedules = $.map(me.scheduleList, function (item) {
                        return item.getCalculatedSchedule();
                    });
                    if (!schedules || schedules.length == 0) {
                        alert({
                            title: '温馨提示',
                            content: '小秘书发现你选择的起末时间段内，没有任何日期符合你</br>设置的上课规律，请返回修改'
                        });

                        return;
                    }

                    if (me.teacherSelect) {
                        var teacherId = me.teacherSelect.getValue();
                        var teacherName = me.teacherSelect.element.find(me.teacherSelect.labelSelector).text();
                        $.each(schedules, function (index, item) {
                            item.teacherId = teacherId;
                            item.teacherName = teacherName;
                        });
                    }

                    //判断规则制定的是否有重复时间段
                    var hasOverLap = false;
                    $.each(schedules, function (i, outer) {
                        $.each(schedules, function (j, inner) {
                            if (i !== j
                                && !(outer.begin >= inner.end
                                || outer.end <= inner.begin)
                            ) {
                                hasOverLap = true;
                                return false;
                            }
                        });

                        if (hasOverLap) {
                            return false;
                        }
                    });

                    if (hasOverLap) {
                        alert('你设置的时间段有重叠，请返回修改');
                    }
                    else {

                        if ($.isFunction(me.onComplete)) {
                            me.onComplete(schedules);
                        };
                    }
                }
            });

        },
        hide: function () {
            this.dialog.hide();
        }
    }

    return QuickTeachingPlanDialog;
});