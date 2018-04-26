/**
 * @file 获取缩放比例
 * @author zhujialu
 */
define(function () {

    'use strict';

    /**
     * 获得 target 相对于 container 的缩放值
     *
     * @param {Object} target 需要缩放的对象
     * @property {number} target.width
     * @property {number} target.height
     *
     * @param {Object} container 容器对象
     * @property {number} container.width
     * @property {number} container.height
     *
     * @return {number}
     */
    return function (target, container) {

        // 记录初始值
        var width = target.width;
        var height = target.height;

        var scale = container.width / width;

        width = container.width;
        height *= scale;

        if (height > container.height) {
            scale = container.height / height;
            height = container.height;
            width *= scale;
        }

        return width / target.width;

    };

});