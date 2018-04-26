/**
 * Created by xuzheng on 15/12/24.
 */
define(function (require) {
    'use strict';

    var base = {};

    /**
     * 实现类的原型链继承
     *
     * @author xuzheng
     * @date 2015.4.21
     * */
    base.inherits = function (child, parent) {
        function Parent() {
        }

        Parent.prototype = parent.prototype;
        child.prototype = new Parent;
    };

    base.getUid = (function () {
        var uid = 0;
        var magic = '__GSX__';

        return function (obj, isReset) {
            return (!isReset && obj[magic]) || (obj[magic] = ++uid);
        };
    })();


    base.isString = function (o) {
        return '[object String]' == Object.prototype.toString.call(o);
    };
    base.isNumber = function (o) {
        return '[object Number]' == Object.prototype.toString.call(o) && isFinite(o);
    };
    base.isBoolean = function (o) {
        return '[object Boolean]' == Object.prototype.toString.call(o);
    };
    base.isUndefined = function (o) {
        return typeof o === 'undefined';
    };
    base.isNull = function (o) {
        return o === null;
    };
    base.isFunction = function (o) {
        return $.isFunction(o);
    };
    base.isObject = function (o) {
        return Object.prototype.toString.apply(o) === '[object Object]';
    };
    base.isArray = function (o) {
        return '[object Array]' == Object.prototype.toString.call(o);
    };
    base.isDom = (function () {
        if (base.isObject(window.HTMLElement)) {
            return function (o) {
                return o instanceof HTMLElement;
            }
        } else {
            return function (o) {
                return o &&
                    1 === o.nodeType &&
                    base.isString(o.nodeName);
            };
        }
    })();
    base.isZepto = function (o) {
        return window.$ && $.zepto && $.zepto.isZ(o);
    };
    base.union = function () {
        var args = arguments, len = args.length;
        return function () {
            for (var i = 0; i < len; ++i) {
                if (args[i].apply(this, arguments)) {
                    return true;
                }
            }
            return false;
        };
    };

    return base;

});