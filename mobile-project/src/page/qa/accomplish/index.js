/*
*   wangtianhua
*   问答完成
*/
define(function (require) {
    'use strict';

    var $ = require("zepto");
    var lazyLoadImage = require('common/lazyLoadImage');

    return function (page_data) {
        lazyLoadImage.init();
    }
});