/**
 * @file 老师排名
 * @author liucong
 */
define(function (require, exports) {

    'use strict';

    var store = require('common/store');
    var timeSpan = require('common/function/timeSpan');

    function updateTime(element, time) {

        var timeObj = timeSpan(time);

        element.text(''
            + timeObj.days + '天'
            + timeObj.hours + '小时'
            + timeObj.minutes + '分'
            + timeObj.seconds + '秒');
    }

    exports.init = function () {

        var container = $('#content');
        var curTime = store.get('currentTime');
        var expTime = store.get('expiredTime');

        var countDownTime = (expTime - curTime) / 1000;

        if ($.isNumeric(countDownTime)) {

            var countDown = container.find('.count-down span');

            var updateCountDown = function () {

                countDownTime-= 1;

                if (countDownTime > 0) {


                    updateTime(countDown, countDownTime);
                    setTimeout(updateCountDown, 1000);
                }
                else {
                    countDown.text('活动已结束');
                }

            }

            updateTime(countDown, countDownTime);
            setTimeout(updateCountDown, 1000);
        }
    }
});