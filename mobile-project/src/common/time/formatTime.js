/**
 * author: huangshiming
 * data: 2017=4-25
 * 功能: 时间格式处理函数，传入格式 0000-00-00 00:00:00, 返回正确的格式
 */
define(function (require) {
    
    'use strict';

    var $ = require('zepto');
    var timeFormat = function (time) {
        if (!time) {
            return '';
        }
        var past = time.replace(/-/g, '/');
        past = new Date(past);
        var now = new Date();
        var diff = parseInt(now.getTime() - past.getTime());
        diff = parseInt(diff/1000);
        var text = '';
        var a = '';
        if(diff < 60) {
            text = '跟谁学刚刚发布';
        } else if(diff < 3600 && diff >59) {
            a = parseInt(diff / 60);
            text = '跟谁学' + a + '分钟前发布';
        } else if (diff < 86400 && diff > 3599) {
            a = parseInt(diff / 3600);
            text = '跟谁学' + a + '小时前发布';
        } else if (diff < 432000 && diff > 86399) {
            a = parseInt(diff / 86400);
            text = '跟谁学' + a + '天前发布';
        } else {
            text = '跟谁学' + (past.getMonth() + 1) + '月' + past.getDate() + '日发布';
        }
        return text;
    };

    return function (time) {
        return timeFormat(time);
    };
});

    