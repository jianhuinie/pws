/**
 * @author hurry
 * @date 2016/06/15
 */

define(function(require) {
    'use strict';
    var setShare = require('common/share/initialize');
    var lazyLoadImage = require("common/lazyLoadImage");
    var imagePlayer = require('common/ui/ImagePlayer/showImagePlayer');

    return function(page_data) {

        var container = $('.main');

        lazyLoadImage.init();
        container
        .on('click', '.amplificate', function () {
            var photos = [];
            photos.push($(this).data('src'));
            imagePlayer(photos, 0);
        })

        function setShareInfo() {
            var options = {
                title: "跟谁学会员2.0重磅升级",
                content: "跟谁学会员2.0，打造六大锦囊，助力1%的好老师&好机构实现互联网升级！",
                img: 'https://imgs.genshuixue.com/0cms/d/file/content/2016/06/57709fb47b8da.png',
                url: location.href
            };
            setShare(options);
        }
        setShareInfo();
    };
});