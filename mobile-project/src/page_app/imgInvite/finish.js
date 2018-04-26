/**
 * Created by yuanye on 17/1/11.
 */
define(function(require, exports) {
    "use strict";
    var $ = require('zepto');
    var lazyLoadImage = require('common/lazyLoadImage');

    return function () {
        lazyLoadImage.init();
    };
});