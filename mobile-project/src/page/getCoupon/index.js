/**
 * author hsm
 * 优惠券领取成功页面
 * 2017-06-13
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');
    var lazyLoadImage = require('common/lazyLoadImage');
    var env = require('util/env');
    var wxMask = require('common/component/wxMask/weixinMask');
    var setShare = require('common/share/initialize');
    var pageData;

    function initImgsHeight() {
        var courseCard = $('.logo-content');
        courseCard.each(function () {
            var that = $(this);
            var width = that.width();
            that
                .css({
                    height: width * 0.6
                });
            that.find('img')
                .css({
                    height: width * 0.6
                });
            that.find('.logo-text')
                .removeClass('hide');
        });
    }


    // 点击事件
    function clickEvent() {
        $('.course-card').unbind('click').on('click', function () {
            var that = $(this);
            location.href = that.data('url');
        });
    }

    // 微信中显示分享按钮
    function shareButtonEvent() {
        var isWeixin = env.thirdapp && env.thirdapp.isWeixin;
        var wxButton = $('.buttons').find('.wx-button');
        if (isWeixin) {
            wxButton.removeClass('hide');
        }

        wxButton.on('click', function () {
            wxMask.openMask('share');
        });
    }

    // 分享
    function toShare() {
        var name = pageData.source_user_name;
        var balance = pageData.coupon.balance;
        var shareInfo = {
            title: "快来跟谁学上课吧！" + name + "送你" + balance + "元优惠券",
            content: "领取" + name + "优惠券，购买课程立减" + balance + "元－跟谁学！",
            img: "https://imgs.genshuixue.com/0cms/d/file/content/2015/05/555d7a546b184.png",
            url: pageData.share_url,
        };
        setShare(shareInfo);
    }

    return function (page_data) {
        pageData = page_data;
        initImgsHeight(); 
        lazyLoadImage.init();
        clickEvent();
        shareButtonEvent();
        toShare();
    };
});

