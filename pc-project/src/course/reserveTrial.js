/**
 * @file 老师排课 － 试听课
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

    var Calendar = require('common/component/CourseMonthCalendarMini');
    var Tooltip = require('cobble/ui/Tooltip');
    var QuickLessonDialog = require('common/component/QuickLessonDialog');
    var Dialog = require('cobble/ui/Dialog');
    var MakePhoneCallDialog = require('common/component/MakePhoneCallDialog');

    var container = $('#main');
    var startDateInput = container.find('input[name="start_date"]');
    var reserveTotalTime = 0; // 预约总时长
    var isToday = false; // 用户选择的起始日期是否是今天

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
    if (month < 10) {
        month = '0' + month;
    }
    var day = d.getDate();
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
                    text: '0' + i
                });
            }
            else {
                data.push({
                    value: i,
                    text: i
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
     *
     */
    function refreshDuration(select, userHour, userMinute) {

        var availableHours = store.get('availableHours'); // 订单可约时长
        // 0.5小时 - 12小时
        var step = 0.5;
        var data = [];

        // 订单可约时长
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
    };

    var roleMap = {
        teacher: {
            reserveSuccess: function () {
                new Dialog({
                    title: '温馨提示',
                    content: '恭喜你，排课成功'
                           + '<div class="dialog-action">'
                           +     '<a class="btn-primary" href="/lesson/teacherLessons?status=2">查看我的课表</a>'
                           +     '<a class="btn-default" href="javascript:location.reload()">继续排课</a>'
                           + '</div>'
                });
            }
        }
    };

    var validator;

    exports.init = function () {

        var formElement = container.find('.form');
        var roleConf = roleMap[store.get('user').type === 0 ? 'teacher' : 'student'];

        var showAddress = formElement.find('.show-address');
        var addrRadio = formElement.find('.addr-radio');
        var newAddress = formElement.find('.new-address');
        var isOnline = false; // 记录上课方式 - 在线授课

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

                // 清空其他用户输入
                resetAllInput();
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
                if (durationSelect.getValue()) {
                    formElement.find('.btn-reserve').prop('disabled', false);
                }
            }
        });

        // 地址薄
        var addressForm = new AddressForm({
            element: newAddress
        });

        var isNewOrOld; // 使用新地址或原地址
        // 老师才有的上课地点选项
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
                    'text': item.regular_address.location_addr,
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

        // 在线授课没有课程地址
        if (store.get('lessonWay') == '在线授课' || store.get('lessonWay') == 'online' || store.get('lessonWay') == '在线试听' ) {
            showAddress.hide();
            addrRadio.hide();
            newAddress.hide();
            isOnline = true;
        }

        // 备注
        var editor = new Editor({
            element: container.find('.form-editor'),
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

        // 已有课程一览 - 日历
        initCalendar(container);

        // 开始时间、时长 清空与置灰
        function resetStartDate () { // 起始日期清空
            reserveCalendar.setValue('');
            startDateInput.val('请选择');
            // 禁用开始时间下拉框
            startHourSelect.disable();
            startMinuteSelect.disable();
            // 禁用时长下拉框
            durationSelect.disable();
        }

        function resetAllInput () {
            // 开始时间清空
            startHourSelect.setValue('');
            startMinuteSelect.setValue('');
            // 时长清空
            durationSelect.setValue('');
            container.find('input[name="duration"]').val('');
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

        .on('click', '.btn-reserve', function () { // 提交预约

            if (!validator.validate()) {
                return false;
            }

            var data = form.parse(formElement);

            var courses = []; // 预约课程

            // 时间
            var startTime = data.start_hour + ':' + data.start_minute;
            var duration = data.duration;
            var endTime = getEndTime(startTime, duration);
            var endHour = endTime.split(':')[0];
            var endDate = data.start_date;
            if ((endHour - data.start_hour) < 0) {
                var newDate = dateUtil.parse(endDate);
                newDate.setDate(newDate.getDate() + 1);
                endDate = dateUtil.stringify(newDate);
            }

            var cData = {};
            cData.cid = 1;
            cData.start_date = data.start_date;
            cData.start_time = data.start_date + ' ' + startTime + ':00';
            cData.end_time = endDate + ' ' + endTime + ':00';
            cData.interval = 0;
            cData.repeat_times = 1;

            courses.push(cData);

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
        });


    };

});