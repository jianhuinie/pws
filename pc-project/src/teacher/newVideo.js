/**
 * @file 老师详情 视频课
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var service = require('common/service');
    var store = require('common/store');
    var common = require('./newDetail/common');
    var comment = require('./newDetail/newComment');
    var container = $('#teacher-course');
    var videoCourseBox = container.find('.video-box');

    /*
     * 倒计时
     */
    function dateFormat(time) {
        var day = 0;
        var hour = 0;
        var minute = 0;
        var second = 0;

        // 天 24*3600
        if (time > 86400) {
            day = Math.floor(time / 86400);
        }
        time %= 86400;

        if (time > 3600) {
            hour = Math.floor(time / 3600);
        }
        time %= 3600;

        if (time > 60) {
            minute = Math.floor(time / 60);
        }
        second = time % 60;

        var time_txt = (day > 9 ? day : '0' + day ) + '天' +
            (hour > 9 ? hour : '0' + hour) + '时'+
            (minute > 9 ? minute : '0' + minute) +'分' +
            (second > 9 ? second : '0' + second) + '秒';

        return time_txt;
    }

    /*
     * 限时活动倒计时
     */
    function zheKouTime(){
        var priceTip = container.find('.price-tip');
        if(priceTip.length == 0){
            return;
        }
        var element = $(priceTip[0]);
        var cur = null,
            begin = null,
            end = null,
            left = null,
            time = element.find('.time');

        if (element.hasClass('price-tip-begin')) {
            cur = element.data('cur');
            begin = element.data('start');
            left = begin - cur;
            var interval = setInterval(function(){
                time.html( dateFormat(--left) );
                if (left == 0) {
                    clearInterval(interval);
                }
            },1000);
        }

        if (element.hasClass('price-tip-end')) {
            cur = element.data('cur');
            end = element.data('end');
            left = end - cur;
            var interval = setInterval(function(){
                time.html( dateFormat(--left) );
                if (left == 0) {
                    clearInterval(interval);
                }
            },1000);
        }
    }

    exports.init = function () {
        zheKouTime();
        common.init();
        // 评价
        comment.init();

        videoCourseBox
        // 视频课全部跳转到视频详情页
        .on('click', '.btn-default', function (e) {
            var element = $(this);
            var link = element.parent().data('link');
            location.href = link;
        });
    };
});