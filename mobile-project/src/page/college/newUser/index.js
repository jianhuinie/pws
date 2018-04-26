/***
    @file 跟谁学大学新手必读
    @author shubaiqiao
    @date 2016-10-10
**/
define(function (require, exports) {

    'use strict';
    var setShare = require('common/share/initialize');
    var searchInput = require('../ui/search/index');

    var shareConfig = {};

    function initSearch() {
        searchInput.init();
    }

    var initClick = function () {
        var j = 0;
        var length = $('.border-cata').length;
        $('.border-cata').each(function(i) {
            $(this).click(function() {
                $('.catalogue').find('.head-font').removeClass('head-font');
                $(this).find('a').addClass('head-font');
                for(j = 0; j < length; j++) {
                    $('.reveal-' + j).css('display', 'none');
                }
                j = 0;
                $('.reveal-' + i).css('display', 'block');
            });
        });
    };

    // 分享
    function initShare(data) {
        var title = '玩转跟谁学，拥抱互联网';
        var url = location.href;
        var content = '从入驻到开课，从招生到运营，教你玩转跟谁学';
        var img = 'https://imgs.genshuixue.com/0cms/d/file/content/2016/06/576125407509a.jpeg';
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
        console.log(shareConfig);

    }


    var listBorder = function () {
        $('.list-show').find('span:last').css('border-bottom', '1px solid #fff');
        $('.list-show').find('li:last').append(' <i class="hidden-s"> </i>');
    };


    // 页面初始化完成后调用init函数
    var init = function (data) {
        $('.register').hide();
        var url = window.location.hash;
        $('.R' + url[1] + 'Btn').find('a').addClass('head-font');
        $('.reveal-' + url[1]).show();
        if (url === '') {
            $('.R0Btn').find('a').addClass('head-font');
            $(".reveal-0").show();
        }

        initClick();
        initShare(data);
        listBorder();
        initSearch();

    };
    return function (page_data) {
        init(page_data);
    };
});