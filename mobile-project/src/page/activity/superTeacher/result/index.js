/**
*create by nanci 16/12/12
**/

define(function(require,exports){

    'use strict';

    var $ = require('zepto');
    var lazyLoadImage = require('common/lazyLoadImage');
    var setShare = require('common/share/initialize');

    return function (page_data) {
        //iphone4-5 做宽度方面的适配
        if (screen.availWidth <= 320) {
            $('.no10 .title .desc').css({'font-size': '16px', 'padding': '0 15px'});
            $('.young').css({'padding-left': '8px', 'padding-right': '8px'});
            $('.list-young .unit').each(function (ele, ind) {
                $(this).find('.avatar').css({'width': '45px', 'height': '45px'});
                $(this).find('.name').css({'width': '74px'}).text($(this).find('.name').text().trim());
                $(this).find('.seperator').text($(this).find('.seperator').text().trim());
            });
        }
        var shareInfo = {
            title: '跟谁学杯互联网风云老师视频大赛大奖揭晓！',
            content: '谁将荣获互联网风云老师？谁将入选年度十大人气老师？各项单项奖花落谁家？现在！揭晓！',
            img: 'https://imgs.genshuixue.com/0cms/d/file/content/2016/11/5836df1737529.png',
            share_pyq: {
                title: '谁将荣获互联网风云老师？谁将入选年度十大人气老师？各项单项奖花落谁家？现在！揭晓！',
                content: '跟谁学杯互联网风云老师视频大赛大奖揭晓！',
                img: 'https://imgs.genshuixue.com/0cms/d/file/content/2016/11/5836df1737529.png',
            }
        };
        setShare(shareInfo);
        lazyLoadImage.init();
    };

});