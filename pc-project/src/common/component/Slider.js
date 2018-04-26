/**
 * @file 平滑切换的轮播图
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var Carousel = require('cobble/ui/Carousel');

    /**
     *
     * @param {Object} options
     * @property {number=} options.duration 动画时间，单位是毫秒，默认是 300
     *
     * @property {boolean=} options.autoPlay 是否自动播放，默认 true
     * @property {number=} options.delay 自动播放时，切换的等待时间，默认 5000
     * @property {boolean=} options.loop 是否循环播放，默认为 true
     *
     * @property {string=} options.trigger 当有图标按钮时，触发改变的方式，可选值有 over click， 默认是 click
     *
     * @property {string=} options.prevSelector 上一页的选择器
     * @property {string=} options.nextSelector 下一页的选择器
     * @property {string=} options.iconSelector 图标按钮选择器（一般会写序号的小按钮）
     * @property {string} options.itemSelector 幻灯片选择器
     * @property {boolean=} options.isVertical 是否垂直方向滚动
     * @property {boolean=} options.scrollOneDirection 是否一个方向滚动
     * @property {Function=} options.onChange 图片变动时触发
     */
    function Slider(options) {
        $.extend(this, Slider.defaultOptions, options);
        this.init();
    }

    Slider.prototype = {

        constructor: Slider,

        init: function () {

            var me = this;
            var outer = me;
            var element = me.element;

            var itemSelector = me.itemSelector;

            var items = element.find(itemSelector);
            var wrapper = items.parent();

            // 初始值
            var count = items.length;
            // 添加的子项数量
            var addon = 2;
            // 最终值
            var length = count + addon;

            var first = items.eq(0);
            var last = items.eq(count - 1);

            // 先读取宽度
            var itemWidth = first.width();
            var itemHeight = first.height();

            // 标记当前正在动画的数量
            var counter = 0;

            // 动画完成后跳转的索引
            var redirectIndex;

            var redirect = !me.isVertical ? function () {
                    wrapper.css(
                        'left',
                        - 1 * redirectIndex * itemWidth
                    );
                } : function () {
                    wrapper.css(
                        'top',
                        - 1 * redirectIndex * itemHeight
                    );
                };

            // 先初始化组件
            // 否则后面添加 item 的逻辑会影响计算数量
            var carousel = new Carousel({
                element: element,
                itemSelector: itemSelector,
                iconSelector: me.iconSelector,
                prevSelector: me.prevSelector,
                nextSelector: me.nextSelector,
                activeClass: 'active',
                trigger: me.trigger,
                loop: me.loop,
                delay: me.delay,
                autoPlay: me.autoPlay,
                pauseOnHover: true,
                onChange: me.onChange,
                animation: function (data) {

                    var toIndex = data.to;
                    var fromIndex = data.from;

                    if (fromIndex < 0) {
                        return;
                    }

                    if (counter > 0) {
                        wrapper.stop();
                        if (redirectIndex > -1) {
                            redirect();
                        }
                    }

                    var element = this.element;

                    // 动画使用的索引
                    var index;

                    // 从最后一页切到第一页
                    if (toIndex === 0 && fromIndex === count - 1) {
                        index = length - 1;
                        redirectIndex = 1;
                    }
                    // 从第一页切到最后一页
                    else if (!me.scrollOneDirection && toIndex === count - 1 && fromIndex === 0) {
                        index = 0;
                        redirectIndex = length - addon;
                    }
                    else {
                        index = toIndex + 1;
                        redirectIndex = -1;
                    }

                    counter++;

                    wrapper
                        .animate(
                            (me.isVertical ? {
                                top: -1 * index * itemHeight
                            } :
                            {
                                left: -1 * index * itemWidth
                            }),
                            this.duration,
                            'easeOutQuad',
                            function () {

                                counter--;

                                if (redirectIndex > -1) {
                                    redirect();
                                }
                            }
                        );




                }
            });

            first = first.clone();
            last = last.clone();

            wrapper.prepend(last);
            wrapper.append(first);

            if (!me.isVertical) {
                wrapper.css({
                    width: length * itemWidth,
                    left: -1 * itemWidth
                });
            } else {
                wrapper.css({
                    height: length * itemHeight,
                    top: -1 * itemHeight
                });
            }

        }

    };

    Slider.defaultOptions = {
        duration: 300,
        trigger: 'click',
        isVertical: false,
        scrollOneDirection: false,
        loop: true,
        delay: 5000
    };

    return Slider;

});