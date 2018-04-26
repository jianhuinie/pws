/**
 * @file 数据存储
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    // 这两个对象用来对于新老数据是否相同
    // 不同需要触发事件
    var newPool = { };
    var oldPool = { };
    var handlers = { };

    /**
     * 设置新值, 可批量设置
     *
     * @param {(Object|string)} key 键值或对象
     * @param {string=} value 如果需要置空，传入 null, 禁止传入 undefined
     */
    exports.set = function (key, value) {
        if ($.type(key) === 'string') {
            // 如果已经存在，需要先在 oldPool 存一份
            if (newPool[key] !== undefined) {
                oldPool[key] = newPool[key];
            }
            newPool[key] = value;
        }
        else if ($.isPlainObject(key)) {
            $.each(key, function (name, value) {
                exports.set(name, value);
            });
        }
    };

    /**
     * 获取数据
     *
     * @param {string} key 键值
     * @return {*}
     */
    exports.get = function (key) {
        return key ? newPool[key] : newPool;
    };

    /**
     * 数据是否发生改变
     *
     * @param {string} key
     * @return {boolean}
     */
    exports.isChange = function (key) {

        var newValue = newPool[key];
        var oldValue = oldPool[key];

        return oldValue !== undefined
            && newValue !== oldValue;
    };

    /**
     * 监听数据的变换
     *
     * @param {string} name 数据名称
     * @param {Function} handler
     */
    exports.onChange = function (name, handler) {

        var list = handlers[name];

        if (!$.isArray(list)) {
            list = [ ];
            handlers[name] = list;
        }

        list.push(handler);
    };

    /**
     * 触发数据变化事件
     */
    exports.fireChange = function () {

        $.each(newPool, function (key, value) {
            if (exports.isChange(key)) {
                var handlerList = handlers[key];
                if (handlerList) {
                    $.each(handlerList, function (index, handler) {
                        if ($.isFunction(handler)) {
                            handler();
                        }
                    });
                }
                oldPool[key] = undefined;
            }
        });

    };

});
