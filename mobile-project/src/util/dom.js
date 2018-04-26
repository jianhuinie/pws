/**
 * Created by xuzheng on 15/12/24.
 */
define(function (require) {
    'use strict';

    var util_base = require('util/base');
    var util_function = require('util/function');

    var env = require('util/env');

    var dom = {};

    dom.insertCssText = function (strCss, ownerDocument) {
        var doc = ownerDocument || document;
        var styleElement = doc.getElementById('GSX_CSS_MODULE');
        if (!styleElement) {
            styleElement = doc.createElement('style');
            styleElement.id = 'GSX_CSS_MODULE';
            styleElement.type = 'text/css';
            doc.getElementsByTagName('head')[0].appendChild(styleElement);
        }
        var textNode = doc.createTextNode(strCss);
        var token = util_base.getUid(textNode);
        styleElement.appendChild(textNode);
        return token;
    };

    dom.removeCssText = function (token, ownerDocument) {
        var doc = ownerDocument || document;
        var styleElement = doc.getElementById('GSX_CSS_MODULE');
        if (!styleElement) {
            styleElement = doc.createElement('style');
            styleElement.type = 'text/css';
            doc.getElementsByTagName('head')[0].appendChild(styleElement);
        }
    };

    dom.enableGPU = (function () {

        /*
         var macHack = platform == 2 && appleOS >= 10.6 && type == 4 && 533.19 <= version;
         var androidHack = platform == 4 && type == 4 && 534 <= version;
         var chromeHack = type == 3 && (21 <= version && (platform == 1 || platform == 2 || platform == 3) || 18 <= version && platform == 4);
         */
        //htc butterfly s原生浏览器下，如果开启硬件加速，会没有高清效果
        var isSupport = util_function.lazyConst(function () {
            var isIOS = env.os.isIOS;
            var isAndroid = env.os.isAndroid || env.os.isAndroidPad;
            var isAppleWebkit = env.browser.isAppleWebkit;
            var isChrome = env.browser.isChrome;


            var ua = navigator.userAgent;
            var isX920E = ua.toLowerCase().indexOf("x920e") !== -1;
            var HONOR7 = ua.toLowerCase().indexOf("plk-tl01h") !== -1;
            if (
                !isX920E && !HONOR7 && (
                    isIOS ||
                    (isAndroid && isAppleWebkit && env.browser.webkitVersion.gte(534) ) || //androidHack
                    isChrome //chromeHack
                )
            ) {
                return true;
            }
        });

        return function (element) {
            if (isSupport()) {
                element.style.WebkitTransform = "translateZ(0)";
            }
        }
    })();

    return dom;
});