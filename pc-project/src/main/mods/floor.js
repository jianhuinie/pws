/**
 * @file  左边浮动楼层滚动
 * @author  zengcheng
 */
define(function (require, exports) {

    var viewportWidth = require('cobble/function/viewportWidth');
    var viewportHeight = require('cobble/function/viewportHeight');
    var bindScroll = require('common/bindScroll');
    var instance = require('cobble/util/instance');
    var eventEmitter = require('common/eventEmitter');
    var $window = instance.window;

    // 楼层高度
    var FLOOR_WRAPPER_HEIGHT = 296;
    // 楼层导航宽度
    var FLOOR_NAV_WIDTH = 42;
    // 楼层导航高度
    var FLOOR_NAV_HEIGHT = 42;
    // 内容区宽度
    var CONTENT_WIDTH = 1190;

    var top

    /**
     * 楼层自动跟踪
     */
    function autoPosition(modHolder, containerOffsets) {

        var autoSet = true;
        var SHOW_OFFSET = 1000;

        // 自动定位
        bindScroll($window, function () {
            if ($window.scrollTop() > SHOW_OFFSET) {
                modHolder.show();
                autoSet && floorPosition(containerOffsets);
            } else {
                modHolder.hide();
            }
        });

        // 点击选中
        modHolder.on('click', '.floor-item', function (event) {
            var that = $(this);
            var offsetTop;
            var floorIndex = that.data('floor-index');
            autoSet = false;
            that.siblings().removeClass('active');
            if (floorIndex != 0) {
                that.addClass('active');
                offsetTop = $('[data-floor="' + floorIndex + '"]').offset().top;
            } else {
                offsetTop = 0;
            }
            setTimeout(function() {
                $('html, body').stop().animate({scrollTop: (offsetTop + 'px')}, 1000, function() {
                    autoSet = true;
                });
            }, 0);
        });
    }

    /**
     * 定位楼层
     */
    function floorPosition(containerOffsets) {
        // 高亮当前导航
        var len = containerOffsets.length;
        var scrollTop = $window.scrollTop() + top;
        var container;

        while (len--) {
            container = containerOffsets[len];
            if (scrollTop >= container.offsetTop) {
                break;
            }
        }

        if (scrollTop >= container.offsetTop) {
            container.nav.addClass('active').siblings().removeClass('active');
        } else {
            container.nav.removeClass('active').siblings().removeClass('active');
        }
    }

    /**
     * 获取每个区域的定位
     * 返回定位的信息
     */
    function getContainerOffsets(containerOffsets) {
        containerOffsets = containerOffsets || [];
        $('.floor-wrapper .floor-list .floor-item').not('.last').each(function (index){
            var that = $(this);
            containerOffsets.push(
                    {
                        offsetTop: $('[data-floor="' + that.data('floor-index') + '"]').offset().top - index * FLOOR_NAV_HEIGHT,
                        nav: that
                    }
                );
        });
    }

    /**
     * 定位浮层
     */
    function positionFloorWrapper(modHolder) {

        var width = viewportWidth();

        // 楼层导航紧靠内容区左边
        var left = (width - CONTENT_WIDTH) / 2 - FLOOR_NAV_WIDTH - 2;

        if (left > 10) {
            left = left - 10;
        }
        if (left < 0) {
            left = 0;
        }
        modHolder.css({
            left: left
        });
    }

    exports.init = function () {

        var modHolder = this;
        top = (viewportHeight() - FLOOR_WRAPPER_HEIGHT) / 2;

        // 定位floor的包含层
        positionFloorWrapper(modHolder);

        // resize的时候更新位置
        (function () {
            var timer = null;
            var handler = function () {
                top = (viewportHeight() -FLOOR_WRAPPER_HEIGHT) / 2;
                positionFloorWrapper(modHolder);
            };
            var timerout = $window[0].setTimeout;
            var clearout = $window[0].clearTimeout;
            $window.on('resize', function() {
                clearout(timer);
                timer = timerout(handler, 0);
            });
        })();

        // 初始化每个楼层的offset
        var containerOffsets = [];
        getContainerOffsets(containerOffsets);

        // 绑定自动定位
        autoPosition(modHolder, containerOffsets);

        // 初始化后自动定位
        floorPosition(containerOffsets);

        // 广告位初始化完成后再计算offset
        eventEmitter.on('ad.banner.ready', function () {

            containerOffsets.length = 0;
            getContainerOffsets(containerOffsets);
        });
    };
});
