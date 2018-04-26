/**
 * @file 微信操作
 * @author yangji
 */

define(function (require, exports) {

    'use strict';
    //取消AMD加载
    define.cmd = null;
    define.amd = null;

    var $ = require("zepto");
    var url = require('util/url');
    var loadScript = require("util/loadScript");

    var loadWeixin = function(done){
        var protocol = url().protocol;
        var loadUrl = "";

        if ('http:' == protocol) {
            loadUrl = "http://res.wx.qq.com/open/js/jweixin-1.0.0.js";
        }
        if ('https:' == protocol) {
            loadUrl = "https://res.wx.qq.com/open/js/jweixin-1.0.0.js";

        }
        if(loadUrl){
            loadScript.async(loadUrl,function(){
                done && done(window.wx);
            });
        }
    };

    exports.initWeixin = (function(){
        var _isLoad = false;

        var _jsApiList = [
        'onMenuShareTimeline', 'onMenuShareAppMessage',
            'onMenuShareQQ', 'onMenuShareWeibo'
        ];

        return function(done){
            loadWeixin(function(weixin){
                if(_isLoad){
                    done(weixin);
                } else {
                    $.post('/user/weixinInfo',{
                        url: location.href
                    }).done(function (response) {
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
                            weixin.ready(function () {
                                _isLoad = true;

                                done && done(weixin);
                            });
                        }
                    });
                }
            });
        }
    })();

    /*
    * 根据TYPE返回具体的分享内容
    * */
    var getShareOptions = function(options,type){
        if(type && options[type]) {
            $.extend(options,options[type]);
        }
        
        return {
            title: options.title,
            desc: options.content,
            link: options.url,
            imgUrl: options.img
        }
    }

    /**
     * 分享到朋友圈
     *
     * @param {Object} options
     * @property {string} options.title  标题
     * @property {string} options.desc  描述
     * @property {string} options.link  链接
     * @property {string} options.imgUrl 图片地址
     * @property {Function} options.trigger
     * @property {Function} options.success
     * @property {Function} options.cancel
     * @property {Function} options.fail
     */
    exports.setShareInfo = function (options) {
        exports.setShareTimeline(options);
        exports.setShareAppMessage(options);
        exports.setShareQQ(options);
        exports.setShareWeibo(options);
    };

    /**
     * 分享到朋友圈
     *
     * @param {Object} options
     * @property {string} options.title  标题
     * @property {string} options.link  链接
     * @property {string} options.imgUrl 图片地址
     * @property {Function} options.trigger
     * @property {Function} options.success
     * @property {Function} options.cancel
     * @property {Function} options.fail
     */
    exports.setShareTimeline = function (options) {
        loadWeixin(function(weixin){
            options = getShareOptions(options,"share_pyq");
            weixin.onMenuShareTimeline(options);
        });
    };

    /**
     * 分享给好友
     *
     * @param {Object} options
     * @property {string} options.title  标题
     * @property {string} options.desc  描述
     * @property {string} options.link  链接
     * @property {string} options.imgUrl 图片地址
     * @property {Function} options.trigger
     * @property {Function} options.success
     * @property {Function} options.cancel
     * @property {Function} options.fail
     */
    exports.setShareAppMessage = function (options) {
        loadWeixin(function(weixin){
            options = getShareOptions(options,"share_weixin");
            weixin.onMenuShareAppMessage(options);
        });
    };

    /**
     * 分享到 qq
     *
     * @param {Object} options
     * @property {string} options.title  标题
     * @property {string} options.desc  描述
     * @property {string} options.link  链接
     * @property {string} options.imgUrl 图片地址
     * @property {Function} options.trigger
     * @property {Function} options.success
     * @property {Function} options.cancel
     * @property {Function} options.fail
     */
    exports.setShareQQ = function (options) {
        loadWeixin(function(weixin){
            options = getShareOptions(options,"share_qq");
            weixin.onMenuShareQQ(options);
        });

    };

    /**
     * 分享到 微博  我猜是腾讯微博
     *
     * @param {Object} options
     * @property {string} options.title  标题
     * @property {string} options.desc  描述
     * @property {string} options.link  链接
     * @property {string} options.imgUrl 图片地址
     * @property {Function} options.trigger
     * @property {Function} options.success
     * @property {Function} options.cancel
     * @property {Function} options.fail
     */
    exports.setShareWeibo = function (options) {
        loadWeixin(function(weixin){
            options = getShareOptions(options,"share_weibo");
            weixin.onMenuShareWeibo(options);
        });
    };

});