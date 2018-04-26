/**
 * @file 获取 ractive 实例的容器元素
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    return function (instance) {
        return instance.fragment.items[0].node;
    };

});