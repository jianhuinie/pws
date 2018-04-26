/**
 * @file 会员2.0静态页
 * @author niejianhui
 */
define(function (require, exports) {

    'use strict';
 
    exports.init = function (data) {
        new Ractive({
            el: '#main',
            template: require('html!./vipStatic.html'),
            data:{
                 
            }
        });
    };
});
