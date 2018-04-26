/**
 * @file 合并列表
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    return function (list, sep, field) {
        if (field) {
            list = $.map(list, function (item) {
                return item[field];
            });
        }
        return list.join(sep);
    };

});