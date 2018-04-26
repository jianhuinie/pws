/**
 * @file 处理浏览器支持情况
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var support = require('cc/util/support');
    var browser = require('cc/util/browser');
    var body = require('cc/util/instance').body;

    var isIframe = require('./function/isIframe');

    exports.init = function () {

        var classList = [ ];

        if (support.animation()) {
            exports.animation = true;
            classList.push('animation');
        }
        else {
            classList.push('no-animation');
        }

        if (support.boxShadow()) {
            exports.boxShadow = true;
            classList.push('box-shadow');
        }
        else {
            classList.push('no-box-shadow');
        }

        if (support.flash()) {
            exports.flash = true;
        }

        if (support.localStorage()) {
            exports.localStorage = true;
        }

        if (browser.ie) {
            classList.push(
                'ie' + parseInt(browser.version, 10)
            );
        }
        else {
            classList.push(
                browser.name
            );
        }

        if (isIframe()) {
            classList.push('iframe');
        }

        body.addClass(
            classList.join(' ')
        );

    };

});