/**
 * @file 懂行活动
 * @author zengcheng
 *
 */
define(function (require, exports) {

    var Popup = require('cobble/helper/Popup');

    exports.init = function () {

        //  分享按钮
        var shareBtn = $('#share-btn');
        shareBtn.hover(function(){
            shareBtn.css('background-image', 'url(' + $(this).data('btn-hover') + ')');
        }, function(){
            shareBtn.css('background-image', 'url(' + $(this).data('btn') + ')');
        });

        // 初始化分享
        //百度分享
        new Popup({
            element: $('#share-btn'),
            layer: $('#share-btn').find('.baidu-share'),
            show: {
                trigger: 'over',
                delay: 20
            },
            hide: {
                trigger: 'out',
                delay: 200
            }
        });

    };
});