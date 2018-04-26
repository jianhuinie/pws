define(function (require, exports) {

    var bindScroll = require('common/bindScroll');
    var pageScrollTop = require('cobble/function/pageScrollTop');
    var Popup = require('cobble/helper/Popup');

    exports.init = function () {

        var container = $('#main');

        var top = container.find('.kaoyan-label1').offset().top;

        var shareNode = container.find('.share');

        var shareLayerNode = shareNode.find('.baidu-share');

        var floatTip = container.find('.float-tip');

        var fixedNavHandler = function () {

            var pageTop = pageScrollTop();

            if (pageTop > top) {
                floatTip.show();
            } else {
                floatTip.hide();
            }
        };

        bindScroll(window, fixedNavHandler, 1);

        fixedNavHandler();

        new Popup({
            element: shareNode,
            layer: shareLayerNode,
            show: {
                trigger: 'over'
            },
            hide: {
                trigger: 'out',
                delay: 100
            }
        });

        shareNode.on('mousemove', function () {
            shareLayerNode.show();
        })
        .on('mouseout', function () {
            shareLayerNode.hide();
        });
    };
});