define(function (require, exports) {
    'use strict';
    var _array = require('./array');
    Object.defineProperty(exports, '__esModule', { value: true });
    var _array2 = _interopRequireDefault(_array);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    var fun = {};
    fun.singleton = function (cons, options) {
        if (!cons.hasOwnProperty('__instance__')) {
            cons['__instance__'] = new cons(options);
        }
        return cons['__instance__'];
    };
    fun.bind = function (fn, context) {
        var args = _array2.default.argsToArray(arguments, 2);
        return function () {
            return fn.apply(context, args.concat(_array2.default.argsToArray(arguments)));
        };
    };
    fun.lazyConst = function (f) {
        var c = void 0;
        return function () {
            if (f) {
                c = f();
                f = null;
            }
            return c;
        };
    };
    fun.nop = function () {
    };
    fun.counter = function (n, fn) {
        if (!n) {
            fn();
        } else {
            return function () {
                --n || fn();
            };
        }
    };
    exports.default = fun;
});