/**
 * @file 教学计划
 * @author wangtianhua
 */
define(function (require, exports, module) {

    'use strict';

    var toNumber = require('cc/function/toNumber');

    var AddSigleCourse = require('../common/AddSigleCourse');
    var AddMoreCourses = require('../common/AddMoreCourses');
    var ractiveDialog = require('userCenter/common/function/ractiveDialog');
    var formatDateTime = require('userCenter/common/filter/formatDateTime');

    var spliceArr = [];
    var indexArr = [];

    function deleteRepeatTime(schedules) {
        $.each(
            schedules,
            function (index, value) {
                var nextIndex = index + 1;
                if (!schedules[nextIndex]) {
                    return;
                }
                if (value.endTime <= schedules[nextIndex].beginTime) {
                    return true;
                }
                else {
                    spliceArr.push(schedules[nextIndex]);
                    indexArr.push(nextIndex);
                    schedules.splice(nextIndex, 1);
                    deleteRepeatTime(schedules);
                }
            }
        );
        return schedules;
    }

    return Ractive.extend({
        template: require('html!./OfflinePlanEdit.html'),
        data: function (data) {
            return {
                style: require('text!./OfflinePlanEdit.styl'),
                teacherTable: {},
                isValidate: false,
                useChangeTimesRemind: 0,
                options: {
                    schedules: [],
                    planLength: 0,
                    haveStudent: false,
                    orgTeachers: [],
                    copyCourse: false,
                    schedulesTimeChangeTimes: 0
                }
            };
        },
        onrender: function () {
            var me = this;
            var schedules = me.get('options.schedules');
            var teacherList = me.get('options.orgTeachers');
            me.sortList(schedules);
            var teacherTable = {};
            if (teacherList && teacherList.length != 0) {
                $.each(
                    teacherList,
                    function (index, value) {
                        teacherTable[value.id] = value.realname
                    }
                )
            }
            me.set('teacherTable', teacherTable);
        },
        computed: {
            countPlanLength: function () {
                return this.get('options.schedules').length;
            },
            haveStudentCanDelete: function () {
                var me = this;
                if (me.get('options.haveStudent')) {
                    var schedules = me.get('options.schedules');
                    if (schedules[0] && schedules[0].beginTime > me.getNowTime()) {
                        var length = 0;
                        $.each(
                            schedules,
                            function (index, value) {
                                if(value.canDelete) {
                                    length++;
                                }
                            }
                        );
                        return length > 2;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return true;
                }
            }
        },
        getNowTime: function () {
            return formatDateTime(new Date().getTime(), 'YYYY-MM-DD HH:mm:ss');
        },
        addItem: function (item, index) {
            var me = this;
            var schedules = me.get('options.schedules');
            schedules.push(item);
            me.sortList(schedules);
            me.judgeRepeatPlan(item, index);
            var list = me.get('options.schedules');

            var pos;
            if (!me.get('isValidate')) {
                $.each(
                    list,
                    function (index, value) {
                        if(value.beginTime == item.beginTime
                        && value.endTime == item.endTime) {
                            pos = index;
                        }
                    }
                );
                list.splice(pos, 1);
            }
            me.set('options.schedules', list);
        },
        addItemNew: function (item) {
            var me = this;
            var schedules = me.get('options.schedules');
            schedules.push(item);
            me.sortList(schedules);
            me.judgeRepeatPlanNew();
            var list = me.get('options.schedules');

            var pos;
            if (!me.get('isValidate')) {
                $.each(
                    list,
                    function (index, value) {
                        if(value.beginTime == item.beginTime
                        && value.endTime == item.endTime) {
                            pos = index;
                        }
                    }
                );
                list.splice(pos, 1);
            }
            me.set('options.schedules', list);
        },
        deleteItem: function (item) {
            var me = this;
            var schedules = me.get('options.schedules');
            var pos;
            $.each(
                schedules,
                function (index, value) {
                    if(value.beginTime == item.beginTime
                    && value.endTime == item.endTime) {
                        pos = index;
                    }
                }
            )

            // 剩余可修改次数
            me.changeTimesRemind(showDialog);
            function showDialog() {
                alert({
                    title: '温馨提示',
                    content: '确认删除这个课节吗？',
                    buttons: [
                        {
                            text: '确定',
                            type: 'primary',
                            action: function () {
                                schedules.splice(pos, 1);
                                me.set('options.schedules', schedules);
                                this.hide();
                            }
                        },
                        {
                            text: '取消',
                            type: 'primary',
                            action: function () {
                                this.hide();
                            }
                        }
                    ]
                });
            }
        },
        deleteAllItems: function () {
            var me = this;
            var list = me.get('options.schedules');

            // 剩余可修改次数
            me.changeTimesRemind(showDialog);

            function showDialog() {
                alert({
                    title: '温馨提示',
                    content: '确认删除所有课节吗?',
                    buttons: [
                        {
                            text: '确定',
                            type: 'primary',
                            action: function () {
                                // TODO 删除相应的课节
                                // 有学生的就不能删除
                                var newList = [];
                                $.each(
                                    list,
                                    function (index, value) {
                                        if (!value.canDelete) {
                                            newList.push(value)
                                        }
                                    }
                                );
                                me.set({
                                    'options.schedules': newList
                                })

                                this.hide();
                            }
                        },
                        {
                            text: '取消',
                            type: 'primary',
                            action: function () {
                                this.hide();
                            }
                        }
                    ]
                });
            }
        },
        addMoreItems: function (items) {
            var me = this;
            var schedules = me.get('options.schedules');
            var now = me.getNowTime();
            $.each (
                items,
                function (index, value) {
                    if (value.beginTime > now) {
                        schedules.push(value);
                    }
                }
            );
            me.sortList(schedules);
            me.deleteRepeatPlan();
        },
        sortList: function (list) {
            var me = this;
            // 开始时间排序
            var startTimes = [];
            $.map(
                list,
                function (value, index) {
                    startTimes.push(value.beginTime)
                }
            )
            startTimes.sort();

            var now = me.getNowTime();
            var tempList = [];
            // 排序
            // 再开一班和非再开一班的删除编辑按钮是否出现
            if (!me.get('options.copyCourse')) {
                $.map(
                    list,
                    function (value, index) {
                        for (var i = 0 ; i < startTimes.length; i++ ) {
                            if(value.beginTime === startTimes[i]) {
                                if (value.readonly && value.beginTime < now) {
                                    value.canDelete = false;
                                    value.canEdit = false;
                                }
                                else if (value.readonly && value.beginTime > now) {
                                    value.canDelete = false;
                                    value.canEdit = true;
                                }
                                else {
                                    value.canDelete = true;
                                    value.canEdit = true;
                                }
                                if (!tempList[i]) {
                                    tempList[i] = value;
                                    break;
                                }
                            }
                        }
                    }
                );
            }
            else {
                $.map(
                    list,
                    function (value, index) {
                        for (var i = 0 ; i < startTimes.length; i++ ) {
                            if(value.beginTime === startTimes[i]) {
                                value.canDelete = true;
                                value.canEdit = true;
                                tempList[i] = value;
                            }
                        }
                    }
                );
            }

            me.set({
                'options.schedules': tempList
            });
        },
        deleteRepeatPlan: function () {
            var me = this;
            var schedules = deleteRepeatTime(me.get('options.schedules'));
            if (spliceArr.length != 0) {
                me.set('isValidate', false);
                var content = '';
                $.each(
                    spliceArr,
                    function (index, value) {
                        // content += value.beginTime + '至' + value.endTime + '<br>'
                        content = '新添加课节和第' + indexArr[0] + '节课有时间冲突，快去调整一下吧～';
                    }
                );

                alert({
                    title: '温馨提示',
                    content: content
                });
                indexArr = [];
                spliceArr = [];
            }
            else {
                me.set('isValidate', true);
            }
        },
        judgeRepeatPlan: function (val, idx) {
            var me = this;
            var schedules = me.get('options.schedules');
            var initIndex = '';
            $.each(
                schedules,
                function (index, value) {
                    var nextIndex = index + 1;
                    if (!schedules[nextIndex]) {
                        return;
                    }

                    if (value.beginTime == val.beginTime && value.endTime == val.endTime) {
                        initIndex = index + 1;
                    }

                    if (value.endTime <= schedules[nextIndex].beginTime) {
                        return true;
                    }
                    else {
                        if (!schedules[nextIndex].beginTime
                            || !schedules[nextIndex].endTime) {
                            return;
                        }
                        spliceArr.push(schedules[nextIndex]);
                        indexArr.push(nextIndex);
                    }
                }
            );
            if (spliceArr.length != 0) {
                me.set('isValidate', false);
                var content = '';
                var conIndex = indexArr[0];
                if (initIndex != '') {
                    if ((idx + 1) <= conIndex) {
                        conIndex++;
                    }
                }
                else {
                    if ((idx + 1) <= conIndex) {
                        conIndex++;
                    }
                }

                $.each(
                    spliceArr,
                    function (index, value) {
                        content = '修改后的时间与第' + conIndex + '节课有冲突，快去调整一下吧';
                    }
                );

                alert({
                    title: '温馨提示',
                    content: content
                });

                indexArr = [];
                spliceArr = [];
            }
            else {
                me.set('isValidate', true);
            }
        },
        judgeRepeatPlanNew: function (val) {
            var me = this;
            var schedules = me.get('options.schedules');
            var initIndex = '';
            $.each(
                schedules,
                function (index, value) {
                    var nextIndex = index + 1;
                    if (!schedules[nextIndex]) {
                        return;
                    }
                    if (value.endTime <= schedules[nextIndex].beginTime) {
                        return true;
                    }
                    else {
                        if (!schedules[nextIndex].beginTime
                            || !schedules[nextIndex].endTime) {
                            return;
                        }
                        spliceArr.push(schedules[nextIndex]);
                        indexArr.push(nextIndex);
                    }
                }
            );
            if (spliceArr.length != 0) {
                me.set('isValidate', false);
                var content = '';
                $.each(
                    spliceArr,
                    function (index, value) {
                        content = '新课节的时间与第' + indexArr[0] + '节课有冲突，快去调整一下吧';
                    }
                );

                alert({
                    title: '温馨提示',
                    content: content
                });

                indexArr = [];
                spliceArr = [];
            }
            else {
                me.set('isValidate', true);
            }
        },
        addSingleCourse: function (item) {
            var me = this;

            if (me.get('countPlanLength') >= 500 && me.get('options.planLength') < 500) {
                alert({
                    title: '温馨提示',
                    content: '课节最多不能超过 500 节'
                });
                return;
            }

            // 剩余可修改次数
            me.changeTimesRemind(showDialog);

            function showDialog() {
                me.dialog = ractiveDialog(
                    AddSigleCourse,
                    {
                        title: '添加单一课节',
                        skinClass: 'add-sigle-course-dialog'
                    },
                    {
                        schedules: me.get('options.schedules'),
                        item: item,
                        orgTeachers: me.get('options.orgTeachers'),
                        save: function (item, index) {
                            var list = me.get('options.schedules');
                            index = toNumber(index, -1);

                            if (index >= 0) {
                                item.canDelete = list[index].canDelete;
                                item.canEdit = list[index].canEdit;
                                item.readonly = list[index].readonly;
                            }
                            else {
                                item.canDelete = true;
                                item.canEdit = true;
                                item.readonly = false;
                            }
                            var deleteItem = {};
                            if (index >= 0) {
                                deleteItem = list[index];
                                list.splice(index, 1);
                            }

                            me.set('options.schedules', list);
                            if (index >= 0) {
                                me.addItem(item, index);
                                if (me.get('isValidate')) {
                                    me.dialog.hide();
                                }
                                else {
                                    me.addItem(deleteItem);
                                }
                            }
                            else {
                                me.addItemNew(item);
                                if (me.get('isValidate')) {
                                    me.dialog.hide();
                                }
                            }

                        },
                        close: function () {
                            me.dialog.hide();
                        }
                    }
                );
                me.dialog.show();
            }
        },
        addMoreCourses: function () {
            var me = this;
            if (me.get('countPlanLength') >= 500 && me.get('options.planLength') < 500) {
                alert({
                    title: '温馨提示',
                    content: '课节最多不能超过 500 节'
                });
                return;
            }

            // 剩余可修改次数
            me.changeTimesRemind(showDialog);

            function showDialog() {
                me.dialog = ractiveDialog(
                    AddMoreCourses,
                    {
                        title: '快速排课',
                        skinClass: 'add-more-course-dialog'
                    },
                    {
                        schedules: me.get('options.schedules'),
                        orgTeachers: me.get('options.orgTeachers'),
                        save: function (items) {
                            me.dialog.hide();
                            me.addMoreItems(items);
                        },
                        close: function () {
                            me.dialog.hide();
                        },
                        onScheduleAdd: function () {
                            me.dialog.refresh();
                        },
                        onScheduleRemove: function () {
                            me.dialog.refresh();
                        }
                    }
                );
                me.dialog.show();
            }
        },
        editItem: function(item) {
            this.addSingleCourse(item);
        },
        editAllItems: function () {
            var me = this;
            var list = me.get('options.schedules');
            var rightList = [];
            var leftList = [];
            $.each(
                list,
                function (index, value) {
                    if (value.canEdit) {
                        rightList.push(value);
                    }
                    else {
                        leftList.push(value);
                    }
                }
            );
            if (rightList.length <= 0) {
                alert({
                    title: '温馨提示',
                    content: '没有可以编辑的课节哦~'
                });
                return;
            }

            // 剩余可修改次数
            me.changeTimesRemind(showDialog);

            function showDialog() {
                me.dialog = ractiveDialog(
                    AddSigleCourse,
                    {
                        title: '批量修改课节',
                        skinClass: 'edit-all-course-dialog'
                    },
                    {
                        schedules: list,
                        item: rightList[0],
                        orgTeachers: me.get('options.orgTeachers'),
                        save: function (item, index) {
                            var oldTime = rightList[0];
                            var rightListBeginTime = rightList[0].beginTime.replace(/-/g, '/');
                            var oldTimeStamp = new Date(rightListBeginTime).getTime();
                            var itemBeginTime = item.beginTime.replace(/-/g, '/');
                            var newTimeStamp = new Date(itemBeginTime).getTime();
                            var lateBeginTime = newTimeStamp - oldTimeStamp;

                            var rightListEndTime = rightList[0].endTime.replace(/-/g, '/');
                            var oldLong = new Date(rightListEndTime).getTime() - oldTimeStamp;
                            var itemEndTime = item.endTime.replace(/-/g, '/');
                            var newLong = new Date(itemEndTime).getTime() - newTimeStamp;

                            var newRightTime = [];
                            $.each(
                                rightList,
                                function (index, value) {
                                    var bt = value.beginTime.replace(/-/g, '/');
                                    var beginTimeStamp = new Date(bt).getTime() + lateBeginTime;
                                    var endTimeStamp = beginTimeStamp + newLong;
                                    var beginTime = formatDateTime(beginTimeStamp, 'YYYY-MM-DD HH:mm:ss');
                                    var endTime = formatDateTime(endTimeStamp, 'YYYY-MM-DD HH:mm:ss');

                                    newRightTime.push({
                                        beginTime: beginTime,
                                        endTime: endTime,
                                        canDelete: value.canDelete,
                                        canEdit: value.canEdit,
                                        content: value.content,
                                        teacherId: value.teacherId,
                                        id: value.id,
                                        readonly: value.readonly
                                    });

                                }
                            )
                            var newList = leftList.concat(newRightTime);
                            me.set('options.schedules', newList);
                            me.dialog.hide();

                        },
                        close: function () {
                            me.dialog.hide();
                        },
                        isEdit: true
                    }
                );
                me.dialog.show();
            }
        },
        getData: function () {
            var me = this;
            var data = { };
            data.schedules = [];
            $.each (
                me.get('options.schedules'),
                function (index, item) {
                    var itemId = !me.get('options.copyCourse') ? item.id : '';
                    data.schedules.push({
                        id: itemId,
                        began_at: item.beginTime,
                        ended_at: item.endTime,
                        content: item.content,
                        teacher_id: item.teacherId
                    });
                }
            );
            return data;
        },
        changeTimesRemind: function (callback) {
            var me = this;
            var haveStudent = me.get('options.haveStudent');
            var residueTimes = me.get('options.schedulesTimeChangeTimes');

            // 弹窗只出来一次
            if (me.get('useChangeTimesRemind') == 0) {
                me.set('useChangeTimesRemind', 1);
                if (!haveStudent) {
                    var content = '<div>班课有学生报名后，按照班课总课节数除以15，取结果整数部分，乘2，所得结果为可修改班课时间的次数（最少有2次修改机会）。超过这个次数每次修改会被扣2分。修改课节内容、课程时长或添加新课节不扣分。</div>'
                                + '<div>请尽量提前规划您的课程时间，避免因频繁修改造成双方损失，多谢！</div>'
                    alert({
                        title: '温馨提示',
                        content: content,
                        width: 400,
                        type: 'changetime-dialog',
                        buttons: [
                            {
                                text: '继续',
                                type: 'primary',
                                action: function () {
                                    this.hide();
                                    callback();
                                }
                            }
                        ]
                    });
                }
                else if (residueTimes == 0) {
                    alert({
                        title: '温馨提示',
                        content: '您对本班课的时间调整已超过两次，<br>再次调整将被扣2分',
                        buttons: [
                            {
                                text: '取消',
                                action: function () {
                                    this.hide();
                                }
                            },
                            {
                                text: '继续',
                                type: 'primary',
                                action: function () {
                                    this.hide();
                                    callback();
                                }
                            }
                        ]
                    });
                }
                else if (residueTimes > 0) {
                    alert({
                        title: '温馨提示',
                        content: '班课已有学生报名，您还有' + residueTimes + '次修改课程时间的机会。<br>之后再进行修改，每次都会扣2分',
                        buttons: [
                            {
                                text: '取消',
                                action: function () {
                                    this.hide();
                                }
                            },
                            {
                                text: '继续',
                                type: 'primary',
                                action: function () {
                                    this.hide();
                                    callback();
                                }
                            }
                        ]
                    });
                }
            }
            else {
                callback();
            }
        }
    })

})