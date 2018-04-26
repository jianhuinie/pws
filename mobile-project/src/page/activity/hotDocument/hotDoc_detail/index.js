/***
    @file 热文推广详情页面
    @author shubaiqiao
    @date 2016-09-06
**/

define(function(require){
    'use strict';
    var $ = require('zepto');
    var lazyLoadImage = require('common/lazyLoadImage');
    var setShare = require('common/share/initialize');
    var service = require('common/service');
    var doShare = require('common/share/doShare');  // 分享
    var app = require('common/app');
    var openAppWindow = require("common/openAppWindow");
    var ui = require('common/ui');

    var container = $('.bottom');
    var shareConfig = {};

    function initEvent(data) {
        container.find('.teacher').on('click', function() {
            if (!app.isApp()) {
                location.href = data.teacher.url;
            } else {
                ui.remind('预览页面内不能点击，快去分享吧！');
            }
        });
        container.find('.button').on('click', function() {
            // 跳转到m站下载主页
            // 此处需判断环境决定跳转 test环境跳转test-m
            if (!app.isApp()) {
                location.href = '/app?target=teacher';
            } else {
                ui.remind('预览页面内不能点击，快去分享吧！');
            }
                // app.openNewWindow(location.origin + '/app?target=teacher');
        });

    }

    // 分享
    var shareFriend = function () {
        var index = location.href.indexOf('article_id');
        // 截取article_id参数
        // console.log('?' + location.href.substring(index));
        $.get('/weixin-hot-article/shares?' + location.href.substring(index), function(response) {
            if (response.code === 0) {
                var shareObj = {
                    'title': response.result.weixin_timeline.title,
                    'img': response.result.weixin_timeline.image,
                    'content': response.result.weixin_timeline.content,
                    'url': response.result.weixin_timeline.url
                };
                var sharePyqObj = {
                    'title': response.result.weixin_timeline.content,
                    'img': response.result.weixin_timeline.image,
                    'content': response.result.weixin_timeline.title,
                    'url': response.result.weixin_timeline.url
                };
                shareConfig['share_weixin'] = shareObj;
                shareConfig['share_qq'] = shareObj;
                shareConfig['share_qzone'] = shareObj;
                shareConfig['share_weibo'] = shareObj;
                shareConfig['share_sms'] = shareObj;
                shareConfig['share_pyq'] = sharePyqObj;

                shareConfig.title = shareObj.title;
                shareConfig.img = shareObj.img;
                shareConfig.content = shareObj.content;
                shareConfig.url = shareObj.url;

                setShare(shareConfig);
            }
        });
    };


    return function(page_data){
        initEvent(page_data);
        shareFriend();

    };
});