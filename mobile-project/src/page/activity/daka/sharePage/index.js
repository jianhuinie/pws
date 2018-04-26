/**
 *hanzhaohang
 */

define(function(require) {
    'use strict';
    var $ = require('zepto');
    var lazyLoadImage = require('common/lazyLoadImage');
    var setShare = require('common/share/initialize');
    var service = require('common/service');
    var ui_new = require('common/ui');

    var app = require('common/app');
    var isApp = app.isApp();

    return function(pageData){
        lazyLoadImage.init();
        return;
        ui_new.alert({
            content: $('.dialog_1').html()
        });

    }

});