/**
 * @file 文本输入框
 * @author zhujialu
 */
define(function (require, exports, module) {

    'use strict';

    var FormText = require('custom/form/Text');
    var keyboard = require('cc/util/keyboard');

    return Ractive.extend({
        template: require('html!./Input.html'),
        data: function () {
            return {
                style: require('text!./Input.styl'),
                options: {
                    name: '',
                    value: '',
                    type: '',
                    placeholder: '',
                    className: '',
                    multiple: false,
                    lazy: false,
                    disabled: false,
                    readonly: false,
                    autofocus: false,
                    maxlength: ''
                }
            };
        },

        onrender: function () {
            var me = this;
            /**
             * hurry: 增加自动高度支持
             */
            function autoHeight(element) {
                // 自动变高必须设置 overflow-y: hidden
                if (element.css('overflow-y') !== 'hidden') {
                    element.css('overflow-y', 'hidden');
                }

                var originHeight = element.height();

                var oldHeight = originHeight;
                var newHeight;

                var lineHeight = parseInt(element.css('font-size'), 10);
                var padding = element.innerHeight() - originHeight;

                function calHeight() {
                    // 把高度重置为原始值才能取到正确的 newHeight
                    if (oldHeight !== originHeight) {
                        oldHeight = originHeight;
                        element.height(originHeight);
                    }

                    // scrollHeight 包含上下 padding 和 height
                    newHeight = element.prop('scrollHeight') - padding;

                    if (Math.abs(newHeight - oldHeight) > lineHeight) {
                        element.height(newHeight);
                        oldHeight = newHeight;
                    }

                }
                element.on('keyup', calHeight);
                // 第一次默认计算
                calHeight();
            }
            var mainElement = $(me.getElement());
            var inputElement = mainElement.find(':text,textarea');

            var formText =
            me.formText = new FormText({
                mainElement: mainElement,
                nativeFirst: false,
                watch: {
                    value: function (value) {
                        if (value !== me.get('options.value')) {
                            me.set('options.value', value);
                        }
                    }
                }
            });
            me.observe('options.autoHeight', function (value) {
                if (value) {
                    autoHeight(inputElement);
                }
            });
            me.observe('options.name', function (name) {
                formText.set('name', name);
            });
            me.observe('options.value', function (value) {
                formText.set('value', value);
            });
            me.observe('options.placeholder', function (placeholder) {
                formText.set('placeholder', placeholder);
            });
            me.observe('options.focus', function (focus) {
                if (focus) {
                    inputElement.focus();
                }
            });
            me.observe('options.blur', function (blur) {
                if (blur) {
                    inputElement.blur();
                }
            });

            me.on('focus', function () {
                me.set({
                    'options.focus': true,
                    'options.blur': false
                });
            });
            me.on('blur', function () {
                me.set({
                    'options.focus': false,
                    'options.blur': true
                });
            });
            me.on('keydown', function (e) {

                var map = { }
                map[ keyboard.enter ] = 'enter';

                var type = map[ e.original.keyCode ];
                if (type) {
                    me.fire(type, e)
                }

            });

        },
        onteardown: function () {
            // hurry: this.formText空判断
            this.formText && this.formText.dispose();
        }
    });

});