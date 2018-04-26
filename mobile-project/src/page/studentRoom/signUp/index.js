define(function (require) {
    'use strict';
    var $ = require('zepto');
    var template = require('artTemplate');
    var liRender = template.compile(require("text!./_part/timeTable.tpl"));
    var url = require('util/url');
    var ui =require('common/ui');
    var service = require('common/service');
    var openAppWindow = require('common/openAppWindow');

    var pageData;
    var container = $('#page_main');

    var Pay = function () {
        this.lessonWay = 0;
        this.timeTable = 0;
        this.reason = null;
    };

    Pay.prototype.initTimeTable = function () {
        var numberArray = pageData.timetable;
        var timeArray = [
                            {name: '周一上午', index: 0},
                            {name: '周一下午', index: 1},
                            {name: '周一晚上', index: 2},
                            {name: '周二上午', index: 3},
                            {name: '周二下午', index: 4},
                            {name: '周二晚上', index: 5},
                            {name: '周三上午', index: 6},
                            {name: '周三下午', index: 7},
                            {name: '周三晚上', index: 8},
                            {name: '周四上午', index: 9},
                            {name: '周四下午', index: 10},
                            {name: '周四晚上', index: 11},
                            {name: '周五上午', index: 12},
                            {name: '周五下午', index: 13},
                            {name: '周五晚上', index: 14},
                            {name: '周六上午', index: 15},
                            {name: '周六下午', index: 16},
                            {name: '周六晚上', index: 17},
                            {name: '周日上午', index: 18},
                            {name: '周日下午', index: 19},
                            {name: '周日晚上', index: 20}
                        ];
        var tempArray = [];
        var numberL = numberArray.length;
        for (var i = 0; i < numberL; i++) {
            if (+numberArray[i] > 0) {
                tempArray.push(timeArray[i]);
            }
        }

        var timeTableHtml = liRender({
            list: tempArray
        });

        container.find('.time-table').html(timeTableHtml);
    };

    Pay.prototype.chooseItem = function () {
        var there = this;
        container.on('click', '.item', function () {
            var that = $(this);
            if (that.data('type') === 'lessonWay') {
                if (that.hasClass('active')) {
                    there.lessonWay -= that.data('index');
                } else {
                    there.lessonWay += that.data('index');
                }
            }
            that
                .toggleClass('normal')
                .toggleClass('active');
            
        });
    };

    Pay.prototype.pay = function () {
        var there = this;
        container.on('click', '.pay-button', function () {

            var temp = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
            container.find('.time-table .item').each(function () {
                var that = $(this);
                var index = that.attr('data-status');
                if (that.hasClass('active')) {
                    temp[index] = 1;
                }
            });

            there.timeTable = parseInt(temp.join(''), 2); 
            there.reason = container.find('.input-texts .form-text').val();
            if (there.reason.length < 20) {
                there.reason = false;
            }
            if (there.timeTable && there.lessonWay && there.reason) {
                // 发送ajax
                var number = url().params.number;
                service.post('/source-hall/sign', {
                    number: number,
                    lesson_way: there.lessonWay,
                    accept_time: there.timeTable,
                    self_recommendation: there.reason
                }, function (response) {
                    if (+response.code === 0) {
                        if (response.data.is_success) {
                            ui.remind('报名成功');
                            setTimeout(function () {
                                openAppWindow.open('/source-hall/studentOrderDetail?number=' + number);
                            }, 2000);
                        }
                    }
                });
                
            } else if (!there.timeTable)  {
                ui.remind('请选择上课时间');
                return;
            } else if (!there.lessonWay) {
                ui.remind('请选择上课方式');
                return;
            } else if (!there.reason) {
                if (there.reason === false) {
                    ui.remind('自荐理由需要20字以上');
                } else {
                    ui.remind('请填写自荐理由');
                }
                return;
            }
        });
    };

    return function (page_data) {
        pageData = page_data;
        var pay = new Pay();
        pay.initTimeTable();
        pay.chooseItem();
        pay.pay();
    };
});