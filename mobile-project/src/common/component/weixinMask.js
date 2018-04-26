define(function(require, exports) {
    'use strict';
    var $ = require('zepto');
    var template = require('artTemplate');
    var weixinRender = template.compile(require('text!./weixinMask.tpl'));
    var container = $('#page_main');

    exports.openMask = function(flag) {
        var mask = container.find('.weixin-mask');
        if (flag == 'open' || flag == 'share') {
            if (mask.length == 0) {
                var html = weixinRender({
                    flag: flag
                });
                container.append(html);
                container.find('.weixin-mask').css({
                    'position': 'fixed',
                    'top': 0,
                    'bottom': 0,
                    'left': 0,
                    'right': 0,
                    'z-index': 8,
                    'background': 'black',
                    'opacity': 0.8,
                });
                container.find('.weixin-mask img').css({
                    'width': '60%',
                    'margin-left': '38%',
                    'margin-top': '20px'
                });
            } else {
                mask.show();
            }
        }
        container.find('.weixin-mask').on('click', function() {
            container.find('.weixin-mask').hide();
        });
    }

});