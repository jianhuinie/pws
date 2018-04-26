/**
 * @file 发送验证码按钮，点击后禁用，倒计时60秒后再次可用
 * @author zhujialu
 */
define(function (require) {

    'use strict';


    /**
     * 构造函数
     *
     * @constructor
     * @param {Object} options
     * @property {jQuery} options.element 按钮元素
     * @property {jQuery=} options.container 包含`按钮元素`的元素
     * @property {Function} options.send 发送函数，返回 Promise 对象
     * @property {Funciton=} options.onTextChange 开始倒计时文本变化时触发
     * @property {Function=} options.onFinish 倒计时结束触发回调
     * @property {Function=} options.isSuccess 如果成功，则自动开始倒计时
     */
    function CodeButton(options) {
        $.extend(this, options);
        this.init();
    }

    CodeButton.prototype = {

        init: function () {

            var me = this;
            var element = me.element;

            me.isCounting = false;
            me.origin = element.html();

            var clickHandler = function () {

                me.sendCode();
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
         */
        countDown: function (counter) {

            var me = this;
            var element = this.element;
            me.isCounting = true;

            var refresh = function (counter) {
                element.html(counter + ' 秒后再次发送');
                if ($.isFunction(me.onTextChange)) {
                    me.onTextChange();
                }
            };

            element.prop('disabled', true);

            me.timer = setInterval(
                function () {
                    counter--;
                    if (counter > 0) {
                        refresh(counter);
                    }
                    else {
                        me.reset();
                    }
                },
                1000
            );

            refresh(counter);
        },

        reset: function () {
            var me = this;
            me.isCounting = false;
            var element = me.element;
            clearInterval(me.timer);
            element.html(me.origin);

            element.prop('disabled', false);

            if ($.isFunction(me.onTextChange)) {
                me.onTextChange();
            }
            if ($.isFunction(me.onFinish)) {
                me.onFinish();
            }
        },

        dispose: function () {
            this.element.off();
            if (this.timer) {
                clearInterval(this.timer);
            }
        },

        sendCode: function () {
            var me = this;
            var element = me.element;

            element.prop('disabled', true);
            var promise = me.send();

            if (promise) {
                promise.done(function (response) {
                    // 发送成功开始倒计时
                    if (response.code === 0) {

                        me.countDown(60);

                    }
                    else {
                        element.prop('disabled', false);
                    }

                });
            }
            else {
                element.prop('disabled', false);
            }

            return promise;
        }

    };

    return CodeButton;

});