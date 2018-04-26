define(function (require){
    'use strict';
    var $ = require('zepto');
    var openAppWindow = require('common/openAppWindow');



    return function (page_data) {
        openAppWindow.init();
    };
});