/*
 * @file   开学第一课活动首页
 * @author yuanye
 * @date   2017-02-13
 */
define(function (require, exports) {
    'use strict';
    
    var $ = require('zepto');
    var lazyLoadImage = require('common/lazyLoadImage');
    var setShare = require('common/share/initialize');
    var app = require('common/app');

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
        var nav = $('ul.nav');
        var startClass = $('button.get-start');
        lazyLoadImage.init();
        setShare({
            title: '开学第一课',
            content: '跟谁学开课季，我开课你报名，开课成功享好礼...',
            img: 'https://imgs.genshuixue.com/0cms/d/file/content/2017/02/58a56df896f35.jpeg',
            url: location.href
        });

        nav.on('click', function (e) {
            var target = e.target;
            if (target.className === 'recommend') {
                toURL(target.dataset['url']);
            }
            else if (target.className === 'cheats') {
                toURL(target.dataset['url']);
            }
        });

        startClass.on('click', function (e) {
            e.preventDefault();
            var alert = $('.alert-container');
            alert.css('display', 'block');
            alert.find('.btn').off('click').click(function () {
                alert.css('display', 'none');
            });
        });


        
    }

});