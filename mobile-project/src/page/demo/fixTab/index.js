define(function (require) {

    'use strict';
    var $ = require('zepto');
    var fixTab = require('common/fixTab/fixTab');


    return function () {
        var tab = $('.tab')[0];
        fixTab(tab);
    }

});