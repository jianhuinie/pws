/**
 * Created by gsx on 15/4/23.
 */
define(function (require) {
    'use strict';

    var MVCObject = require('./MVCObject');
    var event = require('./observer');
    var utilBase = require('../base');

    /**
     * 一个易变的 MVC 数组。
     *
     * <pre>
     * <strong>此类扩展了 MVCObject。</strong>
     * </pre>
     *
     * @constructor
     * @extends {MVCObject}
     * @param {Array} array 数组对象
     */
    function MVCArray(array) {
        this.elems = array || [];
        this.set('length', this.elems.length);
    }

    utilBase.inherits(MVCArray, MVCObject);
    var p = MVCArray.prototype;

    /**
     * 获取指定索引处的元素。
     *
     * @param {number} i 指定的索引数值
     * @return 返回的元素
     * @type {*}
     */
    p.getAt = function (i) {
        return this.elems[i];
    };

    /**
     * 循环访问每个元素，调用所提供的回调。为每个元素调用回调，
     *
     * <pre>
     * <strong>如：回调 (element, index)。</strong>
     * </pre>
     *
     */
    p.forEach = function (callback) {
        for (var i = 0, l = this.get('length'); i < l; ++i) {
            if (callback(this.elems[i], i) === false) {
                break;
            }
        }
    };

    /**
     * 设置指定索引处的元素。
     *
     * @param {number} i 指定的索引数值
     * @param {*} elem 指定的元素
     */
    p.setAt = function (i, elem) {
        var currentItem = this.elems[i];
        var n = this.elems.length;
        if (i < n) {
            this.elems[i] = elem;
            event.trigger(this, 'set_at', i, currentItem);
        } else {
            for (var j = n; j < i; ++j) {
                this.insertAt(j, void 0);
            }
            this.insertAt(i, elem);
        }
    };

    /**
     * 在指定索引处插入元素。
     *
     * @param {number} i 指定的索引数值
     * @param {*} elem 指定的元素
     */
    p.insertAt = function (i, elem) {
        this.elems.splice(i, 0, elem);
        this.set('length', this.elems.length);
        event.trigger(this, 'insert_at', elem, i);
    };

    /**
     * 从指定索引处删除元素。
     *
     * @param {number} i 指定的索引数值
     * @return  返回删除的元素
     * @type {*}
     */
    p.removeAt = function (i) {
        var len = this.get('length');
        if (len > i) {
            var elem = this.elems[i];
            this.elems.splice(i, 1);
            this.set('length', len - 1);
            event.trigger(this, 'remove_at', elem, i);
            return elem;
        }
    };

    /**
     * 将一个元素添加到数组末尾并传回数组的新长度。
     *
     * @param {*} elem 添加的新元素
     * @return {number} 返回数组的新长度
     * @type number
     */
    p.push = function (elem) {
        this.insertAt(this.elems.length, elem);
        return this.elems.length;
    };

    /**
     * 删除数组的最后一个元素并传回该元素。
     *
     * @return  返回删除的元素
     * @type {*}
     */
    p.pop = function () {
        return this.removeAt(this.elems.length - 1)
    };

    /**
     * 判断数组中是是否存在指定元素。
     *
     * @return {boolean} 返回boolean
     * @type {*}
     */
    p.exists = function (elem) {
        if (elem) {
            for (var i = 0; i < this.elems.length; i++) {
                if (elem == this.elems[i]) {
                    return true;
                }
            }
        }
        return false;
    };

    p.remove = function (elem) {
        for (var i = 0; i < this.elems.length; i++) {
            if (elem == this.elems[i]) {
                return this.removeAt(i);
            }
        }
    };

    p.clear = function () {
        var n = this.elems.length;
        while (n--) {
            this.removeAt(0);
        }
    };

    p.getArray = function () {
        return this.elems;
    };

    p.getLength = function () {
        return this.get('length');
    };

    p.filter = function (handle) {
        var arr = this.elems;
        var i = 0;
        var n = this.get('length');
        var removed = [];
        for (; i < n; i++) {
            var isRemoveItem = handle(arr[i]);
            if (isRemoveItem === false) {
                removed.push(arr[i]);
                this.removeAt(i);
                n--;
                i--;
            }
        }
        return removed;
    };

    return MVCArray;
});