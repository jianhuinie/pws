/**
 * Created by xuzheng on 15/5/16.
 */
define(function (require, exports) {

    'use strict';

    var util = require('common/util');
    var observer = require('common/mvc/observer');
    var MVCObject = require('common/mvc/MVCObject');

    function CountDownTime(options) {
        options = $.extend({
            'format': defaultFormat
        }, options);

        this.setOptions(options);
    }

    util.inherits(CountDownTime, MVCObject);

    CountDownTime.DAY = 'day';
    CountDownTime.HOUR = 'hour';
    CountDownTime.MINUTES = 'minutes';
    CountDownTime.SECONDS = 'seconds';
    CountDownTime.MILLISECOND = 'ms';
    var defaultFormat = [
        CountDownTime.DAY,
        CountDownTime.HOUR,
        CountDownTime.MINUTES,
        CountDownTime.SECONDS
    ];

    CountDownTime.prototype.format_changed = function () {
        var format = this.get('format');
        this._format = format || defaultFormat;
        this._parser = createParser(this._format);
    };
    CountDownTime.prototype.changed = function (key) {
        var current = this.get('current');
        var target = this.get('target');
        var _target = null;
        if (target) {
            if (current) {
                _target = target - current + new Date().getTime();
            } else {
                _target = target;
            }
        } else {
            _target = null;
        }
        if (util.lang.isNumber(_target)) {
            _target = new Date(_target);
        }
        this._target = _target;
    };

    CountDownTime.prototype.start = function () {
        if (this._target && this._parser) {
            this._status = 1;
            start(this);
        }
    };
    CountDownTime.prototype.stop = function () {
        this._status = 0;
    };

    function start(instance) {
        function next() {
            if (!instance._status || !instance._target) {
                return;
            }
            var now = new Date();
            var isEnd = false;
            if (now > instance._target) {
                now = instance._target;
                isEnd = true;
            }
            var result = instance._parser(
                now,
                instance._target
            );
            triggerEvent(instance, result);
            if (!isEnd) {
                util.timer.request(next, 13);
            } else {
                observer.trigger(instance, 'time_up');
            }
        }

        next();
    }

    function triggerEvent(instance, newData) {
        var oldResult = instance._result;
        if (instance._status) {
            var n = newData.length;

            var isEquals = true;
            for (var i = 0; i < n; i++) {
                if (!oldResult || !oldResult[i] ||
                    newData[i].type != oldResult[i].type ||
                    newData[i].num != oldResult[i].num) {
                    isEquals = false;
                    observer.trigger(instance, 'update_' + newData[i].type, newData[i]);
                }
            }

            instance._result = newData;
            if (!isEquals) {
                observer.trigger(instance, 'update', newData);
            }
        }
    }

    function createParser(dataFormat) {

        function runParser(start, end, result, index) {
            var type = dataFormat[index];
            var fn = DataParser[type];
            if (fn) {
                var data = fn(start, end, function (s, e) {
                    runParser(s, e, result, index + 1);
                });
                data['type'] = type;
                result.unshift(data);
            }
        }

        return function (startDate, endDate) {
            var result = [];
            runParser(startDate, endDate, result, 0);
            return result;
        };
    }

    function num2str(number) {
        var str = number + "";
        var rst = [];
        for (var i = 0, n = str.length; i < n; i++) {
            rst.push(str.charAt(i));
        }
        if (number < 10) {
            rst.unshift("0");
        }
        return rst;
    }

    var DataParser = {};
    DataParser[CountDownTime.DAY] = dTimeParser(24 * 60 * 60 * 1000);
    DataParser[CountDownTime.HOUR] = dTimeParser(60 * 60 * 1000);
    DataParser[CountDownTime.MINUTES] = dTimeParser(60 * 1000);
    DataParser[CountDownTime.SECONDS] = dTimeParser(1000);
    DataParser[CountDownTime.MILLISECOND] = dTimeParser(1);
    function dTimeParser(unitDTime) {
        return function (startDate, endDate, next) {
            var d = Math.floor((endDate - startDate) / unitDTime);
            if (d > 0) {
                startDate = new Date(startDate.getTime() + (d * unitDTime));
            }
            next(startDate, endDate);
            return {
                'num': d,
                'str': num2str(d)
            }
        };
    }

    return CountDownTime;
});