define(function (require) {
    'use strict';
    var appController = require('common/app');
    var browserType = require('util/env');
    var $ = require('zepto');
    var container = $('#main');
    var isWeixin;
    var isQQ;

    return function (options) {
        var isWeixin = appController.isWeixin();
        var isQQ = browserType.thirdapp.isQQ;
        var shares = $('.shares');
        var mask = $('.share-mask');
        if(isWeixin || isQQ) {
            shares.show();
            shares.on('click', function () {
                mask.show();
            });
            mask.on('click', function () {
                mask.hide();
            })
        }
    }

});
