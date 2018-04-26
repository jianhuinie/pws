/**
 * 活动模板二
 * @author zengcheng
 */
define(function (require, exports) {

    var Popup = require('cobble/helper/Popup');
    var lazyImage = require('common/lazyImage');
    var ClickMonitor = require('common/component/ClickMonitor');

    exports.init = function () {

        // 分享按钮
        var shareBtn = $('#share-btn');

        // 图片懒加载
        lazyImage.init();

        // 百度分享
        new Popup({
            element: shareBtn,
            layer: shareBtn.find('.baidu-share'),
            show: {
                trigger: 'over',
                delay: 20
            },
            hide: {
                trigger: 'out',
                delay: 200
            }
        });

        var clickMonitor = new ClickMonitor({
            monitorUrl: '',
            isSend : false,
            useDataHref: true
        });
    }
});