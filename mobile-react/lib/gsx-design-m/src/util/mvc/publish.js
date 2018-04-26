/**
 * Created by gsx on 15/9/1.
 */
define(function (require) {
    'use strict';

    var utilString = require('../string');

    function invalidSetError(property, value) {
        throw new Error('Invalid value or type for property ' + ('<' + (property + ('>' + (' ：' + value)))));
    }

    // 返回getKey属性方法
    function _getter(key) {
        return function () {
            return this.get(key);
        };
    }

    // 返回setKey属性方法
    function _setter(key, checker) {
        return checker ?
            function (val) {
                if (!checker(val)) invalidSetError(key, val);
                this.set(key, val);
            }
            : 
            function (val) {
                this.set(key, val);
            };
    }

    return function (mvcObject, properties) {
        for (var k in properties) {
            if (properties.hasOwnProperty(k)) {
                mvcObject.prototype['get' + utilString.initcap(k)] = _getter(k);
                if (properties[k]) {
                    mvcObject.prototype['set' + utilString.initcap(k)] = _setter(k, properties[k]);
                }
            }
        }
    };
});