/**
 * 设置分享，包括 app、微信
 */
;
define(function (require, exports) {

    'use strict';

    var env = require("util/env");
    var appShare = require("./parts/appShare");

    var shareStore = require("./parts/shareStore");

    /**
     * 设置app的分享，微博、短信有特殊处理
     */
    function doAppShare(shareto,data) {
        var jockeyParam = {};

        jockeyParam[shareto] = shareStore.get(shareto,data);

        appShare.doShare(jockeyParam);
    }

    /**
     * 设置APP调起分享
     * @param  {string} shareTo(分享到哪里)
     * @property "share_sms,share_weixin,share_weibo,share_pyq,share_qq,share_qzone"
     *
     * @param {object} data
     * @property {string} data.title
     * @property {string} data.content
     * @property {string} data.img
     * @property {string} data.url
     */
    return function (shareto,data) {
        if (env.app) {
            doAppShare(shareto,data);
        }
    }
});