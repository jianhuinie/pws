/**
 * @file 是否嵌套在 iframe 中
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var urlUtil = require('cc/util/url');

    return function () {
        var query = urlUtil.parseQuery(location.search);
        return query.iframe == 1;
    };

});