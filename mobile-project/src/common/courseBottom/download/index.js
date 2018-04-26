/**
 * @file 下载，由于只有视频课使用，暂时不考虑app里如何下载
 * @author hurry
 * @date 2017/02/09
 */
define(function (require) {
    'use strict';
    var app = require('common/app');
    var env = require('util/env');
    var $ = require('zepto');
    var wxMask = require('common/component/wxMask/weixinMask');

    return function (options) {
        var isWeixin = app.isWeixin();
        var isQQ = env.thirdapp.isQQ;
        var download = $('.bottom .download');
        download.click(function () {
            //wakeUpApp();
            // 增加toast提示
            var hasBuy = options.has_buy_course;
            var price = +options.course_info.price;
            if (price === 0 && !hasBuy) {
                ui.remind("加入课程后才能下载哦");
                return false;
            } else if (price > 0 && !hasBuy) {
                ui.remind("购买课程后才能下载哦");
                return false;
            }
            else {
                if (isWeixin || isQQ) {
                    wxMask.openMask('open');
                }
                else if (!app.isApp()) {
                    // 非qq，浏览器环境，唤起app
                    app.wakeUpApp();
                    return;
                }
            }
        });
    };

});
