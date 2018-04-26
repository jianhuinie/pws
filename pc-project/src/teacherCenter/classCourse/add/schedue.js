define(function (require, exports) {

    var QuickTeachingPlanDialog = require('./schedue/QuickTeachingPlanDialog');
    var SingleTeachingPlanDialog = require('./schedue/SingleTeachingPlanDialog');
    var NotInRegularTimeDialog = require('./schedue/NotInRegularTimeDialog');
    var dateUtil = require('cobble/util/date');
    var moment = require('moment');
    var store = require('common/store');
    var service = require('common/service');
    var Validator = require('common/Validator');

    require('tpl!./schedue/schedue.tpl');

    var holder;

    var validator;

    var singleTeachingPlanDialog;

    var init = true;

    var courseLength;

    var noTimePlan = [];

    var errorMsgMap = {
        schedule: {
            includeSelf: '您正在{name}老师后台设置班课，请至少将{name}老师作为某一节课的授课老师'
        },
        schedueTime: {
            requireTime: '请设置该课节时间'
        },
        scheduePlan: {
            requirePlan: '请至少添加一节课'
        },
        keepCourseLength: {
            keepLength: '请保证修改前后的课时总时长为{num}小时'
        },
        description: {
            required: '时间安排描述不能为空',
            maxlength: '时间安排描述最多50个字'
        },
        specialTime: {
            isSpecialTime: '请说明非正常上课时间原因'
        },
        firstCourseTime: {
            lateThanNow: '老师，现在已经过了你设置的开课时间，快去检查一下教学计划吧！',
        }
    };

    /**
     * 把后台的老师列表数据格式化成Select组件支持的格式
     */
    var formatTeacherList = function (list) {
        var result = [];
        $(list).each(function (idx, item) {
            result.push({
                value: item.number,
                text: item.display_name
            });
        });
        return result;
    };

    /**
     * 格式化课表，获取总课时
     */
     var formatSchedules = function (list) {
        var courseLength = 0;
        $.each(list, function (idx, item) {
            var begin = +(item.begin_time);
            var end = +(item.end_time);
            if (begin && end) {
                courseLength += (end - begin) / (60 * 60);
            }
        });
        return courseLength;
     };


    /**
     * 为模块绑定验证规则，其中schedule为抽象规则，不对应Dom元素
     */
    var initValidator = function (options) {
        var validator = new Validator({
            rules: {
                requireTime: function () {
                    noTimePlan = [];
                    var planItems = holder.find('.plan-item');
                    for (var i = 0; i < planItems.length; i++) {
                        var item = planItems[i];
                        if (!$(item).data('startTime') || !$(item).data('endTime')) {
                            noTimePlan.push(i);
                        }
                    }
                    if (noTimePlan.length) {
                        return false;
                    } else {
                        return true;
                    }
                },
                requirePlan: function () {
                    var planItems = holder.find('.plan-item');
                    // if (planItems.length > 0) {
                    //     return {
                    //         force: true
                    //     }
                    // } else {
                    //     return false;
                    // }
                    return planItems.length > 0;
                },
                required: function (val) {
                    return !!val;
                },
                keepLength: function () {
                    if (!store.get('totalPay')) {
                        return true;
                    }
                    var planItems = holder.find('.plan-item');
                    var planCourseLength = 0;
                    $.each(planItems, function (idx, item) {
                        var start = +($(item).data('startTime'));
                        var end = +($(item).data('endTime'));
                        if (start && end) {
                            planCourseLength += (end - start) / (60 * 60);
                        }
                    });
                    if (courseLength != planCourseLength) {
                        return false;
                    } else {
                        return true;
                    }
                },
                maxlength: function (len) {
                    return this.value.length <= +len;
                },
                includeSelf: function () {
                    var result = true;
                    var token = '#';
                    var teacherNumber = store.get('user').number;
                    var isOrganization = store.get('isOrganization');
                    if (isOrganization && !init) {
                        var list = exports.getData().planList;
                        var teacherIds = [];
                        for (var i = list.length - 1; i >= 0; i--) {
                            teacherIds.push(list[i].teacherId);
                        }
                        return (token + teacherIds.join(token) + token).indexOf(token + teacherNumber + token) >= 0;
                    }
                    return result;
                },
                isSpecialTime: function () {
                    return exports.checkSpecialTime();
                },
                lateThanNow: function () {
                    return exports.checkFirstTime();
                }
            },
            elements: {
                schedule: ['includeSelf'],
                schedueTime: ['requireTime'],
                scheduePlan: ['requirePlan'],
                keepCourseLength: ['keepLength'],
                description: ['required', 'maxlength:50'],
                specialTime: ['isSpecialTime'],
                firstCourseTime: ['lateThanNow']
            },
            notifier: {
                '*': function (result, type, name) {
                    // 为抽象规则定义查找提示元素
                    var $tipContainer;
                    var msg = errorMsgMap[name][type];
                    if (name == 'schedule') {
                        $tipContainer = holder.find('.teacher-tip-container');
                        if (result) {
                            $tipContainer.removeClass('invalid').addClass('valid').hide();
                            return;
                        }
                        var name = store.get('user').name.replace(/(老师)$/, '');
                        msg = msg.replace(/{name}/g, name);
                    } else if (name == 'scheduePlan') {
                        $tipContainer = holder.find('.plan-tip-container');
                        if (result) {
                            $tipContainer.removeClass('invalid').addClass('valid').hide();
                            return;
                        }
                    } else if (name == 'schedueTime') {
                        for (var i =0; i < noTimePlan.length; i++) {
                            var selector = holder.find('.plan-item').eq(noTimePlan[i]);
                            exports.showCheckError(selector, msg);
                        }
                        if (result) {
                            holder.find('.plan-item .input-tip-container').remove();
                        }
                        return;
                    } else if (name == 'keepCourseLength') {
                        var $tipContainer = holder.find('.timelegnth-tip-container');
                        msg = msg.replace(/{num}/, courseLength);
                        if (result) {
                            $tipContainer.removeClass('invalid').addClass('valid').hide();
                            return;
                        }
                    } else {
                        $tipContainer = $(this).parents('.form-controls').find('.input-tip-container');
                    }
                    if (name == 'firstCourseTime' && result) {
                        validator.add('specialTime');
                        //validator.validate('specialTime');
                    }
                    if (name != 'specialTime' && name != 'firstCourseTime') {
                        if (result) {
                            $tipContainer.removeClass('invalid').addClass('valid').find('.icon-info-circle').text('');
                        } else {
                            $tipContainer.addClass('invalid').removeClass('valid').show();
                            $tipContainer.find('.icon-info-circle').text(msg);
                        }
                    } else {
                       if (result) {
                            $tipContainer.removeClass('invalid').addClass('valid').hide();
                       } else {
                            $tipContainer.addClass('invalid').removeClass('valid').show();
                       }
                    }
                }
            },
            vals: {
                // 为抽象规则设置获取值的方法
                schedule: function () {
                    return holder.find('.plan-list-container .plan-item').size();
                }
            }
        });

        validator.init(holder);

        // 添加抽象规则
        validator.add('firstCourseTime');
        validator.add('schedule');
        validator.add('scheduePlan');
        validator.add('schedueTime');
        validator.add('keepCourseLength');
        //validator.add('include');



        return validator;

    };


    // 添加一条排期，批量添加时也会循环调用此方法
    var addSchedule = function (data) {
        data.isOrganization = store.get('isOrganization');
        var scheduleItem = $(Simplite.render('added-plan-item', data));
        var planListContainer = holder.find('.plan-list-container');
        planListContainer.append(scheduleItem);
    };

    // 更新一条课节排期，点击编辑班课时触发
    var updateSchedule = function (data) {
        var scheduleItem = $(Simplite.render('added-plan-item', data));
        holder.find('.edited-plan-item').replaceWith(scheduleItem);
    };

    // 删除指定课节
    var removeSchedule = function (item) {
        var id;
        if (id=item.data('id')) {
            service.classCourseScheduleDelete({
                id: id
            }).done(function (response) {
                if (!response.code) {
                    item.remove();
                    updateItemIndex();
                    updateScheduleTip();
                }
            });
        } else {
            item.remove();
            updateItemIndex();
            updateScheduleTip();
        }
    };

    // 当有课节添加、修改或者删除时，需要更新课节索引
    var updateItemIndex = function (planListContainer) {
        planListContainer = planListContainer || holder.find('.plan-list-container');
        planListContainer.find('.class-plan-index').each(function (idx) {
            $(this).text('第' + (idx + 1) + '节');
        });
    };

    //更新时间安排
    var updateScheduleTip = function () {
        var planItem = holder.find('.plan-item');
        var tip = '';
        if (planItem.length == 1) {
            var date = planItem.find('.course-date').html().split('-');
            var start = planItem.find('.start-time').html();
            var end = planItem.find('.end-time').html();
            tip = date[1] + '月' + date[2] + '日 ' + start + '-' + end;
        } else {
            var len = planItem.length;

            var dates = planItem.eq(0).find('.course-date').html();
            if (dates) {
                dates = dates.split('-');
            } else {
                return;
            }
            var start = planItem.eq(0).find('.start-time').html();
            var datee = planItem.eq(len - 1).find('.course-end-date').html().split('-');
            var end = planItem.eq(len - 1).find('.end-time').html();
            tip =  dates[1] + '月' + dates[2] + '日 ' + start + '开课 '
                + datee[1] + '月' + datee[2] + '日 ' + end + ' 结课 共' + len + '节';
        }
        holder.find('.plan-description').val(tip);
        validator.validate();
    };

    // 已有人报名的课程，计算总课时是否不变
    var keepCourseLength = function () {
        if (!store.get('totalPay')) {
            return;
        }
        var planItems = holder.find('.plan-item');
        var planCourseLength = 0;
        $.each(planItems, function (idx, item) {
            var start = +($(item).data('startTime'));
            var end = +($(item).data('endTime'));
            if (start && end) {
                planCourseLength += (end - start) / (60 * 60);
            }
        });
        var $tipContainer = holder.find('.timelegnth-tip-container');

        if (courseLength != planCourseLength) {
            $tipContainer.addClass('invalid');
            $tipContainer.find('.icon-info-circle').text('请确保正常课程总时长仍为' + courseLength + '小时');
        } else {
            $tipContainer.removeClass('invalid');
        }
    };

    var isSameDate = function (startTime, endTime) {
        return startTime.getFullYear() === endTime.getFullYear() && startTime.getDate() === endTime.getDate();
    };

    // 把日期按照天为单位归类，时段放在以天为key的数组中
    var formatDateTime = function (dateTime, dateMap, dateArr, timeMap) {
        var month = dateTime.getMonth() + 1;
        var date = dateTime.getDate();
        var dateStr = dateTime.getFullYear() + '-' + (month > 9 ? month : '0' + month) + '-' + (date > 9 ? date : '0' + date);
        var timeArr = dateMap[dateStr];
        if (!timeArr) {
            timeArr = dateMap[dateStr] = [];
            dateArr.push(dateStr);
        }
        timeArr.push(timeMap);
    };

    // 某天内的多段时间做排序
    var sortTimeRange = function (timeRanges) {
        timeRanges.sort(function (tm1, tm2) {
            if (tm1.startHours !== tm2.startHours) {
                return tm1.startHours - tm2.startHours;
            } else {
                return tm1.startMinutes - tm2.startMinutes;
            }
        });
    };

    // 把时间类型的小时和分钟格式化为字符串形式，为页面展示几点几分到几点几分做准备
    var formatTimeRange = function (timeRange) {
        var startHours = timeRange.startHours;
        var startMinutes = timeRange.startMinutes;
        var endHours = timeRange.endHours;
        var endMinutes = timeRange.endMinutes;
        return {
            startTimeStr: (startHours > 9 ? startHours : '0' + startHours) + ':' + (startMinutes > 9 ? startMinutes : '0' + startMinutes),
            endTimeStr: (endHours > 9 ? endHours : '0' + endHours) + ':' + (endMinutes > 9 ? endMinutes : '0' + endMinutes)
        };
    };

    // 批量添加时段时的处理，由于可能跨多天的多个时间段，需要都拆分出来，然后分条添加
    var addScheduleList = function (scheduleList) {
        var dateMap = {};
        var dateArr = [];
        $(scheduleList).each(function (idx, scheduleItem) {
            var startTime = new Date(scheduleItem.startTime * 1000);
            var startHours = startTime.getHours();
            var startMinutes = startTime.getMinutes();
            var endTime = new Date(scheduleItem.endTime * 1000);
            var endHours = endTime.getHours();
            var endMinutes = endTime.getMinutes();
            var timeMap = {
                startHours: startHours,
                startMinutes: startMinutes,
                endHours: endHours,
                endMinutes: endMinutes,
                content: scheduleItem.content,
                teacherId: scheduleItem.teacherId,
                teacherName: scheduleItem.teacherName
            };
            // if(endTime.getHours() !== 0) {
            //     while(!isSameDate(startTime, endTime)) {
            //         formatDateTime(startTime, dateMap, dateArr, timeMap);
            //         startTime.setDate(startTime.getDate() + 1);
            //     }
            // };

            formatDateTime(startTime, dateMap, dateArr, timeMap);
        });
        dateArr.sort(function (t1, t2) {
            return moment(t1).toDate().getTime() - moment(t2).toDate().getTime();
        });

        var conflicts = [];
        for (var i = 0, len = dateArr.length; i < len; i++) {
            var dateStr = dateArr[i];
            var timeRanges = dateMap[dateStr];
            sortTimeRange(timeRanges);
            var date = moment(dateStr).toDate();
            $(timeRanges).each(function (idx, timeRange) {
                var formatRange = formatTimeRange(timeRange);
                date.setHours(timeRange.startHours);
                date.setMinutes(timeRange.startMinutes);
                var startTime = date.getTime() / 1000;
                var endDate = dateStr;
                date.setHours(timeRange.endHours);
                date.setMinutes(timeRange.endMinutes);
                //跨天
                if ((timeRange.endHours - timeRange.startHours) < 0) {
                    var day = date.getDate();
                    date.setDate(day + 1);
                }
                var endTime = date.getTime() / 1000;
                endDate = dateUtil.stringify(date);
                var scheduleData = {
                    date: dateStr,
                    endDate: endDate,
                    startTime: startTime,
                    endTime: endTime,
                    start: formatRange.startTimeStr,
                    end: formatRange.endTimeStr,
                    content: timeRange.content,
                    teacherId: timeRange.teacherId,
                    teacherName: timeRange.teacherName
                };
                var conflictIdx = exports.checkConflict(scheduleData);
                if (!conflictIdx) {
                    addSchedule(scheduleData);
                } else {
                    conflicts.push(scheduleData.date + ' ' + scheduleData.start + '至' + scheduleData.end);
                }
            });
        }
        if (conflicts.length) {
            conflicts.unshift('您设置的以下时间段存在冲突，请重新设置：');
            alert(conflicts.join('<br />'));
        }
        return dateMap;
    };

    exports.init = function (eventEmitter) {

        holder = this;

        var is_organization = store.get('isOrganization');

        var teacherList = formatTeacherList(store.get('teacherList'));

        if (store.get('totalPay')) {
            courseLength = formatSchedules(store.get('schedules'));
        }
        validator = initValidator();

        holder
        .on('click', '.more-class-course', function (e) {

            new QuickTeachingPlanDialog({
                organization: {
                    is_organization: is_organization,
                    teacher_list: store.get('teacherList'),
                },
                onComplete: function (data) {
                    var dialog = this;
                    var scheduleList = [];
                    $(data).each(function (idx, item) {
                        scheduleList.push({
                            startTime: item.begin,
                            endTime: item.end,
                            teacherId: item.teacherId,
                            teacherName: item.teacherName
                        });
                    });
                    addScheduleList(scheduleList);
                    exports.sortPlanList();
                    //keepCourseLength();
                    updateItemIndex();
                    updateScheduleTip();
                    dialog.hide();
                }
            });
        })

        .on('click', '.single-class-course', function () {
            singleTeachingPlanDialog = new SingleTeachingPlanDialog({
                teacherList: teacherList,
                isOrganization: is_organization
            });
        })

        .on('click', '.edit-class-plan', function () {

            var container = $(this).closest('.plan-item');

            container.siblings().removeClass('edited-plan-item');

            container.addClass('edited-plan-item');

            singleTeachingPlanDialog = new SingleTeachingPlanDialog({
                teacherList: teacherList,
                isOrganization: is_organization,
                date: container.find('.course-date').text(),
                start: container.find('.start-time').text(),
                end: container.find('.end-time').text(),
                content: container.find('.added-content').text(),
                teacherId: container.find('.selected-teacher').data('teacherId'),
                id: container.data('id')
            });
        })

        .on('click', '.delete-class-plan', function () {
            if (holder.find('.plan-item').size() > 1) {
                var $this = $(this);
                confirm({
                    title: '温馨提示',
                    content: '删除课节不能恢复，确认要删除该课节吗？',
                    buttons: [
                        {
                            text: '确定',
                            type: 'primary',
                            handler: function () {
                                removeSchedule($this.closest('.plan-item'));
                                this.hide();
                            }
                        },
                        {
                            text: '取消',
                            handler: function () {
                                this.hide();
                            }
                        }
                    ]
                })
            } else {
                alert({
                    title: '温馨提示',
                    content: '该课节是唯一课节，暂不能删除',
                    buttons: [
                        {
                            text: '我知道了',
                            type: 'primary',
                            handler: function () {
                                this.hide();
                            }
                        }
                    ]
                });
            }
        })

        .on('input propertychange', 'input[maxlength]', function () {
            var $this = $(this);
            var count = $this.prop('maxlength') - $this.val().length;
            $this.next().find('.input-tip span').text(count > 0 ? count : 0);
        });

        eventEmitter.on('add-single-schedule-success', function (evt, data) {
            // 时间是不是冲突
            var conflictIdx = exports.checkConflict(data);
            var editedNode = holder.find('.edited-plan-item');
            if (!conflictIdx) {
                data.isOrganization = is_organization;
                if (editedNode.size()) {
                    updateSchedule(data);
                } else {
                    addSchedule(data);
                }
                exports.sortPlanList();
                //keepCourseLength();
                updateItemIndex();
                updateScheduleTip();
                singleTeachingPlanDialog.hide();
                editedNode.removeClass('edited-plan-item');
                if ($('.form-error').hasClass('invalid')) {
                    var teacherNumber = store.get('user').number;
                    if (data.teacherId == teacherNumber) {
                        $('.form-error').removeClass('invalid').html('');
                    }
                }
            } else {
                alert('您添加的课节与第' + conflictIdx + '节课有冲突，请重新设置');
            }
        });

        eventEmitter.on('add-single-schedule-cancel', function (evt, data) {
            holder.find('.edited-plan-item').removeClass('edited-plan-item');
        });
    };

    // 添加完时段后，需要统一做一次排序
    exports.sortPlanList = function () {
        var planList = [];
        holder.find('.plan-item').each(function () {
            var $this = $(this);
            planList.push({
                startTime: +$this.data('startTime'),
                element: $this
            });
        });
        planList.sort(function (item1, item2) {
            return item1.startTime - item2.startTime;
        });
        var parent = holder.find('.plan-list-container');
        $(planList).each(function (idx, item) {
            parent.append(item.element);
        });
    };

    // 当有新时段添加时，需要先校验是否存在冲突
    exports.checkConflict = function (data) {
        var sTime = data.startTime;
        var eTime = data.endTime;
        var conflictIdx;
        holder.find('.plan-item').each(function (idx) {
            var $this = $(this);
            if ($this.hasClass('edited-plan-item')) {
                return;
            }
            var startTime = +$this.data('startTime');
            var endTime = +$this.data('endTime');
            if (!(sTime >= endTime || eTime <= startTime)) {
                conflictIdx = idx + 1;
                return false;
            }
        });
        return conflictIdx;
    };

    exports.validate = function (name) {
        init = false;
        return validator.validate(name);
    };

    exports.getData = function () {
        var planList = [];
        holder.find('.plan-item').each(function () {
            var $this = $(this);
            planList.push({
                startTime: +$this.data('startTime'),
                endTime: +$this.data('endTime'),
                content: $this.find('.added-content').text(),
                teacherId: $this.find('.selected-teacher').data('teacherId'),
                id: $this.data('id')||''
            });
        });
        return {
            planList: planList,
            description: holder.find('.plan-description').val(),
            special_time_reason: holder.find('input[name="specialReason"]').val()
        };
    };

    exports.reset = function () {
        init = true;
        holder.find('.form-error').hide();
    };

    exports.showCheckError = function (selector, message){
        var errorEle = $(
                ''
                + '<div class="input-tip-container invalid">'
                +     '<span class="icon icon-check-circle"></span>'
                +     '<div class="icon icon-info-circle">' + message + '</div>'
                + '</div>'
            );
        holder.find(selector).find('.input-tip-container').remove();
        holder.find(selector).append(errorEle);
    };

    exports.checkFirstTime = function () {
        //无人支付，并且已过开课时间的课程弹出提示
        if (!store.get('totalPay')) {
            var startTime = $('#class-course-schedue .plan-item').eq(0).data('start-time');
            var d = new Date();
            var nowTimestamp = d.getTime() / 1000;
            var verifyStatus = store.get('verifyStatus');
            if (!verifyStatus && nowTimestamp >= startTime) {
                alert('老师，现在已经过了你设置的开课时间，快去检查一下教学计划吧！');
                return false;
            }
        }
        return true;
    };

    exports.checkSpecialTime = function () {
        var reasonHolder = holder.find('input[name="specialReason"]');
        var result = true;
        var data = exports.getData();
        var isSpecialTime = false;
        var info = store.get('basicInfo') || {};
        var lessonWay = info.lesson_way;
        if (!store.get('totalPay')) {
            lessonWay = $('[name="lesson_way"]:checked').val();
        }

        var startTime = 8 * 3600;
        var endTime4 = 22 * 3600;
        var endTime2 = 23 * 3600;
        var tmpStartTime, tmpEndTime, tmp;
        for (var i = data.planList.length - 1; i >= 0; i--) {
            tmp = data.planList[i];
            tmpStartTime = new Date(tmp.startTime * 1000);
            tmpEndTime = new Date(tmp.endTime * 1000);
            if (tmpEndTime.getHours() == 0) {
                //结束时间选中了0点
                isSpecialTime = true;
                break;
            }
            tmpStartTime = tmpStartTime.getHours() * 3600 + tmpStartTime.getMinutes() * 60 + tmpStartTime.getSeconds();
            tmpEndTime = tmpEndTime.getHours() * 3600 + tmpEndTime.getMinutes() * 60 + tmpEndTime.getSeconds();

            if (tmpStartTime < startTime || tmpEndTime > endTime2) {
                isSpecialTime = true;
                break;
            }
            if (lessonWay == '4' && tmpEndTime > endTime4) {
                isSpecialTime = true;
                break;
            }
        };
        if (isSpecialTime && !data.special_time_reason) {
            var totalPay = store.get('totalPay');
            if (!totalPay) {
                new NotInRegularTimeDialog({
                    onSuccess: function (reason) {
                        reasonHolder.val(reason);
                    },
                    onCancel: function () {

                    }
                });
                result = false;
            }

        }
        return result;
    };
});