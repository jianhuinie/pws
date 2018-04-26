/**
 * Created by nanci
 */
define(function(require) {

    'use strict';

    var lazyLoadImage = require('common/lazyLoadImage');
    var setShare = require('common/share/initialize');
    var url = require('util/url');
    var urlParams = url().params;

    return function(page_data) {

        lazyLoadImage.init();

        var shareInfo = {
            title: '热门评价老师榜新鲜出炉！',
            content: '天呐，没想到学生眼中的我竟然是这样！',
            img: 'https://imgs.genshuixue.com/0cms/d/file/content/2017/01/587debfcaca59.png',
            'share_pyq': {
                title: '天呐，没想到学生眼中的我竟然是这样！',
                content: '热门评价老师榜新鲜出炉！',
                img: 'https://imgs.genshuixue.com/0cms/d/file/content/2017/01/587debfcaca59.png'
            }
        };
        setShare(shareInfo);

    }
});