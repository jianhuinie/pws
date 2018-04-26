/**
 * @file 班课设置 - 教学计划表单
 * @author wangyujie, liucong重构（比重75%）
 */
define(function (require) {

    'use strict';
    var ClassSchedule = require('./ClassSchedule');
    var ClassScheduleDisabled = require('./ClassScheduleDisabled');
    var Editor = require('common/component/Editor');
    var form = require('common/form');
    var SaveButton = require('common/component/SaveButton');
    var jsonUtil = require('cobble/util/json');
    var service = require('common/service');
    var Validator = require('cobble/form/Validator');
    var NotInRegularTimeDialog = require('./NotInRegularTimeDialog');
    var QuickTeachingPlanDialog = require('./QuickTeachingPlanDialog');

    var scheduleTpl;
    var scheduleDisabledTpl;

    /*
     * 构造函数
     * @param {Object} options
     * @property {jQuery} options.element
     * @property {Array} options.data.shedule schedule列表
     * @property {string=} options.data.chaban_flag
     * @property {string=} options.data.chaban_quota
     * @property {string=} options.data.chaban_price
     * * @property {string=} options.data.chaban_price_flag
     * @property {string=} options.data.retire_flag
     * @property {string=} options.data.retire_length
     */
    function ClassTeachingPlanForm(options) {
        $.extend(this, options);
        this.init();
    }

    ClassTeachingPlanForm.prototype = {

        init: function () {

            var me = this;

            var element = me.element;
            me.scheduleList = [];

            scheduleTpl = me.element.find('#tpl-schedule').html();
            scheduleDisabledTpl = me.element.find('#tpl-schedule-disabled').html();

            me.scheduleListContainer = me.element.find('.schedule-list');

            //课程安排
            me.courseName = new Editor({
                element: element.find('.arrangement'),
                maxLength: 50
            });

            element
            .on('change', ':radio[name="chaban_flag"]', function (e) {

                var value = $(this).val();
                var flag = element.find('.price-way'); // 插班价格
                var quota = element.find('input[name="chaban_quota"]');

                if (value == 2) {
                    quota[0].focus();
                }
                if ((value == 2 || value == 3) && Number(me.data.price) > 0) { // 可以插班
                    flag.show();
                }
                else if (value == 1) {
                    flag.hide();
                }

            })
            .on('change', ':radio[name="chaban_price_flag"]', function (e) {

                var value = $(e.currentTarget).prop('value');
                var price = element.find('input[name="chaban_price"]');

                if (value == 2) {
                    price[0].focus();
                }

            })
            .on('change', ':radio[name="retire_flag"]', function (e) {
                if ($(this).val() == 2) {
                    element.find('input[name="retire_length"]').focus();
                }
            })
            //自动选中radio
            .on('focus', 'input[name="retire_length"], input[name="chaban_quota"], input[name="chaban_price"]', function (e) {
                $(this).prev().find(':radio').click();
            })

            .on('click', '.add', function (e) {
                me.addSchedule();
            })

            .on('click', '.cancel', function (e) {

                var index = $(this).closest('.schedule').data('index');

                me.removeSchedule(index);
            })
            //快速排课工具
            .on('click', '.quick-plan', function (e) {

                new QuickTeachingPlanDialog({
                    organization: me.data.organization,
                    onComplete: function (data) {
                        var dialog = this;

                        var originScheduleList = $.map(me.scheduleList, function (item) {
                            return $.extend(
                                {
                                    content: item.getContent(),
                                    index: item.getIndex()
                                },
                                item.getTimePeriod()
                            );
                        });

                        var addScheduleBatch = function (dataAdd) { //批量插入工具生成的教学计划

                            $.each(dataAdd, function (index, item) {
                                me.addSchedule(
                                    null,
                                    {
                                        begin_time: item.begin,
                                        end_time: item.end,
                                        teacher: (item.teacher ? { number: item.teacher } : null)
                                    },
                                    false,
                                    true
                                )
                            });
                        }

                        var overLapOriginal = function (indexes) {
                            me //强制批量删除
                            .removeSchedule(
                                indexes,
                                true,
                                function () {
                                    addScheduleBatch(data);
                                }
                            )
                        }

                        //判断工具添加的和原有的 是否时间段重叠
                        //有重叠的 将原有的删除
                        //时间填写不完整的 但填写了内容的 需要保留
                        //这里有问题 机构班课老师为必选 若不选 则判定为不完整 将不予计算是否重叠 做保留处理
                        var hasOverLap = false;
                        var hasRemoved = false;

                        var delIndexes = [];
                        $.each(data, function (i, outer) {
                            $.each(originScheduleList, function (j, inner) {

                                if (!(inner.begin && inner.end)) {
                                    if (inner.content) { //如果有内容 则保留
                                        return true;
                                    }
                                    else {
                                        if ($.inArray(inner.index, delIndexes) == -1) {
                                            delIndexes.push(inner.index);
                                        }
                                        hasRemoved = true;
                                        return true;
                                    }
                                }

                                if (!(outer.begin >= inner.end || outer.end <= inner.begin)) {
                                    hasOverLap = true;
                                    if (inner.id != '') {
                                        delIndexes.push(inner.index);
                                    }
                                }
                            });
                        });

                        if (hasOverLap) {
                            confirm('是否要覆盖原有计划')
                            .done(function () {
                                dialog.hide();
                                overLapOriginal(delIndexes);
                            });
                        }
                        else if (hasRemoved) {
                            dialog.hide();
                            overLapOriginal(delIndexes);
                        }
                        else {
                            addScheduleBatch(data);
                            dialog.hide();
                        }
                    }
                });

            })

            me.validator = new Validator({
                element: element,
                realtime: false,
                fields: {
                    retire_length: {
                        errors: {
                            pattern: '请输入最大9999的正整数',
                            max: '请输入最大9999的正整数',
                            min: '请输入最大9999的正整数'
                        }
                    },
                    chaban_quota: {
                        errors: {
                            pattern: '请输入最大9999的正整数',
                            max: '请输入最大9999的正整数',
                            min: '请输入最大9999的正整数'
                        }
                    },
                    chaban_price: {
                        errors: {
                            required: '您尚未设置插班价格',
                            pattern: '请输入价钱，最多两位小数哦~',
                            min: '价格最低为 1 元',
                            max: '价格最高为 999999 元'
                        }
                    },
                    arrangement: {
                        rules: {
                            required: true,
                            maxlength: 50
                        },
                        errors: {
                            required: '请填写课程安排',
                            maxlength: '请将字数控制在 50 字以内'
                        }
                    }
                }
            });

            me.refresh();

            new SaveButton({
                element: element.find('.btn-save'),
                save: function () {

                    var errorsHide = []; //由于有些error不会显示到alert上，故再添加一个errorsHide作为标志。
                    var errorsShow = [];
                    var schedules = [];

                    var data = form.parse(element.find('.form'));

                    var validateFields = [];

                    if (data.retire_flag == 2) {
                        validateFields.push('retire_length');
                    }

                    if (data.chaban_flag == 2) {
                        validateFields.push('chaban_quota');
                    }

                    if (data.chaban_price_flag == 2) {
                        validateFields.push('chaban_price');
                    }

                    validateFields.push('arrangement');

                    if (!me.validator.validate(validateFields)) {
                        errorsHide.push('page err');
                    }

                    data.number = me.data.number;

                    //退班规则
                    if (data.retire_flag == 1) {
                        data.retire_length = 3600;
                    }

                    // 插班 - 第几节课前可插班
                    if (data.chaban_flag == 2) {
                        if (data.chaban_quota == '') {
                            alert('未正确设置第几节课前可插班');
                            return;
                        }
                    }

                    if (me.data.price > 0 && (data.chaban_flag == 2 || data.chaban_flag == 3) && data.chaban_price_flag == 2) {
                        if (data.chaban_price == '') {
                            alert('还没有填写插班价格哦');
                            return;
                        }

                        if (Number(data.chaban_price) > Number(me.data.price)) {
                            alert({
                                title: '温馨提示',
                                content: '自定义插班价不能高于课程总价，请修改后再进行保存'
                            });
                            return;
                        }
                    }

                    var orgTeacherSelected = false;

                    $.each(me.scheduleList, function (i, item) {
                        var r = item.getData();
                        if (r.error) {
                            if (r.hide) {
                                errorsHide.push(r.error);
                            }
                            else {
                                errorsShow.push(r.error);
                            }
                        }
                        else {
                            schedules.push(r.data);
                            if (r.data.teacher_user_number == me.data.user_number) {
                                orgTeacherSelected = true;
                            }
                        }
                    });

                    
                    if (errorsShow.length > 0 || errorsHide.length > 0) {

                        if (errorsShow.length > 0) {
                            alert({
                                title: '温馨提示',
                                content: errorsShow.join('</br>')
                            });
                        }
                    }
                    else {

                        //对于机构老师列表里可以匹配出当前用户的情况（代表当前用户已被审核通过）
                        //若教学计划没有至少选择一个当前用户为“主讲老师”的，需要给提示并不予保存。
                        if (me.data.organization.is_organization && !orgTeacherSelected) {
                            //
                            var teacherName = $.map(me.data.organization.teacher_list, function (item) {
                                if (item.number == me.data.user_number) {
                                    return item.display_name;
                                }
                            });
                            var content = '';
                            if (teacherName && teacherName.length > 0) {
                                if (/(老师)$/.test(teacherName[0])) {
                                    content = '你正在' + teacherName[0] + '的账号下设置班课，请将' + teacherName[0] + '添加到主讲老师中';
                                } else {
                                    content = '你正在' + teacherName[0] + '老师的账号下设置班课，请将' + teacherName[0] + '添加到主讲老师中';
                                }
                                alert({
                                    title: '温馨提示',
                                    content: content
                                });
                                return;
                            }

                        }


                        data.schedules = jsonUtil.stringify(schedules);

                        return service
                        .classCourseSchedule(data, {
                            errorHandler: {
                                '1': function (response) {
                                    var errors = response.data.errors;

                                    if (errors && errors.schedules) {
                                        var errors = errors.schedules;
                                        var errorsShow = [];
                                        var canConfirm = true;

                                        $.each(errors, function (key, item) {
                                            var error = '第' + key.match(/\d*$/)[0] + '节：';
                                            switch (item.type + '') {
                                                case '1':
                                                    error += '这节课的设置有问题哦~';
                                                    canConfirm = false;
                                                    break;
                                                case '2':
                                                    error += '与班课内的第' + item.target.match(/\d*$/)[0] + '节课程计划冲突';
                                                    canConfirm = false;
                                                    break;
                                                case '3':
                                                    error += '与老师的其它班课课程计划冲突';
                                                    break;
                                                case '4':
                                                    error += '与一对一的约课记录冲突';
                                                    break;
                                            }

                                            errorsShow.push(error);

                                        });

                                        var buttons ;

                                        if (canConfirm) {
                                            buttons = [
                                                {
                                                    text: '仍然保存',
                                                    type: 'primary',
                                                    handler: function () {
                                                        this.hide();
                                                        $.extend(data, { confirm_flag: 1 });
                                                        service
                                                        .classCourseSchedule(data)
                                                        .done(function (response) {
                                                            saveHandler(response, me.data.number);
                                                        });
                                                    }
                                                },
                                                {
                                                    text: '取消',
                                                    handler: function () {
                                                        this.hide();
                                                    }
                                                }
                                            ]
                                        }
                                        else {
                                            buttons = [
                                                {
                                                    text: '确定',
                                                    type: 'primary',
                                                    handler: function () {
                                                        this.hide();
                                                    }
                                                }
                                            ]
                                        }

                                        alert({
                                            title: '温馨提示',
                                            content: errorsShow.join('</br>'),
                                            buttons: buttons
                                        });
                                    }
                                },

                                '100061': function (response) { // 敏感词过滤

                                    var map = {
                                        'arrangement': '课程安排',
                                        'schedules': '课程内容'
                                    };

                                    var errorMsg = response.data;
                                    var content = '你';

                                    // 课程安排
                                    if (errorMsg.arrangement && errorMsg.arrangement.length) {
                                        content += '<span class="sensitive">在<em>课程安排</em>中输入的内容包含';
                                        $.each(errorMsg.arrangement, function (index, item) {
                                            content += '“<em>' + item + '</em>”';
                                        });
                                        content += '；</span><br />';
                                    }

                                    // 教学计划 - 第N节课程内容
                                    $.each(errorMsg.schedules, function (index, item) {

                                        if (item.words.length) {
                                            content += '<span class="sensitive">在<em>第' + item.s + '节课程内容</em>中输入的内容包含';
                                            $.each(item.words, function (i, j) {
                                                content += '“<em>' + j + '</em>”';
                                            });
                                            content += '；</span><br />';
                                        }

                                    });

                                    content += '请删除后重新输入';

                                    alert({
                                        title: '温馨提示',
                                        content: content,
                                        width: 450,
                                        buttons: [
                                            {
                                                text: '确定',
                                                type: 'primary',
                                                handler: function () {
                                                    this.hide();
                                                }
                                            }
                                        ]
                                    });

                                }
                            }
                        })
                        .done(function (response) {

                            saveHandler(response, me.data.number);

                        });
                    }
                }
            });
        },

        refresh: function () {

            var me = this;

            me.refreshSchedule();

            //初始化其他表单
            me.element.find('.form').each(function (i, form) {
                $(form).find('input[name]').each(function (j, input) {
                    var el = $(input);
                    var name = el.prop('name');

                    if (el.prop('type') == 'radio') {
                        if (me.data[name] == el.prop('value')) {
                            el.click();
                        }
                    }
                    else if (name == 'retire_length' && me.data.retire_flag != '2') {
                        return true;
                    }
                    else if (name == 'chaban_quota' && me.data.chaban_flag != '2') {
                        return true;
                    }
                    else if (name == 'chaban_price' && me.data.chaban_price_flag != '2') {
                        return true;
                    }
                    else if (me.data[name]) {
                        $(input).val(me.data[name]);
                    }
                });
            });

            me.courseName.setValue(me.data.arrangement);

        },
        /**
         * 新增教学计划
         * @param {number} index    序号
         * @param {object} data     新增教学计划的数据
         */
        addSchedule: function (index, data, disabled, forceRefresh) {

            var me = this;

            if (!$.isNumeric(index)) { //如果不指定index 则自增
                var length = me.scheduleList.length;
                if (length >= 300) {
                    alert('已到最大课节上限，300节');
                    return;
                }
                else {
                    index = length + 1;
                }
            }

            if (!data) {
                data = {};
            }

            data = $.extend(data, {
                organization: me.data.organization,
                total_pay: me.data.total_pay
            });

            if (disabled) {
                me.scheduleListContainer.append($(scheduleDisabledTpl));
                me.scheduleList.push(new ClassScheduleDisabled({
                    element: me.scheduleListContainer.find('.schedule').last(),
                    index: index,
                    data: data
                }));
            }
            else {
                me.scheduleListContainer.append($(scheduleTpl));
                me.scheduleList.push(new ClassSchedule({
                    element: me.scheduleListContainer.find('.schedule').last(),
                    index: index,
                    data: data,
                    force: forceRefresh
                }));
            }
        },

        /**
         * 移除教学计划
         * @param  {number/Array} index 序号 数字或数组
         * @param  {bool} force   是否强制 即不提示
         * @param  {Function=} callback
         */
        removeSchedule: function (index, force, callback) {

            var me = this;

            var remove = function (i) {
                me.scheduleList[i - 1].remove(); //移除dom
                me.scheduleList.splice(i - 1, 1); //移除组件
                $.each(me.scheduleList, function (i, item) { //刷新组件index
                    item.setIndex(i + 1);
                });
            }

            if (!force && me.scheduleList.length <= 1) {
                alert({
                    title: '温馨提示',
                    content: '抱歉，班课只剩一课节，暂时无法删除',
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
            else {
                if ($.isArray(index)) { //批量删除 用于工具批量覆盖场景

                    var unsavedSchedule = [];

                    index = index.sort(function (a, b) {
                        return a - b;
                    });

                    var ids = $.map(index, function (i) {
                        var id = me.scheduleList[i - 1].getId();
                        if (id) {
                            return id
                        }
                        else {
                            unsavedSchedule.push(i);
                        }
                    });

                    if (ids && ids.length > 0) {

                        service
                        .classCourseScheduleBatchDelete({
                            ids: ids.join(',')
                        })
                        .done(function (response) {
                            if (response.code === 0) {
                                var j = 0; //由于删除一个得重新计算index, 所以每删除一下 index 都要减去 删除的个数
                                $.each(index, function (i, item) {
                                    remove(item - j);
                                    j++;
                                });

                                if ($.isFunction(callback)) {
                                    callback();
                                }
                            }
                        });
                    }
                    else { //获取不到 就简单移除掉没有id的schedule
                        var j = 0;
                        $.each(unsavedSchedule, function (i, item) {
                            remove(item - j);
                            j++;
                        });
                        if ($.isFunction(callback)) {
                            callback();
                        }
                    }
                }
                else {
                    confirm({
                        title: '温馨提示',
                        content: '删除后不可恢复,确认要删除该课节吗?'
                    })
                    .done(function () {
                        var schedule = me.scheduleList[index - 1];
                        var id = schedule.getId();

                        if (id === '') {
                            remove(index);
                        }
                        else {

                            service
                            .classCourseScheduleDelete({
                                id: id
                            })
                            .done(function () {
                                remove(index);
                            });
                        }
                    });
                }
            }

        },
        /**
         * 移除所有的教学计划
         */
        removeAllSchedule: function () {
            me
            .scheduleListContainer
            .find('.schedule')
            .each(function (index, item) {
                $(item).remove();
            });

            me.scheduleList = [];

        },

        /**
         * 整体刷新数据
         * @param  {object} data 后端教学计划数据
         * @return {[type]}      [description]
         */
        refreshSchedule: function (data) {

            var me = this;

            data = data || me.data.schedule;
            //初始化schedule表单
            if (data && data.length > 0) {
                $.each(data, function (i, item) {

                    var hasPassed = false;

                    if (me.data.total_pay > 0 && item.begin_time) { // 如果有学生报名，不可编辑超过当前事件的课节
                        hasPassed = Number(item.begin_time * 1000)
                            < (new Date()).getTime();
                    }

                    me.addSchedule(i + 1, item, hasPassed);
                });
            }

        },
        show: function () {
            this.element.show();
        },
        hide: function() {
            this.element.hide();
        },
        save: function () {
            this.element.find('.btn-save').click();
        },

        cancel: function () {
            this.element.find('.btn-cancel').click();
        }

    };

    function saveHandler(response, courseNumber) {
        if (response.code === 0) {
            var data = response.data;

            if (data.is_special_time == '1') { // 不在常规时间
                new NotInRegularTimeDialog({
                    courseNumber: courseNumber,
                    onSuccess: function () {
                        location.reload();
                    },
                    onCancel: function () {
                        location.reload();
                    }
                });
            }
            else {
                success('保存成功', function(){
                    location.reload();
                });
            }
        }
    }

    return ClassTeachingPlanForm;


});