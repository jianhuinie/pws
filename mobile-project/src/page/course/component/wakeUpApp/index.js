/**
 * @file 详情页唤起App
 * @author shubaiqiao
 * @date 2016/10/29
 */


define(function (require) {

    var $ = require('zepto');
    var schemaUrl = '';
    var openApp = require('common/app_wakeup');
    var appController = require('common/app');
    var env = require('util/env');
    var urlUtil = require('util/url');

    var iframeFlag = urlUtil().params.sourceType;

    return {
        /**
         * 唤起App
         * @param  {string} url [唤起的url]
         */
        wakeUp: function (url) {
            var isWeixin = env.thirdapp && env.thirdapp.isWeixin;
            var isQQ = env.thirdapp && env.thirdapp.isQQ;
            if (!appController.isApp() && !isWeixin && !isQQ && !iframeFlag) {
                schemaUrl = 'bjhlstudent://o.c?a=url&url=' + encodeURIComponent(url);
                openApp({
                    type: 'internal',
                    url: schemaUrl
                }, function (isSuccess) {
                    if (env.browser.name != 'Chrome') {
                        if (!isSuccess) {
                            location.href = 'http://m.genshuixue.com/app/dw?t=s&ct=';
                        }
                    }
                });
            }
        }
    };

});