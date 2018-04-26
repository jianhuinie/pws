/**
 * Created by gsx on 15/12/24.
 */
define(function () {
    'use strict';

    var array = {};

    /**
     * 将函数参数对象或节点列表转换成数组。
     * @param {Object} obj 函数参数对象或节点列表.
     * @param {Number} [start] 数组开始元素是从零开始计算的下标。
     * @param {Number} [end] 数组结束元素是从零开始计算的下标.
     * @author gsx
     * @date 2015.4.21
     */
    array.argsToArray = function (obj, start, end) {
        return [].slice.call(obj, start || 0, end || obj.length);
    };

    return array;
});