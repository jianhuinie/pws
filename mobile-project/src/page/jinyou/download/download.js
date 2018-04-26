/**
 * Created by chenmo on 16/2/24.
 * 金囿-下载页
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
            title: "更多视角学金融",
            content: "100门金融课程，金融从业资格到金融专业资格，你想学的金融课程都在这里！",
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
