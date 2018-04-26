/**
 * Created by xuzheng on 15/6/26.
 */
define(function (require, exports) {

    'use strict';

    var observer = require('common/mvc/observer');
    var MVCObject = require('common/mvc/MVCObject');

    var util_base = require('util/base');
    var util_function = require('util/function');

    /**
     * 控制当数值停止变化时触发事件
     *
     * @extends {MVCObject}
     *
     * */
    function IdleControl(duration) {
        this.duration = duration;
        this.timer = null;
        this.set("idle", true);
    }

    util_base.inherits(IdleControl, MVCObject);

    var p = IdleControl.prototype;

    p.input_changed = function () {
        if (this.get("idle")) {
            this.set("idle", false);
        }
        if (this.timer) {
            window.clearTimeout(this.timer);
        }
        //todo 这里后面有时间最好优化一下，这样实现性能不是最优的
        this.timer = window.setTimeout(util_function.bind(this.a, this), this.duration);
    };
    p.a = function () {
        this.timer = null;
        this.set("idle", true);
    };
    p.idle_changed = function () {
        if (this.get('idle')) {
            observer.trigger(this, 'idle');
        }
    };

    return IdleControl;
});