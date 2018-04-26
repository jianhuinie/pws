/***
 * author: huangshiming
 * data: 2017-04-28
 * 功能: 生源大厅-将字符串与日期进行匹配，返回特定的日期
 */
define(function (require, exports) {
    'use strict';
    var $ = require('zepto');
    var container = $('#page_main');
    exports.initTeacherTime = function (arrs, that) {
        var tempArray = [];
        arrs = arrs || [];
        that = that || container.find('.student-require-time');
        var timeArray = [
                        '周一上午',
                        '周一下午',
                        '周一晚上',
                        '周二上午',
                        '周二下午',
                        '周二晚上',
                        '周三上午',
                        '周三下午',
                        '周三晚上',
                        '周四上午',
                        '周四下午',
                        '周四晚上',
                        '周五上午',
                        '周五下午',
                        '周五晚上',
                        '周六上午',
                        '周六下午',
                        '周六晚上',
                        '周日上午',
                        '周日下午',
                        '周日晚上'];
        var alength = arrs.length;
        for(var i = 0; i < alength; i++) {
            if (+arrs[i]) {
                tempArray.push(timeArray[i]);
            }
        }
        that.html(tempArray.join(' | ')); 
    };  
});