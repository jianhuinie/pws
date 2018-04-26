/**
 * @file 输入框敲空格自动变成标签
 * @author zhujialu
 */
define(function () {

    'use strict';

    var Range = require('cobble/helper/Range');

    /**
     *
     * @constructor
     * @param {Object} options
     * @property {jQuery} options.element
     * @property {?Function} options.validate 验证标签是否合法，传入 标签 字面值，返回 boolean
     * @property {?number} options.max 最多几个标签
     */
    function TagInput(options) {
        $.extend(this, options);
        this.init();
    }

    TagInput.prototype = {

        init: function () {

            var me = this;

            var element = me.element;

            // 用一个 div 包起来，便于生成标签列表
            var wrapper = $(template);
            element.replaceWith(wrapper);
            wrapper.append(element);

            // 获取元素的 name，创建同名 hidden input
            var name = element.prop('name');
            if (name) {
                element.removeAttr('name');
            }

            var input = $('<input type="hidden" name="' + name + '" />');
            var tagList = wrapper.find('.tag-list');

            wrapper.append(input);

            me.wrapper = wrapper;
            me.tagList = tagList;
            me.input = input;

            var range = new Range(element[0]);

            element
            .on('keydown', function (e) {

                var keyCode = e.keyCode;
                var text = $.trim(element.val());

                if (text && keyCode === 32) {

                    if (me.appendTag(text)) {
                        element.val('');
                    }
                    else {
                        return false;
                    }

                }
                // 删除标签
                else if (keyCode === 8) {

                    var r = range.getRange();

                    // 光标在开始位置
                    if (r.start === r.end && r.start === 0) {

                        if (tagList.length > 0) {

                            var item = tagList.find('.label').last();
                            me.removeTag(item.data('value'));

                        }
                    }

                }

            })
            .on('focus', function () {
                wrapper.addClass('active');
            })
            .on('blur', function () {
                wrapper.removeClass('active');
            });

            wrapper.on('click', '.icon-times', function (e) {

                var target = $(e.currentTarget).closest('.label');
                me.removeTag(target.data('value'));

            });

        },

        setValue: function (value) {

            var me = this;
            var tagList = me.tagList;

            tagList
            .find('.label')
            .each(function () {
                me.removeTag(
                    $(this).data('value')
                );
            });

            $.each(
                value.split(','),
                function (index, value) {
                    if (value) {
                        me.appendTag(value);
                    }
                }
            );

        },

        /**
         * 获取包括 tag 和 输入框 的值的集合
         *
         * @return {string}
         */
        getValue: function () {

            var me = this;

            var result = me.getTags();

            if ($.type(me.max) !== 'number'
                || result.length < me.max
            ) {

                var inputValue = $.trim(me.element.val());

                if (validate(me, inputValue)) {
                    result.push(inputValue);
                }

            }

            return result.join(',');
        },

        /**
         * 获取 tags，不包含输入框的值
         *
         * @return {string}
         */
        getTags: function () {

            var array = [ ];

            this
            .tagList
            .find('.label')
            .each(
                function () {

                    array.push(
                        $(this).data('value')
                    );

                }
            );

            return array;
        },

        /**
         * 往后追加标签
         *
         * @param {string} value
         * @return {boolean} 是否追加成功
         */
        appendTag: function (value) {

            var me = this;
            var result = validate(me, value);

            if (result) {

                var list = me.getTags();

                if ($.type(me.max) === 'number') {
                    result = list.length < me.max;
                }

                if (result) {
                    list.push(value);
                    me.tagList.append(createTag(value))
                    me.input.val(list.join(','));
                }

            }

            return result;
        },

        removeTag: function (value) {

            var me = this;
            var tagList = me.tagList;

            tagList
            .find('.label')
            .each(function () {

                var tag = $(this);

                if (tag.data('value') === value) {

                    tag.remove();

                    me.input.val(me.getTags().join(','));

                    return false;
                }

            });

        }

    };

    var template = '<div class="tag-input">'
                 +     '<div class="tag-list"></>'
                 + '</div>';


    function createTag(text) {
        return $('<label class="label label-primary small" data-value="' + text + '">'
             +     text
             +     '<i class="icon icon-times"></i>'
             + '</label>');
    }

    function validate(tagInput, tag) {

        var result = tag !== '';

        if (result) {

            if (tagInput.tagList.find('[data-value="' + tag + '"]').length > 0) {
                result = false;
            }

            if (result && $.isFunction(tagInput.validate)) {
                result = tagInput.validate(tag);
            }

        }

        return result;
    }

    return TagInput;

});