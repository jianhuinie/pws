/**
 * @file 商学院 － 公共页面
 * @author wangyujie
 */

define(function (require, exports) {

    'use strict';

    var ConsultDialog = require('./ConsultDialog');

    exports.init = function () {

        // 免费咨询
        var floatedConsult = $('.floated-consult');

        floatedConsult
        .click(function () {
            new ConsultDialog();
        });

    };

});