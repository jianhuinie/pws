/**
 * @file 跟谁学大学首页
 * @author hurry
 * @date 2016/10/08
 */

define(function (require) {
    'use strict';
    // 外部依赖
    var setShare = require('common/share/initialize');
    var lazyLoadImage = require('common/lazyLoadImage');
    var Swiper = require('swiper');
    var cards = require('./_part/cards/index');
    var searchInput = require('../ui/search/index');
    var slideImageControl = require('common/ui/slideImageControl/slideImageControl');

    // 变量
    var pageData;
    var shareConfig = {};

    // 分享
    function initShare(data) {
        var shareData = data.share;

        shareConfig['share_pyq'] = shareData.share_pyq;
        shareConfig['share_weixin'] = shareData.share_weixin;

        shareConfig['share_qq'] = shareData.share_qq;

        shareConfig['share_qzone'] = shareData.share_qzone;

        shareConfig['share_weibo'] = shareData.share_weibo;

        shareConfig['share_sms'] = shareData.share_sms;

        shareConfig['share_mail'] = shareData.share_email;

        shareConfig['copy_link'] = shareData.copy_link;

        shareConfig.content = shareConfig['share_weixin'].content;
        shareConfig.url = shareConfig['share_weixin'].url;
        shareConfig.title = shareConfig['share_weixin'].title;
        shareConfig.img = shareConfig['share_weixin'].img;


        setShare(shareConfig);

    }

    function initBannerSlider() {
        // var swiper = new Swiper('.swiper-banner-container', {
        //     pagination: '.swiper-banner-pagination',
        //     paginationClickable: true,
        //     spaceBetween: 30,
        //     centeredSlides: true,
        //     autoplay: 2500,
        //     autoplayDisableOnInteraction: false
        // });
        var cContain = $('.swiper-banner-container');
        var bullets = cContain.find('.slider-page li span');
        var curimage = new slideImageControl(cContain[0], {
            auto: 3000,
            continuous: true,
            callback: lazyloadSlideImg
        });
        // 判断图片是否已经加载，并执行加载
        // 设置当前active的dot效果
        function lazyloadSlideImg(index) {
            var dom = curimage.slides[index];
            if (!dom.imageLoaded) {
                lazyLoadImage.init(dom);
                dom.imageLoaded = true;
            }
            bullets.removeClass('on');
            bullets.eq(index).addClass('on');
        }

        lazyloadSlideImg(curimage.get('index'));
    }

    function init3DSlider() {
        cards.init(pageData);
    }

    function initSlider() {
        initBannerSlider();
        init3DSlider();
    }

    function initSearch() {
        searchInput.init();
    }

    // 初始化dom
    function initDOM() {
        initSearch();
        initSlider();
    }

    return function(data) {
        pageData = data;
        initDOM();
        initShare(data);
        lazyLoadImage.init();
    };
});