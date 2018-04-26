define(function (require, exports) {
    'use strict';

    var $ = require('zepto');
    var container = $('#page_main');
    var honorPics = container.find('.honors-pics');
    return function () {
        var imgLength = honorPics.find('img').length;
        var emptyHtml = '';
        if (imgLength < 4) {
            for (var i = 0; i < 4 - imgLength; i++) {
                emptyHtml += '<div class="grey-pic"><div class="grey-text">未上传</div></div>';
            }
        }
        honorPics.append(emptyHtml);
        honorPics.find('.grey-pic').each(function () {
            var that = $(this);
            var width = that.width();
            that.css('height', width + 'px');
        });
    };
});