/**
 * @file 微信操作
 * @author hanrui
 */

define(function(require, exports) {

    'use strict';
    //取消AMD加载
    define.cmd = null;
    define.amd = null;

    var $ = require('zepto');
    var url = require('util/url');
    var loadScript = require('util/loadScript');
    var config = require('./config');

    var loadWeixin = function(done) {
        var protocol = url().protocol;
        var loadUrl = '';

        if ('https:' === protocol) {
            loadUrl = 'https://' + config.URL;
        }
        else {
            loadUrl = 'http://' + config.URL;

        }
        if (loadUrl) {
            loadScript.async(loadUrl, function () {
                done && done(window.wx);
            });
        }
    };

    exports.init = (function() {
        var _isLoad = false;

        /**
         * [description]
         * @param  {Object} options 配置信息
         * @param  {function} options.done wx成功之后的回调函数
         * @param  {function} options.types 值只能取自config中的TYPES
         */
        return function (options) {
            loadWeixin(function (weixin) {
                if (_isLoad) {
                    if ($.isFunction(options.done)) {
                        options.done(weixin);
                    }
                } else {
                    var _jsApiList = [];
                    if (Array.isArray(options.types)) {
                        options.types.forEach(function(type) {
                            _jsApiList = _jsApiList.concat(config.EVEVTS[type]);
                        });
                    }
                    $.post('/user/weixinInfo', {
                        url: location.href
                    }).done(function(response) {
                        if (!response.code) {
                            var weixinInfo = response.data.weixin_info;
                            var param = {
                                debug: false,
                                appId: weixinInfo.appId,
                                timestamp: weixinInfo.timestamp,
                                nonceStr: weixinInfo.nonceStr,
                                signature: weixinInfo.signature,
                                jsApiList: _jsApiList
                            };

                            weixin.config(param);
                            weixin.ready(function() {
                                _isLoad = true;
                                if ($.isFunction(options.done)) {
                                    options.done(weixin);
                                }
                            });
                            // weixin.error(function (res) {
                            //     alert(JSON.stringify(res));
                            // });
                        }
                    });
                }
            });
        };
    })();

});