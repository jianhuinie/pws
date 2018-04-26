/**
*huangshiming
*/

define(function(require){
    'use strict';
    var $ = require('zepto');
    var lazyLoadImage = require('common/lazyLoadImage');
    var appController = require('common/app');
    var setShare = require('common/share/initialize');
    var service = require('common/service');
    var container = $("#page_main");
    var isApp; 


    return function(page_data){
        isApp = appController.isApp();
        container.on('click', '.contact-us-content', function () {
            var tel = $(this).data('href');
            if (isApp) {
                appController.makePhoneCall(tel);
            } else {
                location.href = 'tel:' + tel;
            }
        });
        lazyLoadImage.init();
        var shareInfo = {
            title : '学费卫士 学费安全有保障 ',
            content : '对学费进行双重保障，官方托管资金，保证随时退款',
            img : 'https://imgs.genshuixue.com/0cms/d/file/content/2016/06/575e4cb34b078.png'
        };
        setShare(shareInfo);

    }
});