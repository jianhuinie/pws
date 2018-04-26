/**
 * @author hurry
 * @date 2016/07/28
 */

define(function(require) {
    'use strict';
    var setShare = require('common/share/initialize');

    return function(pageData) {
        $('#share-page')
            .attr('src', pageData.room.url);
        $('#page_main').css('height', window.innerHeight);
        function setShareInfo() {
            var share = pageData.share;
            var options = {
                title: share.title,
                content: share.content,
                img: share.image,
                url: share.url
            };
            setShare(options);
        }
        setShareInfo();
    };
});