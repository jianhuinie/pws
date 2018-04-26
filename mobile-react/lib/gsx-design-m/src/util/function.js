/**
 * Created by gsx on 15/12/24.
 * 函数的扩展操作
 */
define(function (require) {
    'use strict';

    var utilArray = require('./array');

    var fun = {};

    
    fun.singleton = function (cons, options) {
        if (!cons.hasOwnProperty('__instance__')) {
            cons.__instance__ = new cons(options);
        }
        return cons.__instance__;
    };

    /**
     * 模拟es5的function.bind方法
     */
    fun.bind = function (handle, context) {
        var args = utilArray.argsToArray(arguments, 2);
        return function () {
            return handle.apply(context, args.concat(utilArray.argsToArray(arguments)));
        };
    };

    /**
     * 类继承实现，支持多态
     *
     * @public
     * @param  {Function} SUPERCLASS 父类
     * @param  {Function} SONCLASS   子类
     * @return {Function}            子类
     */
    fun.inherits = function (SONCLASS, SUPERCLASS) {
        var me = this;
        if (typeof SONCLASS !== 'function' || typeof SUPERCLASS !== 'function') {
            return;
        }
        var sonPrototype = SONCLASS.prototype;
        var superPrototype = SUPERCLASS.prototype;
        if (SUPERCLASS) {
            SONCLASS.prototype = new SUPERCLASS();
            SONCLASS.prototype.constructor = SONCLASS;
        }
        for (var name in sonPrototype) {
            if (sonPrototype.hasOwnProperty(name)) {
                if (superPrototype && typeof sonPrototype[name] === 'function' && typeof superPrototype[name] === 'function') {
                    SONCLASS.prototype[name] = (function (name, fn) {
                        return function () {
                            this._super = this._super || {};
                            this._super[name] = me.bind(superPrototype[name], this);
                            return fn.apply(this, arguments);
                        };
                    })(name, sonPrototype[name]);
                } else {
                    SONCLASS.prototype[name] = sonPrototype[name];
                }
            }
        }
        return SONCLASS;
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

    fun.nothing = function () {};

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