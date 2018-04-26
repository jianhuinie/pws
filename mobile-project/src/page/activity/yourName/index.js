/**
     @file 你的名字（活动）
     @author shubaiqiao
     @date 2016-12-08
 */

define(function(require){
    'use strict';
    var $ = require('zepto');
    var lazyLoadImage = require('common/lazyLoadImage');
    var setShare = require('common/share/initialize');
    var slideImageControl = require('common/ui/slideImageControl/slideImageControl');
    var ui = require("common/ui");
    var service = require('common/service');

    var shareConfig = {};

    // 轮播初始化
    function initBannerSlider() {
        var cContain = $('.banner');
        var curimage = new slideImageControl(cContain[0], {
            speed: 500,
            auto: 3000,
            continuous: true,
            callback: lazyloadSlideImg
        });
        // 判断图片是否已经加载，并执行加载
        function lazyloadSlideImg(index) {
            var dom = curimage.slides[index];
            if (!dom.imageLoaded) {
                lazyLoadImage.init(dom);
                dom.imageLoaded = true;
            }
        }
        lazyloadSlideImg(curimage.get('index'));
    }

    // 分享
    function initShare() {
        // 初始化默认分享信息
        var title = '【你的名字】写在手心里的秘密';
        var url = location.href + '&s=1';
        var content = '快来人啊，这里有一个秘密';
        var img = 'https://imgs.genshuixue.com/0cms/d/file/content/2016/12/584a64651a2f1.jpg';
        if (url) {
            var shareObj = {
                url: url,
                content: content,
                title: title,
                img: img
            };
            shareConfig['share_pyq'] = shareObj;
            shareConfig['share_weixin'] = shareObj;
            shareConfig['share_qq'] = shareObj;
            shareConfig['share_qzone'] = shareObj;
            shareConfig['share_weibo'] = shareObj;
            shareConfig['share_sms'] = shareObj;

            shareConfig.content = shareObj.content;
            shareConfig.url = shareObj.url;
            shareConfig.title = shareObj.title;
            shareConfig.img = shareObj.img;

            setShare(shareConfig);
        }
    }

    function initSubmit() {
        $('#form').find('.submit').on('click', function () {
            var value= $('.your').val();
            var dataObj = {};
            if (value.length == 0 || $('.hand').val().length == 0) {
                ui.alert('你还没有输入内容哦～');
                return false;
            } else if (value.length > 8) {
                ui.alert('“你的”最多只能输入8个字哦～');
                return false;
            } else if ($('.hand').val().length > 20) {
                ui.alert('“掌心”里的字最多只能输入20个字哦～');
                return false;
            } else if (value.indexOf('。') == -1) {
                value = '你的' + value + '。';
            }

            location.href = '/tcenter/static_page/imageResult?c=' + $('.hand').val() + '&t=' + value;

        });
    }

    function initResult() {
        var url = window.location.search;
        $('.banner').find('img').attr('src', 'http://mhd.m.genshuixue.com/uname' + window.location.search);
        $('.try-again').on('click', function () {
            location.href = '/tcenter/static_page/inputInfo';
        });
    }

    return function () {
        if ($('.swiper-wrapper').length != 0) {
            initBannerSlider();
            initSubmit();
        } else {
            initResult();
        }
        lazyLoadImage.init();
        initShare();
    };
});