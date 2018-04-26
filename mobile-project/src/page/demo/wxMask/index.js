define(function (require) {

    'use strict';
    var $ = require('zepto');
    var wxMask = require('common/component/wxMask/weixinMask');


    return function () {
        $('.share-button').on('click', function () {
            wxMask.openMask('share');
        });

        $('.open-button').on('click', function () {
            wxMask.openMask('open');
        });
        
    };

});