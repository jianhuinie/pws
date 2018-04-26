/**
 * 设置分享，包括 app、微信
 */
;
define(function (require) {

    'use strict';

    var appShare = require('./parts/appShare');
    var wxShare = require('./parts/wxShare');
    var qqShare = require('./parts/qqShare');

    var env = require('util/env');
    var $ = require("zepto");

    var shareStore = require("./parts/shareStore");

    /**
     * 设置app的分享，微博、短信有特殊处理
     */
    function setAppShare(options) {
        options && appShare.setShareInfo(options);
    }

    /**
     * 设置微信分享
     */
    function setWeixinShare(options) {
        wxShare.initWeixin(function () {
            wxShare.setShareInfo(options);
        });
    }

    /**
     * 设置QQ分享
     * */
    function setQQShare(options) {
        qqShare.setShareInfo({
            share_url: options.url,
            desc: options.content,
            title: options.title,
            image_url: options.img
        });
    }

    /**
     * UC浏览器分享
     * */
    function setUCShare(options) {
        /*
         * UC不能主动定制个性化分享信息，自动抓取页面信息分享
         * title从title标签中自动抓取
         * image从页面内容抓取
         * */
        options.title && (document.title = options.title);
    }

    /*
     * 微博分享
     * */
    function setWeiboShare(options) {
        /*
         * Weibo不能主动定制个性化分享信息，自动抓取页面信息分享
         * title从title标签中自动抓取
         * image默认weibo图片
         * */
        options.content && (document.title = options.content);
    }

    /**
     * 设置分享
     * @param  {Object} data
     * @property {string=} data.url 链接地址
     * @property {string=} data.title
     * @property {string} data.content
     * @property {string} data.img
     *
     * 设置自定义的分享，可任意传入，不传入时，会自动生成，对微博、短信自动处理
     * @property {?Object} data.share_sms
     * @property {?Object} data.share_weibo
     * @property {?Object} data.share_weixin
     * @property {?Object} data.share_pyq
     * @property {?Object} data.share_qq
     * @property {?Object} data.share_qzone
     * @property {?Object} data.share_course
     *
     * @params {Object} options
     * @property {boolean} options.app app为false时不分享,默认为true
     */
    return function (data, options) {
        //填充数据
        shareStore.set(data || {});

        data = shareStore.get();

        var options = $.extend({
            app: true
        }, options || {});

        if (env.app && options.app) {
            setAppShare(data);
        } else if (env.thirdapp && env.thirdapp.isWeixin) {
            setWeixinShare(data);
        } else if (env.thirdapp && env.thirdapp.isQQ) {
            setQQShare(data);
        } else if (env.thirdapp && env.thirdapp.isWeibo) {
            setWeiboShare(data);
        } else if (env.browser.isUC) {
            setUCShare(data);
        }
    }
});