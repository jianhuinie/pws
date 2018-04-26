/**
 * 秒杀计时组件
 */

define(function (require, exports) {

    var noop  = function () {};
    /**
     *
     * @class 计时器类
     * @param {object} options 基本参数
     * @property {number} options.current 当前时间
     * @property {number} options.start 当前开始时间
     * @property {number=} options.step 每隔多少更新时间
     * @property {number=} options.limit 持续时长
     * @property {Function=} options.onnext 变化后回调
     * @property {Function=} options.onend 结束后回调
     */
    function ClockTimer(options) {
        this.options = $.extend(
            {
                limit: 30 * 60 * 1000,
                step: 1000,
                noleave: false,
                onnext: noop,
                onend: noop
            },
            options);
        this.start();
    };

    /**
     * 计算时间
     * @param {number} leaveTime 还剩多少毫秒结束
     * @param {number} 活动的时间是多少
     */
    function calTimeDis(leaveTime, limit) {
        var result = leaveTime;
        var hourUnit = 1000 * 60 * 60;
        var minUnit = 1000 * 60;
        var hour = Math.floor(result / hourUnit);
        var min = Math.floor((result - (hour * hourUnit)) / minUnit);
        var sec = Math.floor((result - ((hour * 60 + min) * minUnit)) / 1000);
        return {
            hour: hour,
            min: min,
            sec: sec
        };
    };

    ClockTimer.prototype.start = function () {
        var me = this;
        var end = me.options.start;
        if (me.options.start < me.options.current) {
            end =  me.options.start + me.options.limit;
        }
        var leaveTime = end - me.options.current;
        var newSec = false; //计时结束是开启新一轮秒杀还是结束当前秒杀

        if (leaveTime < 0 || me.options.noleave) {
            leaveTime = leaveTime + me.options.limit;
            newSec = true;
        }

        var clickFunc = function () {
            leaveTime = leaveTime - me.options.step;
            setTimeout(function () {
                me.options.onnext.call(me, calTimeDis(leaveTime > 0 ? leaveTime : 0, me.options.limit));
            }, 0);
            if (leaveTime <= 0) {
                me.options.onend.call(me, newSec);
            } else {
                setTimeout(clickFunc, me.options.step);
            }
        };
        clickFunc();
    };

    /**
     * 重置的数据
     * @param  {object} data
     * @property {number} options.current 当前时间
     * @property {number} options.start 当前开始时间
     *
     */
    ClockTimer.prototype.reset = function (data) {
        var me = this;
        setTimeout(function () {
            me.options.current = data.current;
            me.options.start = data.start;
            me.start();
        }, 0);
    };

    return ClockTimer;
});