/*
 * @file   开学第一课活动人气推荐页
 * @author yuanye
 * @date   2017-02-13
 */
define(function (require, exports) {
    'use strict';

    var $ = require('zepto');
    var lazyLoadImage = require('common/lazyLoadImage');
    var setShare = require('common/share/initialize');
    var app = require('common/app');
    var jockey = require('jockey');
    var util_url = require('util/url');

    var util_url = util_url();
    var isApp = app.isApp();

    function toURL(url) {
        if (isApp) {
            app.openNewWindow(url);
        }
        else {
            location.href = url;
        }
    }

    return function () {
        lazyLoadImage.init();
        // 强行设置顶部title,防止app开屏进入时没有title
        jockey.send('setPageTitle', {title: '人气推荐专区'});
        var checkCheats = $('.check-cheats');
        var container = $('.today-recommend, .hot-recommend');
        var src;
        var url = location.href;
        if (app.isStudentApp()) {
            src = 'https://imgs.genshuixue.com/0cms/d/file/content/2017/02/58a56df8c5550.jpeg';
            if (url.indexOf('?') !== -1) {
                url += '&studentShare=true';
            }
            else {
                url += '?studentShare=true';
            }
        }
        else {
            src = 'https://imgs.genshuixue.com/0cms/d/file/content/2017/02/58a56df85f3af.jpeg';
        }
        
        setShare({
            title: '开学季火热课程推荐',
            content: '最好的老师、最干货的课程，限时优惠，先报先得...',
            img: src,
            url: url
        });

        if (!app.isStudentApp() && !util_url.params['studentShare']) {
            $('.cheats').css('display', 'block');
        }
        else if (app.isTeacherApp()) {
            $('.cheats').css('display', 'block');
        }
        container.on('click', '.item-container', function (e) {
            toURL(this.dataset['url']);
        });

        checkCheats.on('click', function (e) {
            toURL(this.dataset['url']);
        });
    }
});