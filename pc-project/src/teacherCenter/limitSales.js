/**
 * @file 营销中心-促销活动
 * @author caoying
 */
define(function (require, exports) {

    'use strict';

    var service = require('common/service');
    var store = require('common/store');
    var Tooltip = require('cobble/ui/Tooltip');
    var dateUtil = require('cobble/util/date');
    var timeUtil = require('cobble/util/time');
    var moment = require('moment');
    var Select = require('cobble/form/Select');
    var Dialog = require('cobble/ui/Dialog');
    var ReserveCalendar = require('common/component/ReserveCalendar'); // 日历
    var DaytimeSelect = require('common/component/DaytimeSelect');
    var Editor = require('common/component/Editor');

    var sale = $('.sale');
    var listSale = sale.find('.list-sale');
    var addSale = sale.find('.add-sale');

    // list页面变量定义
    var listContent = listSale.find('#content');
    var listCardBody = listContent.find('.card-body');
    var listcardTitle = listCardBody.find('.title');
    var listResult = listCardBody.find('.acitivity-content');
    var listNoData = listCardBody.find('.no-data-tr');

    // add页面变量定义
    var addContent = addSale.find('#content');
    var timeResult = true;   // 时间格式是否正确的标识

    /*
     *  获取页面访问的URL参数
     *
     * @param name 需要寻找的参数名
    */
    function getUrlParam (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return "";
    }

    /*
     *  设置当期活动和往期活动的样式
     *
     * @param strType 请求参数中的活动类型
    */
    function setMove (strType) {

        if(strType == 1 || strType == ""){
            listcardTitle.find('.current').addClass('move');
            listcardTitle.find('.old').removeClass('move');
        }
        else {
            listcardTitle.find('.current').removeClass('move');
            listcardTitle.find('.old').addClass('move');

            if(listNoData.length == 1){
                listNoData.find('.wrapper').text('您没有已过期的活动哦！');
            }
        }
    }

    /*
     *  计算两个时间的时间间隔
     *
     * @param startTime 起始时间
     * @param endTime 结束时间
     * @param minFlag 返回值是否截止到分钟
    */
    function countLong(startTime, endTime, minFlag){

        var returnstr = "";

        if( endTime != ""  ){

            var objStartDate = moment(startTime,'YYYY-MM-DD HH:mm');
            var endStartDate = moment(endTime,'YYYY-MM-DD HH:mm');
            var date = endStartDate - objStartDate;
            var timeSpan = {};

            timeSpan.Days = parseInt(date / 1000 / 60 / 60 /24);
            timeSpan.TotalHours = parseInt(date / 1000 / 60 / 60);
            timeSpan.Hours = timeSpan.TotalHours % 24;
            timeSpan.TotalMinutes = parseInt(date / 1000 / 60);
            timeSpan.Minutes = timeSpan.TotalMinutes % 60;

            var remain_date = timeSpan.Days;
            var time_time = timeSpan.Hours;
            var time_min = timeSpan.Minutes;

            if (time_time < 0){
                remain_date = remain_date - 1;
                time_time = 24 + time_time;
            }
            if ( time_min < 0){
                 if ( time_time > 0 ){
                    time_time = time_time - 1;
                }

                time_min = 60 + time_min;
            }

            if(remain_date < 0
                || (remain_date == 0 && time_time < 0)
                || (remain_date == 0 && time_time == 0 && time_min <= 0)){
                returnstr = "";
            }
            else {
                if (minFlag) {
                    if ( remain_date == 0 ){
                        if (time_time == 0 ){
                            returnstr = time_min + "分钟";
                        }
                        else {
                            returnstr =  time_time + "小时" + time_min + "分钟";
                        }

                    }
                    else {
                        if (time_time == 0){
                            returnstr = remain_date + "天" + time_min + "分钟";
                        }
                        else {
                            returnstr =  remain_date + "天" + time_time + "小时" + time_min + "分钟";
                        }
                    }
                }
                else {
                    if (remain_date == 0){
                        if(time_time == 0) {
                            returnstr =  time_min +"分钟后结束";
                        }
                        else {
                            returnstr = time_time + "小时"+ time_min +"分钟后结束";
                        }

                    }
                    else {
                        returnstr = remain_date + "天" + time_time + "小时" + time_min +"分钟后结束";
                    }
                }

            }
        }
        else {
            console.log("结束时间为空");
        }

        return returnstr;

    }

    // 设置创建限时优惠页面的活动时长
    function setActiveLong( arrayDate ){

        var startDate = arrayDate[0].startDate;
        var endDate = arrayDate[0].endDate;
        var startTime = arrayDate[0].startTime;
        var endTime = arrayDate[0].endTime;

        if ((endDate != "" && endTime != "" )) {
            if ((startDate > endDate) || (startDate == endDate && startTime >= endTime)) {

                if (arrayDate[1].type == "dialog") {
                    arrayDate[2].object.element.find('.tag-long').text('起始时间应早于结束时间');
                    arrayDate[2].object.element.find('.tag-long').addClass('error-long');
                }
                else {
                    addContent.find('.tag-long').find('.tag').text('');
                    addContent.find('.tag-long').find('.time-long').text('起始时间应早于结束时间');
                    addContent.find('.tag-long').find('.time-long').addClass('error-long');
                }

                return;
            }
        }

        if (startDate != "" && endDate != "" && startTime != "" && endTime != ""){

            var timeLong = countLong(startDate + ' ' + startTime, endDate + ' ' + endTime, true);
            if (arrayDate[1].type == "dialog") {
                arrayDate[2].object.element.find('.tag-long').removeClass('error-long');
                arrayDate[2].object.element.find('.tag-long').text(timeLong);
            }
            else {
                 // 展示并设置活动时长
                addContent.find('.tag-long').show();
                addContent.find('.tag-long').find('.time-long').removeClass('error-long');
                addContent.find('.tag-long').find('.tag').text("活动时长");
                addContent.find('.tag-long').find('.time-long').text(timeLong);
            }

        }
    }

    function calendarTime( objectArray ){

        var currentDate = dateUtil.stringify(new Date()).substr(0,10);
        var currentMin = timeUtil.stringify(new Date()).substr(0,2);
        var currentSec = timeUtil.stringify(new Date()).substr(3,2);
        var current = {
            date: currentDate,
            min: currentMin,
            sec: currentSec
        }

        // 活动起始日期
        var reserveStartCalendar = new ReserveCalendar({
            element: objectArray[0].startDate,
            onChange: function () {
                startTimeSelect.enable();
                startTimeSelect.disabled = true;

                refreshSelectTime(this.getValue(),startTimeSelect,current);

                if(reserveEndCalendar.calendar.getValue() == ""){
                     reserveEndCalendar.calendar.setValue(objectArray[0].endDate.val());
                }

                // 判断所选时间是否小于当前时间
                var arrayDate = [
                    {
                        startDate: this.getValue(),
                        endDate: reserveEndCalendar.calendar.getValue(),
                        startTime: startTimeSelect.getValue(),
                        endTime: endTimeSelect.getValue()
                    },
                    {
                        type: objectArray[1].strType
                    },
                    {
                        object:objectArray[2].strObject
                    }
                ];
                setActiveLong(arrayDate);
            }
        });

        if(reserveStartCalendar.calendar.getValue() == ""){
            reserveStartCalendar.calendar.setValue(objectArray[0].startDate.val());
        }

        // 开始时间
        var startTimeSelect = new DaytimeSelect({
            element: objectArray[0].startTime,
            selectFirst: false,
            disabled: true,
            step: 1,
            onChange:function() {

                objectArray[0].startTime.focus();
                var seleteDate = reserveStartCalendar.calendar.getValue();
                var selectMin = this.getValue().substr(0,2);
                var selectSec = this.getValue().substr(3,2);

                if(reserveStartCalendar.calendar.getValue() == ""){
                    reserveStartCalendar.calendar.setValue(objectArray[0].startDate.val());
                }

                // 如果开始日期选择当天
                if(seleteDate ==  currentDate) {
                    if( parseInt(currentMin) > parseInt(selectMin)) {
                        success("活动开始时间应大于当前时间：" + currentMin + ":" + currentSec);
                    }
                    else if(parseInt(currentMin) == parseInt(selectMin)){
                        if(parseInt(currentSec) > parseInt(selectSec)){
                            success("活动开始时间应大于当前时间：" + currentMin + ":" + currentSec);
                        }
                    }
                }

                if(reserveStartCalendar.calendar.getValue() == ""){
                     reserveStartCalendar.calendar.setValue(objectArray[0].startDate.val());
                }
                if(reserveEndCalendar.calendar.getValue() == ""){
                     reserveEndCalendar.calendar.setValue(objectArray[0].startDate.val());
                }

                var arrayDate = [
                    {
                        startDate: reserveStartCalendar.calendar.getValue(),
                        endDate: reserveEndCalendar.calendar.getValue(),
                        startTime: this.getValue(),
                        endTime:endTimeSelect.getValue()
                    },
                    {
                        type: objectArray[1].strType
                    },
                    {
                        object:objectArray[2].strObject
                    }
                ];
                setActiveLong(arrayDate);
            }
        });

        // 活动结束日期
        var reserveEndCalendar = new ReserveCalendar({
            element: objectArray[0].endDate,
            onChange: function () {
                endTimeSelect.enable();
                refreshSelectTime(this.getValue(),endTimeSelect,current);

                if(reserveStartCalendar.calendar.getValue() == ""){
                     reserveStartCalendar.calendar.setValue(objectArray[0].startDate.val());
                }

                var arrayDate = [
                    {
                        startDate: reserveStartCalendar.calendar.getValue(),
                        endDate: this.getValue(),
                        startTime: startTimeSelect.getValue(),
                        endTime:endTimeSelect.getValue()
                    },
                    {
                        type: objectArray[1].strType
                    },
                    {
                        object:objectArray[2].strObject
                    }
                ];
                setActiveLong(arrayDate);
            }
        });

        // 活动结束时间
        var endTimeSelect = new DaytimeSelect({
            element: objectArray[0].endTime,
            selectFirst: false,
            disabled: true,
            step: 1,
            onChange: function () {

                if(reserveStartCalendar.calendar.getValue() == ""){
                     reserveStartCalendar.calendar.setValue(objectArray[0].startDate.val());
                }
                if(reserveEndCalendar.calendar.getValue() == ""){
                     reserveEndCalendar.calendar.setValue(objectArray[0].startDate.val());
                }

                var arrayDate = [
                    {
                        startDate: reserveStartCalendar.calendar.getValue(),
                        endDate: reserveEndCalendar.calendar.getValue(),
                        startTime: startTimeSelect.getValue(),
                        endTime:this.getValue()
                    },
                    {
                        type: objectArray[1].strType
                    },
                    {
                        object:objectArray[2].strObject
                    }
                ];
                setActiveLong(arrayDate);
            }
        });

        startTimeSelect.enable();
        startTimeSelect.disabled = true;
        endTimeSelect.enable();
        endTimeSelect.disabled = true;

        refreshSelectTime(reserveStartCalendar.calendar.getValue(),startTimeSelect,current);
        refreshSelectTime(reserveEndCalendar.calendar.getValue(),endTimeSelect,current);
    }

    // 更多操作
    function moreOper(object) {
        $(object).removeClass('block');
    }

    // 更多操作
    function changeDiv(object) {

        $(object).closest('.sale').find('.list-sale').hide();
        $(object).closest('.sale').find('.add-sale').show();


        var currentDate = dateUtil.stringify(new Date()).substr(0,10);
        var currentTime = timeUtil.stringify(new Date());
        var tomorrowDate = dateUtil.stringify(dateUtil.add(new Date(), 1));
        addContent.find('.activiy-time').find('input[name="start_date"]').val(currentDate);
        addContent.find('.activiy-time').find('input[name="start_time"]').val(currentTime);
        addContent.find('.activiy-time').find('input[name="end_date"]').val(tomorrowDate);
        addContent.find('.activiy-time').find('input[name="end_time"]').val(currentTime);

        // 初始日历和时间控件
        var arrayDate = [
            {
               startDate: addContent.find('input[name="start_date"]'),
               endDate: addContent.find('input[name="end_date"]'),
               startTime: addContent.find('.start-time'),
               endTime: addContent.find('.end-time')
            },
            {
                strType: "addLimit"
            },
            {
                strObject:""
            }
        ];

        calendarTime(arrayDate);

        // 初始化活动标签
        var selectTag = new Select({
            element: addContent.find('.tag-detail').find('.dropdown'),
            name: 'activityTag'
        });

         // 评论内容
        new Editor({
            element: addContent.find('.form-editor'),
            maxLength: 30
        });

        // 设置活动时长
        var arrayDateLong = [
            {
               startDate: addContent.find('input[name="start_date"]').val(),
               endDate: addContent.find('input[name="end_date"]').val(),
               startTime: addContent.find('input[name="start_time"]').val(),
               endTime: addContent.find('input[name="end_time"]').val()
            },
            {
                type: ""
            },
            {
                object:""
            }
        ];
        setActiveLong(arrayDateLong);
    }

    // 刷新时间控件
    function refreshSelectTime(selectDate, targetObject, current) {
        // 设置起始时间和结束时间框
        if( selectDate == current.date ){
            var range = {
                min: { hour: current.min, minute: current.sec },
                max: { hour: 23, minute: 59 }
            };

        }
        else {
            var range = {
                min: { hour: 0, minute: 0 },
                max: { hour: 23, minute: 59 }
            };
        }
        var min = timeUtil.parse(range.min);
        var max = timeUtil.parse(range.max);

        targetObject.refresh({
            min: timeUtil.simplify(min),
            max: timeUtil.simplify(max)
        });
    }

    /*
     *  判断输入时间是否正确
     *
     * @param timeValue 时间值
     * @param textType 起始时间/结束时间
     * @param type dialog/html
    */
    function timeTest(timeValue,textType,type) {

        var time =  /^([0-2][0-9]):([0-5][0-9])$/g;
        if(!time.test(timeValue)){

            if(type == "content") {
                addContent.find('.tag-long').find('.tag').text('');
                addContent.find('.tag-long').find('.time-long').text( textType +'不符合要求');
                addContent.find('.tag-long').find('.time-long').addClass('error-long');
                timeResult = false;
            }
            else {
                $('.dialog-body').find('.activiy-time').find('.tag-long').text(textType +'不符合要求');
                $('.dialog-body').find('.activiy-time').find('.tag-long').addClass('error-long');
                timeResult = false;
            }

        }
        else {
            if ((parseInt(RegExp.$1) < 24) && (parseInt(RegExp.$2) < 60)) {
                timeResult = true;
            }
            else {
               if(type == "content") {
                    addContent.find('.tag-long').find('.tag').text('');
                    addContent.find('.tag-long').find('.time-long').text( textType +'不符合要求');
                    addContent.find('.tag-long').find('.time-long').addClass('error-long');
                    timeResult = false;
                }
                else {
                    $('.dialog-body').find('.activiy-time').find('.tag-long').text(textType +'不符合要求');
                    $('.dialog-body').find('.activiy-time').find('.tag-long').addClass('error-long');
                    timeResult = false;
                }
            }
        }

        return timeResult;
    }

    exports.init = function() {

        // 获取当期活动还是往期活动标识
        var strType = getUrlParam('type');

        setMove(strType);

        // 去掉input的readonly属性
        addContent.find('input[name="start_time"]').prop("readonly",false);
        addContent.find('input[name="end_time"]').prop("readonly",false);
        addContent.find('.trigger').remove();

        addContent
        .find('input[name="start_time"]')
        .blur( function(){
            var resultStart = timeTest(this.value,"起始时间","content");
            var resultEnd = false;

            if(resultStart){
                resultEnd = timeTest(addContent.find('input[name="end_time"]').val(),"结束时间","content");
            }
            if(resultStart&&resultEnd) {
                // 设置活动时长
                var arrayDateLong = [
                    {
                       startDate: addContent.find('input[name="start_date"]').val(),
                       endDate: addContent.find('input[name="end_date"]').val(),
                       startTime: addContent.find('input[name="start_time"]').val(),
                       endTime: addContent.find('input[name="end_time"]').val()
                    },
                    {
                        type: ""
                    },
                    {
                        object:""
                    }
                ];
                setActiveLong(arrayDateLong);
            }
        });

        addContent
        .find('input[name="end_time"]')
        .blur( function(){
            var resultEnd = timeTest(this.value,"结束时间","content");
            var resultStart = false;

            if(resultEnd) {
                resultStart = timeTest(addContent.find('input[name="start_time"]').val(),"起始时间","content");
            }
            if(resultEnd && resultStart) {
                // 设置活动时长
                var arrayDateLong = [
                    {
                       startDate: addContent.find('input[name="start_date"]').val(),
                       endDate: addContent.find('input[name="end_date"]').val(),
                       startTime: addContent.find('input[name="start_time"]').val(),
                       endTime: addContent.find('input[name="end_time"]').val()
                    },
                    {
                        type: ""
                    },
                    {
                        object:""
                    }
                ];
                setActiveLong(arrayDateLong);
            }
        });

        // 隐藏活动时长;
        addContent.find('.tag-long').hide();

        // 计算list页面每个活动的活动时长
        listResult.each( function(e) {

            var data = $(this).closest('tr').data('content');

            if ( data.status == "1" )
            {
                var endTime = data.end_time;
                var startTime = data.start_time;
                var currentTime = dateUtil.stringify(new Date()) + ' ' + timeUtil.stringify(new Date());

                if (startTime != ""){

                    var startFlag = countLong(startTime, currentTime, false)

                    if(startFlag == ""){
                        $(this).find('.remain_time').text("活动未开始");
                    }
                    else{
                        if (endTime != ""  ){

                            var endFlag = countLong(currentTime, endTime, false);

                            if (endFlag == ""){
                                $(this).find('.remain_time').text("活动已过期");
                            }
                            else {
                                $(this).find('.remain_time').text(endFlag);
                            }

                        }
                    }
                }
            }
        });

        // 移动头部标签，改变样式
        listcardTitle
        .on('mousemove', 'a', function(e) {
            var title = $(this).closest('.title');
            title.find('.move').removeClass('move');
            $(this).addClass('move');
        })

        .on('mouseleave', 'a', function(e) {
            setMove(strType);
        })

        .on('click','.old', function(e) {
            location.href = "?type=2";
        })

        .on('click','.current', function(e) {
            location.href = "?type=1";
        });

        listContent
        .on('click', '.more-oper', function(e) {// 点击更多操作
            $(this).closest('.sale-oper').find('.dropdown-menu').addClass('block');
        })

        .on('mouseleave', '.dropdown-menu', function(e) {
            var that = this;
            setTimeout(function() {
                moreOper(that);
            }, 300);
        })

        .on('mouseleave', '.more-oper', function(e) {
            $(this).closest('.sale-oper').find('.dropdown-menu').removeClass('block');
        })

        .on('mouseenter', '.dropdown-menu', function(e) {
            $(this).closest('.sale-oper').find('.dropdown-menu').addClass('block');
        })

        .on('mousemove', '.sale-summary', function(e) {// 标题详情
            new Tooltip({
                element: $(this).find('[data-title]')
            });
        });

        listCardBody
        .on('click', '.btn-info', function(e) {// 点击添加折扣按钮
            changeDiv(this);
        })

        .on('click', '.sale-click, .icon-pencil', function(e) {// 编辑活动课程
            var acitivityId = $(this).closest('.acitivity-content').find('.acitivity_id').text();
            location.href = "/market/getAllCourseList?type=2&center_id="+ acitivityId +"&action=update";
        })

        .on('click', '.create', function(e) {// 无数据时创建活动
            changeDiv(this);
            $(window).scrollTop(0);
        })

        .on('click', '.restart-acitivity', function(e) {// 重启活动
            var data = $(this).closest('tr').data('content');
            var acitivityId = $(this).closest('.acitivity-content').find('.acitivity_id').text();

            var url = "<div class='activiy-time'>"

                    +   "<div class='start-area'>"
                    +   "<span class='tag-time'>开始时间:</span>"
                    +       "<div class='form-group form-group-inline form-start-date'>"
                    +           "<div class='form-controls start-date'>"
                    +               "<input class='form-text' name='start_date' readonly='readonly' />"
                    +           "</div>"
                    +       "</div>"
                    +       "<div class='form-group form-group-inline'>"
                    +           "<div class='form-controls'>"
                    +               "<div class='dropdown daytime-select start-time'>"
                    +                   "<input class='form-text' name='start_time'/>"
                    +                   "<ul class='dropdown-menu'></ul>"
                    +               "</div>"
                    +           "</div>"
                    +       "</div>"
                    +   "</div>"
                    +   "<div class='end-area'>"
                    +       "<span class='tag-time'>结束时间:</span>"
                    +       "<div class='form-group form-group-inline'>"
                    +           "<div class='form-controls end-date'>"
                    +               "<input class='form-text' name='end_date' readonly='readonly' />"
                    +           "</div>"
                    +       "</div>"
                    +       "<div class='form-group form-group-inline'>"
                    +           "<div class='form-controls'>"
                    +               "<div class='dropdown daytime-select end-time'>"
                    +                   "<input class='form-text' name='end_time'/>"
                    +                   "<ul class='dropdown-menu'></ul>"
                    +               "</div>"
                    +           "</div>"
                    +       "</div>"
                    +   "</div>"
                    +   "<div class='activiy-long'>"
                    +       "<span class='tag-time'>活动时长:<span class='tag-long'></span></span>"
                    +   "</div>"
                    +   "<div class='action'>"
                    +       "<button class='btn-small btn-primary'>重启活动</button>"
                    +       "<button class='btn-small btn-default'>取消</button>"
                    +   "</div>";

            var reStartDialog = new Dialog({
                    title: '重启活动',
                    content: url
                });



            reStartDialog.element.find('input[name="start_date"]').val(data.start_time.substr(0,10));
            reStartDialog.element.find('input[name="start_time"]').val(data.start_time.substr(11,5));
            reStartDialog.element.find('input[name="end_date"]').val(data.end_time.substr(0,10));
            reStartDialog.element.find('input[name="end_time"]').val(data.end_time.substr(11,5));
            // 初始化重启活动对话框的日历控件
            var arrayDialogDate = [
                {
                   startDate: reStartDialog.element.find('input[name="start_date"]'),
                   endDate: reStartDialog.element.find('input[name="end_date"]'),
                   startTime: reStartDialog.element.find('.start-time'),
                   endTime: reStartDialog.element.find('.end-time'),
                },
                {
                    strType: "dialog"
                },
                {
                    strObject: reStartDialog
                }
            ]
            calendarTime(arrayDialogDate);

            // 设置活动时长
            var arrayDate = [
                {
                   startDate: data.start_time.substr(0,10),
                   endDate: data.end_time.substr(0,10),
                   startTime:data.start_time.substr(11,5),
                   endTime: data.end_time.substr(11,5)
                },
                {
                    type: "dialog"
                },
                {
                    object:reStartDialog
                }
            ];
            setActiveLong(arrayDate);

            // 检测时间输入的合法性
            reStartDialog.element.find('input[name="start_time"]').blur( function(){
                var resultStart = timeTest(this.value,"起始时间","dialog");
                var resultEnd = false;

                if(resultStart) {
                    resultEnd = timeTest(reStartDialog.element.find('input[name="end_time"]').val(),"结束时间","dialog");
                }
                if(resultStart&&resultEnd) {
                    // 设置活动时长
                    var arrayDate = [
                        {
                           startDate: data.start_time.substr(0,10),
                           endDate: data.end_time.substr(0,10),
                           startTime: this.value,
                           endTime: reStartDialog.element.find('input[name="end_time"]').val()
                        },
                        {
                            type: "dialog"
                        },
                        {
                            object:reStartDialog
                        }
                    ];
                    setActiveLong(arrayDate);
                }
            });

            reStartDialog.element.find('input[name="end_time"]').blur( function(){
                var resultEnd = timeTest(this.value,"结束时间","dialog");
                var resultStart = false;

                if(resultEnd) {
                    resultStart = timeTest(reStartDialog.element.find('input[name="start_time"]').val(),"起始时间","dialog");
                }
                if(resultEnd && resultStart) {
                    // 计算时长
                    var arrayDate = [
                        {
                           startDate: data.start_time.substr(0,10),
                           endDate: data.end_time.substr(0,10),
                           startTime:reStartDialog.element.find('input[name="start_time"]').val(),
                           endTime: this.value
                        },
                        {
                            type: "dialog"
                        },
                        {
                            object:reStartDialog
                        }
                    ];
                    setActiveLong(arrayDate);
                }
            });

            reStartDialog.element.on('click', '.btn-primary', function(e) {

                var startTime = reStartDialog.element.find('input[name="start_date"]').val() + ' ' + reStartDialog.element.find('input[name="start_time"]').val() + ":00";
                var endTime = reStartDialog.element.find('input[name="end_date"]').val() + ' ' + reStartDialog.element.find('input[name="end_time"]').val()+ ":00";

                if(!timeResult) {
                    alert("活动时间格式不正确！");
                    return;
                }
                // 调用重启活动的Ajax接口
                service.getSaleHandle({
                    center_id: acitivityId,
                    type: 5,
                    start_time: startTime,
                    end_time: endTime
                })
                .done(function (response) {

                    if ( response.code == 0) {
                        success("重启活动成功");
                        reStartDialog.hide();

                        location.href = "?type=" + strType;
                    }
                });
            })

            // 初始化重启活动对话框的日历控件
            reStartDialog.element.on('click', '.btn-default', function(e){
                reStartDialog.hide();
            })
        })

        .on('click', '.insert-course', function(e) {// 添加课程
            var acitivityId = $(this).closest('.acitivity-content').find('.acitivity_id').text();
            location.href = "/market/getAllCourseList?type=1&center_id="+ acitivityId +"&action=add";
        })

        .on('click', '.delete-activity,.delete', function(e) {// 删除活动
            var acitivityId = $(this).closest('.acitivity-content').find('.acitivity_id').text();


            var deleteConfirm = confirm({
                title: "删除活动",
                content: "系统将为您取消此活动设置的促销信息",
                height: 200,
                buttons: [
                {
                    text: '删除活动',
                    type: 'primary',
                    handler: function () {

                        var that = this;

                        // 调用Ajax接口
                        service.getSaleHandle({
                            center_id: acitivityId,
                            type: 3,
                            start_time: "",
                            end_time: ""
                        })
                        .done(function (response) {

                            if ( response.code == 0) {
                                success("活动删除成功");
                                that.hide();

                                location.href = "?type=" + strType;
                            }
                        });
                    }
                },
                {
                    text: '取消',
                    handler: function () {
                        this.hide();
                    }
                }]
            })
        })

        .on('click', '.suspend-activity', function (e) {// 暂停活动
            var acitivityId = $(this).closest('.acitivity-content').find('.acitivity_id').text();
            confirm({
                title: "暂停活动",
                content: "暂停活动将会取消您设置的促销活动",
                buttons: [
                {
                    text: '暂停活动',
                    type: 'primary',
                    handler: function () {
                        var that = this;

                        // 调用Ajax接口
                        service.getSaleHandle({
                            center_id: acitivityId,
                            type: 2,
                            start_time: "",
                            end_time: ""
                        })
                        .done(function (response) {
                            if ( response.code == 0) {
                                success("暂停活动成功");
                                that.hide();

                                location.href = "?type=" + strType;
                            }
                        });

                    }
                },
                {
                    text: '取消',
                    handler: function () {
                        this.hide();
                    }
                }]
            })
        })

        .on('click', '.update-activity', function (e) {// 修改活动

            var data = $(this).closest('tr').data('content');

            var acitivityId = data.id;
            var tagName = data.tag_name;
            var startDate = data.start_time.substr(0,10);
            var startTime = data.start_time.substr(11,5);
            var endDate = data.end_time.substr(0,10);
            var endTime = data.end_time.substr(11,5);
            var info = data.info;

            $(this).closest('.sale').find('.list-sale').hide();
            $(this).closest('.sale').find('.add-sale').show();

            addContent.find('.tag-detail').find('.dropdown').find('.tag-value').text(tagName);
            addContent.find('.tag-detail').find('.activity-id').text(acitivityId);
            addContent.find('.activiy-time').find('input[name="start_date"]').val(startDate);
            addContent.find('.activiy-time').find('input[name="start_time"]').val(startTime);
            addContent.find('.activiy-time').find('input[name="end_date"]').val(endDate);
            addContent.find('.activiy-time').find('input[name="end_time"]').val(endTime);

            addContent.find('.activiy-remark').find('.form-text').val(info);

            if(data.course_count == 0){
                // 课程为0的活动，初始化日历控件
                var arrayDate = [
                    {
                       startDate: addContent.find('input[name="start_date"]'),
                       endDate: addContent.find('input[name="end_date"]'),
                       startTime: addContent.find('.start-time'),
                       endTime: addContent.find('.end-time')
                    },
                    {
                        strType: "addLimit"
                    },
                    {
                        strObject:""
                    }
                ];

                calendarTime(arrayDate);
            }
            else {
                addContent.find('.activiy-time').find('.icon-calendar').addClass('icon-hide');
                addContent.find('.activiy-time').find('.caret').addClass('icon-hide');
                addContent.find('.activiy-time').find('.form-text').addClass('border-hide');
                addContent.find('.activiy-time').find('.form-text').addClass('border-hide');
                addContent.find('.activiy-time').find('input[name="start_time"]').prop("readonly",true);
                addContent.find('.activiy-time').find('input[name="end_time"]').prop("readonly",true);
            }


            // 初始化活动标签
            var selectTag = new Select({
                element: addContent.find('.tag-detail').find('.dropdown'),
                name: 'activityTag'
            });

             // 评论内容
            new Editor({
                element: addContent.find('.form-editor'),
                maxLength: 30
            });


            addContent.find('.next-domain').find('.btn-primary').removeClass('btn-next');
            addContent.find('.next-domain').find('.btn-primary').addClass('btn-next-update');

            // 设置活动时长
            var arrayDateLong = [
                {
                   startDate: addContent.find('input[name="start_date"]').val(),
                   endDate: addContent.find('input[name="end_date"]').val(),
                   startTime: addContent.find('input[name="start_time"]').val(),
                   endTime: addContent.find('input[name="end_time"]').val()
                },
                {
                    type: ""
                },
                {
                    object:""
                }
            ];
            setActiveLong(arrayDateLong);
        });

        addContent
        .on('click', '.btn-next', function (e) {
            var target = $(e.currentTarget);
            var tagName = addContent.find('.tag-detail').find('.tag-value').text();
            var startTime = addContent.find('input[name="start_date"]').val() + ' ' + addContent.find('input[name="start_time"]').val();
            var endTime = addContent.find('input[name="end_date"]').val() + ' ' + addContent.find('input[name="end_time"]').val();
            var timeLong = countLong(startTime, endTime, true);
            // 判断活动标签和时间是否必输
            if(tagName == "--请选择--") {
                alert( "请选择活动标签" );
                return;
            }
            if(startTime == "") {
                alert( "请选择活动开始时间" );
                return;
            }
            if(endTime == "") {
                alert( "请选择活动结束时间" );
                return;
            }

            if(!timeResult) {
                alert( "活动时间格式不正确！" );
                return;
            }

            if(timeLong == ""){
                alert( "活动起始时间应大于结束时间！" );
                return;
            }

            target.prop('disabled', true);

            service
            .getCreateSale({
                type: 1,
                tag_name: tagName,
                start_time: addContent.find('input[name="start_date"]').val() + ' ' + addContent.find('input[name="start_time"]').val() + ":00",
                end_time: addContent.find('input[name="end_date"]').val() + ' ' + addContent.find('input[name="end_time"]').val() + ":00",
                info: addContent.find('.activiy-remark').find('.form-text').val()
            })
            .done(function (response) {

                var responseData = response.data;
                if ( response.code == 0) {
                    success("创建活动成功");
                    location.href = "/market/getAllCourseList?type=1&center_id=" + responseData.center_id+"&action=add";
                }
            });
        })

        .on('click', '.btn-next-update', function (e) { // “修改活动时，点击下一步”
            var target = $(e.currentTarget);
            var acitivityId = addContent.find('.tag-detail').find('.activity-id').text();
            var startTime = addContent.find('input[name="start_date"]').val() + ' ' + addContent.find('input[name="start_time"]').val();
            var endTime = addContent.find('input[name="end_date"]').val() + ' ' + addContent.find('input[name="end_time"]').val();
            var timeLong = countLong(startTime, endTime, true);

            if (!timeResult) {
                alert( "活动时间格式不正确！" );
                return;
            }

            if (timeLong == "") {
                alert( "活动起始时间应大于结束时间！" );
                return;
            }

            target.prop('disabled', true);

            // 调用修改活动接口
            service
            .getUpdateSale({
                center_id: acitivityId,
                tag_name: addContent.find('.tag-detail').find('.dropdown').find('.tag-value').text(),
                start_time: addContent.find('input[name="start_date"]').val() + ' ' + addContent.find('input[name="start_time"]').val() + ":00",
                end_time: addContent.find('input[name="end_date"]').val() + ' ' + addContent.find('input[name="end_time"]').val() + ":00",
                info: addContent.find('.activiy-remark').find('.form-text').val()
            })
            .done(function (response) {

                if ( response.code == 0) {

                    success("修改活动成功");
                    location.href = "/market/getAllCourseList?type=1&center_id=" + acitivityId +"&action=add";
                }
            });
        })

        .on('click', '.btn-cancel', function (e) {
            location.href = "?type=1";
        });


    }
});