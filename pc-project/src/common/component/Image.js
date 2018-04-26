/**
 * @file 简单的 edit
 * @author zhujialu
 */
define(function (require) {

    'use strict';

    var Popup = require('cobble/helper/Popup');

    /**
     *
     *
     * @constructor
     * @param {Object} options
     * @property {jQuery} options.element 主元素
     * @property {string=} options.caption 完整的图片标题
     * @property {Function=} options.rename 重命名，必须返回 Promise 对象，便于更新 DOM
     * @property {Function=} options.remove 删除
     * @property {Function=} options.beforeRemove 删除前处理函数
     */
    function Image(options) {
        $.extend(this, options);
        this.init();
    }

    Image.prototype = {

        /**
         * 初始化
         */
        init: function () {

            var me = this;
            var element = me.element;
            var captionElement = element.next('.caption');
            var caption = me.caption || captionElement.find('em').html();

            var input = $('<input class="caption form-text" type="text" />');

            element
            .on('click', '.rename', function () {

                if ($.contains(document.body, captionElement[0])) {
                    captionElement.replaceWith(input);
                    input.val(caption);

                    // replace 后 input 绑定的事件会解绑，所以这里要再次绑定
                    input.on('focusout', function (e) {
                        var value = $.trim(input.val());

                        if (!value) {
                            value = caption;
                        }

                        if (value === caption) {
                            captionElement.html(value);
                            input.replaceWith(captionElement);
                        }
                        else {

                            me
                            .rename({
                                event: e,
                                name: value
                            })
                            .done(function (response) {
                                if (response.code === 0) {
                                    caption = value;
                                    captionElement.html(value);
                                    input.replaceWith(captionElement);
                                }
                            });

                        }
                    });
                }

                input.focus();

            })
            .on('click', '.remove', function (e) {

                var remove = function () {
                    confirm('确认删除吗？', '温馨提示')
                    .done(function () {
                        me.remove({
                            event: e
                        });
                    });
                }

                if ($.isFunction(me.beforeRemove)) {
                    if (me.beforeRemove()) {
                        remove();
                    }
                }
                else {
                    remove();
                }

            });

            me.popup = new Popup({
                element: element.find('.action'),
                layer: element.find('.menu'),
                show: {
                    trigger: 'over'
                },
                hide: {
                    trigger: 'out'
                }
            });

        },

        /**
         * 销毁
         */
        dispose: function () {

            this.popup.dispose();
            this.element.off();

            this.popup =
            this.element = null;
        }

    };

    return Image;

});