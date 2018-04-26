/**
 * @author liucong
 * @fileOverview 排行榜 - 第六季 机构榜和独立榜
 */

define(function(require, exports) {
    'use strict';
    var container = $('#main');
    var store = require('common/store');
    var timeSpan = require('common/function/timeSpan');
    var Popup = require('cobble/helper/Popup');

    function updateTime(element, time) {

        var timeObj = timeSpan(time);

        element.text(''
            + timeObj.days + '天'
            + timeObj.hours + '小时'
            + timeObj.minutes + '分'
            + timeObj.seconds + '秒');
    }



    exports.init = function () {

        var curTime = store.get('currentTime');
        var expTime = store.get('expiredTime');

        var carnivalEndTime = store.get('carnivalEndTime');

        var isOrg = store.get('isOrg');

        var countDown = container.find('.count-down');
        var time = container.find('.count-down .time');
        var label = container.find('.count-down .text');

        var orgCarnivalOverTime = false;

        var getOrgCountDownTime = function () {

            if (curTime >= carnivalEndTime) {
                if (!orgCarnivalOverTime) {
                    orgCarnivalOverTime = true;
                    label.text('距离活动结束还有：');
                }
                return (expTime - curTime) / 1000;
            }
            else {
                return (carnivalEndTime - curTime) / 1000;
            }
        }

        var countDownTime;

        if (isOrg) {
            countDownTime = getOrgCountDownTime(curTime, carnivalEndTime, expTime);
        }
        else {
            countDownTime = (expTime - curTime) / 1000;
        }

        if ($.isNumeric(countDownTime)) {

            var updateCountDown = function () {

                if (isOrg) {
                    curTime += 1000;
                    countDownTime = getOrgCountDownTime(curTime, carnivalEndTime, expTime);
                }
                else {
                    countDownTime-= 1;
                }

                if (countDownTime > 0) {


                    updateTime(time, countDownTime);
                    setTimeout(updateCountDown, 1000);
                }
                else {
                    countDown.html('活动已结束');
                }

            }

            updateTime(time, countDownTime);
            setTimeout(updateCountDown, 1000);
        }

        //分享
        if (store.get('needsShare')) {
            new Popup({
                element: $('.share div'),
                layer: container.find('.baidu-share'),
                show: {
                    trigger: 'over'
                },
                hide: {
                    trigger: 'out',
                    delay: 100
                }
            });
        }

    }
});