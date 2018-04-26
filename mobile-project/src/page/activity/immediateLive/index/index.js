/**
*create by nanci 16/10/19
**/

define(function(require,exports){

    'use strict';

    var lazyLoadImage = require('common/lazyLoadImage');
    var setShare = require('common/share/initialize');
    // var openAppWindow = require("common/openAppWindow");

    function setShareInfo() {
        var options = {
            title: "直播不能停，高手再来战",
            content: "直播不能停，好礼送不完，跟谁学直播第二季重磅来袭，你准备好战斗了吗？",
            img: 'https://imgs.genshuixue.com/0cms/d/file/content/2016/11/58258c2b62f8e.jpg',
            url: location.href
        };
        setShare(options);
    }

    return function(page_data) {
        lazyLoadImage.init();
        setShareInfo();
    };
});