define(function(require) {
    'use strict';

    var $ = require('zepto');
    var timeFormat = require('common/time/formatTime');
    var boxList = $('.list-box');
    var app = require('common/app');
    var isTeacherApp;


    var lastTime = function() {
        boxList.find('.vip-exclusive').each(function(index, ele) {
            var that = $(ele);
            var timer = that.data('timer');
            var status = that.data('status');
            // 小于0 倒计时失效
            if (timer < 0) {
                return ;
            }

            var min = parseInt(timer / 60);
            var second = timer % 60;
            var stime;
            if (min === 0) {
                stime = second + '"';
            } else {
                stime = min + "'" + second + '"';
            }
            that.html('会员专享时间 ' + stime);

            // 开启定时器
            if(status == '0') {
                that.attr('data-status', '1');
                var show = setInterval(function() {
                    timer--;
                    if (timer < 1) {
                        clearInterval(show);
                        that.hide();
                    } else {
                        var min = parseInt(timer / 60);
                        var second = timer % 60;
                        var stime;
                        if (min === 0) {
                            stime = second + '"';
                        } else {
                            stime = min + "'" + second + '"';
                        }
                        that.html('会员专享时间 ' + stime);
                    }
                }, 1000);
            }
        });
    };

    var chooseTime = function () {
        boxList.find('.demand-introduction .publish-time').each(function() {
            var that = $(this);
            var timer = that.attr('data-time');
            var text = timeFormat(timer);
            that.html(text);
        });
    };

    return function() {

        isTeacherApp = app.isTeacherApp();
        lastTime();
        chooseTime();
    };
});