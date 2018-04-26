/**
 * @file etpl 自定义共用过滤器
 * @author wanglu
 */
define(function (require, exports) {

    'use strict';

    var store = require('common/store');
    var etpl = require('cobble/util/etpl');
    var string = require('cobble/util/string');
    
    exports.init = function () {

        
        etpl.
            addFilter('truncate', function (value,len) { // 字符串截取 value:字符串 len:截取长度
                var str = value + '';
                if (str.length > len) {
                    return str.substring(0, len-1) + '...'
                } else {
                    var str = value + '';
                    return str.substring(0, len);
                }
            });
        etpl.
            addFilter('number_format', function (value, length) { // 数字格式化成指定长度
                value = (+value).toFixed(length);
                return value;
            });
        etpl.
            addFilter('floor', function (value) {
                    return Math.floor(value);
            });
        etpl.
            addFilter('toJsonString', function (value) { // javascript对象转成json对象
                return JSON.stringify(value);
            });
        etpl.
            addFilter('getUserType', function (value) { // 得到用户类型 学生：2 老师：0
                var userType = store.get('user').type;
                return  (+userType);
            });
        etpl.
            addFilter('dataForamt', function (value) { // 日期格式化成 YYYY-MM-DD HH:MM
                if (value.indexOf(':') !== value.lastIndexOf(':')) {
                     value = value.substring(0, value.lastIndexOf(':'));
                }
                return value;
            });
        
        etpl.
            addFilter('MathCeil', function (value, pageSize) { // 和第二个参数相除后取整
                return Math.ceil((+value) / (+pageSize));
            });
        etpl.
            addFilter('remainder', function (value) {  // 和2取余
                return ((+value) % 2);
        });
        etpl.
            addFilter('sub', function (value, show_count) { // 减法 如果有第二个参数--跟第二个参数相减 否则--减1
                if (show_count) {
                    return ((+value) - (+show_count));
                }
                else {
                    return ((+value) - 1)
                }
            });
        etpl.
            addFilter('sum', function (value, showCount) { // 加法 如果有第二个参数--跟第二个参数相加 否则--加1
                if (showCount) {
                    return ((+value) + (+showCount));
                }
                return ((+value) + 1);
            });
         etpl.
            addFilter('division', function (value) { // 除2
                return ((+value) / 2);
            });
            
    }
    
}); 