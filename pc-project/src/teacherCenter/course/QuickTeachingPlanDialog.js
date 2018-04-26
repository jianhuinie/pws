define(function (require, exports) {

    'use strict';
    var Dialog = require('cobble/ui/Dialog');
    var Validator = require('cobble/form/Validator');
    var Calendar = require('cobble/form/Date');
    var dateUtil = require('cobble/util/date');
    var QuickTeachingPlanSchedule = require('./QuickTeachingPlanSchedule');
    var Select = require('cobble/form/Select');
    var moment = require('moment');

    var step1Tpl = ''
        +   '<div class="form date-period">'
        +   $.map([
                {
                    labelName: '开课日期：',
                    name: 'start_date'
                },
                {
                    labelName: '结课日期：',
                    name: 'end_date'
                }
            ], function (item) {
                return ''
                +       '<div class="form-group inline">'
                +           '<label class="form-label"><i class="form-required"></i>' + item.labelName + '</label>'
                +           '<div class="form-controls">'
                +               '<div class="form-date">'
                +                   '<input type="text" readonly name="' + item.name + '" class="form-text" required placeholder="YYYY-MM-DD">'
                +                   '<div class="calendar"></div>'
                +                   '<span class="error"></span>'
                +               '</div>'
                +           '</div>'
                +       '</div>';
            }).join('')
        +       '<div class="form-actions">'
        +           '<button class="btn-primary next">下一步</button>'
        +       '</div>'
        +   '</div>';

    var step2Tpl = ''
        +   '<div class="form time-period">'
        +       '<div class="schedule">'
        +       '</div>'
        +       '<div class="add">'
        +           '<b><i class="icon icon-plus-o"></i>&nbsp;添加新时间段</b>'
        +       '</div>'
        +       '<div class="form-actions">'
        +           '<button class="btn-default pre">上一步</button>'
        +           '<button class="btn-primary complete">完成</button>'
        +       '</div>'
        +       '<div class="hint">'
        +           '<i class="icon icon-info-circle"></i>&nbsp;时间冲突时，新设置的课程将覆盖教学计划中的原有课程。如果有需要微调的课程，请点击“完成”后具体手动调整。'
        +       '</div>'
        +   '</div>';

    var teacherSelectTpl = ''
        +   '<div class="form-group teacher">'
        +       '<label class="form-label"><i class="form-required"></i>授课老师：</label>'
        +       '<div class="form-controls">'
        +           '<div class="dropdown" required>'
        +               '<button class="btn-default">'
        +                   '<i class="caret"></i>'
        +                   '<span>请选择老师</span>'
        +               '</button>'
        +               '<ul class="dropdown-menu">'
        +               '</ul>'
        +               '<span class="error"></span>'
        +           '</div>'
        +       '</div>'
        +   '</div>'


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

            element
            .on('click', '.next', function () {
                if (step1Validator.validate()) {

                    if ( formatDate(startDate.getValue()) > formatDate(endDate.getValue()) ) {
                        alert('结课时间应大于开课时间');
                        return;
                    }

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
                                data: $.map(me.organization.teacher_list, function (item){

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
                    }
                    else {
                        $.each(me.scheduleList, function (index, item) {
                            item.refresh({
                                startDate: startDate.getValue(),
                                endDate: endDate.getValue()
                            })
                        });
                    }

                    element
                    .find('.time-period')
                    .show();

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
                        var teacher = me.teacherSelect.getValue();

                        $.each(schedules, function (index, item) {
                            item.teacher = teacher;
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