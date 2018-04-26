/**
 * @file 简单的文本域编辑器，可实时统计剩余字符数
 * @author zhujialu
 */
define(function (require) {

    'use strict';

    var Text = require('cobble/form/Text');

    /**
     * 编辑器构造函数
     *
     * @constructor
     * @param {Object} options
     * @property {jQuery} options.element
     * @property {number} options.minLength 最小汉字个数
     * @property {number} options.maxLength 最大汉字个数
     * @property {number} options.autoHint 达到n个汉字显示提示
     * @property {boolean} options.flexHeight textarea高度是否根据内容可变，默认false
     */
    function Editor(options) {
        $.extend(this, options);
        this.init();
    }

    Editor.prototype = {

        constructor: Editor,

        /**
         * 初始化
         */
        init: function () {

            var me = this;
            var element = this.element;
            var minLength = this.minLength || 0;
            var maxLength = this.maxLength;
            var flexHeight = this.flexHeight || false;
            var autoHint = this.autoHint || false;

            var hint = element.find('.form-hint');

            if (minLength) {
                hint.html('还需要输入<strong>' + minLength + '</strong>个字');
            }
            else {
                if (!autoHint) {
                    hint.html('还可以输入<strong>' + maxLength + '</strong>个字');
                }
            }


            var textarea =
            this.textarea = element.find('textarea');


            var refresh = function (e) {

                var value = textarea.val();
                var len;
                if (value.length < minLength) { // 当前字数小于需要输入的最小字数

                    len = minLength - value.length;
                    hint.html('还需要输入<strong>' + len + '</strong>个字');

                }
                else if (value.length >= minLength && value.length <= maxLength) {

                    if (!autoHint || value.length >= autoHint) {
                        len = maxLength - value.length;
                        hint.html('还可以输入<strong>' + len + '</strong>个字');
                    }
                    else {
                        hint.html('');
                    }

                }
                else if (maxLength < value.length) { // 超出最大限制
                    len = value.length - maxLength;
                    hint.html('<span class="text-error">已超出<strong>' + len + '</strong>个字</span>');
                }

                // 改变textarea高度
                me.autoHeight();

            };

            this.textInput = new Text({
                element: textarea,
                placeholderNativeFirst: false,
                placeholderSimple: false,
                onChange: refresh
            });

            refresh();
        },

        getValue: function () {
            return this.textarea.val();
        },

        setValue: function (value) {
            this.textInput.setValue(value);
            this.autoHeight();
        },

        autoHeight: function () {
            if (this.flexHeight) {
                var tempHeight = this.textarea[0].scrollHeight + 'px';
                this.textarea.css('height', tempHeight);
            }
        },

        validate: function () {
            return this.maxLength >= this.getValue().length;
        }

    };

    var excludeKeyMap = {
        8: 1,
        37: 1,
        38: 1,
        39: 1,
        40: 1
    };

    return Editor;

});