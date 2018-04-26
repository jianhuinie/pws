/**
 * @file 老师详情 文章列表
 * @author zengcheng
 */
define(function (require, exports) {

    'use strict';

    var common = require('./newDetail/common');
    var orderForm = require('./newDetail/orderForm');
    var article = require('./newDetail/article');

    exports.init = function () {
        //初始化文章列表外基础信息
        common.init();
        // 初始化orderForm
        orderForm.init();
        // 初始化article
        article.init();
    };
});