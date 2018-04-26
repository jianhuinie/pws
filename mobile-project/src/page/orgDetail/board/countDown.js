/**
 * author: huangshiming
 * 机构主页限时限额折扣
 */
define(function (require, exports) {
    'use strict';

    var $ = require('zepto');

    var CountDown = function (dom) {
        // 为了防止调用这个构造函数产生实例的时候没有new, 首先先判断this是不是该构造函数的实例
        if (this instanceof CountDown) {
            this.dom = dom;
        } else {
            return new CountDown(dom);
        }

    };
    CountDown.prototype.formatTime = function () {
        var box = this.dom;
        box.each(function (index, item) {
            var that = $(this);
            var endTime = that.data('endtime');
            var endTimer = new Date(endTime).getTime();
            var nowTime = new Date();
            var nowTimer = nowTime.getTime();
            var sub = parseInt((endTimer - nowTimer)/1000);
            if (sub < 0) {
                return;
            }
            var timeShow = setInterval(function() {
                sub--;
                if (sub < 1) {
                    clearInterval(show);
                    that.hide();
                } else {
                    var dayStr = '倒计时: ';
                    var day = parseInt(sub/(24 * 60 * 60)); 
                    var hour = '';
                    var min = '';
                    var second = '';
                    if (day > 0) {
                        // dayStr += day + '天';
                        // hour = parseInt((sub - day * 24 * 60 * 60)/(60 * 60));
                        // dayStr += hour + '小时';
                        // if (hour > 0) {
                        //     min = parseInt((sub - day * 24 * 60 * 60 - hour * 60 * 60)/60);
                        //     dayStr += min + '分';
                        //     if (min > 0) {
                        //         second = parseInt(sub - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60);
                        //         dayStr += second + '秒';
                        //     }
                        // }
                        dayStr = '限时秒杀课程';
                    } else {
                        hour = parseInt(sub / (60 * 60));
                        dayStr += hour + '小时';
                        if (hour > 0) {
                            min = parseInt((sub - hour * 60 * 60)/60);
                            dayStr += min + '分';
                            if (min > 0) {
                                second = parseInt(sub - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60);
                                dayStr += second + '秒';
                            }
                        }
                    }
                    
                    that[0].innerHTML = dayStr;
                }
            }, 1000); 
        });
    };

    /**
     * 
     * @param {Jquery} dom 承载这个限时折扣倒计时的dom
     * 参数 $('.className')
     */
    exports.countDown = function (dom) {
        var countDown = new CountDown(dom);
        countDown.formatTime();
    };
});