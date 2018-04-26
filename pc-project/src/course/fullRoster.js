/**
 * @file 班级花名册 - 打印版
 * @author wangyujie
 */
define(function (require, exports) {

    'use strict';

    exports.init = function () {

        $(document).ready(function(){
            window.print();
        });

    };

});