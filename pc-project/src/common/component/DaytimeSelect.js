/**
 * @file 时间选择器（00:00 到 23:59）
 * @author zhujialu
 */
define(function (require) {

    'use strict';

    var Popup = require('cobble/helper/Popup');
    var timeUtil = require('cobble/util/time');

    /**
     *
     * @constructor
     * @param {Object} options
     * @property {Object} options.min 最小时间，如 { hour: 10: minute: 0 }
     * @property {Object} options.max 最大时间，如 { hour: 12: minute: 30 }
     * @property {number} options.step 下拉菜单时间步进值，以 分钟 为单位
     * @property {Function} options.itemRender
     * @property {Function} options.onChange
     * @property {boolean=} options.selectFirst 刷新时是否默认选中第一个(默认为true)
     * @property {boolean=} options.disabled 是否禁用(默认为false)
     * @property {string=}  options.defaultText 默认显示的palceHolder(默认未空)
     */
    function DaytimeSelect(options) {
        $.extend(this, DaytimeSelect.defaultOptions, options);
        this.init();
    }

    DaytimeSelect.prototype = {

        init: function () {

            var me = this;

            me.refresh();

            var element =  me.element;
            var input = element.find('.form-text');

            // 失焦格式化
            input.blur(function () {
                if (!me.disabled) {
                    me.setValue(this.value);
                }
            });

            var menu = element.find('.dropdown-menu');
            var popup = me.popup = new Popup({
                element: element.find('.trigger, input[class="form-text"]'),
                layer: menu,
                show: {
                    trigger: 'click'
                },
                hide: {
                    trigger: 'click'
                },
                onAfterShow: function () {
                    element.addClass('open');
                },
                onAfterHide: function () {
                    element.removeClass('open');
                },
                onBeforeShow: function () {
                    if (me.disabled) {
                        return false;
                    }
                }
            });

            menu.on('click', '[data-value]', function (e) {
                var target = $(e.currentTarget);
                menu.find('.active').removeClass('active');
                target.addClass('active');

                popup.close();
                me.setValue(
                    $(e.currentTarget).data('value')
                );
            });

        },

        /**
         * 禁用下拉
         */
        disable: function () {
            this.popup.onBeforeShow = function () { return false; }
            this.disabled = true;
        },

        /**
         * 启动下拉
         */
        enable: function () {
            this.popup.onBeforeShow = function () { return true; }
            this.disabled = false;
        },

        /**
         * 刷新下拉时间
         *
         * @param {Object} data
         */
        refresh: function (data) {

            if (data) {
                $.extend(this, data);
            }

            var element = this.element;

            if (this.selectFirst) {

                element.find(':text').val(
                    timeUtil.stringify(
                        timeUtil.parse(this.min)
                    )
                );
            }
            else {
                element.find(':text').prop('placeholder', this.defaultText);
            }

            var min = timeUtil.parse(this.min);
            var max = timeUtil.parse(this.max);

            if (max < min) {
                max.setTime(max.getTime() + DAY_TIME);
            }

            var step = this.step * timeUtil.MINUTE;

            var html = '';

            var index = 0;
            for (var i = +min; i <= max; i += step) {
                index++;
                html += this.itemRender({
                    index: index,
                    text: timeUtil.stringify(new Date(i))
                });
            }

            element.find('.dropdown-menu').html(html);
        },

        getValue: function () {
            return this.element.find(':text').val();
        },

        setValue: function (value, options) {

            var me = this;
            var time;

            if (me.validate(value)) {
                time = timeUtil.parse(value);
            }
            else {
                time = timeUtil.parse(me.min);
            }

            this.element.find(':text').val(timeUtil.stringify(time));

            if ($.isFunction(me.onChange)
                && (!options || !options.silence)
            ) {
                me.onChange();
            }
        },

        validate: function (value) {

            var time = timeUtil.parse(value);
            var min = timeUtil.parse(this.min);
            var max = timeUtil.parse(this.max);

            return time >= min && time <= max;
        }
    };

    DaytimeSelect.defaultOptions = {
        min: { hour: 0, minute: 0 },
        max: { hour: 23, minute: 59 },
        step: 30,
        selectFirst: true,
        defaultText: '',
        disabled: false,
        itemRender: function (data) {
            return '<li data-index="' + data.index + '" data-value="' + data.text + '">' + data.text + '</li>';
        }
    };

    /**
     * 一天的毫秒数
     *
     * @inner
     * @type {number}
     */
    var DAY_TIME = timeUtil.HOUR * 24;

    return DaytimeSelect;

});