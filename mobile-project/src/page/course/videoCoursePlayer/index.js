/* 普通视频课的视频承载页面
* @author huangshiming
* date 2017-02-24
*/
define(function (require) {

    'use strict';
    var $ = require('zepto');
    var pageData;

    // 初始化播放器
    function initPlayer () {
        var player = new bjcPlayer('.video-container', {
            token: pageData.play_token,
            autoPlayAfterGetVideoInfo: false,
            onended: function () {
                // 播放完成触发
            },
            onplay: function () {
                //点击播放
            },
            onpause: function () {
                // 暂停
            },
            onerror: function (e) {
                console.log(e);
            }
        });

        player.play(pageData.fid);
    }


    return function (page_data){
        document.domain = 'genshuixue.com';
        pageData = page_data;
        initPlayer();
    };
});