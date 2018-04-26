/**
 * @file 替代字符串中的\n为<br/>
 * @author niejianhui
 */
define(function (require, exports, module) {

    'use strict';

    return function (str) {
        return $.type(str) === 'string'
             ? str.replace(/\n/g, '<br/>')
             : '';
    };

});