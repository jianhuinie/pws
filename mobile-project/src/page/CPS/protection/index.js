/**
 * Created by chenmo on 16/2/19.
 * 打开400电话弹窗
 */
define(function (require) {

    var $ = require('zepto');
    var lazyLoadImage = require("common/lazyLoadImage");
    var openAppWindow = require("common/openAppWindow");
    var app = require('common/app');


    return function () {
        if (app.appVersion() > '3.2.4') {
            $('.report').show();
        }

        lazyLoadImage.init();

        openAppWindow.init();

    }

});