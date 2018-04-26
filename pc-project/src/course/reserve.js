/**
 * @file 发起约课
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    var store = require('common/store');
    var ReserveCalendar = require('common/component/ReserveCalendar'); // 日历
    var dateUtil = require('cobble/util/date');
    var timeUtil = require('cobble/util/time');
    var Select = require('cobble/form/Select');
    var etpl = require('cobble/util/etpl');
    var form = require('common/form');
    var service = require('common/service');

    var AddressForm = require('../teacherCenter/component/AddressForm'); // 地址薄
    var baiduMap = require('common/map/baidu');
    var Editor = require('common/component/Editor');
    var Validator = require('cobble/form/Validator');
    var SaveButton = require('common/component/SaveButton');

    var Calendar = require('common/component/CourseMonthCalendarMini');
    var Tooltip = require('cobble/ui/Tooltip');
    var QuickLessonDialog = require('common/component/QuickLessonDialog');
    var Dialog = require('cobble/ui/Dialog');
    var MakePhoneCallDialog = require('common/component/MakePhoneCallDialog');

    var container = $('#main');
    var startDateInput = container.find('input[name="start_date"]');
    var startHourInput = container.find('input[name="start_time_hour"]');
    var startMinuteInput = container.find('input[name="start_time_minute"]');
    var reserveTotalTime = 0; // 预约总时长
    var weekdays = []; // 每周都上的星期几 [1,2,3...]
    var reserveList; // 预约框
    var isToday = true; // 用户选择的起始日期是否是今天

    // 据说array的indexOf不兼容
    if (!Array.indexOf) {
        Array.prototype.indexOf = function (el) {
            for (var i = 0, n = this.length; i < n; i++){
                if (this[i] === el){
                    return i;
                }
            }
            return -1;
        }
    }

    /*
     * 今天的日期
     */
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var todayHour = d.getHours();
    var todayMinutes = d.getMinutes();
    if (month < 10) {
        month = '0' + month;
    }
    var day = d.getDate();
    //今天周几
    var todayDate = d.getDay();
    if (day < 10) {
        day = '0' + day;
    }
    var today = year + '-' + month + '-' + day;

    /*
     * 设置下拉框模板
     */
    var selectItemRender = etpl.compile(
      '<!-- for: ${list} as ${item} -->'
    + '<li data-value="${item.value}" data-text="${item.text}">'
    +     '${item.text}'
    + '</li>'
    + '<!-- /for -->'
    );
    //格式化startHourSelect的展示形式
    function formatDisplayHours(hour) {
        switch (parseInt(hour / 6)) {
            case 0 :
                return '凌晨 ';
                break;
            case 1 :
                return '上午 ';
                break;
            case 2 :
                return '下午 ';
                break;
            default :
                return '晚上 ';
        }
    }

    /**
     * 刷新开始时间 - 时 Select
     *
     * @inner
     * @param {Select} select
     * @param {boolean} isToday 是否是当天
     */
    function refreshStartHour(select, isToday) {

        var min = 0;
        var max = 23;
        var data = [];

        // 当天过去时段不可选
        if (isToday) {
            var currentHour = (new Date()).getHours();
            min = (currentHour > min) ? currentHour : min;
        }

        for (var i = min; i <= max; i++) {
            if (i < 10) {
                data.push({
                    value: '0' + i,
                    text: formatDisplayHours(i) + '0' + i
                });
            }
            else {
                data.push({
                    value: i,
                    text: formatDisplayHours(i) + i
                });
            }
        }

        select.refresh({
            data: data,
            value: null
        });
    }

    /**
     * 刷新开始时间 － 分 Select
     *
     * @inner
     * @param {Select} select
     * @param {boolean} isCurrentTodayHour 是否是当天当前小时
     * @param {boolean} userHour 用户当前选择的时
     */
    function refreshStartMinute(select, isCurrentTodayHour, userHour) {
        // 以5分钟间隔，取值00-55
        var min = 0;
        var max = 11;
        var step = 5;
        var data = [];

        // 当天过去时段不可选
        if (isCurrentTodayHour) {

            var currentMinute = new Date().getMinutes();

            if (currentMinute % 5 === 0) { // 正好整5分钟，则取下一个5分钟
                min = (currentMinute + 5) / 5;
            }
            else {
                do {
                    currentMinute++;
                    if (currentMinute % 5 === 0) {
                        min = currentMinute / 5;
                    }
                }while(currentMinute % 5 !== 0);
            }
        }

        // 当小时选择位23时，分钟最大为30
        /*
        if (userHour == 23) {
            max = 6;
        }
        */

        for (var i = min; i <= max; i++) {
            if (i < 2) {
                data.push({
                    value: '0' + (i * step),
                    text: '0' + (i * step)
                });
            }
            else {
                data.push({
                    value: i * step,
                    text: i * step
                });
            }
        }

        select.refresh({
            data: data,
            value: null
        });
    }

    /**
     * 刷新时长 Select 以0.5小时递增
     *
     * @inner
     * @param {Select} select
     * @param {number} userHour 用户当前所选 － 时
     * @param {number} userMinute 用户当前所选 － 分
     */
    function refreshDuration(select, userHour, userMinute) {
        var availableHours = store.get('availableHours');
        // 0.5小时 - 12小时
        var step = 0.5;
        var data = [];

        // 订单可约时长剩余次数
        var endTimes = availableHours * 2;

        // 用户所选时间不可跨越24点，故剩余次数
        /*
        userHour = parseInt(userHour) || 6;
        userMinute = parseInt(userMinute) || 0;
        var userTimes = Math.ceil((24 * 60) - (userHour * 60 + userMinute)) / 30;

        // 谁小取谁
        if (userTimes < endTimes) {
            endTimes = userTimes;
        }
        */

        for (var i = 1; i <= endTimes; i++) {

            var dura = step * i;
            dura = dura.toFixed(1);

            data.push({
                value: dura,
                text: dura + '小时'
            });
        }

        // 默认选中 0.5 小时，无默认值
        var target = data[0];
        select.refresh({
            data: data,
            value: null
        });
    }

    /**
     * 刷新上课次数
     *
     * @inner
     * @param {Object} data
     * @param {number} data.availableHours 订单可约时长
     * @param {number} data.interval 切换上课频次 0 1 7
     * @param {number} data.days 一周几天上课 默认取1天
     * @param {number} data.duration 每节课时长 默认取0.5小时
     *
     */
    function refreshRepeatTimes (repeatTimeSelect, data) {

        var availableHours = data.availableHours;
        var interval = data.interval;
        var days = data.days || 1;
        var duration = data.duration || 0.5;

        var times; // 上课次数
        if (interval == 0) {
            times = 1;
        }
        else{
            times = Math.floor(availableHours / duration);
        }

        var datasource = [];

        for (var i = 1; i <= times; i++) {
            datasource.push({
                text: i,
                value: i
            });
        }

        repeatTimeSelect.refresh({
            data: datasource,
            value: times
        });

        // 需要置灰或启用
        var btn = repeatTimeSelect.element.find('button');
        if (data.interval != 0 && times > 1) {
            btn.prop('disabled', false);
        }
        else { // 不可重复、禁止下拉菜单
            // container.find('.repeat-interval [value="0"]').prop('checked', true);
            btn.prop('disabled', true);
        }
    }

    /**
     * 获取 X月X日 格式的日期
     */
    function getMonthDateType (data) {

        var theDate = new Date(Date.parse(data.replace(/-/g,"/")));

        var month = theDate.getMonth() + 1;
        var date = theDate.getDate();
        var day = theDate.getDay();

        return month + '月' + date + '日' + ' ' + '(周' + weekMap[day] + ')';
    }

    /**
     * 格式化时间间隔
     *
     * @param {number} duration 时间间隔，如1.0 或 2.5
     * return {hour: 1, minute: 30}
     */
    function parseDuration (duration) {

        var result = {};

        var dotPosi = duration.indexOf('.');

        var hour = duration.substring(0, dotPosi);
        var minute = duration.substring(dotPosi + 1);

        if (minute == 0) { // 整数
            result = {
                hour: parseInt(duration)
            }
        }
        else { // 含30分钟
            result = {
                hour: parseInt(duration.substring(0, dotPosi)),
                minute: 30
            }
        }

        return result;
    }

    /**
     * 取结束时间 如 18:30
     *
     * @param {number} startTime 开始时间 如18:00
     * @param {number} duration 时间间隔，如1.0 或 2.5
     */
    function getEndTime (startTime, duration) {

        var startTimeObj = timeUtil.parse(startTime);
        var durationObj = parseDuration(duration);

        var endTimeObj = timeUtil.add(startTimeObj, durationObj);

        var hour = endTimeObj.getHours();
        var minute = endTimeObj.getMinutes();

        if (hour < 10) {
            hour = '0' + hour;
        }
        if (minute < 10) {
            minute = '0' + minute;
        }

        return hour + ':' + minute;
    }

    /**
     * 取结束日期 如 4月26日
     *
     * @param {number} interval 上课频次
     * @param {string} startDate 开始日期 如 2015-04-25
     * @param {number} repeatTimes 上课次数 如 2 含当次
     */
    function getEndDate (interval, startDate, repeatTimes) {

        var startDateObj = dateUtil.parse(startDate);
        var endDateObj; // 结束日期

        if (interval == 7) {

            var index = 0; // 星期的索引
            for (var i = 0; i < repeatTimes; i++, index++) {

                if (i == 0) { // 第一次循环
                    endDateObj = startDateObj;
                    index = weekdays.indexOf(startDateObj.getDay());
                }
                else {
                    var thisDay = weekdays[index]; // 如果0，则为周日换成7计算
                    var prevDay = weekdays[index - 1];
                    var step;

                    if (thisDay == 0) { // 如果0，则为周日换成7计算
                        thisDay = 7;
                    }
                    if (prevDay == 0) {
                        prevDay = 7;
                    }

                    if (thisDay && prevDay) {
                        step = thisDay - prevDay;
                    }
                    else if (thisDay == undefined && prevDay) {
                        index = 0; // 星期索引归零
                        step = 7;
                    }
                    endDateObj = dateUtil.add(endDateObj, step);
                }

            }
        }
        else { // 每天都上
            endDateObj = dateUtil.add(startDateObj, repeatTimes - 1);
        }

        var month = endDateObj.getMonth() + 1;
        var date = endDateObj.getDate();

        return month + '月' + date + '日';
    }

    /**
     * 取结束日期 如 2015-4-30
     *
     * @param {number} interval 上课频次
     * @param {string} startDate 开始日期 如 2015-04-25
     * @param {number} repeatTimes 上课次数 如 2 含当次
     */
    function getFullEndDate (interval, startDate, repeatTimes) {

        var startDateObj = dateUtil.parse(startDate);
        var endDateObj; // 结束日期

        if (interval == 7) {

            var index = 0; // 星期的索引
            for (var i = 0; i < repeatTimes; i++, index++) {

                if (i == 0) { // 第一次循环
                    endDateObj = startDateObj;
                    index = weekdays.indexOf(startDateObj.getDay());
                }
                else {

                    var thisDay = weekdays[index];
                    var prevDay = weekdays[index - 1];
                    var step;

                    if (thisDay == 0) { // 如果0，则为周日换成7计算
                        thisDay = 7;
                    }
                    if (prevDay == 0) {
                        prevDay = 7;
                    }

                    if (thisDay && prevDay) {
                        step = thisDay - prevDay;
                    }
                    else if (thisDay == undefined && prevDay) {
                        index = 0; // 星期索引归零
                        step = 7;
                    }

                    endDateObj = dateUtil.add(endDateObj, step);
                }

            }
        }
        else { // 每天都上
            endDateObj = dateUtil.add(startDateObj, repeatTimes - 1);
        }

        var year = endDateObj.getFullYear();
        var month = endDateObj.getMonth() + 1;
        var date = endDateObj.getDate();

        if (month < 10) {
            month = '0' + month;
        }
        if (date < 10) {
            date = '0' + date;
        }

        return [ year, month, date ].join('-');
    }

    /**
     * 初始化已有课程一览日历组件
     *
     * @param  {jQueryElement} container 需要初始化的元素，其需要有自定义属性data-timestampe时间戳
     * @return
     */
    var initCalendar = function (container) {

        var calContainer = container.find('.schedule-calendar');

        if (!calContainer.length) {
            return;
        }

        var today = new Date(store.get('today'));
        var date = today.getDate();
        var year = today.getFullYear();
        var month = today.getMonth() + 1;

        var url = (location.href.split('?'))[0];
        var calendar = new Calendar({
            element: calContainer,
            today: today,
            date: today,
            value: ''
                    + today.getFullYear()
                    + '-'
                    + ((month < 10) ? ('0' + month) : month)
                    + '-'
                    + ((date < 10 ) ? ('0' + date) : date),
            onChange: function () {
                var value = this.value;

                service.getDateLessons({
                    purchaseId: store.get('purchaseId'),
                    date: value
                })
                .done(function (response) {

                    if (response && response.code === 0) {

                        var courseList = $('.course-list');
                        courseList.html(response.data.tpl.dateLessons);
                        Tooltip.init(courseList.find('[data-title]'));

                    }
                    else {
                        alert('加载当天课程失败，请稍后重试');
                    }

                });
            }
        });
        return calendar;
    };

    /**
     * 提交预约存在冲突
     * @param {array} list 冲突列表
     * @param {function} reserveCourse 强制保存
     */
    var reserveConflict = function (list, reserveCourse) {

        $.each(list, function (i, j) {
            var msgArr = j.msg;
            // 页面冲突错误提示
            var currentTr = reserveList.find('tbody tr:nth-child(' + (j.cid + 1) + ')');
            if (currentTr.find('td:first i').length == 0) {
                currentTr.find('td:first').append(
                    '<i class="icon icon-info-circle text-error" data-width="30em" data-title="' + msgArr.join('<br />') + '"></i>'
                );
            }

        });

        Tooltip.init(reserveList.find('[data-title]'));

        var html = '小秘书发现你本次约课与已有约课存在时间冲突哦，点击红色叹号<i class="icon icon-info-circle text-error"></i>查看并重新编辑约课时间吧';
        alert({
            content: html,
            buttons: [{
                text: '我知道了',
                type: 'primary',
                handler: function () {
                    this.hide();
                }
            }]
        });
        // confirm(html)
        // .done(function () {
        //     reserveCourse('force'); // 这里就应该强制保存了~！
        // });
    }

    var roleMap = {
        teacher: {
            reserveSuccess: function () {
                new Dialog({
                    title: '温馨提示',
                    content: '恭喜你，排课成功<div class="dialog-tip">请在开课前进入教室，否则会被记为迟到哦</div>'
                           + '<div class="dialog-action">'
                           +     '<a class="btn-primary" href="http://' + store.get('env') + '.genshuixue.com/lesson/teacherLessons?status=2">查看我的课表</a>'
                           +     '<a class="btn-default" href="javascript:location.reload()">继续排课</a>'
                           + '</div>'
                });
            }
        },
        student: {
            reserveSuccess: function () {
                new Dialog({
                    title: '温馨提示',
                    content: '恭喜你，成功发起约课，请耐心等待老师确认'
                           + '<div class="dialog-action">'
                           +     '<a class="btn-primary" href="http://' + store.get('env') + '.genshuixue.com/lesson/studentLessons?status=2">查看我的课表</a>'
                           +     '<a class="btn-default" href="javascript:location.reload()">继续约课</a>'
                           + '</div>'
                });
            }
        }
    };

    var weekMap = {
        '1': '一',
        '2': '二',
        '3': '三',
        '4': '四',
        '5': '五',
        '6': '六',
        '0': '日'
    };

    var weekArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    var validator;

    exports.init = function () {

        var formElement = container.find('.form');
        reserveList = container.find('.reserve-list'); // 预约框
        var noData = container.find('.no-data'); // 无预约
        var totalDiv = container.find('.total'); // 总预约课时
        var roleConf = roleMap[store.get('user').type === 0 ? 'teacher' : 'student'];

        var showAddress = reserveList.find('.show-address');
        var addrRadio = reserveList.find('.addr-radio');
        var newAddress = reserveList.find('.new-address');
        var isOnline = false; // 记录上课方式 - 在线授课
        var availableHours = store.get('availableHours');

        // 上课频次
        var intervalRadio = container.find('[name="interval"]');
        var zeroRadio = intervalRadio.filter('[value="0"]');
        var oneRadio = intervalRadio.filter('[value="1"]');
        var sevenRadio = intervalRadio.filter('[value="7"]');

        // 起始日期
        var reserveCalendar = new ReserveCalendar({
            element: formElement.find('input[name="start_date"]'),
            onChange: function () {

                // 当前选中的日期，如 2014-08-30
                var userDate = this.element.val();
                if (userDate == today) {
                    isToday = true;
                }
                else {
                    isToday = false;
                }

                refreshStartHour(
                    startHourSelect,
                    isToday
                );

                var valDate = new Date(Date.parse(userDate.replace(/-/g,"/")));
                var week = weekArr[valDate.getDay()];
                this.element.val(userDate + ' ' + week);

                // 清空其他用户输入
                // resetAllInput();
                // 判断添加课程按钮是否可用
                formElement.find('.btn-choice, .btn-update').prop('disabled', true);
                addCourseBtn();
                // 启用开始时间 - 时
                startHourSelect.enable();

            }
        });

        // 开始时间 - 时
        var startHourSelect = new Select({
            element: formElement.find('.start-hour'),
            name: 'start_hour',
            defaultText: '小时',
            renderTemplate: function (data) {
                return selectItemRender({
                    list: data
                });
            },
            onChange: function () {
                var active = this.element.find('.active');

                var userHour = this.getValue();
                // 今日今时
                if (isToday) {
                    var isCurrentTodayHour = false;
                    if (userHour == new Date().getHours()) {
                        isCurrentTodayHour = true;
                    }
                }

                refreshStartMinute(
                    startMinuteSelect,
                    isCurrentTodayHour,
                    userHour
                );
                // 启用开始时间 - 分
                startMinuteSelect.enable();
                // 变则置灰添加btn
                formElement.find('.btn-choice, .btn-update').prop('disabled', true);
                // 判断添加课程按钮是否可用
                addCourseBtn();
            }
        });
        // 开始时间 - 分
        var startMinuteSelect = new Select({
            element: formElement.find('.start-minute'),
            name: 'start_minute',
            defaultText: '分钟',
            renderTemplate: function (data) {
                return selectItemRender({
                    list: data
                });
            },
            onChange: function () {
                var active = this.element.find('.active');
                var userHour = startHourSelect.getValue();
                var userMinute = this.getValue();

                refreshDuration(
                    durationSelect,
                    userHour,
                    userMinute
                );

                // 启用时长下拉框
                durationSelect.enable();

                // 变则置灰添加btn
                formElement.find('.btn-choice, .btn-update').prop('disabled', true);
                // 判断添加课程按钮是否可用
                addCourseBtn();

            }
        });

        // 时长
        var durationSelect = new Select({
            element: container.find('.duration'),
            name: 'duration',
            renderTemplate: function (data) {
                return selectItemRender({
                    list: data
                });
            },
            onChange: function () {
                // 刷新上课次数
                var data = form.parse(formElement);
                var days = 1;
                if (data.interval == 7) {
                    // 计算每周都上时，每周的天数 days
                    days = formElement.find('[name="days"]:checked').length;
                }

                refreshRepeatTimes(
                    repeatTimeSelect,
                    {
                        availableHours: availableHours - reserveTotalTime,
                        interval: data.interval,
                        days: days,
                        duration: data.duration
                    }
                );

                // 判断添加课程按钮是否可用
                addCourseBtn();
            }
        });

        // 上课次数
        var repeatTimeSelect = new Select({
            element: container.find('.repeat-times'),
            name: 'repeat_times',
            onChange: function () {
                // 判断添加课程按钮是否可用
                addCourseBtn();
            }
        });

        //初始化规则
        function initCourseParams() {
            reserveCalendar.setValue(today);
            var hour;
            if (todayMinutes > 30) {
                hour = todayHour + 2;
                if (hour < 10) {
                    hour = '0' + hour;
                }
                startHourSelect.setValue(hour);
                startMinuteSelect.setValue('00');
            }
            else {
                hour = todayHour + 1;
                if (hour < 10) {
                    hour = '0' + hour;
                }
                startHourSelect.setValue(hour);
                startMinuteSelect.setValue('30');
            }
            if (availableHours - reserveTotalTime >= 1) {
                durationSelect.setValue('1.0');
            }
            else {
                durationSelect.setValue('0.5');
            }
             var interval = container.find('input[name="interval"]:checked').val();
            if (+interval === 7) {
                var currentItem = formElement.find('input[name="days"]')[todayDate - 1];
                $(currentItem).prop('checked', true);
                weekdays = [todayDate];
                reserveCalendar.refresh({
                    weekdays: weekdays
                });
            }
            
        }

        var repeatTimeBtn = repeatTimeSelect.element.find('button');
        initCourseParams();
        
        // 地址薄
        var addressForm = new AddressForm({
            element: newAddress
        });

        var isNewOrOld; // 使用新地址或原地址
        // 老师才有的上课地点选项
        if (store.get('user').type === 0) {

            if (store.get('disLocation')) { // 有订单地址
                showAddress.find('.form-static span').text(store.get('disLocation'));
                showAddress.show();
                isNewOrOld = 'old';
            }
            else {
                addrRadio.show();
                isNewOrOld = 'new';
            }

            // 上课地点radio
            var useRegularAddrRadio = formElement.find('[name="addr_radio"]');
            var useRegularRadio = useRegularAddrRadio.filter('[value="1"]'); // 地址薄
            var useAddressRadio = useRegularAddrRadio.filter('[value="2"]'); // 新地址

            // 地址薄列表 展示
            if (store.get('addressList') && !$.isEmptyObject(store.get('addressList'))) { // 获取地址库列表
                // 地址库 - 数据
                var addressList = new Array();
                $.each(store.get('addressList'), function (index, item) {
                    addressList.push({
                        'value': item.id,
                        'text': item.location_addr + item.detailed_address,
                    });
                });

                // 地址库列表
                var addressListSelect = new Select({
                    element: formElement.find('.address-list'),
                    name: 'address_id',
                    data: addressList,
                    onChange: function () {
                        // 默认选中从地址库选择
                        useRegularAddrRadio = useRegularRadio;
                        useRegularAddrRadio.click();
                    }
                });
            }

            // 新地址 - 左边距样式
            newAddress.css('marginLeft', '70px');
        }
        else if (store.get('user').type === 2) { // 学生身份直接展示新地址编辑界面
            if (store.get('disLocation')) { // 有订单地址
                showAddress.find('.form-static span').text(store.get('disLocation'));
                showAddress.show();
                isNewOrOld = 'old';
            }
            else {
                newAddress.show();
                isNewOrOld = 'new';
            }
        }

        // 在线授课没有课程地址
        if (store.get('lessonWay') == '在线授课' || store.get('lessonWay') == 'online' || store.get('lessonWay') == '在线试听' ) {
            showAddress.hide();
            addrRadio.hide();
            newAddress.hide();
            isOnline = true;
        }

        // 备注
        var editors = container.find('.message');
        editors.each(function(i, item){

            var element = $(item);

            var editor = new Editor({
                element: element,
                maxLength: 100
            });

            validator = new Validator({
                element: formElement,
                realtime: true,
                fields: {
                    note: {
                        rules: {
                            maxlength: 100
                        },
                        errors: {
                            maxlength: '请将字数控制在 100 字以内'
                        }
                    }
                }
            });
        });

        // 已有课程一览 - 日历
        initCalendar(container);

        // 开始时间、时长、上课次数、添加课程按钮 清空与置灰
        function resetStartDate () { // 起始日期清空
            // reserveCalendar.setValue(today);
            // startDateInput.val('');
            // // 禁用开始时间下拉框
            // startHourSelect.disable();
            // startMinuteSelect.disable();
            // // 禁用时长下拉框
            // durationSelect.disable();
            initCourseParams();

            // 添加课程按钮置灰
            formElement.find('.btn-choice, .btn-update').prop('disabled', true);
             addCourseBtn();
        }

        function resetDaysCheckBox () { // 每周重复时间清空
            var days = formElement.find('[name="days"]:checked');
            $.each(days, function (index, item) {
                $(item).prop('checked', false);
            });
            // 添加课程按钮置灰
            // formElement.find('.btn-choice, .btn-update').prop('disabled', true);
            // addCourseBtn();
        }

        // function resetAllInput () {
        //     // 开始时间清空
        //     startHourSelect.setValue('');
        //     startMinuteSelect.setValue('');
        //     // 时长清空
        //     durationSelect.setValue('');
        //     container.find('input[name="duration"]').val('');
        //     // 上课次数清空
        //     repeatTimeSelect.setValue('');
        //     container.find('input[name="repeat_times"]').val('');
        //     添加课程按钮置灰
        //     formElement.find('.btn-choice, .btn-update').prop('disabled', true);
        //     addCourseBtn();
        // }

        // 判断此时是否可以开启添加课程按钮
        function addCourseBtn () {
            var interval = container.find('input[name="interval"]:checked').val();

            // 起始日期
            var startDate = startDateInput.val();
            if (startDate == '' || startDate == '请选择') {
                return;
            }
            // 开始时间
            var startHour = startHourInput.val();
            if (startHour == '' || startHour == '小时') {
                return;
            }
            var startMinute = startMinuteInput.val();
            if (startMinute == '' || startMinute == '分钟') {
                return;
            }
            // 时长
            if (!durationSelect.getValue()) {
                return;
            }

            if (interval == 1 || interval == 7) {
                // 上课次数
                if (!repeatTimeSelect.getValue()) {
                    return;
                }
            }

            if (interval == 7) {
                // 每周重复时间
                var days = formElement.find('[name="days"]:checked').length;
                if (days == 0) {
                    return;
                }
            }

            formElement.find('.btn-choice, .btn-update').prop('disabled', false);
        }

        //重置上课频次单选框
        function setIntervalRadios() {
            if (availableHours - reserveTotalTime < 1) {
                oneRadio.prop('disabled', true);
                sevenRadio.prop('disabled', true);
            }
            else {
                oneRadio.prop('disabled', false);
                sevenRadio.prop('disabled', false);
            }
        }
        //删除所有课程
        function deleteAllCourses() {
            var currentTbody = reserveList.find('table tbody');
            reserveTotalTime = 0;
            totalDiv.find('.total-hours').text(reserveTotalTime);

            if (reserveTotalTime <= availableHours) { // 不超时提醒消失
                totalDiv.find('.text-error').hide();
                container.find('.btn-reserve').prop('disabled', false);
            }
            currentTbody.html('');

            noData.show();
            container.find('.btn-reserve').prop('disabled', true);
            resetStartDate();
            zeroRadio.click();
            setIntervalRadios();
        }

        //创建单节课节的html 字符串
        function createSingleCourse(options) {
            var html = '';
            html += '<tr data-total="' + options.duration + '" data-start-date="' + options.startDate + '"'
                      +  'data-start-hour="' + options.start_hour + '" data-start-minute="' + options.start_minute + '"'
                      +  'data-duration="' + options.duration + '" data-end-time="' + options.endTime + '" data-interval="' + options.interval + '"'
                      +  '>'
                      + '<td>' + getMonthDateType(options.startDate) + '</td>'
                      + '<td>' + formatDisplayHours(options.startTime.substr(0, 2)) + options.startTime + '-' + options.endTime + '</td>'
                      + '<td>' + options.duration + '小时</td>';
            // 编辑、删除操作
            html += '<td>'
                 +     '<button class="btn btn-link btn-edit">编辑</button>'
                 +     '<button class="btn btn-link btn-del">删除</button>'
                 + '</td></tr>';
            return html;
        }

        container
        .on('click', '.order-info [data-mobile] .icon', function () { // 拨打电话

            var from = store.get('user').number;
            var to  = $(this).parent().data('number');
            var name = $(this).parent().data('name');

            new MakePhoneCallDialog({
                from: from,
                to: to,
                mobile: store.get('user').mobile,
                name: name
            });
        })

        .on('change', '[name="interval"]', function (e) { // 上课频次切换

            var target = $(e.currentTarget);
            var value = target.prop('value');
            var repeatDaysGroup = container.find('.repeat-days-group');
            var repeatTimesGroup = container.find('.repeat-times-group');
            if (value == 0) { // 只上一次
                repeatDaysGroup.hide();
                repeatTimesGroup.hide();
                // 刷新起始日期日历组件
                reserveCalendar.refresh({
                    weekdays: [0, 1, 2, 3, 4, 5, 6]
                });
            }
            else if (value == 1) { // 每天都上
                repeatDaysGroup.hide();
                repeatTimesGroup.show();
                var data = form.parse(formElement);

                refreshRepeatTimes(
                    repeatTimeSelect,
                    {
                        availableHours: availableHours - reserveTotalTime,
                        interval: data.interval,
                        duration: data.duration
                    }
                );

                repeatTimeBtn.prop('disabled', false);

                // 刷新起始日期日历组件
                reserveCalendar.refresh({
                    weekdays: [0, 1, 2, 3, 4, 5, 6]
                });
            }
            else if (value == 7) { // 每周都上
                repeatDaysGroup.show();
                repeatTimesGroup.show();

                var data = form.parse(formElement);
                var days = formElement.find('[name="days"]:checked').length; // 每周重复天数

                refreshRepeatTimes(
                    repeatTimeSelect,
                    {
                        availableHours: availableHours - reserveTotalTime,
                        interval: data.interval,
                        days: days,
                        duration: data.duration
                    }
                );

                repeatTimeBtn.prop('disabled', false);
                // 刷新起始日期日历组件 - 周日：将7转为0
                $.each(weekdays, function (i, j) {
                    if (j == 7) {
                        weekdays[i] = 0;
                    }
                });

                reserveCalendar.refresh({
                    weekdays: weekdays
                });
            }

            resetDaysCheckBox();
            resetStartDate();
            // resetAllInput();
        })

        .on('click', '[name="days"]', function (e) { // 每周重复星期选择
            weekdays = []; // 每次都清空一下
            var target = $(e.currentTarget);
            var allCheckbox = target.closest('.form-controls');
            var setDate;

            // 清空已选择用户输入
            // resetStartDate();
            // resetAllInput();
            formElement.find('.btn-choice, .btn-update').prop('disabled', true);
            // addCourseBtn();

            $.each(allCheckbox.find('input[name="days"]'), function (index, item) {
                if ($(item).prop('checked')) {
                    var day = Number($(item).val());
                    weekdays.push(day);
                }
            });

            //选择周几的时候计算默认日期
            if (weekdays.length) {
                $.each(weekdays, function (i, j) {
                    if (j == 0) {
                        weekdays[i] = 7;
                    }
                });
                var transferedTodayDate = todayDate || 7;
                if (weekdays.indexOf(transferedTodayDate) > -1) {
                    setDate = today;
                }
                else {
                    var index = weekdays[0];
                    var addDays = 1;
                    for (var i = transferedTodayDate; i <= 7; i++) {
                        if (weekdays.indexOf(i) > -1) {
                            index = i;
                            break;
                        }
                    }
                    if (index > transferedTodayDate) {
                        addDays += index - transferedTodayDate;
                    }
                    else {
                        addDays += index - transferedTodayDate + 7;
                    }
                    setDate = getFullEndDate(1, today, addDays);
                }
            }
            else {
                setDate = today;
            }

            // 刷新起始日期日历组件
            $.each(weekdays, function (i, j) {
                if (j == 7) {
                    weekdays[i] = 0;
                }
            })

            reserveCalendar.refresh({
                weekdays: weekdays
            });
            reserveCalendar.setValue(setDate);

            // 判断添加课程按钮是否可用
            addCourseBtn();
        })

        .on('click', '.btn-choice', function () { // 添加课程

            var data = form.parse(formElement);

            // 依不同频次，做不同处理
            var interval = data.interval;
            var html = '';
            var totalTime = 0; // 单条订单时长
            if (interval == 0) { // 只上一次
                // 时间
                var startTime = data.start_hour + ':' + data.start_minute;
                var duration = data.duration;
                var endTime = getEndTime(startTime, duration);
                // 日期
                var startDate = data.start_date;
                var spacePosi = startDate.indexOf(' ');
                startDate = startDate.substring(0, spacePosi);

                totalTime = duration;
                html +=createSingleCourse({
                    startDate: startDate,
                    start_hour: data.start_hour,
                    start_minute: data.start_minute,
                    duration: duration,
                    endTime: endTime,
                    startTime: startTime,
                    endTime: endTime,
                    interval: 0
                });
            }
            else if (interval == 1) { // 每天都上
                // 时间
                var startTime = data.start_hour + ':' + data.start_minute;
                var duration = data.duration;
                var endTime = getEndTime(startTime, duration);
                var repeatTimes = data.repeat_times;
                // 日期
                var startDate = data.start_date;
                var spacePosi = startDate.indexOf(' ');
                startDate = startDate.substring(0, spacePosi);

                totalTime = duration * repeatTimes;
                for (var i = 1; i <= repeatTimes; i++) {
                    var newStartDate = getFullEndDate(1, startDate, i)
                    html +=createSingleCourse({
                        startDate: newStartDate,
                        start_hour: data.start_hour,
                        start_minute: data.start_minute,
                        duration: duration,
                        endTime: endTime,
                        startTime: startTime,
                        endTime: endTime,
                        interval: 1
                    });
                }
            }
            else if (interval == 7) { // 每周都上
                // 时间
                var startTime = data.start_hour + ':' + data.start_minute;
                var duration = data.duration;
                var endTime = getEndTime(startTime, duration);
                var repeatTimes = data.repeat_times;
                // 日期
                var startDate = data.start_date;
                var spacePosi = startDate.indexOf(' ');
                startDate = startDate.substring(0, spacePosi);
                // 每周重复天数
                var days = formElement.find('[name="days"]:checked');
                var useDays = []; // 用户选择的星期组
                var useDaysindex = [];
                $.each(days, function (index, item) {
                    var w = $(item).val();
                    useDays.push(weekMap[w]);
                    useDaysindex.push(+w);
                });

                totalTime = duration * repeatTimes;
                //当前选中日期是周几
                var curDay = new Date(Date.parse(startDate.replace(/-/g,"/"))).getDay();
                //当前周几  索引
                var currentIndex = useDaysindex.indexOf(curDay);
                var len = useDaysindex.length;
                var crossWeek = -1;
                for (var i = 0; i < repeatTimes; i++) {
                    var addDays = 1;
                    var newIndex = (currentIndex + i) % len;
                    var newDate = useDaysindex[newIndex];
                    if (newDate === curDay) {
                        crossWeek++;
                    }
                    if (newDate >= curDay) {
                        addDays += newDate - curDay + crossWeek * 7;
                    }
                    else {
                        addDays += newDate - curDay + 7 * (crossWeek + 1);
                    }
                    var newStartDate = getFullEndDate(1, startDate, addDays)
                    html +=createSingleCourse({
                        startDate: newStartDate,
                        start_hour: data.start_hour,
                        start_minute: data.start_minute,
                        duration: duration,
                        endTime: endTime,
                        startTime: startTime,
                        endTime: endTime,
                        interval: 7
                    });
                }
            }


            // 添加一条预约课记录
            reserveList.find('tbody').append(html);
            noData.hide();
            container.find('.btn-reserve').prop('disabled', false);

            // 累加预约总时长
            reserveTotalTime += parseFloat(totalTime);
            totalDiv.show().find('.total-hours').text(reserveTotalTime);

            if (reserveTotalTime > availableHours) { // 超时提醒
                totalDiv.find('.text-error').show();
                container.find('.btn-reserve').prop('disabled', true);
            }

            // 清空用户输入
            resetDaysCheckBox();
            // resetAllInput();
            resetStartDate();
            zeroRadio.click();
            setIntervalRadios();
        })

        .on('click', '.btn-edit', function (e) { // 编辑课程

            var target = $(e.currentTarget);
            var currentTr = target.closest('tr');

            // var interval = currentTr.data('interval');
            // var weekdays = String(currentTr.data('weekdays'));
            var startDate = currentTr.data('start-date');
            var startHour = currentTr.data('start-hour');
            var startMinute = currentTr.data('start-minute');
            var duration = currentTr.data('duration');
            // var repeatTimes = currentTr.data('repeat-times');

            // 第几行
            container.find('input[name="c_id"]').val(currentTr[0].rowIndex);

            // 上课频次
            // if ($.isNumeric(interval)) {
            //     if (interval == 0) {
            //         intervalRadio = zeroRadio;
            //     }
            //     else if (interval == 1) {
            //         intervalRadio = oneRadio;
            //     }
            //     else if (interval == 7) {
            //         intervalRadio = sevenRadio;
            //     }
            // }
            oneRadio.prop('disabled', true);
            sevenRadio.prop('disabled', true);
            zeroRadio.click();


            // if (weekdays == "undefined") {
            //     weekdayArr = [0, 1, 2, 3, 4, 5, 6];
            // }
            // else {
            //     // 每周重复时间
            //     container
            //     .find('input[name="days"]')
            //     .each(function () {
            //         var target = $(this);
            //         if (weekdays.indexOf(target.val()) != -1) {
            //             target.prop('checked', true);
            //         }
            //     });

            //     // 起始日期
            //     var weekdayArr;
            //     weekdayArr = weekdays.split('、');
            //     for (var i in weekdayArr) {
            //         weekdayArr[i] = Number(weekdayArr[i]);
            //     }
            // }
            reserveCalendar.setValue(startDate);

            // 开始日期
            // reserveCalendar.refresh({
            //     weekdays: weekdayArr
            // });

            // 当前选中的日期，如 2014-08-30
            if (startDate == today) {
                isToday = true;
            }
            else {
                isToday = false;
            }

            refreshStartHour(
                startHourSelect,
                isToday
            );

            // 开始时间
            startHourSelect.setValue(startHour);
            startHourSelect.enable();

            startMinuteSelect.setValue(startMinute);
            startMinuteSelect.enable();

            // 时长
            durationSelect.setValue(duration);
            durationSelect.enable();

            // 上课次数
            // repeatTimeSelect.setValue(repeatTimes);

            // 更新课程按钮 + 增加取消按钮
            container.find('.btn-choice').hide();
            container.find('.btn-update, .btn-cancel').show();
        })

        .on('click', '.btn-update', function () { // 更新课程
            // 按钮切换
            container.find('.btn-choice').show();
            container.find('.btn-update, .btn-cancel').hide();

            // 删除被编辑行
            var cId = container.find('input[name="c_id"]').val() - 1;
            reserveList.find('tbody tr').each(function (index, item) {
                if (cId == index) {
                    // 减去预约时长
                    var totalTime = $(item).data('total');
                    reserveTotalTime -= parseFloat(totalTime);
                    totalDiv.find('.total-hours').text(reserveTotalTime);

                    if (reserveTotalTime <= availableHours) { // 不超时提醒消失
                        totalDiv.find('.text-error').hide();
                        container.find('.btn-reserve').prop('disabled', false);
                    }

                    $(item).remove();
                }
            });

            setIntervalRadios();
            container.find('.btn-choice').trigger('click');
            resetStartDate();
            zeroRadio.click();
        })

        .on('click', '.btn-cancel', function () { // 取消编辑课程
            // 清空用户输入
            // resetDaysCheckBox();
            // resetAllInput();
            resetStartDate();
            setIntervalRadios();
            zeroRadio.click();
            container.find('.btn-choice').show();
            container.find('.btn-update, .btn-cancel').hide();
        })

        .on('click', '.btn-del', function (e) { // 删除某条预约
            var target = $(e.currentTarget);
            var currentTr = target.closest('tr');
            var currentTbody = target.closest('tbody');
            // 减去预约时长
            var totalTime = currentTr.data('total');

            confirm({
                content: ' 确认删除该课节？',
                title: '温馨提示',
                width: 300
            })
            .done(function () {
                // 累减预约总时长
                reserveTotalTime -= parseFloat(totalTime);
                totalDiv.find('.total-hours').text(reserveTotalTime);

                if (reserveTotalTime <= availableHours) { // 不超时提醒消失
                    totalDiv.find('.text-error').hide();
                    container.find('.btn-reserve').prop('disabled', false);
                }
                currentTr.remove();

                if (currentTbody.find('tr').length == 0) {
                    noData.show();
                    container.find('.btn-reserve').prop('disabled', true);
                }
                resetStartDate();
                zeroRadio.click();
                setIntervalRadios();
            });
        })

        .on('click', '.delete-all', function () { // 删除所有预约
            var currentTbody = reserveList.find('table tbody');
            var courseLen = currentTbody.children().length;
            if (courseLen) {
                confirm({
                    content: ' 确认删除全部课节？',
                    title: '温馨提示',
                    width: 300
                })
                .done(function () {
                    deleteAllCourses();
                });
            }
            else {
                alert({
                    title: '温馨提示',
                    content: '您还未添加课程'
                });
            }
            
        })

        .on('change', ':radio[name=addr_radio]', function (e) {
            var radio = $(e.currentTarget);
            var value = radio.prop('value');

            if (value == 1) { // 使用地址薄
                newAddress.hide();
            }
            else if (value == 2) { // 使用新地址
                newAddress.show();
            }

            // 地址列表未选中值，则赋常用地址
            if (e.target.value == 1 && !addressListSelect.getValue()) {
                addressListSelect.setValue(
                    store.get('addressList')[0].id
                );
            }
        })

        .on('click', '.modify-addr', function (e) { // 修改地址
            isNewOrOld = 'new'; // 使用新地址
            var target = $(e.currentTarget);

            if (store.get('user').type === 0) { // 老师
                addrRadio.show();
                addrRadio.find('.original-addr').show(); // 使用原地址
            }
            else if (store.get('user').type === 2) { // 学生

                newAddress.show();
                newAddress.find('.original-addr').show(); // 使用原地址
            }

            showAddress.hide();
        })

        .on('click', '.original-addr', function (e) { // 使用原地址
            isNewOrOld = 'old';
            var target = $(e.currentTarget);

            if (useRegularAddrRadio) {
                // 单选按钮归零
                useRegularRadio.prop('checked', false);
                useAddressRadio.prop('checked', false);
            }


            if (store.get('user').type === 0) { // 老师
                addrRadio.hide();
                newAddress.hide();
            }
            else if (store.get('user').type === 2) { // 学生
                newAddress.hide();
            }
            showAddress.show();
        })

        .on('click', '[name="quick-lesson"]', function (e) { // 闪电约课

            var target = $(e.currentTarget);
            var qlessonBox = target.closest('.quick-lesson-box');

            if (target.prop('checked')) { // 开启

                // 闪电约课 - 弹窗不再提醒
                var remind = store.get('user').qreserve_remind;

                if (remind == 1) {
                    new QuickLessonDialog({
                        teacher_num: qlessonBox.data('user-num'),
                        closeDialog: function () {
                            target.prop('checked', false);
                        }

                    });
                }
                else if (remind == 0) {

                    service
                    .quickLesson({
                        qreserveSign: 1,
                        teacherNum: qlessonBox.data('user-num')
                    })
                    .done(function (response) {
                        if (response.code === 0) {
                            // 直接刷新吧
                            success('闪电约课开启', function () {
                                location.reload();
                            });
                        }
                    });

                }

            }
            else { // 取消

                confirm({
                    content: '关闭闪电约课后，该老师向你发起的约课以及时间修改需要手动确认，是否确定要关闭？',
                    title: '温馨提示',
                    width: 330
                })
                .done(function () {

                    // 取消闪电约课
                    service
                    .quickLesson({
                        qreserveSign: 0,
                        teacherNum: qlessonBox.data('user-num')
                    })
                    .done(function (response) {
                        if (response.code === 0) {
                            // 直接刷新吧
                            success('闪电约课关闭', function () {
                                location.reload();
                            });
                        }
                    });

                })
                .fail(function () {
                    target.prop('checked', true);
                });

            }
        });

        // 提交预约
        var saveButton = new SaveButton({
            element: container.find('.btn-reserve'),
            save: function () {

                if (!validator.validate()) {
                    return false;
                }

                // 将预约保存按钮置灰
                container.find('.btn-reserve').prop('disabled', true);

                var data = form.parse(formElement);

                var courses = []; // 预约课程
                $.each(reserveList.find('.table tbody tr'), function (index, item) {
                    var data = {};
                    data.cid = index;
                    // data.interval = $(item).data('interval');
                    // data.repeat_times = $(item).data('repeat-times');

                    // var weekday = String($(item).data('weekdays'));
                    var ends = $(item).data('end-time').split(':');
                    var startHour = $(item).data('start-hour');
                    var duration = $(item).data('duration');
                    var endHour = ends[0];
                    var endDate;
                    var newDate;
                    //每周都上
                    // if (data.interval == 7) {
                    //     if (weekday !== 'undefined') {
                    //         data.weekday = weekday.split('、');
                    //         data.start_date = $(item).data('start-date');
                    //         if ((endHour - startHour) < 0) {
                    //             newDate = new Date($(item).data('start-date'));
                    //             newDate.setDate(newDate.getDate() + 1);
                    //             endDate = dateUtil.stringify(newDate);
                    //         }
                    //         else {
                    //             endDate = $(item).data('start-date');
                    //         }
                    //         data.end_date = endDate;
                    //         data.start_time = $(item).data('start-date') + ' ' + $(item).data('start-hour') + ':' + $(item).data('start-minute') + ':00';
                    //         data.end_time = endDate + ' ' + $(item).data('end-time') + ':00';
                    //     }
                    // }
                    // //只上一次
                    // else  if (data.interval == 0) {
                    //     data.start_time = $(item).data('start-date') + ' ' + $(item).data('start-hour') + ':' + $(item).data('start-minute') + ':00';
                    //     if ((endHour - startHour) < 0) {
                    //         newDate = new Date($(item).data('start-date'));
                    //         newDate.setDate(newDate.getDate() + 1);
                    //         endDate = dateUtil.stringify(newDate);
                    //     }
                    //     else {
                    //         endDate = $(item).data('start-date');
                    //     }
                    //     data.end_time = endDate + ' ' + $(item).data('end-time') + ':00';
                    // }
                    //每天都上
                    // else {
                        data.start_time = $(item).data('start-date') + ' ' + $(item).data('start-hour') + ':' + $(item).data('start-minute') + ':00';
                        newDate = new Date($(item).data('start-date'));
                        if ((endHour - startHour) < 0) {
                            newDate.setDate(newDate.getDate() + 1);
                        }
                        // else {
                        //     newDate.setDate(newDate.getDate() + $(item).data('repeat-times') - 1);
                        // }
                        endDate = dateUtil.stringify(newDate);
                        data.end_time = endDate + ' ' + $(item).data('end-time') + ':00';
                    // }
                    courses.push(data);
                });

                var reserveOldCourse = function (force) { // 原地址 - 强制保存 forceSave: 1

                    var param = {};

                    if (force == 'force') { // 强制保存
                        param = {
                            purchaseId: store.get('purchaseId'),
                            note: data.note,
                            courses: courses,
                            forceSave: 1
                        }
                    }
                    else {
                        param = {
                            purchaseId: store.get('purchaseId'),
                            note: data.note,
                            courses: courses
                        }
                    }

                    service
                    .reserve(
                        param,
                        {
                            errorHandler: {
                                '9999': function (response) { // 冲突校验

                                    var lessons = response.data;
                                    if (lessons.length > 0) {
                                        reserveConflict(
                                            lessons,
                                            reserveOldCourse
                                        );
                                    }

                                }
                            }
                        }
                    )
                    .done(function (response) {
                        if (response.code === 0) {
                            roleConf.reserveSuccess();
                        }
                        // 保存完成后，重新开启提交预约按钮
                        container.find('.btn-reserve').prop('disabled', false);
                    });
                };

                var reserveNewCourse = function (force) { // 新地址 - 强制保存 force_save: 1

                    // 优先保存位置
                    var mapBtns = formElement.find('.map-oper');
                    if (mapBtns.is(':visible')) {

                        var bdAreaName = formElement.find('input[name="bd_area_name"]').val();
                        var cityId = formElement.find('input[name="city"]').val();
                        var areaId = formElement.find('input[name="area"]').val();
                        var userAreaName = formElement.find('.area span').text();

                        // 保存位置
                        return service
                        .checkAddress({
                            cityId: cityId,
                            areaName: bdAreaName
                        })
                        .done(function (response) {
                            if (response.code === 0) {

                                mapBtns.hide();
                                // 获取地图区级信息 - 只刷新区信息
                                if (response.data.match_area && response.data.match_area.id) {

                                    if (areaId != response.data.match_area.id) {
                                        confirm({
                                            content: '小秘书发现你输入的地址似乎在“' + bdAreaName + '”<br />是否需要小秘书帮你把“' + userAreaName + '”修改为“' + bdAreaName + '”呢？',
                                            title: '温馨提示',
                                            width: 400,
                                            buttons: [
                                                {
                                                    text: '帮我修改',
                                                    type: 'primary',
                                                    handler: function () {
                                                        // 获取地图区级信息 - 只刷新区信息
                                                        addressForm.setAreaChangeSrc('saveAddr'); // 牵涉区变动地图刷新与否
                                                        addressForm.regionSelect.areaSelect.setValue(response.data.match_area.id);
                                                        this.hide();
                                                        // 触发保存按钮
                                                        formElement.find('.btn-reserve').click();
                                                    }
                                                },
                                                {
                                                    text: '不修改',
                                                    handler: function () {
                                                        this.hide();
                                                        // 触发保存按钮
                                                        formElement.find('.btn-reserve').click();
                                                    }
                                                }
                                            ]
                                        });
                                    }
                                    else {
                                        // 触发保存按钮
                                        formElement.find('.btn-reserve').click();
                                    }
                                }

                            }
                        });
                    }
                    else {

                        var param = {};

                        if (force == 'force') { // 强制保存
                            param = {
                                purchaseId: store.get('purchaseId'),
                                note: data.note,
                                addrRadio: data.addr_radio,
                                addressId: data.address_id,
                                areaId: data.area,
                                locationAddr: data.location_addr,
                                lng: data.lng,
                                lat: data.lat,
                                asRegularAddress: data.regular_address,
                                courses: courses,
                                forceSave: 1
                            }
                        }
                        else {
                            param = {
                                purchaseId: store.get('purchaseId'),
                                note: data.note,
                                addrRadio: data.addr_radio,
                                addressId: data.address_id,
                                areaId: data.area,
                                locationAddr: data.location_addr,
                                lng: data.lng,
                                lat: data.lat,
                                asRegularAddress: data.regular_address,
                                courses: courses
                            }
                        }

                        service
                        .reserve(
                            param,
                            {
                                errorHandler: {
                                    '9999': function (response) { // 冲突校验

                                        var lessons = response.data;
                                        if (lessons.length > 0) {
                                            reserveConflict(
                                                lessons,
                                                reserveNewCourse
                                            );
                                        }

                                    }
                                }
                            }
                        )
                        .done(function (response) {
                            if (response.code === 0) {
                                roleConf.reserveSuccess();
                            }
                            // 保存完成后，重新开启提交预约按钮
                            container.find('.btn-reserve').prop('disabled', false);
                        });
                    }
                };

                var flag = false; // 新地址是否完整
                if (store.get('user').type == 2 && data.location_addr && data.area) { // 学生
                    flag = true;
                }
                else if (data.addr_radio == 1 && data.address_id) { // 地址库
                    flag = true;
                }
                else if (data.addr_radio == 2 && data.location_addr && data.area) { // 新地址
                    flag = true;
                }
                else if (isOnline == true) { // 在线授课，无需地址
                    flag = true;
                }

                if (isNewOrOld == 'new' && flag) {
                    reserveNewCourse();
                }
                else if (isNewOrOld == 'new' && flag == false) { // 使用新地址，但新地址却不完整
                    if (store.get('disLocation')) { // 有订单地址
                        confirm({
                            content: '你未填写有效的课程地址，小秘书帮你保存了原地址，是否确认发起约课？',
                            title: '温馨提示',
                            width: 300
                        })
                        .done(function () {
                            isNewOrOld = 'old';
                            reserveOldCourse();
                        });
                    }
                    else {

                        confirm({
                            content: '你未填写有效的课程地址，是否确认发起约课？',
                            title: '温馨提示',
                            width: 335
                        })
                        .done(function () {
                            isNewOrOld = 'old';
                            reserveOldCourse();
                        });

                    }
                }
                else { // 使用原地址
                    reserveOldCourse();
                }

            }
        });

    };

});