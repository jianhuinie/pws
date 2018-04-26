/**
 * Created by xuzheng on 15/12/24.
 */
define(function (require) {
    'use strict';

    var util_array = require('util/array');

    var fun = {};

    fun.singleton = function (cons,options) {
        if (!cons.hasOwnProperty("__instance__")) {
            cons["__instance__"] = new cons(options);
        }
        return cons["__instance__"];
    };

    fun.bind = function (handle, context) {
        if (arguments.length > 2) {
            var args = util_array.argsToArray(arguments, 2);
            return function () {
                return handle.apply(context || this, arguments.length > 0 ? args.concat(array.argsToArray(arguments)) :
                    args);
            }
        } else {
            return function () {
                return handle.apply(context || this, arguments)
            }
        }
    };

    fun.lazyConst = function (f) {
        var c;
        return function () {
            if (f) {
                c = f();
                f = null;
            }
            return c;
        };
    };

    fun.nothing = function () {
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

    return fun;
});