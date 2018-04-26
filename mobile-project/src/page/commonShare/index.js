/**
 * @author hurry
 * @date 2016/07/28
 */

define(function(require) {
    'use strict';
    var setShare = require('common/share/initialize');

    return function(page_data) {
        document.title = decodeURIComponent(page_data.pageTitle);
        $('#share-page')
            .attr('src', decodeURIComponent(page_data.pageUrl));
        $('#page_main').css('height', window.innerHeight);
        function setShareInfo() {
            var options = {
                title: decodeURIComponent(page_data.title) || decodeURIComponent(page_data.pageTitle),
                content: decodeURIComponent(page_data.content),
                img: decodeURIComponent(page_data.picUrl),
                url: (page_data.url && decodeURIComponent(page_data.url)) || location.href
            };
            setShare(options);
        }
        setShareInfo();
    };
});