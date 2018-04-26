define(function (require) {
    'use strict';
    var appController = require('common/app');
    var env = require('util/env');
    var $ = require('zepto');
    var wxMask = require('common/component/wxMask/weixinMask');

    var container = $('#main');
    var isWeixin;
    var isQQ;

    return function (options) {
        // hurry: 分享有奖
        if (options.share_info && options.share_info.share_reward) {
            $('.share-reward').removeClass('hide');
        }
        isWeixin = appController.isWeixin();
        isQQ = env.thirdapp.isQQ;
        var shares = $('.bottom .shares');
        // hurry: 统一使用wxMask处理
        if(isWeixin || isQQ) {
            shares.removeClass('hide');
            shares.on('click', function () {
                wxMask.openMask('share');
            });
        }
    };

});
