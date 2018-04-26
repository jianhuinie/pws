/**
 * @file 发送验证码按钮，点击后禁用，倒计时60秒后再次可用
 * @author zhujialu
 */
define(function (require) {

    'use strict';

    var $ = require("zepto");

    /**
     * 构造函数
     *
     * @constructor
     * @param {Object} options
     * @property {jQuery} options.element 按钮元素
     * @property {string} options.text 倒计时文字 例如： "重新发送($time$)"
     * @property {Function} options.send 发送函数，返回 Promise 对象
     * @property {Funciton=} options.onTextChange 开始倒计时文本变化时触发
     * @property {Function=} options.onFinish 倒计时结束触发回调
     */
    function CodeButton(options) {
        $.extend(this, options);
        this.init();
    }

    CodeButton.prototype = {

        init: function () {

            var me = this;
            var element = me.element;

            me.origin = element.html();

            var clickHandler = function () {

                if (element.prop('disabled')) {
                    return;
                }

                element.prop('disabled', true);

                var promise = me.send();
                if (promise) {
                    promise.done(function (response) {

                        // 发送成功开始倒计时
                        if (response.code === 0) {

                            me.countDown(
                                60,
                                function () {
                                    element.prop('disabled', false);
                                }
                            );

                        }
                        else {
                            element.prop('disabled', false);
                        }

                    });
                }
                else {
                    element.prop('disabled', false);
                }

            };

            if (me.container) {
                me.container
                    .on('click', function (e) {
                        if (e.target === element[0]) {
                            clickHandler();
                        }
                    });
            }
            else {
                element.click(clickHandler);
            }
        },

        /**
         * 倒计时
         *
         * @param {number} counter
         * @param {Function=} onFinish
         */
        countDown: function (counter, onFinish) {

            var me = this;
            var element = this.element;

            var refresh = function (counter) {
                var text = me.text || '$time$ 秒后再次发送';
                element.html(text.replace('$time$', counter));
                if ($.isFunction(me.onTextChange)) {
                    me.onTextChange();
                }
            };

            me.timer = setInterval(
                function () {
                    counter--;
                    if (counter > 0) {
                        refresh(counter);
                    }
                    else {

                        clearInterval(me.timer);
                        element.html(me.origin);

                        if ($.isFunction(onFinish)) {
                            onFinish();
                        }
                        if ($.isFunction(me.onTextChange)) {
                            me.onTextChange();
                        }
                        if ($.isFunction(me.onFinish)) {
                            me.onFinish();
                        }
                    }
                },
                1000
            );

            refresh(counter);
        },

        reset: function () {
            var me = this;
            if (me.timer) {
                clearInterval(me.timer);
            }
            me.element
                .html(me.origin)
                .removeAttr('disabled');
        },

        dispose: function () {
            this.element.off();
            if (this.timer) {
                clearInterval(this.timer);
            }
        }

    };

    return CodeButton;

});