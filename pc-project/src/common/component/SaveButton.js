/**
 * @file 保存按钮，用于避免点击保存按钮触发多次请求
 * @author zhujialu
 */
define(function (require) {

    'use strict';

    /**
     * 保存按钮
     *
     * @param {Object} options
     * @property {jQuery} options.element 按钮元素
     * @property {?jQuery} options.form 如果是表单中的保存按钮，需要监听表单的 submit 事件，所以要传入表单元素
     * @property {Function} options.save 保存方法，返回 Promise 对象
     * @property {?string} options.saveText 正在保存的话术，默认是 '正在保存...'
     */
    function SaveButton(options) {
        $.extend(this, options);
        this.init();
    }

    SaveButton.prototype = {

        init: function () {

            var me = this;
            var element = me.element;

            var originText = element.html();

            if (element.prop('tagName') !== 'BUTTON') {
                throw new Error('SaveButton 必须使用 button 标签');
                return;
            }

            var handler = function () {

                var promise = me.save();

                if (promise) {

                    // 避免焦点还在输入框中
                    element.focus();
                    element.prop('disabled', true);
                    element.html(me.saveText || '正在保存...');

                    promise.always(
                        function () {
                            setTimeout(function () {
                                element.prop('disabled', false);
                                element.html(originText);
                            }, 10);
                        }
                    );
                }

                return false;
            };

            element.click(handler);

            if (me.form) {
                // 因为不存在传统的表单提交，所以总是返回 false
                me.form.submit(
                    function () {
                        handler();
                        return false;
                    }
                );
            }
        }
    };

    return SaveButton;

});