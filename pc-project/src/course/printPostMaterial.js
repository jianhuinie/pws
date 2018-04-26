/**
 * @file 邮寄资料 - 打印版
 * @author wanglu
 */
define(function (require, exports) {

    'use strict';

    exports.init = function () {

        $(document).ready(function(){
            window.print();
        });

    };

});