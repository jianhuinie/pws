/**
 * Created by chenmo on 16/2/24.
 * 考研-下载页
 */
define(function (require) {
    'use strict';
    var $ = require('zepto');

    var ui = require('common/ui');
    var lazyLoadImage = require('common/lazyLoadImage');
    var setShare = require('common/share/initialize');


    function setShareInfo() {
        var url = require.toUrl("./image/share_img.png");
        var options = {
            title: "考研人的专属部落",
            content: "李永乐、徐之明、任汝芬、钟平等20多位考研名师汇聚，考研全程辅导，98%考研学生的都在用。",
            img: url,
            url: location.href
        };
        setShare(options);
    }

    function popupVyanke() {
        if (document.referrer.indexOf('vyanke') >= 0
            || location.search.indexOf('vyanke') >= 0
        ) {
            var url = require.toUrl('./image/vyanke.png');
            ui.alert({
                content: [
                    '<div style="text-align: center">',
                        '<img src="' + url +'" srcset="' + url + ' 2x" />',
                        '<br /><br />V研客和跟谁学联合推出跟谁学考研APP<br />',
                        '扫难题更简单，一键获取视频解析<br />',
                        '下载APP获取金榜图书用户专属课程',
                    '</div>'
                ].join(''),
                button: '我知道了'
            })
        }
    }

    return function (page_data) {
        lazyLoadImage.init();
        setShareInfo();
        popupVyanke();
    }

});
