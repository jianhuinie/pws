/**
 * @file 搜索首页
 * @author zhujialu
 */
define(function (require, exports) {

    'use strict';

    var Text = require('cobble/form/Text');

    exports.init = function () {
        new Text({
            element: $('#search input')
        });
    };

});