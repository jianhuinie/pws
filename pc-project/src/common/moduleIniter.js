/**
 * @file 抓取页面上的模块，设置模块对应的js的查找范围域，进一步降低多模块的冲突可能性
 *       目前只扫描path，后期根据业务复杂度再进一步设计需要交互数据等的方式
 * @author zhangshaolong
 */

define(function (require, exports) {

    'use strict';

    var Events = require('./eventEmitter');

    exports.init = function () {
        // 扫描有"data-module-path"的标签作为模块标示
        var modules = $('[data-module-path]');
        var paths = [];
        modules.each(function () {
            paths.push($(this).data('modulePath'));
        });
        require(paths, function () {
            $.each(arguments, function (idx, factory) {
                if (factory && $.isFunction(factory.init)) {
                    // 为js的init函数设置元素扫描的基准元素
                    var moduleNode = $(modules[idx]);
                    factory.init.call(moduleNode, Events, moduleNode.data());
                }
            });
        });
    }
})