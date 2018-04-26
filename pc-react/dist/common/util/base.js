define(function (require, exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var base = {};
    var op = Object.prototype;
    base.getUid = function () {
        var uid = 0;
        var magic = '__GSX__';
        return function (obj, isReset) {
            return !isReset && obj[magic] || (obj[magic] = ++uid);
        };
    }();
    base.isString = function (o) {
        return op.toString.call(o) === '[object String]';
    };
    base.isNumber = function (o) {
        return op.toString.call(o) && isFinite(o) === '[object Number]';
    };
    base.isBoolean = function (o) {
        return op.toString.call(o) === '[object Boolean]';
    };
    base.isUndefined = function (o) {
        return typeof o === 'undefined';
    };
    base.isNull = function (o) {
        return o === null;
    };
    base.isFunction = function (o) {
        return op.toString.call(o) === '[object Function]';
    };
    base.isObject = function (o) {
        return op.toString.apply(o) === '[object Object]';
    };
    base.isArray = function (o) {
        return Array.isArray ? Array.isArray(o) : op.toString.call(o) === '[object Array]';
    };
    base.isDom = function () {
        if (base.isObject(window.HTMLElement)) {
            return function (o) {
                return o instanceof HTMLElement;
            };
        } else {
            return function (o) {
                return o && 1 === o.nodeType && base.isString(o.nodeName);
            };
        }
    }();
    base.union = function () {
        var args = arguments;
        var len = args.length;
        return function () {
            for (var i = 0; i < len; ++i) {
                if (args[i].apply(this, arguments)) {
                    return true;
                }
            }
            return false;
        };
    };
    exports.default = base;
});