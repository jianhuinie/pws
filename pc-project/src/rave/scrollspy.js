/**
 *
 * @file 滚动监听组件
 * @author zengcheng
 *
 */

define(function (require, exports) {

    var SCROLL_BAR_ITEM_CLASS = '.rave_nav_item';

    /**
     * @class 滚动监听同步
     * @param {object} options 初始化条件
     * @property {jQuery=} options.container 滚动容器默认为window
     * @property {jQuery} options.scrollbar 滚动边栏
     * @property {number} options.min scrollTop的最小值，否则不显示scroll
     *
     */
    function ScrollSpy(options) {
        this.options = $.extend({container: $(window)}, options);
        this.init();
        this.bindEvents();
    }

    /**
     *
     * 更新scrollbar的状态
     *
     */
    function updateScrollBar(currentTop) {
        var list = this.offsetList;
        var item;
        for (var i = list.length-1; i >= 0; i--) {
            item = list[i];
            if (item.top < currentTop) {
                this.barList.removeClass('active');
                item.bar.addClass('active');
                return true;
            }
        }
    }

    function bindEvents() {
        var me = this;
        var options = me.options;
        options.container.on('scroll', function () {
            var currentTop = options.container.scrollTop();
            if (currentTop > options.min) {
                if (me.timer) {
                    clearTimeout(me.timer);
                }
                me.timer = setTimeout(function () {
                        me.updateScrollBar(currentTop);
                        options.scrollbar.show();
                    }, 0);
            } else {
                options.scrollbar.hide();
            }
        });
    }

    function init() {
        //初始化scrollbar
        var options = this.options;
        var fixedHeight = $(window).height();
        if (options.container.scrollTop() > options.min) {
            options.scrollbar.show();
        } else {
            options.scrollbar.hide();
        }
        //获得所有的id对应的offset
        var offsetList =
            this.offsetList = [];
        this.barList = $(SCROLL_BAR_ITEM_CLASS, options.scrollbar);
        this.barList.each(function (i, item) {
            offsetList.push(
                {
                    top: $($(item).attr('href')).offset().top - fixedHeight,
                    bar: $(item)
                }
            );
        })
    }

    /**
     * 初始化组件
     */
    ScrollSpy.prototype = {
        constructor: ScrollSpy,
        init: init,
        bindEvents: bindEvents,
        updateScrollBar: updateScrollBar
    }

    return ScrollSpy;
});